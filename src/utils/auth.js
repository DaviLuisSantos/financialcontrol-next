import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";


export const setToken = (token, key, user) => {
    Cookies.set('Authorization', token, { expires: 7 });
    Cookies.set('key', key, { expires: 7 });
    Cookies.set('user', user, { expires: 7 });
};

export const getToken = () => {
    return Cookies.get('Authorization');
};

export const removeToken = () => {
    Cookies.remove('Authorization');
    Cookies.remove('key');
    Cookies.remove('user');
};

function getTokenExpiration(token) {
    const decodedToken = jwtDecode(token);
    // The exp claim is in seconds since the epoch
    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
    return new Date(expirationTime);
}

export const isTokenValid = () => {
    const token = getToken();
    if (!token || token === 'undefined') {
        return false;
    }

    try {
        const expiry = getTokenExpiration(token);
        const now = Math.floor(Date.now() / 1000);

        if (now < expiry) {
            return true;
        }
        else {
            console.error('Token expirado');
            removeToken();
            return false;
        }
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return false;
    }
};