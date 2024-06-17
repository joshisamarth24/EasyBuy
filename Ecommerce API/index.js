import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config'
import authRoute from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js"
import paymentRoutes from "./routes/stripe.js"
import orderRoutes from "./routes/order.js"
import cartRoutes from "./routes/cart.js"
import categoryRoutes from "./routes/category.js"

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
 mongoose.connect("mongodb+srv://Samarth:Samarth24@cluster0.zge8cgf.mongodb.net/").then(()=>{
    console.log("connected");
 })

app.use('/api/auth',authRoute);
app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/checkout',paymentRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/category',categoryRoutes);


app.listen(5000,()=>{
    console.log("server started");
})