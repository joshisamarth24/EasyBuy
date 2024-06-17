import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Products: {
    items: [{
      ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      Quantity: {
        type: Number,
        default: 1,
      },
    }],
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
  },
}, { timestamps: true });

export default mongoose.model('Cart', CartSchema);
