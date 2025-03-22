'use client'

import AppWrapper from "@/app/app-wrapper";
import { User } from "@/types/user";
import { delayTime } from "@/utils/time";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export interface IAppContext {
  token: string;
  setToken: (token: string) => void;
  saveToken: (token: string) => void;
  apiUrl:string,
  user:User|null,
  setUser: (user: User) => void;
  logout:()=>void;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

interface IAppProviderProps {
  children: React.ReactNode;
  apiUrl:string, 
}

export function AppProvider({ children, apiUrl }: IAppProviderProps) {
  const [token, setToken] = useState('');
  const [user, setUser]= useState<User | null>(null);

  const router = useRouter();
  useEffect(()=>{
    setToken(localStorage.getItem('token') ?? '');
  }, [])

  function saveToken (_token:string){
    setToken(_token);
    localStorage.setItem('token', _token);
  }


  async function logout (){
    localStorage.clear();
    setUser(null);

await delayTime(0.8);
router.push('/login')

  }

  return (
    <AppContext.Provider
      value={{
        user, setUser,
        apiUrl,
        token,
        setToken, 
        saveToken,
        logout
      }}
    >

            {children}

    </AppContext.Provider>
  );
}
