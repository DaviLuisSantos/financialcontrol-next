"use client";
import { createContext, useState, useEffect, useCallback } from "react";
import { login } from "@/services/usuarioService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Corrigir a importação

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const token = Cookies.get("Authorization");
                if (token) {
                    // Decodificar o token JWT para obter os dados do usuário
                    const decodedUser = jwtDecode(token);
                    setUser(decodedUser);
                }
            } catch (err) {
                console.error("Failed to load user:", err);
            } finally {
                setLoading(false);
            }
        };

        initializeUser();
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        Cookies.remove("Authorization");
    }, []);

    const handleLogin = useCallback(async (email, senha) => {
        setError(null);
        try {
            const response = await login(email, senha);
            setUser(jwtDecode(response.token)); // Decodificar o token JWT
            Cookies.set("Authorization", response.token, { expires: 7 }); // Armazena o token por 7 dias
        } catch (error) {
            console.error("Login failed:", error);
            setError("Falha no login. Verifique suas credenciais.");
            throw error;
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, logout, handleLogin, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
}