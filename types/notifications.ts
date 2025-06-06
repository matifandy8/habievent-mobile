export type NotificationPreferences = {
  id?: string;
  user_id?: string;
  event_id: string;
  event_date: string;
  email: boolean;
  email_address: string | null;
  phone: boolean;
  phone_number: string | null;
  one_day_before: boolean;
  one_hour_before: boolean;
  thirty_minutes_before: boolean;
  at_event_time: boolean;
  created_at?: string;
  updated_at?: string;
};

export type NotificationPreferencesArray = NotificationPreferences[];

