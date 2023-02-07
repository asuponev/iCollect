import jwt from 'jsonwebtoken';

export default (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1];
  console.log(token)
  if (token) {
    try {
      const decoded = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({
        message: 'No access, please log in'
      })
    }
  } else {
    return res.status(403).json({
      message: 'No access, please log in'
    })
  }
}