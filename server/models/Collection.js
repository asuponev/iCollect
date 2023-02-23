import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      min: 5,
    },
    subject: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: Number,
      default: 0,
    },
    coverUrl: String,
    extraFields: Array
  }, {
  timestamps: true
});

const Collection = mongoose.model('Collection', CollectionSchema);

export default Collection;
