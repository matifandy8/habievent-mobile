import AddEventModal from "@/components/AddEventModal";
import EventCard from "@/components/EventCard";
import NotifyModal from "@/components/NotifyModal";
import { Feather } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { useEventModals } from "@/hooks/useEventModals";
import { useEventsData } from "@/hooks/useEventsData";
import { useNotifications } from "@/hooks/useNotifications";
import { Event } from "@/types/events";

export default function Index() {
  
  const { events, loading, error, addEvent, removeEvent, updateEvent, userId } = useEventsData();
  const {
    addModalVisible, editModalVisible, notifyModalVisible,
    selectedEventForEdit, selectedEventIdForNotify,
    openAddModal, closeAddModal,
    openEditModal, closeEditModal,
    openNotifyModal, closeNotifyModal,
  } = useEventModals();
  const {
    fetchNotifications,
    isEventNotified,
    handleNotificationSubmit,
    handleDeleteNotification
  } = useNotifications();


  useEffect(() => {
    if (userId) {
      fetchNotifications(userId);
    }
  }, [userId, fetchNotifications]);

  useEffect(() => {
  }, [addModalVisible, editModalVisible, notifyModalVisible]);

  const handleSaveEvent = async (eventData: { event_name: string }) => {
    const success = await addEvent(eventData);
    if (success) closeAddModal();
  };

  const handleDeleteEvent = async (id: string) => {
    await removeEvent(id);
  };

  const handleUpdateEvent = async (eventData: Partial<Event>) => {
    if (!selectedEventForEdit?.id) return;
    const success = await updateEvent(selectedEventForEdit.id, eventData);
    if (success) closeEditModal();
  };

  const onNotificationConfirm = async (modalPrefs: {
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
  }) => {
    if (!selectedEventIdForNotify) return;

    const eventToNotify = events.find(event => event.id === selectedEventIdForNotify);
    if (!eventToNotify) return;


    const success = await handleNotificationSubmit(
      selectedEventIdForNotify,
      eventToNotify.event_time,
      modalPrefs
    );
    if (success) {
      closeNotifyModal();
    }
  };

  const onNotificationDelete = async () => {
    if (!selectedEventIdForNotify) return;
    const success = await handleDeleteNotification(selectedEventIdForNotify);
    if (success) {
      closeNotifyModal();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headline}>HabiEvent</Text>
        <Text style={styles.subtitle}>List here Events</Text>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading events...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onEdit={() => openEditModal(item)}
              onDelete={() => handleDeleteEvent(item.id)}
              onNotify={() => openNotifyModal(item.id)}
              isNotified={isEventNotified(item.id)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather name="calendar" size={48} color="#9ca3af" />
              <Text style={styles.emptyText}>No events available</Text>
              <Text style={styles.emptySubtext}>Tap the + button to create your first event</Text>
            </View>
          }
        />
      )}

      {/* Floating Action Button */}
      <Pressable
        style={styles.fab}
        onPress={openAddModal}
        android_ripple={{ color: 'rgba(255,255,255,0.3)', borderless: true }}
      >
        <Feather name="plus" size={24} color="white" />
      </Pressable>

      <AddEventModal
        visible={addModalVisible}
        onClose={closeAddModal}
        onSave={handleSaveEvent}
      />

      <AddEventModal
        visible={editModalVisible}
        onClose={closeEditModal}
        onSave={handleUpdateEvent}
        initialData={selectedEventForEdit}
      />

      <NotifyModal
        visible={notifyModalVisible}
        onClose={closeNotifyModal}
        onConfirm={onNotificationConfirm}
        isNotified={selectedEventIdForNotify ? isEventNotified(selectedEventIdForNotify) : false}
        onDelete={onNotificationDelete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  list: {
    padding: 20,
  },
  headline: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    paddingVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 16,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  }
});