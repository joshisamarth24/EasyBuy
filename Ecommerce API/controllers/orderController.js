import Order from "../models/order.js";
import User from "../models/user.js";

export const addNewOrder = async(req,res) => {
    const order = req.body;
    const userId = req.body.userId;
    try {
        const newOrder = await new Order(order);
        await newOrder.save();
        const user = await User.findById(userId);
        user.orders.push(newOrder);
        await user.save();
        res.status(200).json({message:"Order placed successfully",newOrder});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}


export const updateOrder = async(req,res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
            {
                $set:req.body,
            },{new:true});
            res.status(200).json(updatedOrder);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }

}

export const deleteOrder = async(req,res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted successfully");
    } catch (error) {
        res.status(500).json(error);
    }
}


export const getUserOrders = async(req,res) => {
    try {
        const orders = await Order.find({userId:req.params.userId});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllOrders = async(req,res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getOrderStats = async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));
    try {
        const income = await Order.aggregate([
            {$match:{createdAt:{$gte:prevMonth}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount",
                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:"$sales"},
                },
            },
        ]);
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error);
    }
}