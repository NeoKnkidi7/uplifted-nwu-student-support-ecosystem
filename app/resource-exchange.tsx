import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Search, Plus, Book, Car, ShoppingBag } from "lucide-react-native";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Colors from "@/constants/colors";
import { mockResources } from "@/mocks/data";
import { Resource } from "@/types";

export default function ResourceExchangeScreen() {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [showOffers, setShowOffers] = useState<boolean | null>(null);
  const router = useRouter();

  const tabs = [
    { id: "all", label: "All" },
    { id: "textbooks", label: "Textbooks" },
    { id: "equipment", label: "Equipment" },
    { id: "transport", label: "Transport" },
    { id: "food", label: "Food" },
  ];

  const getIconForType = (type: string) => {
    switch (type) {
      case "Textbook":
        return <Book size={20} color={Colors.info} />;
      case "Equipment":
        return <Book size={20} color={Colors.primary} />;
      case "Transport":
        return <Car size={20} color={Colors.success} />;
      case "Food":
        return <ShoppingBag size={20} color={Colors.warning} />;
      default:
        return <Book size={20} color={Colors.primary} />;
    }
  };

  const filteredResources = mockResources.filter(resource => {
    const matchesTab = 
      selectedTab === "all" || 
      (selectedTab === "textbooks" && resource.type === "Textbook") ||
      (selectedTab === "equipment" && resource.type === "Equipment") ||
      (selectedTab === "transport" && resource.type === "Transport") ||
      (selectedTab === "food" && resource.type === "Food");
    
    const matchesOfferFilter = 
      showOffers === null || 
      (showOffers && resource.isOffer) || 
      (!showOffers && !resource.isOffer);
    
    return matchesTab && matchesOfferFilter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric"
      });
    }
  };

  const renderResourceItem = ({ item }: { item: Resource }) => {
    return (
      <Card
        style={styles.resourceCard}
        onPress={() => router.push(`/resource/${item.id}`)}
      >
        <View style={styles.resourceHeader}>
          <View style={styles.resourceTypeContainer}>
            {getIconForType(item.type)}
            <Text style={styles.resourceType}>{item.type}</Text>
          </View>
          <View 
            style={[
              styles.statusTag,
              item.isOffer ? styles.offerTag : styles.requestTag
            ]}
          >
            <Text 
              style={[
                styles.statusText,
                item.isOffer ? styles.offerText : styles.requestText
              ]}
            >
              {item.isOffer ? "Offering" : "Looking for"}
            </Text>
          </View>
        </View>
        
        <Text style={styles.resourceTitle}>{item.title}</Text>
        <Text style={styles.resourceDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.resourceFooter}>
          <View style={styles.resourceInfo}>
            <Text style={styles.resourceLocation}>{item.location} Campus</Text>
            <Text style={styles.resourceDate}>{formatDate(item.createdAt)}</Text>
          </View>
          <Text style={styles.resourceUser}>{item.userName}</Text>
        </View>
      </Card>
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
        <Text style={styles.headerTitle}>Resource Exchange</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={20} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filtersContainer}>
        <FlatList
          data={tabs}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === item.id && styles.activeTabButton
              ]}
              onPress={() => setSelectedTab(item.id)}
            >
              <Text 
                style={[
                  styles.tabButtonText,
                  selectedTab === item.id && styles.activeTabButtonText
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsList}
        />
        
        <View style={styles.offerFilterContainer}>
          <TouchableOpacity
            style={[
              styles.offerFilterButton,
              showOffers === true && styles.activeOfferFilterButton
            ]}
            onPress={() => setShowOffers(showOffers === true ? null : true)}
          >
            <Text 
              style={[
                styles.offerFilterText,
                showOffers === true && styles.activeOfferFilterText
              ]}
            >
              Offers
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.offerFilterButton,
              showOffers === false && styles.activeOfferFilterButton
            ]}
            onPress={() => setShowOffers(showOffers === false ? null : false)}
          >
            <Text 
              style={[
                styles.offerFilterText,
                showOffers === false && styles.activeOfferFilterText
              ]}
            >
              Requests
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={filteredResources}
        renderItem={renderResourceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resourcesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No resources found</Text>
          </View>
        }
      />
      
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
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
  searchButton: {
    padding: 8,
  },
  filtersContainer: {
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabsList: {
    paddingHorizontal: 16,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: Colors.primary,
  },
  tabButtonText: {
    color: Colors.text,
    fontWeight: "500",
  },
  activeTabButtonText: {
    color: Colors.secondary,
  },
  offerFilterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  offerFilterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeOfferFilterButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  offerFilterText: {
    color: Colors.text,
    fontWeight: "500",
  },
  activeOfferFilterText: {
    color: Colors.secondary,
  },
  resourcesList: {
    padding: 16,
    paddingBottom: 80,
  },
  resourceCard: {
    marginBottom: 16,
  },
  resourceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  resourceTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resourceType: {
    fontSize: 14,
    color: Colors.textLight,
    marginLeft: 8,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  offerTag: {
    backgroundColor: "#E8F5E9",
  },
  requestTag: {
    backgroundColor: "#FFF3E0",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  offerText: {
    color: Colors.success,
  },
  requestText: {
    color: "#FF9800",
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  resourceDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  resourceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resourceInfo: {
    flex: 1,
  },
  resourceLocation: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 2,
  },
  resourceDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  resourceUser: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500",
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
      },
    }),
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
