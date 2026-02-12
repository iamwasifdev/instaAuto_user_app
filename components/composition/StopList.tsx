
//this is an compositon layer In this composition layer we are going to compose the two components and first of all icon input and List 
// But the other way to do also

import { Search} from "lucide-react-native";
import IconInput from "../ui/IconInput";
import { useMemo, useState } from "react";
import List from "../ui/List";
import { MapPin } from "lucide-react-native";
import { Text, View } from "react-native";
import useDebounce from "@/hooks/useDebounce";
import useFetchStops from "@/hooks/useFetchStops";
import { useGeoLocation } from "@/context/geoLocationContext";
import {type LocationObject } from "expo-location";
import { ListData, stopType } from "@/ts";
import LottieView from 'lottie-react-native';
import ErrorBox from "../ui/errorBox";




export default function StopList({onStopClick}:{onStopClick:(stop:stopType)=>void}){

     const [searchState,setSearchState]=useState<string>("")
     const debouncedValue=useDebounce(searchState,500)
     const {location}:{location:LocationObject}=useGeoLocation()
 
     const {data,error,rest}=useFetchStops(debouncedValue,location.coords.longitude,location.coords.latitude)
    
     function onTabPress(id:string){
     if(!data){
      return;
     }
      const stop=data.find((stop)=>{
        return stop._id ===id
      })

      if(!stop){
        return;     
      }
    onStopClick(stop)
     }

     const ListData=useMemo(()=>{
       
        if(!data){
          
            return undefined;
            
        }
        let stopsData:ListData[]=[]
        data.forEach((stop)=>{

            stopsData.push({name:stop.name,id:stop._id})

        })
        return stopsData
     },[data])

     console.log("error: ",error)
     console.log("data: ",data)
     



   return <View className="relative">
                <IconInput
                  label="Destination"
                  placeholder="Enter your Destination "
                  error={""}
                  size="md"
                  setValue={setSearchState}
                  value={searchState}
                  DisplayIcon={Search}
                
                />

                <View className="h-[70%]">


                     {
                    ListData ?
               <View className="flex pr-4 pt-2 border-t-2 border-gray-500 " style={{ gap: 8 }}
>

                 <List onClick={(data)=>{onTabPress(data)}} data={ListData} Icon={MapPin} />

               </View>
               :
               null
               }

                <View className="mr-2 justify-center items-center ">

                {
                    error?.statusCode===404 
                    &&
                     <View>
                      <LottieView style={{width:200,height:200}}  source={require("../../assets/lottie/notFoundError404.json")}  autoPlay />  
                      <ErrorBox text={"Could not Find the Location"} size="medium"/>
                      
                 </View>



                    
                }

                {

                  rest.isLoading
                  ?
                     
                   <LottieView style={{width:200,height:200}}  source={require("../../assets/lottie/loading.json")}  autoPlay />  

                  

                   
                  :
                  null
                  
                }

                {
                  error&& error.statusCode !==404

                  &&
                   

                    <ErrorBox text={error.error as string} size="medium"/>
                  
                  
                }

                </View>

                    



                </View>
               

               <View className="absolute right-0 left-0 bottom-[30%]">

               


               </View>

               
               
   </View> 
}