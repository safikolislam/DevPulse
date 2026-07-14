import type { ErrorRequestHandler } from "express";

const errorHandler:ErrorRequestHandler = (err,req,res,next) =>{
const statusCode = err.statusCode || 500;

const message = err.message || "Internal Server Error";

const errors = err.errors || null;

res.status(statusCode).json({
    success:false,
    message:message,
    errors:errors,
})


}


export default errorHandler;