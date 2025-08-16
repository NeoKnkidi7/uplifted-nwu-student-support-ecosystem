import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking, Alert, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Calendar, MapPin, Briefcase, ExternalLink, Share2, BookmarkPlus } from "lucide-react-native";
import Button from "@/components/Button";
import Colors from "@/constants/colors";
import { mockCareerOpportunities } from "@/mocks/data";

export default function CareerOpportunityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const opportunity = mockCareerOpportunities.find(o => o.id === id);
  
  if (!opportunity) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={Colors.secondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Opportunity Details</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Opportunity not found</Text>
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
    Linking.openURL(opportunity.link).catch(() => {
      Alert.alert("Error", "Could not open the link. Please try again later.");
    });
  };

  const handleShare = () => {
    Alert.alert("Share", "Sharing functionality would be implemented here.");
  };

  const handleSave = () => {
    Alert.alert("Saved", "Opportunity saved to your bookmarks.");
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
        <Text style={styles.headerTitle}>Opportunity Details</Text>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Share2 size={20} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View style={styles.opportunityHeader}>
            <Text style={styles.opportunityTitle}>{opportunity.title}</Text>
            <Text style={styles.opportunityCompany}>{opportunity.company}</Text>
            
            <View 
              style={[
                styles.opportunityTypeTag,
                opportunity.type === "Internship" && styles.internshipTag,
                opportunity.type === "Graduate Program" && styles.graduateTag,
                opportunity.type === "Part-time" && styles.partTimeTag,
                opportunity.type === "Volunteer" && styles.volunteerTag,
              ]}
            >
              <Text 
                style={[
                  styles.opportunityTypeText,
                  opportunity.type === "Internship" && styles.internshipText,
                  opportunity.type === "Graduate Program" && styles.graduateText,
                  opportunity.type === "Part-time" && styles.partTimeText,
                  opportunity.type === "Volunteer" && styles.volunteerText,
                ]}
              >
                {opportunity.type}
              </Text>
            </View>
          </View>
          
          <View style={styles.opportunityCard}>
            <View style={styles.opportunityDetail}>
              <Calendar size={16} color={Colors.textLight} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Application Deadline:</Text>
              <Text style={styles.detailValue}>{formatDate(opportunity.deadline)}</Text>
            </View>
            
            <View style={styles.opportunityDetail}>
              <MapPin size={16} color={Colors.textLight} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailValue}>{opportunity.location}</Text>
            </View>
            
            <View style={styles.opportunityDetail}>
              <Briefcase size={16} color={Colors.textLight} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Type:</Text>
              <Text style={styles.detailValue}>{opportunity.type}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionText}>{opportunity.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Responsibilities</Text>
            <Text style={styles.sectionText}>
              • Assist with projects related to your field of study{"\n"}
              • Collaborate with team members on various initiatives{"\n"}
              • Participate in training and development activities{"\n"}
              • Apply theoretical knowledge to practical situations{"\n"}
              • Contribute to the organization's goals and objectives
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            <Text style={styles.sectionText}>
              • Currently enrolled at North-West University{"\n"}
              • Studying towards a relevant degree{"\n"}
              • Strong academic record{"\n"}
              • Good communication and interpersonal skills{"\n"}
              • Ability to work in a team environment
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Benefits</Text>
            <Text style={styles.sectionText}>
              • Valuable industry experience{"\n"}
              • Mentorship from professionals{"\n"}
              • Networking opportunities{"\n"}
              • Potential for future employment{"\n"}
              • Stipend or salary (depending on position)
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Application Process</Text>
            <Text style={styles.sectionText}>
              1. Submit your CV and cover letter through the company website{"\n"}
              2. Complete any additional application forms{"\n"}
              3. If shortlisted, participate in interviews or assessments{"\n"}
              4. Receive notification of outcome
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
            <Text style={styles.websiteLinkText}>Visit Company Website</Text>
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
  opportunityHeader: {
    marginBottom: 16,
  },
  opportunityTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  opportunityCompany: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 8,
  },
  opportunityTypeTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
    marginTop: 4,
  },
  internshipTag: {
    backgroundColor: "#E3F2FD",
  },
  graduateTag: {
    backgroundColor: "#E8F5E9",
  },
  partTimeTag: {
    backgroundColor: "#FFF3E0",
  },
  volunteerTag: {
    backgroundColor: "#F3E5F5",
  },
  opportunityTypeText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
  },
  internshipText: {
    color: Colors.info,
  },
  graduateText: {
    color: Colors.success,
  },
  partTimeText: {
    color: "#FF9800",
  },
  volunteerText: {
    color: Colors.primary,
  },
  opportunityCard: {
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
  opportunityDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailLabel: {
    width: 140,
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
