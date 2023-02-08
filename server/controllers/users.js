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
      const allUsers = await User.find({ role: /ADMIN|USER/ });
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

export const deleteSelectUsers = async (req, res) => {
  try {
    const selectedUsersId = Object.values(req.query);
    selectedUsersId.forEach(async (userId) => {
      let user = await User.findByIdAndUpdate(userId, { role: 'ARCHIVE', isActive: false }, { new: true });
      await user.save();
    })
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
    const selectedUsersId = req.body[0];
    selectedUsersId.forEach(async (userId) => {
      let user = await User.findById(userId);
      if (req.body[1] === 'block') {
        user.isActive = !user.isActive;
      } else if (req.body[1] === 'admin') {
        user.role = user.role === 'USER' ? 'ADMIN' : 'USER';
      }
      await user.save();
    })
    const allUsers = await User.find({ role: /ADMIN|USER/ });
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}
