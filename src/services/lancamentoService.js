import apiClient from "@/lib/api";

const API_ENDPOINT = "/lancamento";

export const createLancamento = async (lancamento) => {
    try {
        const response = await apiClient.post(`${API_ENDPOINT}/`, lancamento);
        return response.data;
    } catch (error) {
        console.error("Error creating lancamento:", error);
        throw error;
    }
}

export const getLancamento = async (lancamentoId) => {
    try {
        const response = await apiClient.get(`${API_ENDPOINT}/${lancamentoId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching lancamento:", error);
        throw error;
    }
}

export const getLancamentosByUsuario = async () => {
    try {
        const response = await apiClient.get(`${API_ENDPOINT}/usuario/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching lancamentos by usuario:", error);
        throw error;
    }
}

export const updateLancamento = async (lancamentoId, lancamento) => {
    try {
        const response = await apiClient.put(`${API_ENDPOINT}/${lancamentoId}/`, lancamento);
        return response.data;
    } catch (error) {
        console.error("Error updating lancamento:", error);
        throw error;
    }
}

export const deleteLancamentoById = async (lancamentoId) => {
    try {
        const response = await apiClient.delete(`${API_ENDPOINT}/${lancamentoId}/`);
        return response.data;
    } catch (error) {
        console.error("Error deleting lancamento:", error);
        throw error;
    }
}