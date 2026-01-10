import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css"
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

import {Text, TextInputChangeEvent} from  "react-native"
import { useState } from "react";
import {OTPInput  } from "@/components/ui/otpNew";
import  PhoneInput from "@/components/ui/countryPhoneNumberInput";




 
export default function App() {

  const [show,setShow] =useState<string>("")



  return (
   <SafeAreaView className="h-[100%] items-center self-none justify-around  "> 


<PhoneInput placeholder="Enter you name" size={"md"} error="" setValue={setShow} value={show} label="Name" />


  

   
   

     <Input placeholder="Enter you name" size={"md"} error="asdfgh" onChange={(e:TextInputChangeEvent)=>{setShow(e.nativeEvent.text)}} label="Name"/>
      <Text>{show}</Text>
   
 

   


   </SafeAreaView>
  );
}