import Router from "express";
import { verifyTokenAndAdmin } from "./verifyToken.js";
import { addNewProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/productController.js";

const router = Router();

router.post('/',verifyTokenAndAdmin,addNewProduct);
router.put('/:id',verifyTokenAndAdmin,updateProduct);
router.delete('/:id',verifyTokenAndAdmin,deleteProduct);
router.get('/find/:id',getProduct);
router.get('/',getAllProducts);




export default router;