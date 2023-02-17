import User from '../models/User.js';

export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: `User with ID ${req.params.userId} was not found`
    });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ role: /ADMIN|USER/ });
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const updateSelectUsers = async (req, res) => {
  try {
    req.body[0].forEach(async (id) => {
      let user = await User.findById(id);
      if (req.body[1] === 'block') {
        user.isActive = !user.isActive;
      } else if (req.body[1] === 'admin') {
        user.role = user.role === 'USER' ? 'ADMIN' : 'USER';
      } else if (req.body[1] === 'delete') {
        user.role = 'ARCHIVE';
        user.isActive = false;
      }
      await user.save();
    })
    const users = await User.find({ role: /ADMIN|USER/ });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}
