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