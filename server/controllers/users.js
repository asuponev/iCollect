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

export const blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await User.findById(userId);
    user.isActive = !user.isActive;
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await User.findById(userId);
    user.role = user.role === 'USER' ? 'ADMIN' : 'USER';
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

const deleteOneUser = async (userId) => {
  let user = await User.findById(userId);
  user.role = 'ARCHIVE';
  user.isActive = false;
  await user.save();
  return user;
}

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const adminId = req.user._id.toString();
    if (userId !== adminId) {
      const user = await deleteOneUser(userId);
      res.json(user);
    } else {
      res.status(400).json({
        message: 'Attempting to delete yourself'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const deleteUsers = async (req, res) => {
  try {
    const adminId = req.user._id.toString();
    const selectedUsers = req.body.filter(userId => userId !== adminId);
    selectedUsers.forEach(userId => {
      deleteOneUser(userId);
    });
    res.json(selectedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}
