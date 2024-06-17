import Order from "../models/Order.js";
import User from "../models/user.js";

export const addNewOrder = async (req, res) => {
    const { userId, products, amount, address} = req.body;

    try {
        const newOrder = new Order({ userId, 
            Products: { items: products }, 
            amount, 
            address });
        await newOrder.save();
        await newOrder.populate("Products.items.ProductId");

        res.status(200).json({ message: "Order placed successfully", newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json({ message: "Order has been deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).populate("Products.items.ProductId").exec();

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getOrderStats = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: prevMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);

        res.status(200).json(income);
    } catch (error) {
        console.error("Error fetching order stats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
