import Product from "../models/Product.js";

export const addNewProduct = async(req,res) => {
    const product = req.body;
    try {
        const existing = await Product.findOne(product);
        if(existing)
        {
            return res.status(500).json("product already exists");
        }
        const newProduct = await new Product(product);
        await newProduct.save();
        res.status(200).json({message:"New Product added successfully",newProduct});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}


export const updateProduct = async(req,res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
            {
                $set:req.body,
            },{new:true});
            res.status(200).json(updatedProduct);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }

}

export const deleteProduct = async(req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted successfully");
    } catch (error) {
        res.status(500).json(error);
    }
}


export const getProduct = async(req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllProducts = async(req,res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if(qNew){
            products = await Product.find().sort({createdAt:-1}).limit(1);
        }
        else if(qCategory){
            products = await Product.find({
                categories:{
                    $in:[qCategory],
                },
            });
        }
        else{
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }

}