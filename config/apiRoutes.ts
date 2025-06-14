
const API_BASE_URL = 'http://localhost:3000/api';

export const AUTH_API_ROUTES = {
    validateToken: `${API_BASE_URL}/auth/validate-token`,
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
    refreshToken: `${API_BASE_URL}/auth/refresh-token`,
};

export const EVENT_API_ROUTES = {
    getEvents: `${API_BASE_URL}/events`,
    getEventById: (id: string) => `${API_BASE_URL}/events/${id}`,
    createEvent: `${API_BASE_URL}/events`,
    updateEvent: (id: string) => `${API_BASE_URL}/events/${id}`,
    deleteEvent: (id: string) => `${API_BASE_URL}/events/${id}`,
};

export const NOTIFICATION_API_ROUTES = {
    createNotification: `${API_BASE_URL}/notifications`,
    getNotifications: (id: string) => `${API_BASE_URL}/notifications/${id}`,
    deleteNotification: (id: string) => `${API_BASE_URL}/notifications/${id}`,
};
