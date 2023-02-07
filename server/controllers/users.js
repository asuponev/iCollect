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