import User from '../models/User.js';

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: `User with ID ${req.params.id} was not found`
    });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role === 'ADMIN') {
      const allUsers = await User.find();
      res.json(allUsers);
    } else {
      res.status(403).json({
        message: 'Not access'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}