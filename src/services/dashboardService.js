import apiClient from "@/lib/api";

const API_ENDPOINT = "/dashboard";

export const getMonthInfos = async () => {
    try {
        const response = await apiClient.get(`${API_ENDPOINT}/month`);
        return response.data;
    } catch (error) {
        console.error("Error creating lancamento:", error);
        throw error;
    }
}