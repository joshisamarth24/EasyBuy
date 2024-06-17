import User from "../models/user.js";
import mongoose from "mongoose";


const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const{firstName,lastName,email,phone,photo,addresses} = req.body;
    if (!validateObjectId(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    const userData = await User.findById(id);
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { 
            $set: {firstName,lastName,email,phone,img:photo?photo:userData.img,
                addresses:addresses?addresses:userData.addresses
            }
         }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!validateObjectId(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    if (!validateObjectId(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(parseInt(query)) : await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getUserStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
