import AddEventModal from "@/components/AddEventModal";
import EventCard from "@/components/EventCard";
import NotifyModal from "@/components/NotifyModal";
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
        <Text>List here Events</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={openAddModal}
      >
        <Text style={styles.buttonText}>Add Event</Text>
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
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text>No events available</Text>
            </View>
          }
        />
      )}
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