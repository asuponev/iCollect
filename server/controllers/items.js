import Item from '../models/Item.js';
import Collection from '../models/Collection.js';
import Like from '../models/Like.js';
import Comment from '../models/Comment.js';
import { searchItems } from '../utils/searchItems.js';

const updateCollection = async (collectionId, action) => {
  const filter = { _id: collectionId };
  const update = action === 'create'
    ? { $inc: { items: 1 } }
    : { $inc: { items: -1 } }
  await Collection.findOneAndUpdate(filter, update, { new: true });
}

const deleteOneItem = async (collectionId, itemId) => {
  await Item.deleteOne({ _id: itemId });
  await Like.deleteMany({ itemId: itemId });
  await Comment.deleteMany({ itemId: itemId });
  updateCollection(collectionId, 'delete');
}

const getFullItemsData = async (query) => {
  let items = [];
  if (query === 'last') {
    items = await Item.find().sort({ createdAt: -1 }).limit(4);
    return await Promise.all(items.map(async (item) => {
      const collection = await Collection.findById(item.collectionId._id).populate('authorId');
      return { ...item._doc, collection };
    }));
  } else if (query === 'full') {
    items = await Item.find();
    return await Promise.all(items.map(async (item) => {
      const collection = await Collection.findById(item.collectionId._id).populate('authorId');
      const comments = await Comment.find({ itemId: item._id });
      const messages = comments.map(comment => comment.message);
      return { ...item._doc, collection, comments: messages };
    }));
  }
}

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
    updateCollection(item.collectionId, 'create');
    res.json({
      message: 'The item successfully created'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    item.title = req.body.title;
    item.tags = req.body.tags;
    item.number1 = req.body.number1;
    item.number2 = req.body.number2;
    item.number3 = req.body.number3;
    item.string1 = req.body.string1;
    item.string2 = req.body.string2;
    item.string3 = req.body.string3;
    item.text1 = req.body.text1;
    item.text2 = req.body.text2;
    item.text3 = req.body.text3;
    item.date1 = req.body.date1;
    item.date2 = req.body.date2;
    item.date3 = req.body.date3;
    item.checkbox1 = req.body.checkbox1;
    item.checkbox2 = req.body.checkbox2;
    item.checkbox3 = req.body.checkbox3;
    await item.save();
    res.json({
      message: 'The item successfully updated'
    });
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
      const allCollectionItems = await Item.find({ 
        collectionId: req.params.collectionId 
      }).sort({ updatedAt: -1 });
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
    const collection = await Collection.findById(item.collectionId._id).populate('authorId');
    res.json({ ...item._doc, collection });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const deleteItem = async (req, res) => {
  try {
    const { collectionId, itemId } = req.params;
    deleteOneItem(collectionId, itemId);
    res.json({
      message: 'The item successfully deleted'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const deleteItems = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const selectedItemsId = Object.values(req.query);
    selectedItemsId.forEach(async (item) => {
      deleteOneItem(collectionId, item);
    });
    res.json({
      message: 'The items was successfully deleted'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const getLastItems = async (req, res) => {
  try {
    const response = await getFullItemsData('last');
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const getAllTags = async (req, res) => {
  try {
    const items = await Item.find();
    const tags = [];
    items.forEach(item => tags.push(...item.tags));
    res.json([...new Set(tags)]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}

export const getSearchItems = async (req, res) => {
  try {
    const { value } = req.params;
    const items = await getFullItemsData('full');
    const query = value.slice(0, 7) === '--tag--' ? 'tag' : 'full';
    const response = searchItems(items, value, query);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed'
    });
  }
}