import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Search, Filter, ExternalLink } from "lucide-react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Colors from "@/constants/colors";
import { mockBursaries } from "@/mocks/data";
import { Bursary } from "@/types";

export default function FinancialScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const router = useRouter();

  const filters = [
    "All",
    "NSFAS",
    "NWU",
    "Corporate",
    "Merit-based",
    "Need-based"
  ];

  const filteredBursaries = mockBursaries.filter(bursary => {
    const matchesSearch = 
      bursary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bursary.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bursary.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!selectedFilter || selectedFilter === "All") {
      return matchesSearch;
    }
    
    const matchesFilter = 
      (selectedFilter === "NSFAS" && bursary.provider.includes("NSFAS")) ||
      (selectedFilter === "NWU" && bursary.provider.includes("North-West University")) ||
      (selectedFilter === "Corporate" && !bursary.provider.includes("NSFAS") && !bursary.provider.includes("North-West University")) ||
      (selectedFilter === "Merit-based" && bursary.eligibility.toLowerCase().includes("academic")) ||
      (selectedFilter === "Need-based" && bursary.eligibility.toLowerCase().includes("financial need"));
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };

  const renderBursaryItem = ({ item }: { item: Bursary }) => {
    const deadline = new Date(item.deadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return (
      <Card
        style={styles.bursaryCard}
        onPress={() => router.push(`/bursary/${item.id}`)}
      >
        <View style={styles.bursaryHeader}>
          <Text style={styles.bursaryName}>{item.name}</Text>
          <Text style={styles.bursaryProvider}>{item.provider}</Text>
        </View>
        
        <View style={styles.bursaryDetails}>
          <View style={styles.bursaryDetail}>
            <Text style={styles.detailLabel}>Amount:</Text>
            <Text style={styles.detailValue}>{item.amount}</Text>
          </View>
          
          <View style={styles.bursaryDetail}>
            <Text style={styles.detailLabel}>Deadline:</Text>
            <Text style={styles.detailValue}>{formatDate(item.deadline)}</Text>
          </View>
          
          <View style={styles.bursaryDetail}>
            <Text style={styles.detailLabel}>Days Left:</Text>
            <Text 
              style={[
                styles.detailValue, 
                daysUntilDeadline <= 14 ? styles.urgentDeadline : null
              ]}
            >
              {daysUntilDeadline > 0 ? `${daysUntilDeadline} days` : "Expired"}
            </Text>
          </View>
        </View>
        
        <Text numberOfLines={2} style={styles.bursaryDescription}>
          {item.description}
        </Text>
        
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => router.push(`/bursary/${item.id}`)}
        >
          <Text style={styles.applyButtonText}>View Details</Text>
          <ExternalLink size={16} color={Colors.secondary} />
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Financial Aid" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bursaries..."
            placeholderTextColor={Colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setFilterVisible(!filterVisible)}
        >
          <Filter size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      
      {filterVisible && (
        <View style={styles.filtersContainer}>
          <FlatList
            data={filters}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterItem,
                  selectedFilter === item && styles.selectedFilterItem
                ]}
                onPress={() => {
                  setSelectedFilter(item === "All" && selectedFilter === "All" ? null : item);
                }}
              >
                <Text 
                  style={[
                    styles.filterText,
                    selectedFilter === item && styles.selectedFilterText
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          />
        </View>
      )}
      
      <FlatList
        data={filteredBursaries}
        renderItem={renderBursaryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bursariesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bursaries found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: Colors.text,
  },
  filterButton: {
    marginLeft: 12,
    padding: 8,
  },
  filtersContainer: {
    backgroundColor: Colors.secondary,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filtersList: {
    paddingHorizontal: 16,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    marginRight: 8,
  },
  selectedFilterItem: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    color: Colors.text,
    fontWeight: "500",
  },
  selectedFilterText: {
    color: Colors.secondary,
  },
  bursariesList: {
    padding: 16,
  },
  bursaryCard: {
    marginBottom: 16,
    padding: 16,
  },
  bursaryHeader: {
    marginBottom: 12,
  },
  bursaryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  bursaryProvider: {
    fontSize: 14,
    color: Colors.textLight,
  },
  bursaryDetails: {
    marginBottom: 12,
  },
  bursaryDetail: {
    flexDirection: "row",
    marginBottom: 4,
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
  urgentDeadline: {
    color: Colors.error,
    fontWeight: "bold",
  },
  bursaryDescription: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 16,
    lineHeight: 20,
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
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: Colors.textLight,
    fontSize: 16,
  },
});
