import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    deliveryAddress:{type:String},
    phoneNumber:{type:Number},
    cart:[{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:'Product'
    }],
    orders:[{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:'Order'
    }],
    profilePicture:{type:String},
    isAdmin:{
        type:Boolean,
        default:false
    },
},
{timestamps:true}
);

export default mongoose.model('User',UserSchema);