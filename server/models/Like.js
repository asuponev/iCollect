import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema(
  {
    userId: {
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

const Like = mongoose.model('Likes', LikeSchema);

export default Like;