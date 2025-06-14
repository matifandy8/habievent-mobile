import { AUTH_API_ROUTES } from "@/config/apiRoutes";
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = await AsyncStorage.getItem('token');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Client-Source': 'mobile',
        ...(options.headers as Record<string, string> || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Request failed');
    return data;
};

export const AuthService = {
    login: async (email: string, password: string) => {
        const data = await fetchWithAuth(AUTH_API_ROUTES.login, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        await AsyncStorage.setItem('token', data.accessToken);
        return data;
    },

    register: async (username: string, email: string, password: string) => {
        const data = await fetchWithAuth(AUTH_API_ROUTES.register, {
            method: 'POST',
            body: JSON.stringify({ username, email, password })
        });

        await AsyncStorage.setItem('token', data.accessToken);
        return data;
    },

    validateToken: async () => {
        return fetchWithAuth(AUTH_API_ROUTES.validateToken, {
            method: 'POST'
        });
    },

    refreshToken: async () => {
        const data = await fetchWithAuth(AUTH_API_ROUTES.refreshToken, {
            method: 'POST'
        });

        await AsyncStorage.setItem('token', data.accessToken);
        return data;
    },

    logout: async () => {
        await AsyncStorage.removeItem('token');
    }
};