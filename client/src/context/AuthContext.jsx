import {useState,createContext} from "react";

//step 1 : create the context 
export const AuthContext = createContext(null);

//step 2 : provide the context 
export function AuthProvider({children}){
    const [token,setToken] = useState(null);

    <AuthContext.Provider value={{token,setToken}}>
        {children}
    </AuthContext.Provider>
}

//step 3 : consume the context 