import type { NextFunction, Request, Response } from "express";
import { UsersService } from "./users.service";
import sendResponse from "../../utils/sendResponse";







const registerUser = async (req: Request, res:Response, next:NextFunction) =>{
  
try{
 const UserData = req.body;

 const result = await UsersService.createUserIntoDB(UserData)
   sendResponse(res,{
    statusCode:201,
     success:true,
     message:"User registration successfully",
     data: result,
   })
}catch(error:any){
next(error)
}


}


export const UserController = {
    registerUser,
}