import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking, Alert, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Calendar, ExternalLink, Share2, BookmarkPlus } from "lucide-react-native";
import Button from "@/components/Button";
import Colors from "@/constants/colors";
import { mockBursaries } from "@/mocks/data";

export default function BursaryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const bursary = mockBursaries.find(b => b.id === id);
  
  if (!bursary) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={Colors.secondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bursary Details</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Bursary not found</Text>
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

  const handleApply = () => {
    Linking.openURL(bursary.link).catch(() => {
      Alert.alert("Error", "Could not open the link. Please try again later.");
    });
  };

  const handleShare = () => {
    Alert.alert("Share", "Sharing functionality would be implemented here.");
  };

  const handleSave = () => {
    Alert.alert("Saved", "Bursary saved to your bookmarks.");
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
        <Text style={styles.headerTitle}>Bursary Details</Text>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Share2 size={20} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View style={styles.bursaryHeader}>
            <Text style={styles.bursaryName}>{bursary.name}</Text>
            <Text style={styles.bursaryProvider}>{bursary.provider}</Text>
          </View>
          
          <View style={styles.bursaryCard}>
            <View style={styles.bursaryDetail}>
              <Text style={styles.detailLabel}>Amount:</Text>
              <Text style={styles.detailValue}>{bursary.amount}</Text>
            </View>
            
            <View style={styles.bursaryDetail}>
              <Text style={styles.detailLabel}>Deadline:</Text>
              <Text style={styles.detailValue}>{formatDate(bursary.deadline)}</Text>
            </View>
            
            <View style={styles.bursaryDetail}>
              <Text style={styles.detailLabel}>Eligibility:</Text>
              <Text style={styles.detailValue}>{bursary.eligibility}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionText}>{bursary.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            <Text style={styles.sectionText}>
              • South African citizen or permanent resident{"\n"}
              • Currently enrolled at North-West University{"\n"}
              • Meet the eligibility criteria specified above{"\n"}
              • Complete the application form before the deadline{"\n"}
              • Provide academic transcripts and supporting documents
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Application Process</Text>
            <Text style={styles.sectionText}>
              1. Complete the online application form{"\n"}
              2. Upload required documents{"\n"}
              3. Submit before the deadline{"\n"}
              4. Wait for notification of outcome
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <Text style={styles.sectionText}>
              For more information about this bursary, please contact:{"\n\n"}
              Email: bursaries@nwu.ac.za{"\n"}
              Phone: 018 299 2045{"\n"}
              Office: Building F1, Room 150, Potchefstroom Campus
            </Text>
          </View>
          
          <View style={styles.actionsContainer}>
            <Button 
              title="Apply Now" 
              onPress={handleApply}
              style={styles.applyButton}
            />
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <BookmarkPlus size={20} color={Colors.primary} />
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.websiteLink}
            onPress={handleApply}
          >
            <Text style={styles.websiteLinkText}>Visit Provider Website</Text>
            <ExternalLink size={16} color={Colors.primary} />
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
  bursaryHeader: {
    marginBottom: 16,
  },
  bursaryName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  bursaryProvider: {
    fontSize: 16,
    color: Colors.textLight,
  },
  bursaryCard: {
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
  bursaryDetail: {
    flexDirection: "row",
    marginBottom: 12,
  },
  detailLabel: {
    width: 100,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  detailValue: {
    flex: 1,
    fontSize: 16,
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
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  applyButton: {
    flex: 1,
    marginRight: 12,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 8,
  },
  saveButtonText: {
    color: Colors.primary,
    fontWeight: "bold",
    marginLeft: 8,
  },
  websiteLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  websiteLinkText: {
    color: Colors.primary,
    fontSize: 16,
    marginRight: 8,
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
