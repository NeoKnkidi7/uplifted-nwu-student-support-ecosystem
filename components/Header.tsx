import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Bell, User } from "lucide-react-native";
import Colors from "@/constants/colors";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showProfile?: boolean;
  showNotifications?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showProfile = true,
  showNotifications = true,
}) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://r2-pub.rork.com/attachments/vyxmzhhipc80cg3zftk7n" }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.actions}>
        {showNotifications && (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push("/notifications" as any)}
            testID="notifications-button"
          >
            <Bell color={Colors.primary} size={24} />
          </TouchableOpacity>
        )}
        {showProfile && (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push("/profile" as any)}
            testID="profile-button"
          >
            <User color={Colors.primary} size={24} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default Header;
