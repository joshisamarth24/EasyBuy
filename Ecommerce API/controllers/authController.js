import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";
import Cart from "../models/Cart.js";

dotenv.config();

export const registerUser = async (req, res) => {
    const { username, email, phone, password, profilePicture, firstName, lastName, role } = req.body;

    if (!username || !email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: "Username, email, firstName,lastName and password are required." });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists with this email." });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            img:profilePicture,
            role
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, isAdmin: newUser.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        const newCart = new Cart({userId: newUser._id, 
            Products: { 
                items: [] 
            }});
        await newCart.save();
        res.status(201).json({ message: "User registered successfully", token, newUser });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const userLogin = async (req, res) => {
    const { username, password } = req.body;
    

    if (!username || !password) {
        return res.status(400).json({ error: "username and password are required." });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(401).json({ error: "Wrong credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Wrong credentials" });
        }

        const token = jwt.sign(
            { id: existingUser._id, isAdmin: existingUser.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({ token, message: "Login successful", existingUser });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
