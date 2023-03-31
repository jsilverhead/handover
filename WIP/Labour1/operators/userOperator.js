import UserModel from '../models/user.js';
import KeyModel from '../models/key.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mailer from '../utils/mailer.js';
import user from '../models/user.js';
import KeyGen from 'generate-key';

// USER REGISTRATION
export const registration = async (req, res) => {
  try {
    // Hashing password
    const unhashed = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(unhashed, salt);

    // Creating document
    const doc = new UserModel({
      userName: req.body.userName,
      email: req.body.email,
      phone: req.body.phone,
      passwordHash: hashed,
    });

    // Saving user to a db
    const user = await doc.save();

    // Exclude passHash
    const { passwordHash, ...userData } = user._doc;

    // Answer
    //res.json({ ...userData, token });
    res.json({ message: 'success' });
  } catch (error) {
    // Inner answer
    console.log(`User creation failed: ${error}`);

    // Outer answer
    res.status(500).json({
      message: 'Registration failed',
    });
  }
};

// USER LOGIN
export const login = async (req, res) => {
  try {
    // Looking for email
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: `Wrong email or password`,
      });
    }

    // Matching password
    const checkPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!checkPass) {
      return res.status(400).json({
        message: `Wrong email or password`,
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'key',
      { expiresIn: '14d' }
    );

    // Exclude passHash
    const { passwordHash, ...userData } = user._doc;

    // Answer
    res.json({ ...userData, token });
  } catch (error) {
    console.log(`Login failed: ${error}`);
    res.status(500).json({
      message: 'An error occured. Please try again later',
    });
  }
};

// GET USER Data
export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userID);

    if (!user) {
      return res.status(404).json({
        message: 'There is no user with such credentials',
      });
    }
    // Exclude passHash
    const { passwordHash, ...userData } = user._doc;

    // Answer
    res.json(userData);
  } catch (error) {
    console.log(`User data fetching failed: ${error}`);
    res.status(500).json({
      message: 'Not authorized',
    });
  }
};
// USER UPDATE
export const dataUpdate = async (req, res) => {
  try {
    const unhashed = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(unhashed, salt);
    const newData = { ...req.body, password: hash };
    const doc = await UserModel.findOneAndUpdate(req.email, newData, {
      new: true,
    });

    if (!doc) {
      return res.status(400).json({
        message: 'There is no user with such credentials',
      });
    }
    res.json({ message: 'User Data Update: Success' });
  } catch (error) {
    console.log(`Updating Data Failed: ${error}`);
    res.status(500).json({ message: 'Unable to change user data' });
  }
};

// KEY GEN + SEND
export const sendKey = async (req, res) => {
  try {
    const findUser = await UserModel.findOne({ email: req.body.email });

    if (!findUser) {
      console.log("User doesn't found");
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const key = await KeyModel.findOne({ userId: findUser._id });
    if (key) await key.deleteOne();

    const createKey = KeyGen.generateKey(7);

    const newKey = await new KeyModel({
      userId: findUser._id,
      key: createKey,
      createdAt: Date.now(),
    }).save();

    const message = {
      to: req.body.email,
      subject: 'Password Reminder',
      text: `You have received this email because you have requested a password reminder. Your secret key is: ${newKey.key}`,
    };
    mailer(message);
    res.status(200).json({
      message: `Email Successfuly sent to ${req.body.email}`,
      id: findUser._id,
    });
  } catch (error) {
    console.log(`Email sending failed: ${error}`);
    return res
      .status(500)
      .json({ message: `Unable to send an email: ${error}` });
  }
};

// CHECK KEY
export const checkKey = async (req, res) => {
  try {
    const findUser = await UserModel.findById({ _id: req.body.id });

    if (!findUser) {
      console.log("User doesn't found");
      return res.status(400).json({ message: 'Пользователь не найден' });
    }
    const matchKey = await KeyModel.findOne({ key: req.body.key });
    if (!matchKey) {
      console.log('Keys do not match');
      return res.status(400).json({ message: 'Неправильный ключ' });
    }
    console.log('Секретный ключ успешно принят');
    return res.status(200).json({ message: 'Секретный ключ успешно принят' });
  } catch (error) {
    console.log(`Something wrong: ${error}`);
    return res.status(500).json({ message: `Что-то пошло не так: ${error}` });
  }
};

// CREATE NEW PASSWORD
export const newPassword = async (req, res) => {
  try {
    // Hashing password
    const unhashed = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(unhashed, salt);

    const findUser = await UserModel.findOneAndUpdate(
      { _id: req.body.id },
      { passwordHash: hashed }
    );

    if (!findUser) {
      console.log(`Пользователь ID: ${req.body.id} не найден`);
      return res.status(400).json({ message: 'Ошибка доступа' });
    }
    console.log('Пароль успешно обновлен');
    return res.status(200).json({ message: 'Пароль успешно обновлен' });
  } catch (error) {
    console.log(`Something wrong: ${error}`);
    return res
      .status(500)
      .json({ message: `Не удалось обновить пароль: ${error}` });
  }
};
