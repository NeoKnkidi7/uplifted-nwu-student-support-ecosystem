import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Calendar, Bell, CheckCircle, AlertCircle, Info } from "lucide-react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Colors from "@/constants/colors";
import { useDeadlines } from "@/hooks/deadlines-store";
import { Deadline } from "@/types";

export default function NotificationsScreen() {
  const { deadlines, toggleDeadlineCompletion } = useDeadlines();
  const [selectedTab, setSelectedTab] = useState<string>("deadlines");
  const router = useRouter();

  const tabs = [
    { id: "deadlines", label: "Deadlines" },
    { id: "notifications", label: "Notifications" },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };

  const getDeadlineIcon = (type: string) => {
    switch (type) {
      case "Academic":
        return <Calendar size={20} color={Colors.info} />;
      case "Financial":
        return <Bell size={20} color={Colors.warning} />;
      case "Administrative":
        return <Info size={20} color={Colors.primary} />;
      case "Event":
        return <Calendar size={20} color={Colors.success} />;
      default:
        return <Calendar size={20} color={Colors.primary} />;
    }
  };

  const renderDeadlineItem = ({ item }: { item: Deadline }) => {
    const deadline = new Date(item.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);
    
    const isPast = deadline < today;
    const isToday = deadline.getTime() === today.getTime();
    
    return (
      <Card style={styles.deadlineCard}>
        <View style={styles.deadlineHeader}>
          <View style={styles.deadlineTypeContainer}>
            {getDeadlineIcon(item.type)}
            <Text style={styles.deadlineType}>{item.type}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkButton}
            onPress={() => toggleDeadlineCompletion(item.id)}
          >
            {item.isCompleted ? (
              <CheckCircle size={24} color={Colors.success} />
            ) : (
              <View style={styles.uncheckedCircle} />
            )}
          </TouchableOpacity>
        </View>
        
        <Text style={styles.deadlineTitle}>{item.title}</Text>
        <Text style={styles.deadlineDescription}>{item.description}</Text>
        
        <View style={styles.deadlineFooter}>
          <View style={styles.dateContainer}>
            <Calendar size={16} color={Colors.textLight} style={styles.dateIcon} />
            <Text 
              style={[
                styles.deadlineDate,
                isPast && !item.isCompleted && styles.pastDeadline,
                isToday && !item.isCompleted && styles.todayDeadline,
              ]}
            >
              {formatDate(item.date)}
              {isToday && !item.isCompleted && " (Today)"}
              {isPast && !item.isCompleted && " (Overdue)"}
            </Text>
          </View>
          
          {item.isCompleted && (
            <View style={styles.completedTag}>
              <Text style={styles.completedText}>Completed</Text>
            </View>
          )}
        </View>
      </Card>
    );
  };

  // Mock notifications for demo
  const notifications = [
    {
      id: "notif1",
      title: "New Bursary Available",
      message: "A new bursary for Engineering students has been added.",
      date: "2025-08-06",
      read: false,
      type: "financial",
    },
    {
      id: "notif2",
      title: "Wellness Workshop",
      message: "Join our stress management workshop on August 10th.",
      date: "2025-08-05",
      read: true,
      type: "wellness",
    },
    {
      id: "notif3",
      title: "Career Fair Reminder",
      message: "Don't forget the Career Fair on September 10th.",
      date: "2025-08-04",
      read: true,
      type: "career",
    },
    {
      id: "notif4",
      title: "Academic Advisor Meeting",
      message: "Your academic advisor has scheduled a meeting for August 15th.",
      date: "2025-08-03",
      read: false,
      type: "academic",
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "academic":
        return <Calendar size={20} color={Colors.info} />;
      case "financial":
        return <Bell size={20} color={Colors.warning} />;
      case "wellness":
        return <AlertCircle size={20} color={Colors.error} />;
      case "career":
        return <Info size={20} color={Colors.success} />;
      default:
        return <Bell size={20} color={Colors.primary} />;
    }
  };

  const renderNotificationItem = ({ item }: { item: any }) => {
    return (
      <Card style={[styles.notificationCard, !item.read && styles.unreadCard]}>
        <View style={styles.notificationHeader}>
          <View style={styles.notificationTypeContainer}>
            {getNotificationIcon(item.type)}
            {!item.read && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.notificationDate}>{formatDate(item.date)}</Text>
        </View>
        
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </Card>
    );
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "deadlines":
        return (
          <FlatList
            data={deadlines.sort((a, b) => {
              if (a.isCompleted && !b.isCompleted) return 1;
              if (!a.isCompleted && b.isCompleted) return -1;
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            })}
            renderItem={renderDeadlineItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No deadlines found</Text>
              </View>
            }
          />
        );
      case "notifications":
        return (
          <FlatList
            data={notifications}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No notifications found</Text>
              </View>
            }
          />
        );
      default:
        return null;
    }
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
        <Text style={styles.headerTitle}>Notifications & Deadlines</Text>
        <View style={{ width: 40 }} />
      </View>
      
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
  listContent: {
    padding: 16,
  },
  deadlineCard: {
    marginBottom: 16,
  },
  deadlineHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  deadlineTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deadlineType: {
    fontSize: 14,
    color: Colors.textLight,
    marginLeft: 8,
  },
  checkButton: {
    padding: 4,
  },
  uncheckedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  deadlineTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  deadlineDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  deadlineFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateIcon: {
    marginRight: 4,
  },
  deadlineDate: {
    fontSize: 14,
    color: Colors.textLight,
  },
  pastDeadline: {
    color: Colors.error,
    fontWeight: "500",
  },
  todayDeadline: {
    color: Colors.warning,
    fontWeight: "500",
  },
  completedTag: {
    backgroundColor: Colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  completedText: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: "500",
  },
  notificationCard: {
    marginBottom: 16,
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  notificationTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: 8,
  },
  notificationDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: Colors.textLight,
    fontSize: 16,
  },
});
