import Router from "express"
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./verifyToken.js";
import { addNewCart, deleteCart, getAllCarts, getUserCart, updateCart } from "../controllers/cartController.js";

const router = Router();

router.post('/add',verifyToken,addNewCart);
router.put('/:id',verifyTokenAndAuthorization,updateCart);
router.delete('/:id',verifyTokenAndAuthorization,deleteCart);
router.get('/:userId',verifyTokenAndAuthorization,getUserCart);
router.get('/',verifyTokenAndAdmin,getAllCarts);



export default router;