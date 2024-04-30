import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    // Load authentication state from localStorage on component mount
    useEffect(() => {
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
            setAuth(JSON.parse(savedAuth));
        }
    }, []);

    // Save authentication state to localStorage whenever it changes
    useEffect(() => {
        // Omit the password field from the auth object
        const { pwd, ...authData } = auth;
        localStorage.setItem('auth', JSON.stringify(authData));
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;
