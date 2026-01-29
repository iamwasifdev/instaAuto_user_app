import Button from "@/components/ui/button";
import ErrorBox from "@/components/ui/errorBox";
import Input from "@/components/ui/input";
import { useAuth } from "@/context/authContext";
import { sendUserCredentialsType } from "@/ts";
import isFlattenError from "@/typeguard/isFlattenError";
import sendUserCredentials from "@/useMutationFunctions/sendUserCredentials";
import flattenErrorCustom from "@/utils/flattenErrorCustom";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Signup() {
    const {login,setProfile}=useAuth()
  const [reset, setReset] = useState(false);

  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const [errorR, setError] = useState<Record<string, string>>({
    mainError: "",
    formErrors: "",
    name: "",
    password: "",
  });

  const { countryCode, phoneNumber, token } = useLocalSearchParams<{
    countryCode: string;
    phoneNumber: string;
    token: string;
  }>();

  useEffect(() => {
    if (reset) {
      setError({
        mainError: "",
        formErrors: "",
        name: "",
        password: "",
      });

      setReset(false);
    }
  }, [reset]);

  const { mutate } = useMutation<
    sendUserCredentialsType,
    unknown,
    Record<string, string>
  >({
    mutationFn: (variables) => {
      return sendUserCredentials(
        variables.phoneNumber,
        variables.countryCode,
        variables.name,
        variables.password,
        variables.token,
      );
    },
    onError: (rawError) => {
      console.log("i amir i buildifferent");

      let error: unknown;

      if (isAxiosError(rawError)) {
        error = rawError.response?.data.error;

       

        if (isFlattenError(error)) {
          const recordError = flattenErrorCustom(error);

          console.log(recordError);

          setError((prev) => ({ ...prev, ...recordError }));
          console.log("this is state error",errorR)
          return;
        }

        if (typeof error === "string") {
          setError((prev) => ({ ...prev, mainError: error as string }));
          return;
        } else {
          setError((prev) => ({ ...prev, mainError: "Something went wrong" }));
          return;
        }
      } else {
        setError((prev) => ({ ...prev, mainError: "Something went wrong" }));
        return;
      }
    },
    onSuccess:(data)=>{

        console.log("successs")

        login(data.token)
        setProfile({
            name:data.name,
            phoneNumber:data.phoneNumber,
            countryCode:data.countryCode
        })

       router.replace({
        pathname:"/(user)/main",
      })

    
        
    }
  });

  return (
    <SafeAreaView className=" h-full items-center">
      <ErrorBox text={errorR.mainError} />

      <Input
        label="Name"
        placeholder="Enter your name"
        error={errorR.name}
        size="md"
        onChangeCus={(text) => {
          setUser((prev) =>({ ...prev, name: text}) );
        }}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        error={errorR.password}
        size="md"
        onChangeCus={(text) => {
          setUser((prev) => ({ ...prev, password: text }));
        }}
      />

      <Button
        text={"Create Account"}
        type={"primary"}
        disabled={false}
        loading={false}
        size="md"
        onClick={() => {
          setReset(true);

          mutate({
            phoneNumber,
            token,
            countryCode,
            name: user.name,
            password: user.password,
          });
        }}
      />
    </SafeAreaView>
  );
}
