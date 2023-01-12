import UserModel from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registration = async (req, res) => {
  try {
    // Hashing password
    const unhashed = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(unhashed, salt);

    // Creating document
    const doc = new UserModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      passwordHash: hashed,
    });

    // Saving user to a db
    const user = await doc.save();

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
  } catch (e) {
    // Inner answer
    console.log(`User creation failed: ${e}`);

    // Outer answer
    res.status(500).json({
      message: 'Registration failed',
    });
  }
};

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
  } catch (e) {
    console.log(`Login failed: ${e}`);
    res.status(500).json({
      message: 'An error occured. Please try again later',
    });
  }
};

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
  } catch (e) {
    console.log(`User data fetching failed: ${e}`);
    res.status(500).json({
      message: 'Not authorized',
    });
  }
};
