import apiClient from "@/lib/api";

const API_ENDPOINT = "/usuario";

export const createUsuario = async (usuario) => {
    try {
        const response = await apiClient.post(`${API_ENDPOINT}/`, usuario);
        return response.data;
    } catch (error) {
        console.error("Error creating usuario:", error);
        throw error;
    }
}

export const login = async (email, senha) => {
    try {
        const response = await apiClient.post(`${API_ENDPOINT}/login`, { email, senha });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}