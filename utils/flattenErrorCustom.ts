import {ZodFlattenedError} from "zod"

export default function flattenErrorCustom(error:ZodFlattenedError<unknown>){

    let finishedError:Record<string,string>={};
    
    

    if(error.formErrors&& Array.isArray(error.formErrors)&&error.formErrors.length>0){

        

        finishedError["formErrors"]=error.formErrors[0]

    }


    if(error.fieldErrors){

       

        Object.entries(error.fieldErrors).forEach(([key,valueArr])=>{

            if(Array.isArray(valueArr)&&valueArr.length>0){

                finishedError[key]=valueArr[0]

            }

        })

    }


    return finishedError;


}