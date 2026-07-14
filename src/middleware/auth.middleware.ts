import type { NextFunction, Request, Response } from "express"
import config from "../config";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db";

const auth = () => {
 
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if(!token){
                res.status(401).json({
                    success: false,
                    messasge: "Unauthorized access!"
                });
                return;
            }

            const decoded = jwt.verify(token as string, config.jwt_secret as string) as JwtPayload;

           
            const userData = await pool.query(
                `
                SELECT * FROM users WHERE id=$1
                `,
                [decoded.id]
            );

            const user = userData.rows[0];

            if (!user) {
                res.status(401).json({
                    success: false,
                    message: "User not found or unauthorized!",
                });
                return;
            }

          
            req.user = {
                id: user.id,
                name: user.name,
                role: user.role,
            
            };

            next();
        } catch (error) {
           
            res.status(401).json({
                success: false,
                message: "Unauthorized access! Invalid or expired token."
            });
        }
    }
}

export default auth;