import User from '../models/User.js';
import Collection from '../models/Collection.js';
import Item from '../models/Item.js';
import Like from '../models/Like.js';
import Comment from '../models/Comment.js';

export const createCollection = async (req, res) => {
  try {
    const doc = new Collection({
      title: req.body.title,
      description: req.body.description,
      subject: req.body.subject,
      coverUrl: req.body.coverUrl,
      authorId: req.body.authorId,
      extraFields: req.body.extraFields
    });
    const collection = await doc.save();
    res.json({
      message: `Collection "${collection.title}" successfully created`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const updateCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    collection.title = req.body.title;
    collection.description = req.body.description;
    collection.subject = req.body.subject;
    collection.coverUrl = req.body.coverUrl;
    collection.extraFields = req.body.extraFields;
    await collection.save();
    res.json({
      message: `Collection "${collection.title}" successfully updated`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    await Collection.deleteOne({ _id: req.params.collectionId });
    const items = await Item.find({ collectionId: req.params.collectionId });
    items.forEach(async (item) => {
      await Item.deleteOne({ _id: item._id });
      await Like.deleteMany({ itemId: item._id });
      await Comment.deleteMany({ itemId: item._id });
    });
    res.json(collection);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const getAllCollectionsUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      const allCollectionsUser = await Collection.find({
        authorId: req.params.userId
      }).sort({ updatedAt: -1 });
      res.json(allCollectionsUser);
    } else {
      res.status(404).json({
        message: `User with ID ${req.params.userId} was not found`
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const getOneCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(
      req.params.collectionId
    ).populate('authorId');
    res.json(collection);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const getBiggestCollections = async (req, res) => {
  try {
    let data = await Collection.find().sort({ items: -1 }).limit(4).populate('authorId');
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
} 