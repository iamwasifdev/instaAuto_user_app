import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import StopList from "@/components/composition/StopList";
import IconDisplay from "@/components/ui/iconDisplay";
import Line from "@/components/ui/line";
import { useDataContext } from "@/context/dataContext";
import { stopType } from "@/ts";
import { router } from "expo-router";
import { Pin } from "lucide-react-native";

export default function StopSearch() {
  const { setSelectedStop, setPhase } = useDataContext();

  function onStopClick(stop: stopType) {
    setSelectedStop(stop);
    setPhase("NOTCONFIRMED");
    router.push("/(user)/main");
    console.log("Gave me the stop : ",stop)
  }

  return (
    <SafeAreaView className="pl-4">
      <IconDisplay
        label="Pickup Location"
        size="md"
        value="Your Current Location"
        DisplayIcon={Pin}
      />
      <View className="ml-5 pt-2">
        <Line length={40} className="rounded-sm" />
      </View>
      <View className=" w-[100%] h-[100%] color-lime-800">
        <StopList onStopClick={onStopClick} />
      </View>
    </SafeAreaView>
  );
}
