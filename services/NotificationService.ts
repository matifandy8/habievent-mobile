import { NOTIFICATION_API_ROUTES } from '@/config/apiRoutes';
import { Notification, NotificationPreferences } from '@/types/notifications';
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

  if (options.method === 'DELETE') {
    if (response.status === 204) {
      return true; 
    }
    throw new Error('Failed to delete notification');
  }

  const data = await response.json();
  if (!response.ok) {
    if (data.message === "Notification data is incomplete or missing event ID/event date.") {
      throw new Error("Please provide both event ID and event date for the notification.");
    }
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

const validateNotificationData = (eventId: string, eventDate: string, preferences: NotificationPreferences) => {
  if (!eventId || !eventDate) {
    throw new Error("Event ID and event date are required for notifications.");
  }

  if (!preferences.email && !preferences.phone) {
    throw new Error("Please select at least one notification method (email or phone).");
  }

  if (preferences.email && !preferences.email_address) {
    throw new Error("Email address is required when email notifications are enabled.");
  }

  if (preferences.phone && !preferences.phone_number) {
    throw new Error("Phone number is required when phone notifications are enabled.");
  }

  const hasTimingSelected = preferences.one_day_before || 
                          preferences.one_hour_before || 
                          preferences.thirty_minutes_before || 
                          preferences.at_event_time;
  if (!hasTimingSelected) {
    throw new Error("Please select at least one notification timing.");
  }
};

export const NotificationService = {
  createNotification: async (preferences: NotificationPreferences): Promise<Notification> => {
    validateNotificationData(preferences.event_id, preferences.event_date, preferences);
    return fetchWithAuth(NOTIFICATION_API_ROUTES.createNotification, {
      method: 'POST',
      body: JSON.stringify(preferences),
    });
  },

  getNotifications: async (eventId: string): Promise<Notification[]> => {
    if (!eventId) {
      throw new Error("Event ID is required to fetch notifications.");
    }
    return fetchWithAuth(NOTIFICATION_API_ROUTES.getNotifications(eventId));
  },

  deleteNotification: async (eventId: string): Promise<void> => {
    if (!eventId) {
      throw new Error("Event ID is required to delete a notification.");
    }
    await fetchWithAuth(NOTIFICATION_API_ROUTES.deleteNotification(eventId), {
      method: 'DELETE',
    });
    return;
  },

  updateNotification: async (notificationId: string, eventDate: string, preferences: NotificationPreferences): Promise<Notification> => {
    if (!notificationId || !eventDate) {
      throw new Error("Notification ID and event date are required to update a notification.");
    }
    validateNotificationData(notificationId, eventDate, preferences);
    
    return fetchWithAuth(NOTIFICATION_API_ROUTES.deleteNotification(notificationId), {
      method: 'PUT',
      body: JSON.stringify({ 
        eventDate,
        preferences 
      }),
    });
  }
}; 