import type { TUserRole } from "../users/users.interface";

export interface IJwtPayload {
    id:number;
    name:string;
    role:TUserRole;
    email:string;
}