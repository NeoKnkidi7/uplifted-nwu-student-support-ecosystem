import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Edit2, LogOut, Settings, User, BookOpen, Award, MapPin } from "lucide-react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Colors from "@/constants/colors";
import { useAuth } from "@/hooks/auth-store";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            setIsLoading(true);
            await logout();
            setIsLoading(false);
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={Colors.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            {user?.profileImage ? (
              <Image
                source={{ uri: user.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <User size={40} color={Colors.primary} />
              </View>
            )}
            <TouchableOpacity style={styles.editImageButton}>
              <Edit2 size={16} color={Colors.secondary} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.profileName}>{user?.name || "Student Name"}</Text>
          <Text style={styles.profileEmail}>{user?.email || "student@nwu.ac.za"}</Text>
          
          <View style={styles.profileDetails}>
            <View style={styles.profileDetail}>
              <BookOpen size={16} color={Colors.primary} style={styles.detailIcon} />
              <Text style={styles.detailText}>
                {user?.faculty || "Faculty"} • Year {user?.yearOfStudy || "1"}
              </Text>
            </View>
            
            <View style={styles.profileDetail}>
              <Award size={16} color={Colors.primary} style={styles.detailIcon} />
              <Text style={styles.detailText}>
                Student Number: {user?.studentNumber || "12345678"}
              </Text>
            </View>
            
            <View style={styles.profileDetail}>
              <MapPin size={16} color={Colors.primary} style={styles.detailIcon} />
              <Text style={styles.detailText}>
                {user?.campus || "Potchefstroom"} Campus
              </Text>
            </View>
          </View>
        </View>
        
        <Card title="Academic Progress" style={styles.card}>
          <View style={styles.progressContainer}>
            <View style={styles.progressItem}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressValue}>65%</Text>
              </View>
              <Text style={styles.progressLabel}>Degree Completion</Text>
            </View>
            
            <View style={styles.progressItem}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressValue}>72</Text>
              </View>
              <Text style={styles.progressLabel}>Credits Earned</Text>
            </View>
            
            <View style={styles.progressItem}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressValue}>3.2</Text>
              </View>
              <Text style={styles.progressLabel}>GPA</Text>
            </View>
          </View>
        </Card>
        
        <Card title="Notifications Settings" style={styles.card}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Academic Deadlines</Text>
            <View style={[styles.toggle, styles.toggleActive]}>
              <View style={styles.toggleCircle} />
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Financial Aid Updates</Text>
            <View style={[styles.toggle, styles.toggleActive]}>
              <View style={styles.toggleCircle} />
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Wellness Check-ins</Text>
            <View style={styles.toggle}>
              <View style={styles.toggleCircleInactive} />
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Career Opportunities</Text>
            <View style={[styles.toggle, styles.toggleActive]}>
              <View style={styles.toggleCircle} />
            </View>
          </View>
        </Card>
        
        <Card title="App Settings" style={styles.card}>
          <TouchableOpacity style={styles.appSettingItem}>
            <Text style={styles.appSettingLabel}>Language</Text>
            <Text style={styles.appSettingValue}>English</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.appSettingItem}>
            <Text style={styles.appSettingLabel}>Data Usage</Text>
            <Text style={styles.appSettingValue}>Wi-Fi Only</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.appSettingItem}>
            <Text style={styles.appSettingLabel}>Privacy Settings</Text>
            <ChevronLeft size={20} color={Colors.textLight} style={{ transform: [{ rotate: "180deg" }] }} />
          </TouchableOpacity>
        </Card>
        
        <Button 
          title="Logout" 
          onPress={handleLogout}
          variant="outline"
          loading={isLoading}
          disabled={isLoading}
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: Colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 16,
  },
  profileDetails: {
    width: "100%",
    paddingHorizontal: 20,
  },
  profileDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.text,
  },
  card: {
    marginVertical: 8,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressItem: {
    alignItems: "center",
    width: "30%",
  },
  progressCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  progressValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  progressLabel: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: "center",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    padding: 2,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
  },
  toggleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.secondary,
    marginLeft: 20,
  },
  toggleCircleInactive: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.secondary,
  },
  appSettingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  appSettingLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  appSettingValue: {
    fontSize: 14,
    color: Colors.textLight,
  },
  logoutButton: {
    marginVertical: 20,
    marginHorizontal: 16,
    borderColor: Colors.error,
  },
  logoutButtonText: {
    color: Colors.error,
  },
});
