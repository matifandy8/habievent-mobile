import React from "react";
import { StyleSheet, TextInput } from "react-native";

interface EventTextFieldsProps {
  eventName: string;
  setEventName: (v: string) => void;
  eventType: string;
  setEventType: (v: string) => void;
  eventLocation: string;
  setEventLocation: (v: string) => void;
  eventCategory: string;
  setEventCategory: (v: string) => void;
  eventLink: string;
  setEventLink: (v: string) => void;
  eventNotes: string;
  setEventNotes: (v: string) => void;
}

export default function EventTextFields(props: EventTextFieldsProps) {
  return (
    <>
      <TextInput
        placeholder="Event Name"
        value={props.eventName}
        onChangeText={props.setEventName}
        style={styles.input}
      />
      <TextInput
        placeholder="Event Type"
        value={props.eventType}
        onChangeText={props.setEventType}
        style={styles.input}
      />
      <TextInput
        placeholder="Event Location"
        value={props.eventLocation}
        onChangeText={props.setEventLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Event Category"
        value={props.eventCategory}
        onChangeText={props.setEventCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Event Link"
        value={props.eventLink}
        onChangeText={props.setEventLink}
        style={styles.input}
      />
      <TextInput
        placeholder="Event Notes"
        value={props.eventNotes}
        onChangeText={props.setEventNotes}
        style={styles.input}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderColor: "grey",
  },
});