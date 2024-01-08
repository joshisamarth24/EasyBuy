import Router from "express"
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./verifyToken.js";
import { addNewOrder, deleteOrder, getAllOrders, getOrderStats, getUserOrders, updateOrder } from "../controllers/orderController.js";

const router = Router();

router.post('/add',addNewOrder);
router.put('/:id',verifyTokenAndAdmin,updateOrder);
router.delete('/:id',verifyTokenAndAdmin,deleteOrder);
router.get('/:userId',verifyTokenAndAuthorization,getUserOrders);
router.get('/',verifyTokenAndAdmin,getAllOrders);
router.get('/income',verifyTokenAndAdmin,getOrderStats);



export default router;