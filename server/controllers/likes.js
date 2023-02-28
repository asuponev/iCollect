import Like from '../models/Like.js';
import Item from '../models/Item.js';
import { pusherConnect } from '../utils/pusherConnect.js';

export const addLike = async (req, res) => {
  try {
    const check = await Like.find({
      userId: req.user._id,
      itemId: req.body.itemId,
    })
    if (check.authorId) {
      res.status(423).json({
        message: 'This like already present'
      });
    } else {
      const doc = new Like({
        userId: req.user._id,
        itemId: req.body.itemId,
      });
      const like = await doc.save();
      const pusher = pusherConnect();
      pusher.trigger(process.env.PUSHER_CHANNEL, 'new_like', like);
      res.json({
        message: 'Like successfully added'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const removeLike = async (req, res) => {
  try {
    const like = await Like.findOne({
      userId: req.user._id,
      itemId: req.params.itemId
    });
    if (like) {
      await Like.deleteOne({ _id: like._id });
      const pusher = pusherConnect();
      pusher.trigger(process.env.PUSHER_CHANNEL, 'remove_like', like._id);
      res.json({
        message: 'Like successfully removed'
      });
    } else {
      res.status(404).json({
        message: 'Like was not found'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const getAllItemLikes = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (item) {
      const allItemLikes = await Like.find({ itemId: req.params.itemId });
      res.json(allItemLikes);
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