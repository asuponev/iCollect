import User from '../models/User.js';
import Collection from '../models/Collection.js';

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
    res.json(collection);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const updateCollection = async (req, res) => {
  try {
    const requestor = req.user;
    const requestorId = requestor._id.toString();
    const collection = await Collection.findById(req.params.collectionId);
    const authorId = collection.authorId.toString();
    if (requestor.role === 'ADMIN' || requestorId === authorId) {
      collection.title = req.body.title;
      collection.description = req.body.description;
      collection.subject = req.body.subject;
      collection.coverUrl = req.body.coverUrl;
      collection.extraFields = req.body.extraFields;
      await collection.save();
      res.json(collection);
    } else {
      res.status(403).json({
        message: 'No access'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const deleteCollection = async (req, res) => {
  try {
    const requestor = req.user;
    const requestorId = requestor._id.toString();
    const collection = await Collection.findById(req.params.collectionId);
    const authorId = collection.authorId.toString();
    if (requestor.role === 'ADMIN' || requestorId === authorId) {
      await Collection.deleteOne({ _id: req.params.collectionId })
      res.json({
        message: `Collection "${collection.title}" was successfully deleted`
      });
    } else {
      res.status(403).json({
        message: 'No access'
      });
    }
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
      const allCollectionsUser = await Collection.find({ authorId: req.params.userId }).sort({ updatedAt: -1 });
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
    const collection = await Collection.findById(req.params.collectionId);
    res.json(collection);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}