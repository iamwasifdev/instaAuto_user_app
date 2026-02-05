import isFlattenError from "@/typeguard/isFlattenError";
import { isAxiosError } from "axios";
import flattenErrorCustom from "./flattenErrorCustom";
import objStr from "./objStr";



export default function gotError(rawError: unknown, mode: "str" | "obj") {

  if (!isAxiosError(rawError)) {
    return ({
      type: "unexpected",
      error: "Something went wrong"
    })
  }
  let error: unknown = rawError.response?.data.error


  if (isFlattenError(error)) {

    const recordError = flattenErrorCustom(error)

    if (mode === "str") {
      const finalError = objStr(recordError)
      return ({
        type: "axiosstr",
        error: finalError

      })

    }

    return ({
      type: "axiosobj",
      error: recordError

    })



  }

  if (typeof error === "string") {


    return({
      type:"customerrorstr",
      error:error
    })

  }

  else {



    return ({
      type: "unexpected",
      error: "Something went wrong"
    })
  }



}