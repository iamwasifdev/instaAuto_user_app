import { useDataContext } from "@/context/dataContext";
import { driveMovedType, routeType } from "@/ts";
import getRouteData from "@/useQueyFunctions/getRouteData";
import gotError from "@/utils/error";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";



export default function useDriverMarkerOnClick(filteredDrivers:driveMovedType[]){
    const [driverId,setDriverId]=useState<string|null>(null)
    const [error,setError]=useState<string>("")
   
    const routeId=useMemo(()=>{
        if(!filteredDrivers|| filteredDrivers.length <=0 || !driverId){
            return;
        }

        

   const driver=filteredDrivers.filter((driver)=>{
            if(driver.driverId===driverId){
                return true;
            }else{
                return false
            }
        })

        return driver[0].routeId

    },[filteredDrivers,driverId])


    console.log("routeid:",routeId)
    
    
    const {data:route,isLoading,error:queryError}=useQuery<routeType,unknown>({
        queryKey:["routeData",routeId],
        queryFn:()=>getRouteData(routeId as string),
        enabled:!!routeId,
        
    })


    useEffect(()=>{
        if(queryError){
            console.log(queryError)
    const finalError=gotError(queryError,"str")
    setError(finalError.error as unknown as string)

   }
    },[queryError])


   


   return {route,routeId,error,isLoading,setDriverId}


}