import { useGeoLocation } from "@/context/geoLocationContext";
import { getForegroundPermissionsAsync } from "expo-location";
import { useEffect } from "react";
import { View ,Text} from "react-native";







export default function LocationAccessDenied(){
    const {retryPermissions}=useGeoLocation()


    useEffect(()=>{

       async function send(){

       await  retryPermissions()
      

       }

       send()
       
    },[])

    
    return <View className={"h-full justify-center items-center"}>


        <Text className="text-2xl text-slate-900">PLease give us Permsision so we can help you find a ride</Text>



    </View>
}
