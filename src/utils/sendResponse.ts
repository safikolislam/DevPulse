



interface IResponseData<T>{
    success:boolean;
    statusCode:number;
    message: string;
    data?: T;
}