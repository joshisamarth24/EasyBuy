import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
    userId:{type:String,required:true},
    Products:[
        {
            ProductId:{type:String},
            Quantity:{
                type:Number,
                default:1
            },
        },
    ],
},
{timestamps:true}
);

export default mongoose.model('Cart',CartSchema);