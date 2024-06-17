import Router from "express"
import { verifyToken, verifyTokenAndAdmin } from "./verifyToken.js";
import { addNewOrder, deleteOrder, getAllOrders, getOrderStats, getUserOrders, updateOrder } from "../controllers/orderController.js";

const router = Router();

router.post('/placeOrder',addNewOrder);
router.put('/:id',verifyTokenAndAdmin,updateOrder);
router.delete('/:id',verifyTokenAndAdmin,deleteOrder);
router.get('/:userId',verifyToken,getUserOrders);
router.get('/allOrders',verifyTokenAndAdmin,getAllOrders);
router.get('/orderStats',verifyTokenAndAdmin,getOrderStats);



export default router;