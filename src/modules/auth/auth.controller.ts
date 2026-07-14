

import sendResponse from "../../utils/sendResponse";
import type { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
  
    const result = await authService.loginUserIntoDB(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful!",
      data: result,
    });
  } catch (error: any) {
  
   next(error);
    
    }
};

export const authController = {
  loginUser,
};