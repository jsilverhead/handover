import UserModel from '../models/user.js';
import KeyModel from '../models/key.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mailer from '../utils/mailer.js';
import KeyGen from 'generate-key';

// USER REGISTRATION
export const registration = async (req, res) => {
  try {
    // Searching for duplicates
    const searchEmail = await UserModel.findOne({ email: req.body.email });

    if (searchEmail) {
      console.log('Пользователь с таким email уже существует');
      res.status(403).json({
        code: 403,
        message: 'Пользователь с таким email уже зарегистрирован',
      });
    } else {
      const searchPhone = await UserModel.findOne({ phone: req.body.phone });

      if (searchPhone) {
        console.log('Пользователь с таким номером уже существует');
        res.status(403).json({
          code: 403,
          message: 'Пользователь с таким номером уже зарегистрирован',
        });
      } else {
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
        return res.status(200).json({
          code: 200,
          message: 'Регистрация успешно завершена',
        });
      }
    }
  } catch (error) {
    // Inner answer
    console.log(`Ошибка регистрации: ${error}`);

    // Outer answer
    return res.status(500).json({
      code: 500,
      message: `Ошибка сервера: ${error}`,
    });
  }
};

// USER LOGIN
export const login = async (req, res) => {
  try {
    // Looking for email
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(403).json({
        code: 403,
        message: `Неправильно указан пользователь или пароль`,
      });
    }

    // Matching password
    const checkPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!checkPass) {
      return res.status(403).json({
        code: 403,
        message: `Неправильно указан пользователь или пароль`,
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
      code: 500,
      message: 'Ошибка сервера. Попробуйте позже',
    });
  }
};

// GET USER Data
export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userID);

    if (!user) {
      return res.status(403).json({
        code: 403,
        message: 'Пользователя с указанными данными не существует',
      });
    }
    // Exclude passHash
    const { passwordHash, ...userData } = user._doc;

    // Answer
    res.json(userData);
  } catch (error) {
    console.log(`Ошибка передачи данных: ${error}`);
    res.status(500).json({
      code: 400,
      message: 'Не авторизован',
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
        code: 400,
        message: 'Пользователя с указанными данными не существует',
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'key',
      { expiresIn: '14d' }
    );
    res.json({ token, message: 'Обновление данных пользователя: Success' });
  } catch (error) {
    console.log(`Ошибка обновления данных пользователя: ${error}`);
    res.status(500).json({
      code: 500,
      message: 'Ошибка сервера. Попробуйте позже',
    });
  }
};

// KEY GEN + SEND
export const sendKey = async (req, res) => {
  try {
    const findUser = await UserModel.findOne({ email: req.body.email });

    if (!findUser) {
      console.log('Пользователь не найден');
      return res.status(403).json({
        code: 403,
        message: 'Пользователь не найден',
      });
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
      text: `You have received this email because you have requested a password reminder.\n Your secret key is: ${newKey.key}`,
    };
    mailer(message);
    res.status(200).json({
      code: 200,
      message: `Email Successfuly sent to ${req.body.email}`,
      id: findUser._id,
    });
  } catch (error) {
    console.log(`Email sending failed: ${error}`);
    return res.status(500).json({
      code: 500,
      message: `Unable to send an email: ${error}`,
    });
  }
};

// CHECK KEY
export const checkKey = async (req, res) => {
  try {
    const findUser = await UserModel.findById({ _id: req.body.id });

    if (!findUser) {
      console.log("User doesn't found");
      return res.status(403).json({
        code: 403,
        message: 'Пользователь не найден',
      });
    }
    const matchKey = await KeyModel.findOne({ key: req.body.key });
    if (!matchKey) {
      console.log('Keys do not match');
      return res.status(403).json({
        code: 403,
        message: 'Неправильный секретный код',
      });
    }
    console.log('Секретный ключ успешно принят');
    return res.status(200).json({
      code: 200,
      message: 'Секретный ключ успешно принят',
    });
  } catch (error) {
    console.log(`Something wrong: ${error}`);
    return res.status(500).json({
      code: 500,
      message: `Что-то пошло не так: ${error}`,
    });
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
      return res.status(400).json({
        code: 400,
        message: 'Ошибка доступа',
      });
    }
    console.log('Пароль успешно обновлен');
    return res.status(200).json({
      code: 200,
      message: 'Пароль успешно обновлен',
    });
  } catch (error) {
    console.log(`Something wrong: ${error}`);
    return res.status(500).json({
      code: 500,
      message: `Не удалось обновить пароль: ${error}`,
    });
  }
};

// CHECK EMAIL FOR DUPLICATES
export const checkMail = async (req, res) => {
  try {
    const check = await UserModel.findOne({ email: req.body.email });

    if (check) {
      res.json({
        code: 403,
        message: 'Пользователь с данным email уже существует',
      });
    } else {
      res.json({ code: 200, message: 'Пользователь с данным email не найден' });
    }
  } catch (error) {
    console.log(`Ошибка: ${error}`);
    res.status(500);
  }
};

// CHECK PHONE FOR DUPLICATES
export const checkNumber = async (req, res) => {
  try {
    const check = await UserModel.findOne({ phone: req.body.phone });
    if (check) {
      res.json({
        code: 403,
        message: 'Пользователь с данным номером телефона уже существует',
      });
    } else {
      res.json({
        code: 200,
        message: 'Пользователь с данным номером телефона не найден',
      });
    }
  } catch (error) {
    console.log(`Ошибка: ${error}`);
    res.status(500);
  }
};

// GET ACCOUNT INFO
export const getInfo = async (req, res) => {
  try {
    const findUser = await UserModel.findOne({ email: req.body.email });

    res.json({ findUser, code: 200, message: 'Пользователь найден' });
  } catch (error) {
    console.log(`Возникла ошибка: ${error}`);
    res.json({ code: 500, message: 'Ошибка сервера' });
  }
};
