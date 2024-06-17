import Router from "express"
import { verifyToken, verifyTokenAndAdmin} from "./verifyToken.js";
import { addNewCart, deleteCart, getAllCarts, getUserCart, updateCart } from "../controllers/cartController.js";

const router = Router();

router.post('/create',verifyToken,addNewCart);
router.put('/update/:userId',verifyToken,updateCart);
router.delete('/:id',verifyToken,deleteCart);
router.get('/:userId',verifyToken,getUserCart);
router.get('/allCarts',verifyTokenAndAdmin,getAllCarts);



export default router;