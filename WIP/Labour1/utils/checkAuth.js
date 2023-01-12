import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decodedToken = jwt.verify(token, 'key');

      req.userID = decodedToken._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: 'Not authorized',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Not authorized',
    });
  }
};
