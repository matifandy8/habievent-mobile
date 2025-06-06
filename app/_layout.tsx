import { AuthProvider } from "@/contexts/AuthContext";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar backgroundColor="#61dafb" />
        <Slot />
      </AuthProvider>
    </SafeAreaProvider>
  );
}