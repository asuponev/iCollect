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

export const getAllCollectionsUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const allCollectionsUser = await Collection.find({ authorId: req.params.id });
      res.json(allCollectionsUser);
    } else {
      res.status(404).json({
        message: `User with ID ${req.params.id} was not found`
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}