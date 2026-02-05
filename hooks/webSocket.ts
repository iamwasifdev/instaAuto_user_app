import { type  LocationObject } from "expo-location";
import WebSocketService from "@/class/WebSocketService";
import { useAuth } from "@/context/authContext";
import { driveMovedType,  joinGrid } from "@/ts";


import { useEffect,  useState } from "react";


export  default  function useDriverMoved (location:LocationObject|undefined){


    const [drivers,setDrivers]=useState<Record<string,driveMovedType>>({})
    const [error,setError]=useState("")
    const {user}=useAuth()


    useEffect(()=>{
       async function initialize(){
        if(!location){
          return;
        }

        
  
    await WebSocketService.connect();
    await WebSocketService.retryEmit<joinGrid>(
           {
             eventName: "join_grid",
             data: {
               lng: location.coords.longitude,
               lat: location.coords.latitude,
               id: user.id,
               type: "user"
             },
           },
           {
             key: "success",
             value: true
           },
           5,
           () => {
             setError("Something went wrong. Please reopen the app");
           },
           (res) => {
             console.log("✅ Joined the grid:");
           }
         );
     WebSocketService.on<driveMovedType>("driver_moved",async (data) => {

      setDrivers(drivers=>({...drivers,[data.driverId]:data}))

          });
     

         





       }
       initialize()
        

       return ()=>{
            WebSocketService.closeAll()
          }

    },[location,user])



    return  {drivers,error}

    





}