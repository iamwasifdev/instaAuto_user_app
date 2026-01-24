import { createContext ,useContext,useEffect,useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import { api } from '@/utils/axiosIntance';
import { authMeEndpoint } from '@/ts';
import { isAxiosError } from 'axios';

export const AuthContext = createContext<any>(null);
export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}:any){

    
    const [token,setToken]=useState<string|null>(null)
    const [loading,setLoading]=useState(true)
    const [user,setUser]=useState<authMeEndpoint|null>(null)

    //use Expo secure store and first check if there is a token or not


    useEffect(()=>{
        async function auth() {

            const token = await SecureStore.getItemAsync("auth_token")

            if(!token){

                setToken(null)
                setLoading(false)
                return;
                
            }

            try{
                
                const req=await api<authMeEndpoint>(`/auth/me`)

                setUser(req.data)
                setToken(token)



            }catch(err){

               
                if(isAxiosError(err)){

                     console.log(err.response)

                }
            //Should check which kind of error
                setToken(null)
                setUser(null)
                setLoading(false)
                SecureStore.deleteItemAsync("auth_token")

            }
            
        }
        auth()
    },[])


  async  function login(token:string){
        await SecureStore.setItemAsync("auth_token",token)
        setToken(token)

    }

    async  function logout(){
        await SecureStore.deleteItemAsync("auth_token")
        setToken(null)

    }

    function setProfile(profile:authMeEndpoint) {

        setUser(profile)
        
    }

   


    


    return <AuthContext.Provider value={{token,loading,user,login,logout,setProfile}}>
        {children}
    </AuthContext.Provider>



}

