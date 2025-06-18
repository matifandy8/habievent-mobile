import { useAuth } from "@/contexts/AuthContext"; // Todavía necesitamos userId aquí para fetchNotifications en el efecto
import { EventsService } from "@/services/EventsService";
import { Event } from "@/types/events";
import { useCallback, useEffect, useState } from "react";

export const useEventsData = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useAuth(); 

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedEvents = await EventsService.getEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const addEvent = async (event: { event_name: string }) => {
    try {
      const response = await EventsService.createEvent(event);
      setEvents((prevEvents) => [...prevEvents, response]);
      return true;
    } catch (err) {
      console.error("Error al guardar el evento:", err);
      setError('Failed to add event.');
      return false;
    }
  };

  const removeEvent = async (id: string) => {
    try {
      await EventsService.deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      return true;
    } catch (err) {
      console.error("Error al eliminar el evento:", err);
      setError('Failed to delete event.');
      return false;
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    try {
      const updatedEvent = await EventsService.updateEvent(id, eventData);
      setEvents(prevEvents => prevEvents.map(event =>
        event.id === id ? updatedEvent : event
      ));
      return true;
    } catch (err) {
      console.error("Error updating event:", err);
      setError('Failed to update event.');
      return false;
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents, 
    addEvent,
    removeEvent,
    updateEvent,
    userId 
  };
};