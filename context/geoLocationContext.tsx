import { createContext, useContext, useEffect, useState } from "react";
import { AppState } from "react-native";

import * as Location from "expo-location"


export const geoLocationContext=createContext<any>(null)

export function useGeoLocation(){
    return useContext(geoLocationContext)
}

export default function GeoLocationProvider({children}:any){
    //the flicketring problem comes rom here
    const [geoStatus,setGeoStatus]=useState(true)

   async function checkPermissions(){
        const{status}= await Location.getForegroundPermissionsAsync()
        if(status==="granted"){

          


           await Location.enableNetworkProviderAsync()
             

            setGeoStatus(true)

        }
        else{
            setGeoStatus(false)
        }
    }


    useEffect(()=>{
        AppState.addEventListener("change",(currentAppState)=>{

            if(currentAppState==="active"){

                checkPermissions()

            }

        })
    },[])

  async  function retryPermissions(){
  await Location.requestForegroundPermissionsAsync() 
  await      checkPermissions()
    }


    return <geoLocationContext.Provider value={{geoStatus,retryPermissions}}>{children}</geoLocationContext.Provider>
}