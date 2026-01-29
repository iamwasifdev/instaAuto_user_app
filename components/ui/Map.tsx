import { MarkerType } from "@/ts"
import { View } from "react-native"
import MapView,{type MapViewProps} from "react-native-maps" 



interface MapType extends  MapViewProps {

    markers:MarkerType[],
    markerOnCLick:(data:MarkerType)=>void,
    route:any,
    ref:React.RefObject<MapView | null>

}




export default function Map ({markers,markerOnCLick,route, ...rest}:MapType){


   return <View className="h-full w-full bg-green-600 flex-1">
        <MapView style={{flex: 1}} {...rest}  showsUserLocation={true}
  userLocationPriority="balanced" // Try this first!
  
  
  >


    
  </MapView>
    </View>

} 