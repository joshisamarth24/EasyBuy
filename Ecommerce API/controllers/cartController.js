import Cart from "../models/Cart.js";
import User from "../models/user.js";


export const addNewCart = async (req, res) => {
    const { userId, cartItems } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
            user.cart.push(cartItems);
        

        await user.save(); // Save the updated user object

        res.status(200).json({ message: "New Cart added successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


export const updateCart = async(req,res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
            {
                $set:req.body,
            },{new:true});
            res.status(200).json(updatedCart);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }

}

export const deleteCart = async(req,res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted successfully");
    } catch (error) {
        res.status(500).json(error);
    }
}


export const getUserCart = async(req,res) => {
    try {
        const cart = await Cart.findById({userId:req.params.userId});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllCarts = async(req,res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
}