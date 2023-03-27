import React, { useEffect, createContext, useContext, useState } from "react";
import { checkAuth } from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        checkUserAuth();
    }, [auth]);

    const checkUserAuth = async () => {
        let response = await checkAuth();
        (response && response.data.status === "success") && setAuth(true);
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useLogin = () => useContext(AuthContext);

export default AuthProvider;