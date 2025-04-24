import apiClient from "@/lib/api";

const API_ENDPOINT = "/categoria";

export const createCategoria = async (categoria) => {
    try {
        const response = await apiClient.post(`${API_ENDPOINT}/`, categoria);
        return response.data;
    } catch (error) {
        console.error("Error creating categoria:", error);
        throw error;
    }
}

export const getCategoria = async (categoriaId) => {
    try {
        const response = await apiClient.get(`${API_ENDPOINT}/${categoriaId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categoria:", error);
        throw error;
    }
}

export const getCategoriasByUsuario = async () => {
    try {
        const response = await apiClient.get(`${API_ENDPOINT}/usuario`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categorias by usuario:", error);
        throw error;
    }
}