import User from '../models/User.js';

export default async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role === 'ADMIN') {
      req.user = user;
      next();
    } else {
      res.status(403).json({
        message: 'Not access'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: 'Not access'
    });
  }
}