import { useAuth } from "@/contexts/AuthContext";
import { NotificationService } from "@/services/NotificationService";
import { Notification, NotificationPreferences } from "@/types/notifications";
import { useState } from "react";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  const fetchNotifications = async (id: string) => {
    try {
      const notifications = await NotificationService.getNotifications(id);
      setNotifications(notifications);
      setError(null);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to fetch notifications');
      console.error('Error fetching notifications:', error);
    }
  };

  const isEventNotified = (eventId: string) => {
    return notifications.some(notification => notification.event_id === eventId);
  };

  const handleNotificationSubmit = async (
    eventId: string,
    eventDate: string,
    prefs: {
      email: boolean;
      phone: boolean;
      emailAddress?: string;
      phoneNumber?: string;
      notificationTiming: {
        oneDayBefore: boolean;
        oneHourBefore: boolean;
        thirtyMinutesBefore: boolean;
        atEventTime: boolean;
      };
    }
  ) => {
    try {
      const notificationData: NotificationPreferences = {
        event_id: eventId,
        event_date: eventDate,
        user_id: userId || undefined,
        email: prefs.email,
        email_address: prefs.emailAddress || null,
        phone: prefs.phone,
        phone_number: prefs.phoneNumber || null,
        one_day_before: prefs.notificationTiming.oneDayBefore,
        one_hour_before: prefs.notificationTiming.oneHourBefore,
        thirty_minutes_before: prefs.notificationTiming.thirtyMinutesBefore,
        at_event_time: prefs.notificationTiming.atEventTime
      };

      const newNotification = await NotificationService.createNotification(notificationData);
      setNotifications(prev => [...prev, newNotification]);
      return true;
    } catch (error) {
      console.error('Error setting notification:', error);
      return false;
    }
  };

  const handleDeleteNotification = async (eventId: string) => {
    try {
      await NotificationService.deleteNotification(eventId);
      setNotifications(prev => prev.filter(n => n.event_id !== eventId));
      return true;
    } catch (error) {
      console.error('Error deleting notification:', error);
      return false;
    }
  };

  return {
    notifications,
    error,
    fetchNotifications,
    isEventNotified,
    handleNotificationSubmit,
    handleDeleteNotification
  };
}; 