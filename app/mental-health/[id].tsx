import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Alert, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, MapPin, Calendar, MessageCircle, Share2, Flag } from "lucide-react-native";
import Button from "@/components/Button";
import Colors from "@/constants/colors";
import { mockResources } from "@/mocks/data";

export default function ResourceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const resource = mockResources.find(r => r.id === id);
  
  if (!resource) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={Colors.secondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Resource Details</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Resource not found</Text>
          <Button 
            title="Go Back" 
            onPress={() => router.back()}
            style={styles.goBackButton}
          />
        </View>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "long", 
      day: "numeric",
      year: "numeric"
    });
  };

  const handleContact = () => {
    Alert.alert("Contact", "Messaging functionality would be implemented here.");
  };

  const handleShare = () => {
    Alert.alert("Share", "Sharing functionality would be implemented here.");
  };

  const handleReport = () => {
    Alert.alert(
      "Report Listing",
      "Are you sure you want to report this listing?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Report",
          onPress: () => {
            Alert.alert(
              "Report Submitted",
              "Thank you for your report. Our team will review this listing."
            );
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
        <Text style={styles.headerTitle}>Resource Details</Text>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Share2 size={20} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View 
            style={[
              styles.statusTag,
              resource.isOffer ? styles.offerTag : styles.requestTag
            ]}
          >
            <Text 
              style={[
                styles.statusText,
                resource.isOffer ? styles.offerText : styles.requestText
              ]}
            >
              {resource.isOffer ? "Offering" : "Looking for"}
            </Text>
          </View>
          
          <Text style={styles.resourceTitle}>{resource.title}</Text>
          
          {resource.image && (
            <Image
              source={{ uri: resource.image }}
              style={styles.resourceImage}
              resizeMode="cover"
            />
          )}
          
          <View style={styles.resourceCard}>
            <View style={styles.resourceDetail}>
              <MapPin size={16} color={Colors.textLight} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailValue}>{resource.location} Campus</Text>
            </View>
            
            <View style={styles.resourceDetail}>
              <Calendar size={16} color={Colors.textLight} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Posted:</Text>
              <Text style={styles.detailValue}>{formatDate(resource.createdAt)}</Text>
            </View>
            
            {resource.condition && (
              <View style={styles.resourceDetail}>
                <Text style={styles.detailLabel}>Condition:</Text>
                <Text style={styles.detailValue}>{resource.condition}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionText}>{resource.description}</Text>
          </View>
          
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <View style={styles.userAvatar}>
                <Text style={styles.userInitials}>
                  {resource.userName.split(" ").map(n => n[0]).join("")}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{resource.userName}</Text>
                <Text style={styles.userStatus}>NWU Student</Text>
              </View>
            </View>
            
            <Button 
              title="Contact" 
              onPress={handleContact}
              style={styles.contactButton}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.reportButton}
            onPress={handleReport}
          >
            <Flag size={16} color={Colors.error} style={styles.reportIcon} />
            <Text style={styles.reportText}>Report this listing</Text>
          </TouchableOpacity>
        </View>
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
  shareButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  statusTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 8,
  },
  offerTag: {
    backgroundColor: "#E8F5E9",
  },
  requestTag: {
    backgroundColor: "#FFF3E0",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  offerText: {
    color: Colors.success,
  },
  requestText: {
    color: "#FF9800",
  },
  resourceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  resourceImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  resourceCard: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  resourceDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailLabel: {
    width: 80,
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  userSection: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  userInitials: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "bold",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 14,
    color: Colors.textLight,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  reportIcon: {
    marginRight: 8,
  },
  reportText: {
    color: Colors.error,
    fontSize: 14,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    color: Colors.textLight,
    marginBottom: 20,
  },
  goBackButton: {
    width: 200,
  },
});
