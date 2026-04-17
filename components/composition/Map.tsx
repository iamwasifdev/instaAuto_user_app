import { driverMarker, routeType, stopType } from "@/ts";
import getCoordinates from "@/utils/getCoordinates";
import { MapPin, Pin } from "lucide-react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { View, Text } from "react-native";
import MapView, { type MapViewProps } from "react-native-maps";
import AnimatedMarker from "../ui/AnimatedMarker";
import IconMarker from "../ui/IconMarker";
import Route from "../ui/Route";
import { Callout, Marker } from "react-native-maps";
interface MapType extends MapViewProps {
  markers: driverMarker[];
  onMarkerClick: (dirverId: string) => void;
  route: routeType | undefined;
  ref: React.RefObject<MapView | null>;
  selectedStop: stopType | undefined;
}

export default function Map({
  markers,
  onMarkerClick,
  route,
  selectedStop,
  ref,
  ...rest
}: MapType) {
  const selectedStopRef = useRef<React.ComponentRef<typeof Marker>>(null);
  const routeCoordinates = useMemo(() => {
    if (!route) {
      return undefined;
    }

    return getCoordinates(route);
  }, [route]);

  useEffect(() => {
    if (!selectedStop) {
      return;
    }

    setTimeout(() => {
      selectedStopRef.current?.showCallout();

      console.log("This is after the showCallout  was called");
    }, 500);
  }, [selectedStop]);

  return (
    <View className="h-full w-full bg-green-600 flex-1">
      <MapView
        style={{ flex: 1 }}
        ref={ref}
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

        {routeCoordinates ? (
          <>
            <Route coordinates={routeCoordinates?.coordinates} />

            {routeCoordinates.stopsGiven.map((stop) => {
              //for the exception so it should not overlap
              if (selectedStop?._id === stop.id) {
                return null;
              }
              return (
                <IconMarker
                  key={`${stop.id}`}
                  lng={stop.longitude}
                  lat={stop.latitude}
                  LucideIcon={MapPin}
                  text={stop.name}
                />
              );
            })}
          </>
        ) : null}

        {selectedStop ? (
          <Marker
            style={{
              justifyContent:"center",

              alignItems:"center",
              paddingLeft:5,
                }}
            ref={selectedStopRef}
            coordinate={{
              latitude: selectedStop.location.coordinates[1],
              longitude: selectedStop.location.coordinates[0],
            }}
            title="Your Destination"
            description={`${selectedStop.name}`}
           
          >
            <Callout> <Text>This is not your destination</Text>
            </Callout>
            <Pin />
          </Marker>
        ) : null}
      </MapView>
    </View>
  );
}
