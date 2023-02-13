import Item from '../models/Item.js';
import Collection from '../models/Collection.js';

export const createItem = async (req, res) => {
  try {
    const doc = new Item({
      title: req.body.title,
      tags: req.body.tags,
      collectionId: req.body.collectionId,
    });
    const item = await doc.save();
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const getAllCollectionItems = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (collection) {
      const allCollectionItems = await Item.find({ collectionId: req.params.id });
      res.json(allCollectionItems);
    } else {
      res.status(404).json({
        message: `Collection with ID ${req.params.id} was not found`
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}