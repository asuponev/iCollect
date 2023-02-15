import Comment from '../models/Comment.js';

export const createComment = async (req, res) => {
  try {
    const doc = new Comment({
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      authorId: req.user._id,
      itemId: req.body.itemId,
      message: req.body.message
    });
    const message = await doc.save();
    res.json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}