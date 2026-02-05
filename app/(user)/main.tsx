import WebSocketService from "@/class/WebSocketService";
import Map from "@/components/ui/Map";
import { useAuth } from "@/context/authContext";
import { driveMovedType, joinGrid, MarkerType } from "@/ts";
import getLocation from "@/utils/getLocation";
import * as Location from "expo-location";
import { useEffect, useMemo, useRef, useState } from "react";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import ErrorBox from "@/components/ui/errorBox";



import { Text, View } from "react-native";
import useDriverMoved from "@/hooks/webSocket";
import { LocationObject } from "expo-location";
import { useGeoLocation } from "@/context/geoLocationContext";
import { useDataContext } from "@/context/dataContext";
import useDriverMarkerOnClick from "@/hooks/useDriverMarkerOnClick";

export default function Home() {
  const MapRef = useRef<MapView>(null);

  
 
 const {location}=useGeoLocation()
const {error,filteredDrivers}=useDataContext()
const {route,error:routeError,setDriverId}=useDriverMarkerOnClick(filteredDrivers)

  useEffect(() => {
  
      if(!location){
        return;
      }
    
      MapRef.current?.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01, // How much map shows vertically
          longitudeDelta: 0.011,
        },
        1500,
      );
  
  }, []);


//   useEffect(() => {
    

//     async function Send() {
//       const socket =io("ws://192.168.29.251:5000")
//       socket.emit("join_grid",{
//     lng:74.8181119,
//     lat:34.1184729,
//     id:"jyfghudhuhfu",
//     type:"user"
// })
//       socket.on("driver_moved",(data)=>{
//         console.log("driver moved from the the io in the component",data)
//       })
//       await  WebSocketService.connect();
//       const userLocation = await Location.getCurrentPositionAsync();
//    await   WebSocketService.retryEmit<joinGrid>({
//         eventName: "join_grid",
//         data: {
//           lng: userLocation.coords.longitude,
//           lat: userLocation.coords.latitude,
//           id:user.id,
//           type:"user"

//         },
//       },{
//         key:"success",
//         value:true

//       },5,()=>{setFailure("Something went wrong.Please reopen the app")},(res)=>{console.log("joined the grid ")});

//       WebSocketService.on<string>("driver_moved",(data)=>{
//         console.log("data :",data)
//       })

//       WebSocketService.default()

       
//     }
//     Send()

//     return ()=>{
//       WebSocketService.closeAll()
//     }
//   }, []);



console.log("Route: ",route)

  return (
    <SafeAreaView className="h-full  flex-1">
      <View className="h-full w-full relative">
        <View className="absolute z-50 top-0 right-0 left-0 justify-center items-center  ">
          {/* this about a new way to do this */}
           <ErrorBox text={[error,routeError].join(error && routeError?"\n":"")}/>
        </View>
        <Map
        ref={MapRef}
        markers={filteredDrivers}
        onMarkerClick={(driverId) => {setDriverId(driverId) 
          console.log("Clicked Me:",driverId)
        }}
        rotateEnabled={false}
        route={route}
      />

      </View>
      
    </SafeAreaView>
  );
}
