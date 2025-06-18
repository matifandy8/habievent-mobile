import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import EventDateTimePicker from "./EventDateTimePicker";
import EventTextFields from "./EventTextFields";


interface AddEventModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (event: {
    event_name: string;
    event_type: string;
    location: string;
    category: string;
    link: string;
    notes: string;
    event_time: string;
    
  }) => void;
  initialData?: {
    event_name: string;
    event_type?: string;
    event_time: string;
    location?: string;
    category?: string;
    link?: string;
    notes?: string;
  } | null;
}

export default function AddEventModal({
  visible,
  onClose,
  onSave,
  initialData
}: AddEventModalProps) {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventNotes, setEventNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  useEffect(() => {
    if (initialData) {
      setEventName(initialData.event_name);
      setEventType(initialData.event_type ?? '');
      setEventLocation(initialData.location ?? '');
      setEventCategory(initialData.category ?? '');
      setEventLink(initialData.link ?? '');
      setEventNotes(initialData.notes ?? '');
      setSelectedDate(new Date(initialData.event_time));
    }
  }, [initialData]);

  const handleSave = () => {
    if (!eventName.trim()) {
      alert("Please enter an event name.");
      return;
    }

    if (selectedDate <= new Date()) {
      alert("Please select a future date for the event.");
      return;
    }

    onSave({
      event_name: eventName,
      event_type: eventType,
      location: eventLocation,
      category: eventCategory,
      link: eventLink,
      notes: eventNotes,
      event_time: selectedDate.toISOString(),
    });
    setEventName("");
    setEventType("");
    setEventLocation("");
    setEventCategory("");
    setEventLink("");
    setEventNotes("");
    setSelectedDate(new Date());
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{initialData ? 'Edit Event' : 'Add Event'}</Text>
          <EventTextFields
            eventName={eventName}
            setEventName={setEventName}
            eventType={eventType}
            setEventType={setEventType}
            eventLocation={eventLocation}
            setEventLocation={setEventLocation}
            eventCategory={eventCategory}
            setEventCategory={setEventCategory}
            eventLink={eventLink}
            setEventLink={setEventLink}
            eventNotes={eventNotes}
            setEventNotes={setEventNotes}
          />
          <Pressable
            onPress={() => setIsDatePickerVisible(true)}
            style={styles.datePickerButton}
          >
            <Text style={styles.datePickerText}>
              📅 {selectedDate.toLocaleString()}
            </Text>
          </Pressable>
          <EventDateTimePicker
            visible={isDatePickerVisible}
            date={selectedDate}
            onChange={setSelectedDate}
            onClose={() => setIsDatePickerVisible(false)}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Pressable
              style={[styles.button, { backgroundColor: "#aaa", marginRight: 10 }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>{initialData ? 'Save' : 'Create'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 24,
    width: "85%",
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    minWidth: 80,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
    marginTop: 8,
  },
  datePickerText: {
    color: "#222",
    fontSize: 16,
  },
});
