import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createUserValidation, loginValidation } from './validation/auth.js';
import checkAuth from './utils/checkAuth.js';
import { QuartersOperator, UserOperator } from './operators/operators.js';
import validationErr from './validation/validationErr.js';

const app = express();
const port = 8000;
const URI =
  'mongodb+srv://admin:32bigGNnjoLYfKt1@rentahouse.xu07f8r.mongodb.net/rentahouse?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

async function dbConnect() {
  try {
    const client = await mongoose.connect(URI);
    console.log('Connected to DB');
  } catch (e) {
    console.log(`DB connection error: ${e}`);
  }
}

dbConnect();

app.use(express.json()); // allow to read json
app.use(cors());

// REGISTRATION
app.post(
  '/auth/registration',
  createUserValidation,
  validationErr,
  UserOperator.registration
);
// LOGIN
app.post('/auth/login', loginValidation, validationErr, UserOperator.login);
// LOGGED USER DATA
app.get('/auth/user', checkAuth, UserOperator.getUser);
// USER DATA UPDATE
app.put('/auth/update', validationErr, UserOperator.dataUpdate);
// USER SEND KEY
app.post('/auth/gen', UserOperator.sendKey);
// USER PASSWORD KEYCHECK
app.post('/auth/checkkey', UserOperator.checkKey);
// USER PASSWORD UPDATE
app.post('/auth/newpassword', UserOperator.newPassword);
app.post('/auth/checkemail', UserOperator.checkMail);
app.post('/auth/checkphone', UserOperator.checkNumber);

app.get('/in/', checkAuth, QuartersOperator.authorized);
app.get('/', QuartersOperator.fetch);
app.get('/:id', QuartersOperator.getInfo);

// SERVER BUILD
app.listen(port, (err) => {
  if (err) {
    console.log(`Server building failed: ${err}`);
  }
  console.log(`Server built at http://localhost:${port}`);
});
