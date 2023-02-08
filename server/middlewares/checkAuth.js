import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user.isActive) {
        return res.status(403).json({
          message: 'No access, user is blocked'
        })
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'User is unauthorized'
      })
    }
  } else {
    return res.status(401).json({
      message: 'User is unauthorized'
    })
  }
}