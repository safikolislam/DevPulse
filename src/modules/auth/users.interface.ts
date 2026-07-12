export type TUserRole = 'contributor' | 'maintainer';



export interface IUser {

    id?:number;
    name:string;
    email:string;
    password:string;
    role: TUserRole;
    created_at?: Date | string;
    updated_at?: Date | string;
}


export type TUserResponseData = Omit<IUser,'password'>;




export interface IJwtPayload {
    id:number;
    name:string;
    role:TUserRole;
}