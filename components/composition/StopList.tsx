
//this is an compositon layer In this composition layer we are going to compose the two components and first of all icon input and List 
// But the other way to do also

import { Search} from "lucide-react-native";
import IconInput from "../ui/IconInput";
import { useState } from "react";
import List from "../ui/List";
import { MapPin } from "lucide-react-native";
import { View } from "react-native";



export default function StopList({onStopClick}:{onStopClick:(stopName:string,id:string)=>void}){

     const [searchState,setSearchState]=useState("")



   return <View className="">
                <IconInput
                  label="Destination"
                  placeholder="Enter your Destination "
                  error={""}
                  size="md"
                  setValue={setSearchState}
                  value={searchState}
                  DisplayIcon={Search}
                
                />
                {
                    searchState.length >2 ?
               <View className="pr-4 pt-2 border-t-2 border-gray-500">

                 <List onClick={(data)=>{onStopClick(data.name,data.id)}} data={[{
                    name:"Hello",
                    id:"uguujji"
                }]} Icon={MapPin} />

               </View>
               :
               null
               }
               
   </View> 
}