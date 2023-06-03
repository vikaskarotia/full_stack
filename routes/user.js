import express  from "express";

import { register ,login, getMyprofile, logout} from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router=express.Router();



router.post("/login",login);
router.post("/new",register); 
router.get("/me", isAuthenticated,getMyprofile); 
router.get("/logout",isAuthenticated,logout);


export default router;