import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
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
    amount:{type:Number},
    address:{type:Object},
    status:{type:String,default:'pending'}
},
{timestamps:true}
);

export default mongoose.model('Order',OrderSchema);