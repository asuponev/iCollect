import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    message: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    }
  }, {
  timestamps: true
});

const Comment = mongoose.model('Comments', CommentSchema);

export default Comment;