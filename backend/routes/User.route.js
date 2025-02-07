
import express from "express";
import { AuthorizeAdmin,protect } from "../middlewares/authMiddleware.js";
  import CreateUser, { loginUser,logout,getAllUsers ,getUserProfile,updateUserProfile} from "../controllers/User.Controller.js";

const router = express.Router();

router.route("/").post(CreateUser) // only admin can get all users details
router.get("/",protect,AuthorizeAdmin,getAllUsers)
router.post("/login",loginUser);
router.post("/logout",logout)
router.get('/profile',protect,getUserProfile)
router.put("/profile",protect,updateUserProfile)


export default router;