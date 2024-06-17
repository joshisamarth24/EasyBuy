import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    img: { 
        type: String, 
    },
}, { timestamps: true });

export default mongoose.model('Category', CategorySchema);
