import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen"
import { AuthProvider, useAuth } from "@/context/authContext";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query";


const client=new QueryClient()




SplashScreen.preventAutoHideAsync()

export default function RootLayout(){

   return <AuthProvider> 
    <QueryClientProvider client={client}>
    <SafeAreaProvider>
      
         <MainLayout/>
    </SafeAreaProvider>
    </QueryClientProvider>
  </AuthProvider> 


}

function MainLayout() {

  const {loading,token}=useAuth()

  useEffect(()=>{
    if(!loading){

      SplashScreen.hide()

    }
      
  },[loading])


  if(loading){

    return  null

  }
  return <Stack>

    {/* Authicated Routes */}
    <Stack.Protected guard={token} >

    </Stack.Protected >

     {/* Login/Signup Routes */}
    
    <Stack.Protected guard={!token}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
    </Stack.Protected>


  </Stack> 
}
