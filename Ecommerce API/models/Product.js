import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    categoryId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    title: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    desc: { 
        type: String, 
        required: true,
        trim: true 
    },
    img: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    size: [{ 
        type: String 
    }],
    color: [{ 
        type: String 
    }],
    price: { 
        type: Number, 
        required: true
    },
    inStock: { 
        type: Boolean, 
        default: true 
    },
}, { timestamps: true });

ProductSchema.index({ title: 1 });

export default mongoose.model('Product', ProductSchema);
