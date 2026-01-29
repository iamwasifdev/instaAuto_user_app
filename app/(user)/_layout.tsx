
import { Tabs } from "expo-router";
import GeoLocationProvider, { useGeoLocation } from "@/context/geoLocationContext";

export default function TabRootLayout() {


     return   <GeoLocationProvider>
            <TabLayout/>
        </GeoLocationProvider>


}


function TabLayout() {

    const {geoStatus}=useGeoLocation()
  return (
    <Tabs screenOptions={{
        headerShown: false, // ← This removes header from ALL tabs
      }}>

        
      <Tabs.Protected guard={geoStatus}> 
        <Tabs.Screen name="main"  />
      </Tabs.Protected>
      <Tabs.Protected guard={!geoStatus}> 
        <Tabs.Screen name="LocationAccessDenied"  />
      </Tabs.Protected>
    </Tabs>
  );
}
