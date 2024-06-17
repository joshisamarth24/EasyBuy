import Product from "../models/Product.js";

export const addNewProduct = async (req, res) => {
    const { title, desc, img, category, size, color, price, inStock } = req.body;

    try {
        const existing = await Product.findOne({ title });
        if (existing) {
            return res.status(400).json({ error: "Product already exists" });
        }

        const newProduct = new Product({ title, desc, img, category, size, color, price, inStock });
        await newProduct.save();
        res.status(201).json({ message: "New product added successfully", newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product has been deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getAllProducts = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1).populate('category');
        } else if (qCategory) {
            products = await Product.find({ category: qCategory }).populate('category');
        } else {
            products = await Product.find().populate('category');
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const searchProducts = async (req, res) => {
    try {
      const query = req.query.query;
      if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
      }
  
      const products = await Product.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      });
  
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching search results:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
