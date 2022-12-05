import { createContext,useContext,useState } from "react";
import { ChildrenType, valueType } from "../../types";



const AuthContext=createContext<valueType|undefined>(undefined);

export const AuthProvider=({children}:ChildrenType)=>{
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    return <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>{children}</AuthContext.Provider>
}

export const useAuthContext=()=>{
    const ctx=useContext(AuthContext);
    if(!ctx){
        throw new Error("Missing authContext not wrapped in provider")
    }
    return ctx;
}