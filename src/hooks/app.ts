import { AppContext } from "@/contexts/appContext";
import { useContext } from "react";

export function useApp(){
    const context = useContext(AppContext);

    if(!context){
        throw new Error("useApp deve ser usado dentro de um <AppProvider>");
    }
    return context;
}