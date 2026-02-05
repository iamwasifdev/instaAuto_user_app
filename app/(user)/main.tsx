import WebSocketService from "@/class/WebSocketService";
import Map from "@/components/ui/Map";
import { useAuth } from "@/context/authContext";

import getLocation from "@/utils/getLocation";

import { useEffect,  useRef, } from "react";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import ErrorBox from "@/components/ui/errorBox";



import {  View } from "react-native";

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
