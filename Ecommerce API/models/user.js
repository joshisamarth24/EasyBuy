import mongoose from "mongoose";
import validator from "validator";

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Username is required'], 
    unique: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email'
    }
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'] 
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  img: { 
    type: String
  },
  firstName: { type: String, trim: true,required: [true, 'First name is required']},
  lastName: { type: String, trim: true},
  phone: { type: Number, trim: true, unique: true},
  addresses: [AddressSchema],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  role: [{ type: String, enum: ['user', 'admin'],default: 'user' }],
}, { timestamps: true });


UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });

export default mongoose.model('User', UserSchema);
