import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import type { IJwtPayload } from "./auth.interface";
import config from "../../config";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  try {
  
    const userData = await pool.query(
      `SELECT * FROM users WHERE email = $1`, 
      [email]
    );

    const user = userData.rows[0];

   
    if (!user) {
      const error = new Error("Invalid Credentials!") as any;
      error.statusCode = 401; 
      throw error;
    }


    const matchPassword = await bcrypt.compare(password, user.password);


    if (!matchPassword) {
      const error = new Error("Invalid Credentials!") as any;
      error.statusCode = 401; 
      throw error;
    }

   
    const jwtPayload: IJwtPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

  
    const token = jwt.sign(
      jwtPayload,
      config.jwt_secret || "super_secret_jwt_key",
      { expiresIn: "1d" }
    );
<<<<<<< HEAD
const refreshToken = jwt.sign(
      jwtPayload,
      config.jwt_secret || config.jwt_secret || "super_secret_jwt_key",
      { expiresIn: "7d" }
    );
  
    return {
      token,
      refreshToken,
=======

  
    return {
      token,
>>>>>>> 8f9ce270622752d6aebd965f956ee1039b65f770
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    };

  } catch (error: any) {
    
    throw error;
  }
};

export const authService = {
  loginUserIntoDB,
};