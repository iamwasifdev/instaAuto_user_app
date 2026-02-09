import IconInput from "@/components/ui/IconInput";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Pin, Search } from "lucide-react-native";
import Line from "@/components/ui/line";
import IconDisplay from "@/components/ui/iconDisplay";
import StopList from "@/components/composition/StopList";

export default function StopSearch(){

    const [searchState,setSearchState]=useState("")

    

    return <SafeAreaView  className="pl-4">

        
                <IconDisplay label="Pickup Location" size="md" value="Your Current Location" DisplayIcon={Pin} />
                <View className="ml-5 pt-2">
                    <Line length={40} className="rounded-sm"/>
                </View>
                
                <StopList onStopClick={(stopName:string,id:string)=>{}}/>
                
               
    </SafeAreaView>
}