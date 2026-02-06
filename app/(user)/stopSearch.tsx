import IconInput from "@/components/ui/IconInput";
import { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Search } from "lucide-react-native";
import Line from "@/components/ui/line";

export default function StopSearch(){

    const [searchState,setSearchState]=useState("")

    return <SafeAreaView  className="pl-4">
            <IconInput
                  label="Destination"
                  placeholder="Enter your Destination "
                  error={""}
                  size="md"
                  setValue={setSearchState}
                  value={searchState}
                  DisplayIcon={Search}
                
                />
                
                <Line length={100} className="rounded-sm"/>
                
                <Text>hello</Text>
    </SafeAreaView>
}