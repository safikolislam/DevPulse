import type { NextFunction, Request, Response } from "express";
import { createIssueIntoDB } from "./issues.service";


const createIssue = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
    const {title,description,type} = req.body
      const reporterId = (req as any).user?.id;

      const issuePayload = {
        title,
        description,
        type,
        reporter_id:reporterId
      };
      const result = await createIssueIntoDB(issuePayload)
    res.status(201).json({
        success:true,
        message:"Issue created successfully",
        data:result,
    })
      
    }
    catch(error){
        next(error)
    }
}


export const issueController = {
    createIssue,
}