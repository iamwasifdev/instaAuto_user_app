
import { api } from "@/utils/axiosIntance";
import {otpVerifySuccess } from '@/ts';

export default async function  verifyOtp(phoneNumber:string,countryCode:string,otp:string):Promise<otpVerifySuccess>{

 const res= await api.post<otpVerifySuccess>("/auth/otp/verify",{
    phoneNumber,
    countryCode,
    otp
 })







 return res.data

}
