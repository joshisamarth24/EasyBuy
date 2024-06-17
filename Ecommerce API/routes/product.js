import Router from "express";
import { verifyTokenAndAdmin } from "./verifyToken.js";
import { addNewProduct, deleteProduct, getAllProducts, getProduct, searchProducts, updateProduct } from "../controllers/productController.js";

const router = Router();

router.post('/addNewProduct/:categoryId',addNewProduct);
router.put('/:id',verifyTokenAndAdmin,updateProduct);
router.delete('/:id',verifyTokenAndAdmin,deleteProduct);
router.get('/find/:id',getProduct);
router.get('/allProducts',getAllProducts);
router.get('/search',searchProducts)




export default router;