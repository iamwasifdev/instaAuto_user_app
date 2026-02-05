


// - phase: 'IDLE' | 'CONFIRM' | 'NOTCONFIRMED'
// - drivers: Record<string, Driver> (The Dictionary)
// - selectedStop: Stop | null
// - allowedRoutes: Record<string, boolean> (Filter list)

import useDriverMoved from "@/hooks/webSocket";
import { driveMovedType, stopType } from "@/ts";
import { createContext, use, useContext, useMemo, useState } from "react";
import { useGeoLocation } from "./geoLocationContext";

const dataContext=createContext<any>(null)

export type phaseType="IDLE" | "CONFIRM" | "NOTCONFIRMED"

export function useDataContext(){
    return useContext(dataContext)
}

export function  DataContextProvider({children}:any){

    const [phase,setPhase]=useState<phaseType>("IDLE")
    const [selectedStop,setSelectedStop]=useState<stopType>()
    const [allowedRoutes,setAllowedRoutes]=useState<Record<string,boolean>>()
    const {location}=useGeoLocation()
    const {drivers,error}=useDriverMoved(location)


     const filteredDrivers=useMemo(()=>{
     const driverKeys=Object.keys(drivers)
            if(driverKeys.length ===0){
                return []
            }
        if(!allowedRoutes){

            return driverKeys.map((key)=>{
                return drivers[key]
            })

            }
            //these are actually the ids 
           
            let filtered:driveMovedType[]=[] 

           driverKeys.forEach((key)=>{

                if(allowedRoutes[drivers[key].routeId]){
                    filtered.push(drivers[key]) 
                    return;
                }

            })

            return filtered
        
     },[drivers,allowedRoutes])





    return <dataContext.Provider value={{error,filteredDrivers,selectedStop,setSelectedStop,setAllowedRoutes,phase,setPhase}}>

        {children}

    </dataContext.Provider>

}
