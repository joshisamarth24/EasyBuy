import mongoose from "mongoose";


const AddressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
}, { _id: false });

const OrderSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Products:{
        items:[{
            ProductId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            Quantity:{
                type:Number,
                default:1
            },
        }],
        
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:AddressSchema,
        required:true
    },
    status:{
        type:String,
        enum:['pending','packed','shipped','delivered'],
        default:'pending'}
},
{timestamps:true}
);

export default mongoose.model('Order',OrderSchema);