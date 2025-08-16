import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Calendar, Phone, Users, BookOpen, AlertCircle } from "lucide-react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Colors from "@/constants/colors";
import { mockMentalHealthResources } from "@/mocks/data";
import { MentalHealthResource } from "@/types";

export default function WellnessScreen() {
  const [selectedTab, setSelectedTab] = useState<string>("resources");
  const router = useRouter();

  const tabs = [
    { id: "resources", label: "Resources" },
    { id: "check-in", label: "Wellness Check-in" },
    { id: "crisis", label: "Crisis Help" },
  ];

  const resourceTypes = [
    { type: "Counselor", icon: <Calendar size={20} color={Colors.primary} /> },
    { type: "Psychologist", icon: <Calendar size={20} color={Colors.primary} /> },
    { type: "Workshop", icon: <BookOpen size={20} color={Colors.primary} /> },
    { type: "Support Group", icon: <Users size={20} color={Colors.primary} /> },
    { type: "Crisis", icon: <Phone size={20} color={Colors.error} /> },
  ];

  const getIconForType = (type: string) => {
    const resourceType = resourceTypes.find(rt => rt.type === type);
    return resourceType ? resourceType.icon : <Calendar size={20} color={Colors.primary} />;
  };

  const renderResourceItem = ({ item }: { item: MentalHealthResource }) => {
    return (
      <Card
        style={styles.resourceCard}
        onPress={() => router.push(`/mental-health/${item.id}`)}
      >
        <View style={styles.resourceHeader}>
          <View style={styles.resourceIconContainer}>
            {getIconForType(item.type)}
          </View>
          <View style={styles.resourceHeaderText}>
            <Text style={styles.resourceTitle}>{item.title}</Text>
            <Text style={styles.resourceType}>{item.type}</Text>
          </View>
        </View>
        
        <Text style={styles.resourceDescription}>{item.description}</Text>
        
        <View style={styles.resourceFooter}>
          <Text style={styles.resourceLocation}>{item.location} Campus</Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => router.push(`/mental-health/${item.id}`)}
          >
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  const renderResourcesTab = () => {
    return (
      <FlatList
        data={mockMentalHealthResources}
        renderItem={renderResourceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resourcesList}
      />
    );
  };

  const renderCheckInTab = () => {
    return (
      <View style={styles.checkInContainer}>
        <Card style={styles.checkInCard}>
          <Text style={styles.checkInTitle}>Weekly Wellness Check-in</Text>
          <Text style={styles.checkInDescription}>
            Take a few minutes to check in with yourself. Your responses are confidential and can help you track your mental wellbeing over time.
          </Text>
          
          <View style={styles.moodContainer}>
            <Text style={styles.moodQuestion}>How are you feeling today?</Text>
            <View style={styles.moodOptions}>
              <TouchableOpacity style={styles.moodOption}>
                <Text style={styles.moodEmoji}>😊</Text>
                <Text style={styles.moodLabel}>Great</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.moodOption}>
                <Text style={styles.moodEmoji}>🙂</Text>
                <Text style={styles.moodLabel}>Good</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.moodOption}>
                <Text style={styles.moodEmoji}>😐</Text>
                <Text style={styles.moodLabel}>Okay</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.moodOption}>
                <Text style={styles.moodEmoji}>🙁</Text>
                <Text style={styles.moodLabel}>Not Great</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.moodOption}>
                <Text style={styles.moodEmoji}>😢</Text>
                <Text style={styles.moodLabel}>Struggling</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <Button 
            title="Continue Check-in" 
            onPress={() => {}}
            style={styles.checkInButton}
          />
        </Card>
        
        <Card style={styles.previousChecksCard}>
          <Text style={styles.previousChecksTitle}>Previous Check-ins</Text>
          <Text style={styles.noChecksText}>
            You haven&apos;t completed any check-ins yet. Start your wellness journey today!
          </Text>
        </Card>
      </View>
    );
  };

  const renderCrisisTab = () => {
    return (
      <View style={styles.crisisContainer}>
        <Card style={styles.crisisCard}>
          <View style={styles.crisisHeader}>
            <AlertCircle size={24} color={Colors.error} />
            <Text style={styles.crisisTitle}>Emergency Support</Text>
          </View>
          
          <Text style={styles.crisisDescription}>
            If you&apos;re experiencing a mental health crisis or emergency, please reach out for immediate help:
          </Text>
          
          <TouchableOpacity style={styles.emergencyButton}>
            <Phone size={20} color={Colors.secondary} />
            <Text style={styles.emergencyButtonText}>Call Campus Crisis Line</Text>
          </TouchableOpacity>
          
          <View style={styles.helplineContainer}>
            <Text style={styles.helplineTitle}>24/7 Helplines:</Text>
            <View style={styles.helplineItem}>
              <Text style={styles.helplineName}>NWU Crisis Helpline:</Text>
              <Text style={styles.helplineNumber}>018 299 1777</Text>
            </View>
            <View style={styles.helplineItem}>
              <Text style={styles.helplineName}>SA Depression & Anxiety Group:</Text>
              <Text style={styles.helplineNumber}>0800 567 567</Text>
            </View>
            <View style={styles.helplineItem}>
              <Text style={styles.helplineName}>Suicide Crisis Line:</Text>
              <Text style={styles.helplineNumber}>0800 567 567</Text>
            </View>
          </View>
        </Card>
        
        <Card style={styles.supportCard}>
          <Text style={styles.supportTitle}>On-Campus Support</Text>
          <Text style={styles.supportDescription}>
            The Student Counseling Services offers walk-in crisis appointments during business hours:
          </Text>
          
          <View style={styles.campusSupport}>
            <View style={styles.campusSupportItem}>
              <Text style={styles.campusName}>Potchefstroom:</Text>
              <Text style={styles.campusAddress}>Building F20, Ground Floor</Text>
            </View>
            <View style={styles.campusSupportItem}>
              <Text style={styles.campusName}>Vanderbijlpark:</Text>
              <Text style={styles.campusAddress}>Building 13, Room G03</Text>
            </View>
            <View style={styles.campusSupportItem}>
              <Text style={styles.campusName}>Mahikeng:</Text>
              <Text style={styles.campusAddress}>Student Centre, First Floor</Text>
            </View>
          </View>
        </Card>
      </View>
    );
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "resources":
        return renderResourcesTab();
      case "check-in":
        return renderCheckInTab();
      case "crisis":
        return renderCrisisTab();
      default:
        return renderResourcesTab();
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Mental Wellness" />
      
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              selectedTab === tab.id && styles.activeTabButton
            ]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Text 
              style={[
                styles.tabButtonText,
                selectedTab === tab.id && styles.activeTabButtonText
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: Colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: Colors.primary,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textLight,
  },
  activeTabButtonText: {
    color: Colors.primary,
  },
  resourcesList: {
    padding: 16,
  },
  resourceCard: {
    marginBottom: 16,
  },
  resourceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  resourceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  resourceHeaderText: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 2,
  },
  resourceType: {
    fontSize: 14,
    color: Colors.textLight,
  },
  resourceDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  resourceFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resourceLocation: {
    fontSize: 14,
    color: Colors.textLight,
  },
  contactButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  contactButtonText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: "500",
  },
  checkInContainer: {
    padding: 16,
  },
  checkInCard: {
    marginBottom: 16,
  },
  checkInTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 12,
  },
  checkInDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 20,
    lineHeight: 20,
  },
  moodContainer: {
    marginBottom: 20,
  },
  moodQuestion: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 12,
  },
  moodOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moodOption: {
    alignItems: "center",
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    color: Colors.text,
  },
  checkInButton: {
    marginTop: 8,
  },
  previousChecksCard: {
    marginBottom: 16,
  },
  previousChecksTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 12,
  },
  noChecksText: {
    fontSize: 14,
    color: Colors.textLight,
    fontStyle: "italic",
  },
  crisisContainer: {
    padding: 16,
  },
  crisisCard: {
    marginBottom: 16,
  },
  crisisHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  crisisTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.error,
    marginLeft: 8,
  },
  crisisDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyButton: {
    backgroundColor: Colors.error,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emergencyButtonText: {
    color: Colors.secondary,
    fontWeight: "bold",
    marginLeft: 8,
  },
  helplineContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
  },
  helplineTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 8,
  },
  helplineItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  helplineName: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  helplineNumber: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500",
  },
  supportCard: {
    marginBottom: 16,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 12,
  },
  supportDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 20,
  },
  campusSupport: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
  },
  campusSupportItem: {
    marginBottom: 8,
  },
  campusName: {
    fontSize: 14,
    fontWeight: "500",
