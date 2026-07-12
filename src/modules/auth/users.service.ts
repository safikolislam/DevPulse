import { pool } from "../../db";
import type { IUser, TUserResponseData } from "./users.interface";
import bcrypt from "bcrypt"

const createUserIntoDB = async (userData: IUser): Promise<TUserResponseData> => {
  const { name, email, password, role } = userData;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  
  const query = `
    INSERT INTO users(name, email, password, role)
    VALUES($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at, updated_at;
  `;

  const values = [name, email, hashedPassword, role || 'contributor']
  const result = await pool.query(query, values);
  return result.rows[0]
}

export const UsersService = {
  createUserIntoDB
}