import Comment from '../models/Comment.js';
import Item from '../models/Item.js';

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

export const getAllItemComment = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (item) {
      const allItemComment = await Comment.find({ itemId: req.params.itemId });
      res.json(allItemComment);
    } else {
      res.status(404).json({
        message: `Item with ID ${req.params.itemId} was not found`
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}