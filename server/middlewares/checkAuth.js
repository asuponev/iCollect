import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded.isActive) {
        return res.status(403).json({
          message: 'No access, user is blocked'
        })
      }
      req.user = decoded;
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