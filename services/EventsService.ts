import { EVENT_API_ROUTES } from "@/config/apiRoutes";
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(url, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-Client-Source': 'mobile',
            ...options.headers
        }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Request failed');
    return data;
};

export const EventsService = {
    getEvents: async () => {
        return fetchWithAuth(EVENT_API_ROUTES.getEvents);
    },

    getEvent: async (eventId: string) => {
        return fetchWithAuth(`${EVENT_API_ROUTES.getEvents}/${eventId}`);
    },

    createEvent: async (eventData: any) => {
        return fetchWithAuth(EVENT_API_ROUTES.createEvent, {
            method: 'POST',
            body: JSON.stringify(eventData)
        });
    },

    updateEvent: async (eventId: string, eventData: any) => {
        return fetchWithAuth(`${EVENT_API_ROUTES.getEvents}/${eventId}`, {
            method: 'PUT',
            body: JSON.stringify(eventData)
        });
    },

    deleteEvent: async (eventId: string) => {
        const response = await fetchWithAuth(`${EVENT_API_ROUTES.getEvents}/${eventId}`, {
            method: 'DELETE'
        });
        return true;
    },

    setEventNotification: async (eventId: string, notify: boolean) => {
        return fetchWithAuth(`${EVENT_API_ROUTES.getEvents}/${eventId}/notify`, {
            method: 'POST',
            body: JSON.stringify({ notify })
        });
    }
};

