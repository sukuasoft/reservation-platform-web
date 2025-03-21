'use client'

import AppWrapper from "@/app/app-wrapper";
import { User } from "@/types/user";
import { createContext, useState } from "react";

export interface IAppContext {
  token: string;
  setToken: (token: string) => void;
  saveToken: (token: string) => void;
  apiUrl:string,
  user:User|null,
  setUser: (user: User) => void;


}

export const AppContext = createContext<IAppContext | undefined>(undefined);

interface IAppProviderProps {
  children: React.ReactNode;
  apiUrl:string, 
}

export function AppProvider({ children, apiUrl }: IAppProviderProps) {
  const [token, setToken] = useState(localStorage.getItem('token') ?? '');
  const [user, setUser]= useState<User | null>(null);

  function saveToken (_token:string){
    setToken(_token);
    localStorage.setItem('token', _token);
  }

  return (
    <AppContext.Provider
      value={{
        user, setUser,
        apiUrl,
        token,
        setToken, 
        saveToken,
      }}
    >

            {children}

    </AppContext.Provider>
  );
}
