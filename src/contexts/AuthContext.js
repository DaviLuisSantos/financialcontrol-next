"use client";
import { createContext, useState, useEffect } from "react";
import { login } from "@/services/usuarioService";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = Cookies.get("Authorization");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = () => {
        setUser(null);
        Cookies.remove("Authorization");
    }

    const handleLogin = async (email, senha) => {
        try {
            const response = await login(email, senha);
            setUser(response);
            Cookies.set("Authorization", response.token, { expires: 7 }); // Armazena o token por 7 dias
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
}