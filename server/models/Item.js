import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    tags: {
      type: Array,
      required: true,
      default: []
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection',
      required: true,
    },
    number1: Number,
    number2: Number,
    number3: Number,
    string1: String,
    string2: String,
    string3: String,
    text1: String,
    text2: String,
    text3: String,
    date1: String,
    date2: String,
    date3: String,
    checkbox1: Boolean,
    checkbox2: Boolean,
    checkbox3: Boolean,
  }, {
  timestamps: true
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;
