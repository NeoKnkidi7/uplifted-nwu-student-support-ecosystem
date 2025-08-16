import React from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Calendar, BookOpen, BarChart4, Heart, Briefcase, Users } from "lucide-react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Colors from "@/constants/colors";
import { useAuth } from "@/hooks/auth-store";
import { useDeadlines } from "@/hooks/deadlines-store";

export default function HomeScreen() {
  const { user } = useAuth();
  const { getUpcomingDeadlines } = useDeadlines();
  const router = useRouter();
  
  const upcomingDeadlines = getUpcomingDeadlines().slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <View style={styles.container}>
      <Header title="UpliftED" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.name?.split(" ")[0] || "Student"}
          </Text>
          <Text style={styles.campusText}>
            {user?.campus || "NWU"} Campus
          </Text>
        </View>
        
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => router.push("/academic" as any)}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#E3F2FD" }]}>
              <BookOpen size={24} color={Colors.info} />
            </View>
            <Text style={styles.actionText}>Academic</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => router.push("/financial" as any)}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#E8F5E9" }]}>
              <BarChart4 size={24} color={Colors.success} />
            </View>
            <Text style={styles.actionText}>Financial</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => router.push("/wellness" as any)}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#FFF3E0" }]}>
              <Heart size={24} color="#FF9800" />
            </View>
            <Text style={styles.actionText}>Wellness</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => router.push("/career" as any)}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#F3E5F5" }]}>
              <Briefcase size={24} color={Colors.primary} />
            </View>
            <Text style={styles.actionText}>Career</Text>
          </TouchableOpacity>
        </View>
        
        <Card title="Upcoming Deadlines" style={styles.card}>
          {upcomingDeadlines.length > 0 ? (
            upcomingDeadlines.map((deadline) => (
              <View key={deadline.id} style={styles.deadlineItem}>
                <View style={styles.deadlineIconContainer}>
                  <Calendar size={20} color={Colors.primary} />
                </View>
                <View style={styles.deadlineContent}>
                  <Text style={styles.deadlineTitle}>{deadline.title}</Text>
                  <Text style={styles.deadlineDate}>{formatDate(deadline.date)}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDeadlinesText}>No upcoming deadlines</Text>
          )}
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push("/notifications" as any)}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </Card>
        
        <Card title="Campus News" style={styles.card}>
          <View style={styles.newsItem}>
            <Image
              source={{ uri: "https://r2-pub.rork.com/attachments/4vic6umjqkt8mog8pqnxr" }}
              style={styles.newsImage}
              resizeMode="cover"
            />
            <Text style={styles.newsTitle}>NWU Open Day - August 15th</Text>
            <Text style={styles.newsDescription}>
              Join us for the annual NWU Open Day. Meet faculty, explore campus, and learn about programs.
            </Text>
          </View>
        </Card>
        
        <Card title="Student Resources" style={styles.card}>
          <TouchableOpacity 
            style={styles.resourceItem}
            onPress={() => router.push("/(tabs)/academic" as any)}
          >
            <View style={styles.resourceIconContainer}>
              <BookOpen size={20} color={Colors.primary} />
            </View>
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>AI Academic Assistant</Text>
              <Text style={styles.resourceDescription}>Get help with your studies</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resourceItem}
            onPress={() => router.push("/(tabs)/financial" as any)}
          >
            <View style={styles.resourceIconContainer}>
              <BarChart4 size={20} color={Colors.primary} />
            </View>
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>Bursary Finder</Text>
              <Text style={styles.resourceDescription}>Find financial aid opportunities</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resourceItem}
            onPress={() => router.push("/(tabs)/wellness" as any)}
          >
            <View style={styles.resourceIconContainer}>
              <Heart size={20} color={Colors.primary} />
            </View>
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>Mental Health Support</Text>
              <Text style={styles.resourceDescription}>Access counseling services</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resourceItem}
            onPress={() => router.push("/(tabs)/career" as any)}
          >
            <View style={styles.resourceIconContainer}>
              <Briefcase size={20} color={Colors.primary} />
            </View>
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>Career Resources</Text>
              <Text style={styles.resourceDescription}>Build your CV and find opportunities</Text>
            </View>
          </TouchableOpacity>
        </Card>
        
        <Card title="Student Exchange" style={styles.card}>
          <TouchableOpacity 
            style={styles.exchangeButton}
            onPress={() => router.push("/resource-exchange" as any)}
          >
            <Users size={20} color={Colors.secondary} />
            <Text style={styles.exchangeButtonText}>Browse Student Resources</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  welcomeSection: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  campusText: {
    fontSize: 16,
    color: Colors.textLight,
    marginTop: 4,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  actionItem: {
    alignItems: "center",
    width: "22%",
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: Colors.text,
    textAlign: "center",
  },
  card: {
    marginVertical: 8,
  },
  deadlineItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  deadlineIconContainer: {
    marginRight: 12,
  },
  deadlineContent: {
    flex: 1,
  },
  deadlineTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  deadlineDate: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 2,
  },
  noDeadlinesText: {
    textAlign: "center",
    color: Colors.textLight,
    paddingVertical: 10,
  },
  viewAllButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  viewAllText: {
    color: Colors.primary,
    fontWeight: "500",
  },
  newsItem: {
    width: "100%",
  },
  newsImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 6,
  },
  newsDescription: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  resourceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  resourceIconContainer: {
    marginRight: 12,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  resourceDescription: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 2,
  },
  exchangeButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  exchangeButtonText: {
    color: Colors.secondary,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
