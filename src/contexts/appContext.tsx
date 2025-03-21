'use client'

import { createContext, useState } from "react";

export interface IAppContext {
  token: string;
  setToken: (token: string) => void;
  
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

interface IAppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: IAppProviderProps) {
  const [token, setToken] = useState("");


  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
