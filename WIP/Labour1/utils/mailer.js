import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.CLIENT,
      pass: process.env.PASSWORD,
    },
  },
  {
    from: 'Rent A House Service <rentahouse_noreply@mail.ru>',
  }
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) console.log(err);
    console.log('Message sent', info);
  });
};

export default mailer;
