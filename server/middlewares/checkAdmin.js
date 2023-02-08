export default async (req, res, next) => {
  try {
    if (req.user.role === 'ADMIN') {
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