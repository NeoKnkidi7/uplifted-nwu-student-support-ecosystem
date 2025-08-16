import { Tabs, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { BookOpen, Home, Briefcase, Heart, BarChart4 } from "lucide-react-native";
import Colors from "@/constants/colors";
import { useAuth } from "@/hooks/auth-store";

export default function TabLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/(auth)" as any);
    }
  }, [isLoading, isAuthenticated, router, segments]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: {
          borderTopColor: Colors.border,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="academic"
        options={{
          title: "Academic",
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="financial"
        options={{
          title: "Financial",
          tabBarIcon: ({ color, size }) => <BarChart4 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wellness"
        options={{
          title: "Wellness",
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="career"
        options={{
          title: "Career",
          tabBarIcon: ({ color, size }) => <Briefcase size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
