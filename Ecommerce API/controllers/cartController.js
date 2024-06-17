import Cart from "../models/Cart.js";
import User from "../models/user.js";

// Adding a new cart
export const addNewCart = async (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Cart items are required." });
    }

    try {
        const newCart = new Cart({
            userId: req.userId, // Assuming req.userId is set by your auth middleware
            items,
        });

        await newCart.save();
        res.status(201).json({ message: "Cart created successfully", cart: newCart });

    } catch (error) {
        console.error("Error creating cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Updating a cart
export const updateCart = async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Find the cart for the user
      const cart = await Cart.findOne({ userId });
      
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      
      
      const updatedCart = await Cart.findByIdAndUpdate(
        cart._id,
        {
          $set: {
            Products: req.body.Products,
            totalQuantity: req.body.totalQuantity,
            totalPrice: req.body.totalPrice
          }
        },
        { new: true }
      );
      
      res.status(200).json({message:"Cart has been updated successfully"});
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
// Deleting a cart
export const deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        if (cart.userId.toString() !== req.userId) {
            return res.status(403).json({ error: "You do not have permission to delete this cart." });
        }

        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Cart has been deleted successfully" });

    } catch (error) {
        console.error("Error deleting cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Getting a user's cart
export const getUserCart = async (req, res) => {
  try {
      const userId = req.params.userId;
      const cart = await Cart.findOne({ userId: userId }).populate('Products.items.ProductId').exec();

      if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
      }
     
      res.status(200).json(cart);
    } catch (error) {
        console.log(error)
       
  }
};

  

// Getting all carts (admin only)
export const getAllCarts = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user.isAdmin) {
            return res.status(403).json({ error: "Access denied" });
        }

        const carts = await Cart.find();
        res.status(200).json(carts);

    } catch (error) {
        console.error("Error fetching carts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
