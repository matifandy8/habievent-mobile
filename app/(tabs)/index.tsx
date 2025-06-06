import EventCard from "@/components/EventCard";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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

  const mockEvents: Event[] = [
  {
    id: "1",
    event_name: "React Native Meetup",
    event_type: "Meetup",
    event_time: "2025-06-10 18:00",
    location: "Tech Hub, City Center",
    category: "Technology",
    link: "https://reactnativemeetup.com",
    notes: "Bring your laptop and questions!",
    user_id: "u1",
  },
  {
    id: "2",
    event_name: "Startup Pitch Night",
    event_type: "Competition",
    event_time: "2025-06-15 20:00",
    location: "Innovation Lab",
    category: "Business",
    link: "https://startupnight.com",
    notes: "Pitch your startup idea to investors.",
    user_id: "u2",
  },
  {
    id: "3",
    event_name: "Art & Wine Evening",
    event_type: "Social",
    event_time: "2025-06-20 19:30",
    location: "Gallery 21",
    category: "Art",
    notes: "Enjoy local art and wine tasting.",
    user_id: "u3",
  },
  {
    id: "4",
    event_name: "Yoga in the Park",
    event_type: "Wellness",
    event_time: "2025-06-22 08:00",
    location: "Central Park",
    category: "Health",
    link: "https://yogapark.com",
    user_id: "u4",
  },
  {
    id: "5",
    event_name: "Live Jazz Night",
    event_type: "Concert",
    event_time: "2025-06-25 21:00",
    location: "Blue Note Club",
    category: "Music",
    notes: "Featuring local jazz bands.",
    user_id: "u5",
  },
];


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headline}>HabiEvent</Text>
        <Text>List here Events</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        {mockEvents.map((event) => (
          <View key={event.id} style={{ marginBottom: 20, borderRadius: 8 }}>
            <EventCard
              event={event}
              onEdit={() => console.log('Edit', event.id)}
              onDelete={(id) => console.log('Delete', id)}
              onNotify={(id) => console.log('Notify', id)}
              isNotified={false}
            />
          </View>
        ))}
      </ScrollView>
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