import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async(req,res) =>{
    const {username,email,address,phone,password,profilePicture} = req.body;
   
    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            deliveryAddress: address,
            phoneNumber: phone,
            profilePicture: profilePicture,
        });
        res.status(201).json({ message: "user registered successfully",newUser });

    } catch(error) {
        console.log(error)
        res.status(500).json(error);
    }
}


    export const userLogin = async (req, res) => {
    const { username, password } = req.body;
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
            "secret",
            { expiresIn: "7d" }
        );
        res.status(200).json({ token, message: "Login Successful", existingUser });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const decoded = await promisify(jwt.verify)(refreshToken, "refreshSecret");
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            "secret",
            { expiresIn: "3h" }
        );
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
