import Map from "@/components/ui/Map";
import { MarkerType } from "@/ts";
import getLocation from "@/utils/getLocation";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps"

export default function Home() {

    const MapRef=useRef<MapView>(null)
  const [regionLocation, setRegionLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  useEffect(() => {
    getLocation().then((data) => {
      setRegionLocation({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });

      console.log("i got here "+regionLocation)

      MapRef.current?.animateToRegion({
    latitude: data.coords.latitude,
     longitude:data.coords.longitude,
     latitudeDelta: 0.01,    // How much map shows vertically
    longitudeDelta: 0.011, 
  },1500)
    });
  }, []);

  

  return (
    <SafeAreaView className="h-full bg-red-500 flex-1">
      <Map

        ref={MapRef}
        markers={[] as MarkerType}
        markerOnCLick={() => {}}
        rotateEnabled={false}
        route={"hello"}
    
      />
    </SafeAreaView>
  );
}
