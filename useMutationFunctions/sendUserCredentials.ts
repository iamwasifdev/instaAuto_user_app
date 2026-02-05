



import { api } from "@/utils/axiosIntance";
import { sendUserCredentialsType } from '@/ts';

export default async function (phoneNumber:string,countryCode:string,name:string,password:string,token:string):Promise<sendUserCredentialsType>{


 const res= await api.post<sendUserCredentialsType>("/auth/user/register",{
    phoneNumber,
    countryCode,
    name,
    password
 },{
    headers:{
        "Authorization":`Bearer ${token}`
    }
 })







 return res.data

}
