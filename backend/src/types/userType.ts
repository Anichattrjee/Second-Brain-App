export interface UserType{
    _id:string,
    username:string,
    email:string,
    password:string,
    avatar?:string,
    isEmailVerified:boolean,
}