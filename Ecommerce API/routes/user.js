import Router from "express"
import { verifyToken, verifyTokenAndAdmin } from "./verifyToken.js";
import { deleteUser, getAllUsers, getUser, getUserStats, updateUser } from "../controllers/userController.js";


const router = Router();

router.put('/:id',verifyToken,updateUser);
router.delete('/:id',verifyToken,deleteUser);
router.get('/find/:id',verifyTokenAndAdmin,getUser);
router.get('/allUsers',verifyTokenAndAdmin,getAllUsers);
router.get('/userStats',verifyTokenAndAdmin,getUserStats);


export default router;