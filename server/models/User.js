import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
      min: 5,
    },
    isActive: {
      type: Boolean,
      default: true
    },
    role: {
      type: String,
      default: 'USER'
    }
  }, {
  timestamps: true
}
)

const User = mongoose.model('User', UserSchema);

export default User;
