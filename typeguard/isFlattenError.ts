import {ZodFlattenedError} from "zod"

export default function isFlattenError(error:unknown): error is ZodFlattenedError<unknown>  {

  

   if(typeof error !=="object" ||error===null){

    return false;


   }
   

   if(!("fieldErrors" in error) || !("formErrors" in error )){
     

    return  false;

   }






  

   


   return true

}