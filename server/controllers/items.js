import Item from '../models/Item.js';
import Collection from '../models/Collection.js';

export const createItem = async (req, res) => {
  try {
    const doc = new Item({
      title: req.body.title,
      tags: req.body.tags,
      collectionId: req.body.collectionId,
      number1: req.body.number1,
      number2: req.body.number2,
      number3: req.body.number3,
      string1: req.body.string1,
      string2: req.body.string2,
      string3: req.body.string3,
      text1: req.body.text1,
      text2: req.body.text2,
      text3: req.body.text3,
      date1: req.body.date1,
      date2: req.body.date2,
      date3: req.body.date3,
      checkbox1: req.body.checkbox1,
      checkbox2: req.body.checkbox2,
      checkbox3: req.body.checkbox3,
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