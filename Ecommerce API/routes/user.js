import Router from "express"
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./verifyToken.js";
import { deleteUser, getAllUsers, getUser, getUserStats, updateUser } from "../controllers/userController.js";


const router = Router();

router.put('/:id',verifyTokenAndAuthorization,updateUser);
router.delete('/:id',verifyTokenAndAuthorization,deleteUser);
router.get('/find/:id',verifyTokenAndAdmin,getUser);
router.get('/',verifyTokenAndAdmin,getAllUsers);
router.get('/stats',verifyTokenAndAdmin,getUserStats);


export default router;