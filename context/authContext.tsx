import { createContext ,useEffect,useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from "axios"
import { api } from '@/utils/axiosIntance';

const AuthContext = createContext<any>(null);

export function AuthProvider({children}:any){

    const BACKEND_URL=""

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
            }

            try{
                
                const req=await api<authMeEndpoint>(`${BACKEND_URL}/auth/me`)

                


            }catch{

            }
            
        }
        auth()
    },[])




}

