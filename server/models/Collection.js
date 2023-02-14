import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 20,
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
    coverUrl: String,
    extraFields: Array
  }, {
  timestamps: true
});

const Collection = mongoose.model('Collections', CollectionSchema);

export default Collection;
