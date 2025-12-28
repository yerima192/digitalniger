import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Header from "../components/Header";
import { opportunitesData } from "../data/opportunitesData";
import SafeAreaWrapper from "../components/SafeAreaWrapper";

export default function OpportunitesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState("Tous");
  const [selectedCategorie, setSelectedCategorie] = useState("Tous");

  const filteredOpportunites = opportunitesData.filter((opp) => {
    const matchesSearch = opp.titre
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "Tous" || opp.type === selectedType;
    const matchesCategorie =
      selectedCategorie === "Tous" || opp.categorie === selectedCategorie;
    return matchesSearch && matchesType && matchesCategorie;
  });

  const renderOpportuniteCard = ({ item }) => (
    <TouchableOpacity
      style={styles.oppCard}
      onPress={() =>
        router.push({
          pathname: "/opportunite-detail",
          params: { opportuniteId: item.id },
        })
      }
      activeOpacity={0.7}
    >
      <View style={styles.oppMain}>
        <View
          style={[
            styles.oppIconContainer,
            { backgroundColor: `${item.color}15` },
          ]}
        >
          <Ionicons name={item.icon} size={24} color={item.color} />
        </View>

        <View style={styles.oppContent}>
          <View style={styles.oppTop}>
            <Text style={[styles.typeText, { color: item.color }]}>
              {item.type.toUpperCase()}
            </Text>
            {item.montant && (
              <View style={styles.montantBadge}>
                <Text style={styles.montantText}>{item.montant}</Text>
              </View>
            )}
          </View>

          <Text style={styles.oppTitle} numberOfLines={2}>
            {item.titre}
          </Text>

          <Text style={styles.oppOrganisme} numberOfLines={1}>
            Par {item.organisation}
          </Text>
        </View>
      </View>

      <View style={styles.oppFooter}>
        <View style={styles.oppInfo}>
          <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
          <Text style={styles.infoText}>{item.deadline}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
      </View>
    </TouchableOpacity>
  );

  const FilterButton = ({ label, selected, onPress }) => (
    <TouchableOpacity
      style={[styles.filterBtn, selected && styles.filterBtnActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[styles.filterBtnText, selected && styles.filterBtnTextActive]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaWrapper>
      <Header
        title="Opportunités"
        subtitle="Découvrez les opportunités tech"
        badgeCount={filteredOpportunites.length}
      />

      <View style={styles.container}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <View style={styles.searchIconCircle}>
              <Ionicons name="search-outline" size={18} color="#6B7280" />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une opportunité..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              showFilters && styles.filterButtonActive,
            ]}
            onPress={() => setShowFilters(!showFilters)}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={
                showFilters ? ["#FF7F27", "#FF6600"] : ["#FFFFFF", "#FFFFFF"]
              }
              style={styles.filterButtonGradient}
            >
              <Ionicons
                name="options-outline"
                size={20}
                color={showFilters ? "#FFFFFF" : "#111827"}
              />
              <Text
                style={[
                  styles.filterButtonText,
                  showFilters && styles.filterButtonTextActive,
                ]}
              >
                Filtres
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.subscribeButton} activeOpacity={0.7}>
            <LinearGradient
              colors={["#F9FAFB", "#F9FAFB"]}
              style={styles.subscribeGradient}
            >
              <Ionicons name="notifications" size={20} color="#FF7F27" />
              <Text style={styles.subscribeText}>
                S&apos;abonner aux alertes
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Filters Panel */}
        {showFilters && (
          <View style={styles.filtersPanel}>
            <View style={styles.filterSection}>
              <View style={styles.filterLabelContainer}>
                <Ionicons name="pricetag-outline" size={16} color="#6B7280" />
                <Text style={styles.filterLabel}>Type</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterOptions}>
                  {[
                    "Tous",
                    "Appel à projets",
                    "Bourse",
                    "Formation",
                    "Emploi",
                    "Concours",
                    "Mentorat",
                    "Hackathon",
                  ].map((type) => (
                    <FilterButton
                      key={type}
                      label={type}
                      selected={selectedType === type}
                      onPress={() => setSelectedType(type)}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={styles.filterSection}>
              <View style={styles.filterLabelContainer}>
                <Ionicons name="albums-outline" size={16} color="#6B7280" />
                <Text style={styles.filterLabel}>Catégorie</Text>
              </View>
              <View style={styles.filterOptions}>
                {[
                  "Tous",
                  "Incubation",
                  "Formation",
                  "Recrutement",
                  "Compétition",
                  "Accompagnement",
                ].map((cat) => (
                  <FilterButton
                    key={cat}
                    label={cat}
                    selected={selectedCategorie === cat}
                    onPress={() => setSelectedCategorie(cat)}
                  />
                ))}
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Opportunites List */}
      <FlatList
        data={filteredOpportunites}
        renderItem={renderOpportuniteCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.oppList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="briefcase-outline" size={48} color="#9CA3AF" />
            </View>
            <Text style={styles.emptyText}>Aucune opportunité trouvée</Text>
            <Text style={styles.emptySubtext}>
              Essayez de modifier vos filtres
            </Text>
          </View>
        }
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  searchIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  filterButtonActive: {
    shadowColor: "#FF6600",
    shadowOpacity: 0.3,
  },
  filterButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 48,
    gap: 6,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  subscribeButton: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  subscribeGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 48,
    gap: 6,
  },
  subscribeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF7F27",
  },
  filtersPanel: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  filterSection: {
    marginBottom: 12,
  },
  filterLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterBtnActive: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FF6600",
  },
  filterBtnText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  filterBtnTextActive: {
    color: "#FF6600",
    fontWeight: "700",
  },
  oppList: {
    padding: 16,
  },

  // CARD SIMPLIFIÉE EN MODE LISTE
  oppCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  oppMain: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
  },
  oppIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  oppContent: {
    flex: 1,
    gap: 4,
  },
  oppTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  typeText: {
    fontSize: 12.5,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  montantBadge: {
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  montantText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#059669",
  },
  oppTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 20,
  },
  oppOrganisme: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  oppFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  oppInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginTop: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 6,
    fontWeight: "500",
  },
});
