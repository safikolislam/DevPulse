import { Router, type Request, type Response } from "express";
import { UserController } from "./users.controller";




const router = Router()

router.post("/signup",UserController.registerUser)



export const userRoute = router