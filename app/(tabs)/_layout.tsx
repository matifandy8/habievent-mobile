import { useAuth } from '@/contexts/AuthContext';
import { Feather } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';

export default function AppLayout(){
    const { session } = useAuth() as { session: unknown }
    return !session ? <Redirect href="/signin" /> : (
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e5e7eb',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 10,
          },
          tabBarActiveTintColor: '#111827',
          tabBarInactiveTintColor: '#9ca3af',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 2,
          },
          headerStyle: {
            backgroundColor: '#ffffff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 5,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#111827',
          },
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen 
          name="index" 
          options={{ 
            title: 'Events',
            tabBarIcon: ({ color, size, focused }) => (
              <Feather 
                name={focused ? "calendar" : "calendar"} 
                size={size} 
                color={color} 
              />
            ),
          }} 
        />
        <Tabs.Screen 
          name="profile" 
          options={{ 
            title: 'Profile',
            tabBarIcon: ({ color, size, focused }) => (
              <Feather 
                name={focused ? "user" : "user"} 
                size={size} 
                color={color} 
              />
            ),
          }} 
        />
      </Tabs>
    );
}