import React from "react";
import { Button, Modal, StyleSheet, View } from "react-native";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";

interface EventDateTimePickerProps {
  visible: boolean;
  date: Date;
  onChange: (date: Date) => void;
  onClose: () => void;
}

export default function EventDateTimePicker({
  visible,
  date,
  onChange,
  onClose,
}: EventDateTimePickerProps) {
  const defaultStyles = useDefaultStyles();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.pickerContainer}>
          <DateTimePicker
            mode="single"
            date={date}
            onChange={({ date }) => {
              if (date) {
                const selectedDate = date instanceof Date ? date : new Date(date);
                if (selectedDate <= new Date()) {
                  alert("Please select a future date for the event.");
                  return;
                }
                onChange(selectedDate);
              }
            }}
            styles={defaultStyles}
            timePicker
            minDate={new Date()}
          />
          <Button title="Close" onPress={onClose} />
          <Button title="Save" onPress={() => onChange(date)} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    elevation: 5,
  },
});