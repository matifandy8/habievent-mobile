import { Event } from "@/types/events";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Divider, IconButton, Menu } from "react-native-paper";



interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onNotify: (id: string) => void;
  isNotified: boolean;
}

const EventCard = ({ event, onEdit, onDelete, onNotify, isNotified }: EventCardProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.event_name}</Text>
        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{event.event_type}</Text>
          </View>
          <View style={[styles.chip, { backgroundColor: "#e0f2fe" }]}>
            <Text style={[styles.chipText, { color: "#2563eb" }]}>{event.category}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="calendar" size={18} color="#6b7280" />
        <Text style={styles.infoText}>{event.event_time}</Text>
      </View>
      <View style={styles.infoRow}>
        <Feather name="map-pin" size={18} color="#6b7280" />
        <Text style={styles.infoText}>{event.location}</Text>
      </View>
      {event.link ? (
        <Pressable style={styles.infoRow} onPress={() => Linking.openURL(event.link!)}>
          <Feather name="link" size={18} color="#6b7280" />
          <Text style={[styles.infoText, { color: "#2563eb", textDecorationLine: "underline" }]}>
            Event Website
          </Text>
        </Pressable>
      ) : null}

      {event.notes ? (
        <View style={styles.notesBox}>
          <Text style={styles.notesText}>{event.notes}</Text>
        </View>
      ) : null}

      <View style={styles.footer}>
        <Pressable
          style={[styles.button, isNotified && styles.buttonActive]}
          onPress={() => onNotify(event.id)}
        >
          <Text style={styles.buttonText}>
            {isNotified ? "🔔 Manage Notification" : "🔕 Notify Me"}
          </Text>
        </Pressable>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <IconButton
              icon="dots-vertical"
              size={24}
              onPress={() => setMenuVisible(true)}
              accessibilityLabel="Event actions menu"
            />
          }
        >
          <Menu.Item onPress={() => { setMenuVisible(false); onEdit(event); }} title="Edit" />
          <Divider />
          <Menu.Item
            onPress={() => { setMenuVisible(false); onDelete(event.id); }}
            title="Delete"
            titleStyle={{ color: "#dc2626" }}
          />
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  header: { marginBottom: 8 },
  title: { fontSize: 20, fontWeight: "bold", color: "#111827" },
  chipsRow: { flexDirection: "row", gap: 8, marginTop: 4 },
  chip: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
  },
  chipText: { fontSize: 12, color: "#374151" },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 },
  infoText: { fontSize: 14, color: "#374151" },
  notesBox: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
  },
  notesText: { color: "#374151" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#111827",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonActive: {
    backgroundColor: "#2563eb",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default EventCard;