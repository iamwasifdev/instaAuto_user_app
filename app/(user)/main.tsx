import Map from "@/components/composition/Map";

import ErrorBox from "@/components/ui/errorBox";
import { useEffect, useRef } from "react";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import { Pressable, View } from "react-native";

import Button from "@/components/ui/button";
import { useDataContext } from "@/context/dataContext";
import { useGeoLocation } from "@/context/geoLocationContext";
import useDriverMarkerOnClick from "@/hooks/useDriverMarkerOnClick";
import useSendPing from "@/hooks/useSendPing";
import { router } from "expo-router";
import { Search } from "lucide-react-native";

export default function Home() {
  const MapRef = useRef<MapView>(null);

  const { hardDebouncedMutate, error: sendPingError, used:PingSended} = useSendPing();
  const { location } = useGeoLocation();
  const { selectedStop, error, filteredDrivers, phase ,setPhase} = useDataContext();
  const {
    route,
    error: routeError,
    setDriverId,
  } = useDriverMarkerOnClick(filteredDrivers);

  useEffect(() => {
    if (!location) {
      console.log("DID not got the location that i why it did  not zoom")
      return;
    }

    setTimeout(()=>{

    MapRef.current?.animateToRegion(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01, // How much map shows vertically
        longitudeDelta: 0.011,
      },
      1500,
    );
    },20)

  }, [location]); //Remember it will keep runig this animation whenever loction change

  console.log("Route: ", route);

  console.log("selectedStop: ",selectedStop)
  return (
    <SafeAreaView className="h-full  flex-1">
      <View className="h-full w-full relative">
        <View className="absolute z-50 bottom-0 right-0 left-0 items-center   ">
          {/* this about a new way to do this */}

          <View className=" justify-center  items-center px-4">
            <ErrorBox
              text={[error, routeError, sendPingError].join(
                error && routeError || sendPingError ? "line" : "",
              )}
            />
          </View>
        </View>

        <View className="absolute z-40 bottom-0 right-0 left-0 items-center   ">
          {phase === "NOTCONFIRMED" && location && selectedStop && (
            <View className=" w-[100%] h-[100%] justify-center  items-center  ">
              <View className=" w-[100%] h-[100%] flex-row justify-center items-end  py-2 px-4 gap-3">
                <Button
                  text="Cancel ride"
                  type="danger"
                  disabled={PingSended}
                  loading={false}
                  size="sm"
                  onClick={() => {setPhase("IDLE")}}
                />
                <Button
                  text="Want a RIDE"
                  type="primary"
                  disabled={PingSended}
                  loading={false}
                  size="md"
                  onClick={() => {
                    hardDebouncedMutate({
                      destinationStopId: selectedStop._id as string,
                      pickupLng: location.coords.longitude,
                      pickupLat: location.coords.latitude,
                    });
                  }}
                />
              </View>
            </View>
          )}
        </View>
        <View className="absolute z-50 top-0 left-0 justify-center items-center ml-4">
          {phase === "IDLE" && (
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
          )}
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
          selectedStop={selectedStop}
        />
      </View>
    </SafeAreaView>
  );
}
