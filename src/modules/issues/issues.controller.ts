import type { NextFunction, Request, Response } from "express";
import { createIssueIntoDB, deleteIssueFromDB, getAllIssueFromDB, getSingleIssueFromDB, updateIssueIntoDB } from "./issues.service";


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

const getAllIssues = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sort, type, status } = req.query;

    const result = await getAllIssueFromDB({
      sort: sort as string,
      type: type as string,
      status: status as string,
    });

    res.status(200).json({
      success: true,
      message: "Issues retrived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};



const getSingleIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const result = await getSingleIssueFromDB(id);

    res.status(200).json({
      success: true,
      message: "Issue retrived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const updateIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { title, description, type } = req.body;
    const requestUser = (req as any).user;

    const result = await updateIssueIntoDB(
      id,
      { title, description, type },
      requestUser
    );

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const deleteIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const requestUser = (req as any).user;

    await deleteIssueFromDB(id, requestUser);

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};



export const issueController = {
    createIssue,
  
    getAllIssues,

    getSingleIssue,

    updateIssue,

    deleteIssue
}