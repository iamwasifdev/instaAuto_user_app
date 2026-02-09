import Map from "@/components/composition/Map";

import ErrorBox from "@/components/ui/errorBox";
import { useEffect, useRef } from "react";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import { Pressable, View } from "react-native";

import { useDataContext } from "@/context/dataContext";
import { useGeoLocation } from "@/context/geoLocationContext";
import useDriverMarkerOnClick from "@/hooks/useDriverMarkerOnClick";
import { router } from "expo-router";
import { Search } from "lucide-react-native";

export default function Home() {
  const MapRef = useRef<MapView>(null);

  const { location } = useGeoLocation();
  const { error, filteredDrivers } = useDataContext();
  const {
    route,
    error: routeError,
    setDriverId,
  } = useDriverMarkerOnClick(filteredDrivers);

  useEffect(() => {
    if (!location) {
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

  console.log("Route: ", route);

  return (
    <SafeAreaView className="h-full  flex-1">
      <View className="h-full w-full relative">
        <View className="absolute z-50 bottom-0 right-0 left-0 justify-center items-center  ">
          {/* this about a new way to do this */}
          <ErrorBox
            text={[error, routeError].join(error && routeError ? "\n" : "")}
          />
        </View>

        <View className="absolute z-50 top-0 left-0 justify-center items-center ml-4">
          <Pressable
            onPress={() => {
              router.replace("/(user)/StopSearch");
            }}
            className="active:opacity-20"
          >
            <View className="p-1 border-2 rounded-md ">
              <Search size={28} />
            </View>
          </Pressable>
        </View>

        <Map
          zoomTapEnabled={false}
          ref={MapRef}
          markers={filteredDrivers}
          onMarkerClick={(driverId) => {
            setDriverId(driverId);
            console.log("Clicked Me:", driverId);
          }}
          rotateEnabled={false}
          route={route}
          //remember android only
          onDoublePress={() => {
            setDriverId(null);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
