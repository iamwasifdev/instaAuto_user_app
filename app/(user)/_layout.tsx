
import { Tabs } from "expo-router";
import GeoLocationProvider, { useGeoLocation } from "@/context/geoLocationContext";
import { DataContextProvider } from "@/context/dataContext";
import { Home } from "lucide-react-native";


export default function TabRootLayout() {


     return   <GeoLocationProvider>
          <DataContextProvider>
            <TabLayout/>
            </DataContextProvider>
        </GeoLocationProvider>


}


function TabLayout() {

    const {geoStatus}=useGeoLocation()
  return (
    <Tabs screenOptions={{
        headerShown: false, // ← This removes header from ALL tabs
        
      }}>

        
      <Tabs.Protected guard={geoStatus}> 
        <Tabs.Screen name="main" options={{
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }} />
        <Tabs.Screen name="StopSearch"/>
      </Tabs.Protected>
      <Tabs.Protected guard={!geoStatus}> 
        <Tabs.Screen name="LocationAccessDenied"  />
      </Tabs.Protected>
    </Tabs>
  );
}
