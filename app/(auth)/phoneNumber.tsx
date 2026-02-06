import { SafeAreaView } from "react-native-safe-area-context";



import { useState } from "react";

import "../global.css";
import { Text } from "react-native";
import Button from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import sendOtp from "@/useMutationFunctions/sendOtp";
import { otpSendSuccess } from "@/ts";

import  {  ZodError }from "zod"
import isFlattenError from "@/typeguard/isFlattenError";
import flattenErrorCustom from "@/utils/flattenErrorCustom";
import objStr from "@/utils/objStr";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import IconInput from "@/components/ui/IconInput";




export default function PhoneNumber() {
  const [inputError,setInputError]=useState<string>("")
  const [number, setNumber] = useState<string>("");

  const {mutate}=useMutation<otpSendSuccess,unknown,Record<string,string>>({
    mutationFn:(variables)=>{ return  sendOtp(variables.phoneNumber,"+91")},
    onError:(rawError)=>{

     //@ts-ignore

     let error:unknown;
    

     if(isAxiosError(rawError)){
     
      error=rawError.response?.data.error
     }


    

        if(isFlattenError(error)){

        const recordError=flattenErrorCustom(error)

        


        const finalError=objStr(recordError)

      

         setInputError(finalError)
         return;

      
      


      }

      
      if(typeof error ==="string"){

        setInputError(error)
        return;

      }

      else{
        console.log("I am amir i have ");
        
        setInputError("Something Went Wrong")
        return;
      }

    },
    onSuccess:(data)=>{


      router.replace({
        pathname:"/(auth)/otpVerify",
        params:{
          countryCode:"+91",
          phoneNumber:number

        }
      })

  

    }

  })


  return (
    <SafeAreaView className=" h-full  flex-col justify-center items-center gap-5 ">
      <IconInput
        label="Phone Number"
        placeholder="Enter your Phone Number"
        error={inputError}
        size="md"
        setValue={setNumber}
        value={number}
        displayText="+91"
      />
      

    <Button text="Get OTP" type="primary" loading={false} disabled={false} size="md" onClick={()=>{mutate({phoneNumber:number})}}/>


    </SafeAreaView>
  );
}
