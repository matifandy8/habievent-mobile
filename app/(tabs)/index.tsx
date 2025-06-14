import AddEventModal from "@/components/AddEventModal";
import EventCard from "@/components/EventCard";
import { EventsService } from "@/services/EventsService";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
type Event = {
  id: string;
  event_name: string;
  event_type?: string;
  event_time: string;
  location?: string;
  category?: string;
  link?: string;
  notes?: string;
  user_id?: string;
};
export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const fetchEvents = async () => {
    try {
      const events = await EventsService.getEvents();
      setEvents(events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSaveEvent = async (event: { event_name: string }) => {
    console.log("Evento guardado:", event);
    try {
      const response = await EventsService.createEvent(event);
      console.log("Evento guardado:", response);
      setEvents((prevEvents) => [...prevEvents, response]);
    } catch (error) {
      console.error("Error al guardar el evento:", error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await EventsService.deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  };

  const editEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleEditEvent = async (eventData: Partial<Event>) => {
    if (!selectedEvent) return;
    try {
      console.log(eventData)
      const updatedEvent = await EventsService.updateEvent(selectedEvent.id, eventData);
      setEvents(prevEvents => prevEvents.map(event => 
        event.id === selectedEvent.id ? updatedEvent : event
      ));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headline}>HabiEvent</Text>
        <Text>List here Events</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add Event</Text>
      </Pressable>

      <AddEventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEvent}
      />

      <AddEventModal
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditEvent}
        initialData={selectedEvent}
      />

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} onEdit={() => { editEvent(item); setIsEditModalOpen(true); }} onDelete={() => deleteEvent(item.id)} onNotify={() => {}} isNotified={false} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text>No events available</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,

  },
  headline: {
    paddingVertical: 20
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
})