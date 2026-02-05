import { authMeEndpoint } from "@/ts";
import { api } from "@/utils/axiosIntance";
import { isAxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<authMeEndpoint | null>(null);

  //use Expo secure store and first check if there is a token or not

  useEffect(() => {
    async function auth() {
      const token = await SecureStore.getItemAsync("auth_token");

      if (!token) {
        setToken(null);
        setLoading(false);
        return;
      }

      try {
        const req = await api<authMeEndpoint>(`/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(req.data);

        setToken(token);
        setLoading(false);
        console.log("user ", req.data); //hjhf

        
      } catch (err) {
        if (isAxiosError(err)) {
          console.log(err.response);
        }
        //Should check which kind of error
        setToken(null);
        setUser(null);
        setLoading(false);
        SecureStore.deleteItemAsync("auth_token");
      }
    }
    auth();
  }, [token]);


  useEffect(()=>{
    if(!token){
        delete api.defaults.headers.common.Authorization
        return
    }
    api.defaults.headers.common.Authorization=`Bearer ${token}`
  },[token])

  async function login(token: string) {
    await SecureStore.setItemAsync("auth_token", token);
    setToken(token);
  }

  async function logout() {
    await SecureStore.deleteItemAsync("auth_token");
    setToken(null);
  }

  function setProfile(profile: authMeEndpoint) {
    setUser(profile);
  }

  return (
    <AuthContext.Provider
      value={{ token, loading, user, login, logout, setProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
