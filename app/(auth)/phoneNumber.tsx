import { SafeAreaView } from "react-native-safe-area-context";


import PhoneInput from "@/components/ui/countryPhoneNumberInput";
import { useState } from "react";

import "../global.css";
import { Text } from "react-native";
import Button from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import sendOtp from "@/useMutationFunctions/sendOtp";
import { otpSendSuccess } from "@/ts";


export default function PhoneNumber() {
  const [number, setNumber] = useState<string>("");

  const mutation=useMutation<otpSendSuccess>({
    mutationFn:()=>{sendOtp(number,"+91")},
  })


  return (
    <SafeAreaView className=" h-full  flex-col justify-center items-center ">
      <PhoneInput
        label="Phone Number"
        placeholder="Enter your Phone Number"
        error=""
        size="md"
        setValue={setNumber}
        value={number}
      />

    <Text>{number}</Text>

    <Button text="Get OTP" type="primary" loading={false} disabled={false} size="md" onClick={()=>{}}/>


    </SafeAreaView>
  );
}
