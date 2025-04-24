import axios from 'axios';
import { isTokenValid, removeToken, setToken, getToken } from '@/utils/auth';
import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost/api',
    timeout: 60000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        let errorMessage = "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.";

        if (error.response?.status == 401) {
            removeToken();
            if (typeof window !== 'undefined') {
                const currentPath = window.location.pathname;
                if (currentPath !== "/login") {
                    window.location.href = "/login";
                }
            }
        } else if (error.response?.status === 404) {
            errorMessage = "Recurso não encontrado.";
        } else if (error.response?.status === 500) {
            errorMessage = "Erro interno do servidor.";
        }

        /*
        // Exibir a mensagem de erro para o usuário
        if (typeof window !== 'undefined') {
            alert(errorMessage);
        }
        */

        return Promise.reject(error);
    }
);

export default apiClient;