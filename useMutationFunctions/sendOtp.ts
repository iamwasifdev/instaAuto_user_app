import 'dotenv/config'
import { api } from "@/utils/axiosIntance";
import { otpSendSuccess } from '@/ts';

export default async function  sendOtp(phoneNumber:string,countryCode:string):Promise<otpSendSuccess>{

 const res= await api.post<otpSendSuccess>("/otp/send",{
    phoneNumber,
    countryCode
 })


 return res.data

}
