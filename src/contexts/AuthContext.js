"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { login } from "@/services/usuarioService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getToken = () => Cookies.get("Authorization");

    const decodeToken = (token) => {
        try {
            return jwtDecode(token);
        } catch {
            return null;
        }
    };

    const initializeUser = useCallback(() => {
        const token = getToken();
        if (token) {
            const decodedUser = decodeToken(token);
            setUser(decodedUser);
        }
        setLoading(false);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        Cookies.remove("Authorization");
    }, []);

    const handleLogin = useCallback(async (email, password) => {
        setError(null);
        try {
            const { token } = await login(email, password);
            const decodedUser = decodeToken(token);
            setUser(decodedUser);
            Cookies.set("Authorization", token, { expires: 7 });
        } catch (err) {
            setError("Falha no login. Verifique suas credenciais.");
            throw err;
        }
    }, []);

    useEffect(() => {
        initializeUser();
    }, [initializeUser]);

    return (
        <AuthContext.Provider value={{ user, logout, handleLogin, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
}