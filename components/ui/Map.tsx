import { driverMarker, routeType } from "@/ts";
import { View } from "react-native";
import MapView, { type MapViewProps } from "react-native-maps";
import AnimatedMarker from "./AnimatedMarker";
import { useMemo } from "react";
import getCoordinates from "@/utils/getCoordinates";
import Route from "./Route";



interface MapType extends MapViewProps {
  markers: driverMarker[];
  onMarkerClick: (dirverId: string) => void;
  route: routeType|undefined;
  ref: React.RefObject<MapView | null>;
}

export default function Map({
  markers,
  onMarkerClick,
  route,
  ...rest
}: MapType) {
  
  const routeCoordinates=useMemo(()=>{
    if(!route){

      return undefined

    }
    console.log("\n \n \n inside use memo",route)
    return getCoordinates(route)
  },[route])

  return (
    <View className="h-full w-full bg-green-600 flex-1">
      <MapView
        style={{ flex: 1 }}
        {...rest}
        showsUserLocation={true}
        userLocationPriority="balanced" // Try this first!
      >
        {markers.map((marker) => {
          return (
            <AnimatedMarker
              key={marker.driverId}
              lng={marker.lng}
              lat={marker.lat}
              text={marker.name}
              id={marker.driverId}
              onClick={onMarkerClick}
            />
          );
        })}

       {routeCoordinates? <Route coordinates={routeCoordinates?.coordinates} />:null}

        

        
      </MapView>
    </View>
  );
}
