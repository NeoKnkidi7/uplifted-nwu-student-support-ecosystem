import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/hooks/auth-store";
import { DeadlinesProvider } from "@/hooks/deadlines-store";
import { AIAssistantProvider } from "@/hooks/ai-assistant-store";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export const unstable_settings = {
  baseUrl: '/UpliftED-NWU-Student-Support-Ecosystem/',
};

export default function RootLayout() {
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    setTimeout(hideSplash, 500);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <DeadlinesProvider>
            <AIAssistantProvider>
              <Stack
                screenOptions={{ headerShown: false }}
                basename="/UpliftED-NWU-Student-Support-Ecosystem"
              >
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="profile" />
                <Stack.Screen name="notifications" />
                <Stack.Screen name="bursary/[id]" />
                <Stack.Screen name="resource/[id]" />
                <Stack.Screen name="mental-health/[id]" />
                <Stack.Screen name="career/[id]" />
                <Stack.Screen name="resource-exchange" />
                <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
              </Stack>
            </AIAssistantProvider>
          </DeadlinesProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
