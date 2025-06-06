import { useAuth } from '@/contexts/AuthContext';
import { Redirect, Tabs } from 'expo-router';

export default function AppLayout(){
    const { session } = useAuth() as { session: unknown }
    return !session ? <Redirect href="/signin" /> : (
      <Tabs>
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        {/* Agrega más pestañas según tus necesidades */}
      </Tabs>
    );
}