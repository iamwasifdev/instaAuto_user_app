import { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { type MapMarkerProps, MarkerAnimated } from "react-native-maps";

interface AnimatedMarkerType extends Omit<MapMarkerProps, "coordinate"> {
  lng: number;
  lat: number;
  text: string;
  onClick:(driverId:string)=>void;
  id:string
}

export default function AnimatedMarker({
  lng,
  lat,
  text,
  onClick,
  id,
  ...rest
}: AnimatedMarkerType) {
  const animated = useRef(
    new Animated.ValueXY({
      x: lng,
      y: lat,
    }),
  ).current;

  function MarkerMoveToNewPosition(newLat: number, newLng: number) {
    Animated.timing(animated, {
      toValue: { x: newLng, y: newLat },
      useNativeDriver: false,
      delay: 1000,
      easing: Easing.linear,
    }).start();
  }



  useEffect(() => {
    MarkerMoveToNewPosition(lat, lng);
  }, [lng, lat]);

  return (
    <MarkerAnimated
      coordinate={{
       latitude: animated.y,
       longitude: animated.x,
      }}

      onPress={()=>{onClick(id)}}
  

      title={text}
      {...rest}
    >
          <View style={{ alignItems: "center" }}>
    <Text style={{ fontSize: 22 }}>🚕</Text>
  </View>
    </MarkerAnimated>
  );
}
