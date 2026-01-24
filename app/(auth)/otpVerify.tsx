
import {Text, View} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { OTPInput } from "@/components/ui/otpNew"
import { useEffect, useState } from "react"
import Button from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import ErrorBox from "@/components/ui/errorBox"
import { router, useLocalSearchParams } from "expo-router"
import verifyOtp from "@/useMutationFunctions/verifyOtp"
import { otpVerifySuccess } from "@/ts"
import { isAxiosError } from "axios"
import isFlattenError from "@/typeguard/isFlattenError"
import flattenErrorCustom from "@/utils/flattenErrorCustom"
import objStr from "@/utils/objStr"
import { useAuth } from "@/context/authContext"








export default function OtpVerify() {
  const [code, setCode] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [error,setError]=useState("")
  const [time,setTime]=useState(60)
  const [isReturn,setIsReturn]=useState(false)
  const [tries,setTries]=useState(2)
  const {setProfile,login}=useAuth()
  const  {phoneNumber,countryCode}=useLocalSearchParams<{
  phoneNumber: string;
  countryCode: string;
}>()
  // Remove the incomplete line or add what you need



  useEffect(()=>{

    if(time<=0 ){
      
        setIsReturn(true)
  
    return;
    }

   


  },[time])


  const {mutate}=useMutation<otpVerifySuccess,unknown,{otp:string}>({
    mutationFn:(variables)=>verifyOtp(phoneNumber as string,countryCode,variables.otp),
     onError:(rawError)=>{
         
    
         //@ts-ignore
    
         let error:unknown;

          
    
        
    
         if(isAxiosError(rawError)){
         
          error=rawError.response?.data.error



           if("type"in rawError.response?.data){
                

        if(rawError.response?.data.type==="wrong"){

        
            
                    
                //normal tries<=0 was not working so i did this
                        if(tries <0 || tries===0){

                        
                           
                            setIsReturn(true)
                            return;
                        }else{
                            setTries(prev=>prev-1)
                        }

                }


            }
         }


          

     
    
    
        
    
            if(isFlattenError(error)){
    
             
    
    
            const recordError=flattenErrorCustom(error)
       

            console.log()

         
            
    
    
    
    
    
    
            const finalError=objStr(recordError)
    
          
    
             setError(finalError)
             return;
    
          
          
    
    
          }
    
          
          if(typeof error ==="string"){
    
            setError(error)
            return;
    
          }
    
          else{
         
            
            setError("Something Went Wrong")
            return;
          }
    
        },

    onSuccess:(data)=>{


        if(!data.newUser){

            setProfile(data.userData)
            login(data.token)
            router.replace("/(user)/main")
            return;

        }


        router.replace({
            pathname:"/(auth)/signup",
            params:{
                countryCode,
                phoneNumber,
                token: data.token
            }
        })





    }
  })


  useEffect(()=>{
    if(isReturn){
        router.replace("/(auth)/phoneNumber")
    }
  },[isReturn])


  useEffect(()=>{
    const timer =setInterval(()=>{
        setTime(prev=>prev-1)
    },1000)

    return ()=>{
        clearInterval(timer)
    }
  },[])


  



  return (
    <SafeAreaView className=" flex h-full justify-center items-center gap-5">

        {/* <ErrorBox text={error} size={"medium"} /> */}


     <View className="items-start justify-start bg-red"><Text>time:{time}</Text></View>
      <OTPInput code={code} setCode={setCode} setIsPinReady={setIsReady} />

     

      <Text className="text-red-600">{error}</Text>


      <Button text="Send OTP" type="primary" disabled={!isReady} size="md" onClick={()=>{mutate({otp:code})}} loading={false}/>
    </SafeAreaView>


  );
}