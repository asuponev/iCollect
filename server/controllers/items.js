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

export const updateItem = async (req, res) => {
  try {
    const requestor = req.user;
    const requestorId = requestor._id.toString();
    const collection = await Collection.findById(req.params.collectionId);
    const item = await Item.findById(req.params.itemId);
    const authorId = collection.authorId.toString();
    if (requestor.role === 'ADMIN' || requestorId === authorId) {
      item.title = req.body.title;
      item.tags = req.body.tags;
      item.number1 = req.body.number1,
        item.number2 = req.body.number2,
        item.number3 = req.body.number3,
        item.string1 = req.body.string1,
        item.string2 = req.body.string2,
        item.string3 = req.body.string3,
        item.text1 = req.body.text1,
        item.text2 = req.body.text2,
        item.text3 = req.body.text3,
        item.date1 = req.body.date1,
        item.date2 = req.body.date2,
        item.date3 = req.body.date3,
        item.checkbox1 = req.body.checkbox1,
        item.checkbox2 = req.body.checkbox2,
        item.checkbox3 = req.body.checkbox3,
        await item.save();
      res.json(item);
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

export const getAllCollectionItems = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (collection) {
      const allCollectionItems = await Item.find({ collectionId: req.params.collectionId });
      res.json(allCollectionItems);
    } else {
      res.status(404).json({
        message: `Collection with ID ${req.params.collectionId} was not found`
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const deleteItem = async (req, res) => {
  try {
    const requestor = req.user;
    const requestorId = requestor._id.toString();
    const collection = await Collection.findById(req.params.collectionId);
    const authorId = collection.authorId.toString();
    if (requestor.role === 'ADMIN' || requestorId === authorId) {
      await Item.deleteOne({ _id: req.params.itemId })
      res.json({
        message: 'The item was successfully deleted'
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

export const deleteItems = async (req, res) => {
  try {
    const selectedItemsId = Object.values(req.query);
    const requestor = req.user;
    const requestorId = requestor._id.toString();
    const collection = await Collection.findById(req.params.collectionId);
    const authorId = collection.authorId.toString();
    if (requestor.role === 'ADMIN' || requestorId === authorId) {
      selectedItemsId.forEach(async (item) => await Item.deleteOne({ _id: item }))
      res.json({
        message: 'The items was successfully deleted'
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