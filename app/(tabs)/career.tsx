import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Briefcase, FileText, Users, Calendar, ExternalLink } from "lucide-react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Colors from "@/constants/colors";
import { mockCareerOpportunities } from "@/mocks/data";
import { CareerOpportunity } from "@/types";

export default function CareerScreen() {
  const [selectedTab, setSelectedTab] = useState<string>("opportunities");
  const router = useRouter();

  const tabs = [
    { id: "opportunities", label: "Opportunities" },
    { id: "cv-builder", label: "CV Builder" },
    { id: "interview", label: "Interview Prep" },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };

  const renderOpportunityItem = ({ item }: { item: CareerOpportunity }) => {
    const deadline = new Date(item.deadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return (
      <Card
        style={styles.opportunityCard}
        onPress={() => router.push(`/career/${item.id}`)}
      >
        <View style={styles.opportunityHeader}>
          <View style={styles.opportunityTitleContainer}>
            <Text style={styles.opportunityTitle}>{item.title}</Text>
            <Text style={styles.opportunityCompany}>{item.company}</Text>
          </View>
          <View 
            style={[
              styles.opportunityTypeTag,
              item.type === "Internship" && styles.internshipTag,
              item.type === "Graduate Program" && styles.graduateTag,
              item.type === "Part-time" && styles.partTimeTag,
              item.type === "Volunteer" && styles.volunteerTag,
            ]}
          >
            <Text 
              style={[
                styles.opportunityTypeText,
                item.type === "Internship" && styles.internshipText,
                item.type === "Graduate Program" && styles.graduateText,
                item.type === "Part-time" && styles.partTimeText,
                item.type === "Volunteer" && styles.volunteerText,
              ]}
            >
              {item.type}
            </Text>
          </View>
        </View>
        
        <Text style={styles.opportunityDescription}>{item.description}</Text>
        
        <View style={styles.opportunityDetails}>
          <View style={styles.opportunityDetail}>
            <Calendar size={16} color={Colors.textLight} style={styles.detailIcon} />
            <Text style={styles.detailText}>
              Deadline: {formatDate(item.deadline)}
              {daysUntilDeadline <= 14 && daysUntilDeadline > 0 && (
                <Text style={styles.urgentText}> (Urgent!)</Text>
              )}
            </Text>
          </View>
          
          <View style={styles.opportunityDetail}>
            <Briefcase size={16} color={Colors.textLight} style={styles.detailIcon} />
            <Text style={styles.detailText}>Location: {item.location}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => router.push(`/career/${item.id}`)}
        >
          <Text style={styles.applyButtonText}>View Details</Text>
          <ExternalLink size={16} color={Colors.secondary} />
        </TouchableOpacity>
      </Card>
    );
  };

  const renderOpportunitiesTab = () => {
    return (
      <FlatList
        data={mockCareerOpportunities}
        renderItem={renderOpportunityItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.opportunitiesList}
      />
    );
  };

  const renderCVBuilderTab = () => {
    return (
      <View style={styles.cvBuilderContainer}>
        <Card style={styles.cvCard}>
          <View style={styles.cvHeader}>
            <FileText size={24} color={Colors.primary} />
            <Text style={styles.cvTitle}>NWU CV Builder</Text>
          </View>
          
          <Text style={styles.cvDescription}>
            Create a professional CV with our easy-to-use builder. Choose from NWU-branded templates and get tips for each section.
          </Text>
          
          <View style={styles.cvTemplates}>
            <Text style={styles.templatesTitle}>Templates</Text>
            <View style={styles.templatesList}>
              <TouchableOpacity style={styles.templateItem}>
                <View style={styles.templatePreview}>
                  <View style={styles.templateHeader} />
                  <View style={styles.templateContent}>
                    <View style={styles.templateLine} />
                    <View style={styles.templateLine} />
                    <View style={styles.templateLine} />
                  </View>
                </View>
                <Text style={styles.templateName}>Professional</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.templateItem}>
                <View style={[styles.templatePreview, styles.templatePreviewAlt]}>
                  <View style={styles.templateSidebar} />
                  <View style={styles.templateContentAlt}>
                    <View style={styles.templateLine} />
                    <View style={styles.templateLine} />
                    <View style={styles.templateLine} />
                  </View>
                </View>
                <Text style={styles.templateName}>Modern</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.templateItem}>
                <View style={[styles.templatePreview, styles.templatePreviewCreative]}>
                  <View style={styles.templateHeaderCreative} />
                  <View style={styles.templateContentCreative}>
                    <View style={styles.templateLine} />
                    <View style={styles.templateLine} />
                    <View style={styles.templateLine} />
                  </View>
                </View>
                <Text style={styles.templateName}>Creative</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity style={styles.startCVButton}>
            <Text style={styles.startCVButtonText}>Start Building Your CV</Text>
          </TouchableOpacity>
        </Card>
        
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>CV Tips</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipNumber}>1.</Text>
            <Text style={styles.tipText}>Keep your CV concise and relevant (1-2 pages)</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipNumber}>2.</Text>
            <Text style={styles.tipText}>Highlight achievements with quantifiable results</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipNumber}>3.</Text>
            <Text style={styles.tipText}>Tailor your CV for each application</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipNumber}>4.</Text>
            <Text style={styles.tipText}>Use action verbs (achieved, implemented, led)</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipNumber}>5.</Text>
            <Text style={styles.tipText}>Proofread carefully for errors</Text>
          </View>
        </Card>
      </View>
    );
  };

  const renderInterviewTab = () => {
    return (
      <View style={styles.interviewContainer}>
        <Card style={styles.interviewCard}>
          <Text style={styles.interviewTitle}>AI Interview Coach</Text>
          <Text style={styles.interviewDescription}>
            Practice your interview skills with our AI-powered coach. Get feedback on your responses and improve your confidence.
          </Text>
          
          <View style={styles.interviewCategories}>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={[styles.categoryIcon, { backgroundColor: "#E3F2FD" }]}>
                <Briefcase size={24} color={Colors.info} />
              </View>
              <Text style={styles.categoryName}>General</Text>
              <Text style={styles.categoryDescription}>Common interview questions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryItem}>
              <View style={[styles.categoryIcon, { backgroundColor: "#E8F5E9" }]}>
                <Users size={24} color={Colors.success} />
              </View>
              <Text style={styles.categoryName}>Behavioral</Text>
              <Text style={styles.categoryDescription}>Situational questions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryItem}>
              <View style={[styles.categoryIcon, { backgroundColor: "#F3E5F5" }]}>
                <FileText size={24} color={Colors.primary} />
              </View>
              <Text style={styles.categoryName}>Technical</Text>
              <Text style={styles.categoryDescription}>Field-specific questions</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.startInterviewButton}>
            <Text style={styles.startInterviewButtonText}>Start Practice Interview</Text>
          </TouchableOpacity>
        </Card>
        
        <Card style={styles.interviewTipsCard}>
          <Text style={styles.interviewTipsTitle}>Interview Tips</Text>
          <View style={styles.interviewTipItem}>
            <Text style={styles.interviewTipText}>
              • Research the company thoroughly before the interview
            </Text>
          </View>
          <View style={styles.interviewTipItem}>
            <Text style={styles.interviewTipText}>
              • Prepare examples using the STAR method (Situation, Task, Action, Result)
            </Text>
          </View>
          <View style={styles.interviewTipItem}>
            <Text style={styles.interviewTipText}>
              • Dress professionally and arrive 10-15 minutes early
            </Text>
          </View>
          <View style={styles.interviewTipItem}>
            <Text style={styles.interviewTipText}>
              • Prepare thoughtful questions to ask the interviewer
            </Text>
          </View>
          <View style={styles.interviewTipItem}>
            <Text style={styles.interviewTipText}>
              • Send a thank-you email within 24 hours after the interview
            </Text>
          </View>
        </Card>
      </View>
    );
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "opportunities":
        return renderOpportunitiesTab();
      case "cv-builder":
        return renderCVBuilderTab();
      case "interview":
        return renderInterviewTab();
      default:
        return renderOpportunitiesTab();
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Career Development" />
      
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
  opportunitiesList: {
    padding: 16,
  },
  opportunityCard: {
    marginBottom: 16,
  },
  opportunityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  opportunityTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  opportunityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  opportunityCompany: {
    fontSize: 14,
    color: Colors.textLight,
  },
  opportunityTypeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
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
    fontSize: 12,
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
  opportunityDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  opportunityDetails: {
    marginBottom: 16,
  },
  opportunityDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  urgentText: {
    color: Colors.error,
    fontWeight: "bold",
  },
  applyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    color: Colors.secondary,
    fontWeight: "bold",
    marginRight: 8,
  },
  cvBuilderContainer: {
    padding: 16,
  },
  cvCard: {
    marginBottom: 16,
  },
  cvHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cvTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginLeft: 8,
  },
  cvDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 20,
    lineHeight: 20,
  },
  cvTemplates: {
    marginBottom: 20,
  },
  templatesTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 12,
  },
  templatesList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  templateItem: {
    alignItems: "center",
    width: "30%",
  },
  templatePreview: {
    width: 80,
    height: 100,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
    marginBottom: 8,
  },
  templateHeader: {
    height: 20,
    backgroundColor: Colors.primary,
  },
  templateContent: {
    flex: 1,
    padding: 4,
    backgroundColor: Colors.secondary,
  },
  templatePreviewAlt: {
    flexDirection: "row",
  },
  templateSidebar: {
    width: 20,
    backgroundColor: Colors.primary,
  },
  templateContentAlt: {
    flex: 1,
    padding: 4,
    backgroundColor: Colors.secondary,
  },
  templatePreviewCreative: {
    backgroundColor: Colors.secondary,
  },
  templateHeaderCreative: {
    height: 30,
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 20,
  },
  templateContentCreative: {
    flex: 1,
    padding: 4,
  },
  templateLine: {
    height: 4,
    backgroundColor: "#E0E0E0",
    marginBottom: 4,
    borderRadius: 2,
  },
  templateName: {
    fontSize: 12,
    color: Colors.text,
  },
  startCVButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  startCVButtonText: {
    color: Colors.secondary,
    fontWeight: "bold",
  },
  tipsCard: {
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tipNumber: {
    width: 20,
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primary,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  interviewContainer: {
    padding: 16,
  },
  interviewCard: {
    marginBottom: 16,
  },
  interviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 12,
  },
  interviewDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 20,
    lineHeight: 20,
  },
  interviewCategories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: "center",
    width: "30%",
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: "center",
  },
  startInterviewButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  startInterviewButtonText: {
    color: Colors.secondary,
    fontWeight: "bold",
  },
  interviewTipsCard: {
    marginBottom: 16,
  },
  interviewTipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 12,
  },
  interviewTipItem: {
    marginBottom: 8,
  },
  interviewTipText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
});
