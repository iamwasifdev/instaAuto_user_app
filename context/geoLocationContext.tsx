import { createContext, useContext, useEffect, useState } from "react";
import { AppState } from "react-native";

import * as Location from "expo-location"
import getLocation from "@/utils/getLocation";


export const geoLocationContext=createContext<any>(null)

export function useGeoLocation(){
    return useContext(geoLocationContext)
}

export default function GeoLocationProvider({children}:any){
    //the flicketring problem comes rom here
    const [geoStatus,setGeoStatus]=useState(false)
    const [location,setLocation]=useState<Location.LocationObject>()

   async function checkPermissions(){
        const{status}= await Location.getForegroundPermissionsAsync()
        if(status==="granted"){

          

       
           const location=await getLocation()

          if(!location){
            setGeoStatus(false)
            return
          }

        else{
            setLocation(location)
            setGeoStatus(true)
        }
    }
}


    useEffect(()=>{
        AppState.addEventListener("change",(currentAppState)=>{

            if(currentAppState==="active"){

             

            }

        })
    },[])

async  function retryPermissions(){
  await Location.requestForegroundPermissionsAsync() 
  await      checkPermissions()
    }
async function newLocation() {

   await checkPermissions()

   return location
        
    }


    return <geoLocationContext.Provider value={{geoStatus,retryPermissions,location,newLocation}}>{children}</geoLocationContext.Provider>
}