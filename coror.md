# 🎨 Design System – Couleurs officielles

## Couleurs de marque (Primary)
- Orange principal : #FF6600
- Orange secondaire : #FF7F27

## Arrière-plans
- Background principal : #F9FAFB
- Surface / Cartes : #FFFFFF

## Textes
- Texte principal : #111827
- Texte secondaire : #6B7280
- Texte subtil / labels : #9CA3AF

## États & Accents
- Info / liens : #3B82F6
- Succès / gratuit : #059669
- Alerte / erreur : #EF4444
- Bordures : #E5E7EB
- Background soft : #F3F4F6

## Règles d’utilisation
- L’orange ( #FF6600 ) est réservé aux actions principales (CTA).
- Les backgrounds doivent rester neutres (pas d’orange en fond).
- Les couleurs vert / rouge / bleu sont utilisées uniquement pour des états (succès, erreur, info).
- Les titres utilisent #111827, les descriptions #6B7280.


{
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
          style={[styles.oppIconContainer, { backgroundColor: `${item.color}15` }]}
        >
          <Ionicons name={item.icon} size={26} color={item.color} />
        </View>
        
        <View style={styles.oppContent}>
          <View style={styles.oppTop}>
            <Text style={[styles.typeText, { color: item.color }]}>
              {item.type.toUpperCase()}
            </Text>
            {item.montant && (
              <View style={styles.montantBadge}>
                <Ionicons name="cash-outline" size={11} color="#059669" />
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

      {/* Informations essentielles */}
      <View style={styles.oppDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={14} color="#6B7280" />
            <View style={styles.detailTexts}>
              <Text style={styles.detailLabel}>Deadline</Text>
              <Text style={styles.detailValue}>{item.deadline}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <View style={styles.detailTexts}>
              <Text style={styles.detailLabel}>Durée</Text>
              <Text style={styles.detailValue}>{item.duree}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <View style={styles.detailTexts}>
              <Text style={styles.detailLabel}>Lieu</Text>
              <Text style={styles.detailValue}>{item.ville}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={14} color="#6B7280" />
            <View style={styles.detailTexts}>
              <Text style={styles.detailLabel}>Places</Text>
              <Text style={styles.detailValue}>{item.nombrePlaces}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.oppFooter}>
        <View style={[styles.categorieBadge, { backgroundColor: `${item.color}10` }]}>
          <View style={[styles.categorieDot, { backgroundColor: item.color }]} />
          <Text style={[styles.categorieText, { color: item.color }]}>{item.categorie}</Text>
        </View>
        <View style={styles.arrowCircle}>
          <Ionicons name="arrow-forward" size={16} color={item.color} />
        </View>
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
              <Text style={styles.subscribeText}>S&apos;abonner aux alertes</Text>
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
  
  // CARD COMPLÈTE EN MODE LISTE
  oppCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
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
    marginBottom: 14,
  },
  oppIconContainer: {
    width: 50,
    height: 50,
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
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  montantBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  montantText: {
    fontSize: 10,
    fontWeight: "700",
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
  
  // Détails essentiels
  oppDetails: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    gap: 10,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    gap: 16,
  },
  detailItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  detailTexts: {
    flex: 1,
    gap: 2,
  },
  detailLabel: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "700",
  },
  
  // Footer
  oppFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categorieBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  categorieDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  categorieText: {
    fontSize: 11,
    fontWeight: "700",
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
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
}

//////////////////////

//////////////////////
{
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
      <View style={styles.oppHeader}>
        <View
          style={[styles.oppIconContainer, { backgroundColor: `${item.color}15` }]}
        >
          <Ionicons name={item.icon} size={28} color={item.color} />
        </View>
        <View style={styles.oppHeaderText}>
          <View style={styles.typeBadge}>
            <Text style={[styles.typeText, { color: item.color }]}>
              {item.type}
            </Text>
          </View>
          <Text style={styles.oppTitle} numberOfLines={2}>
            {item.titre}
          </Text>
        </View>
      </View>

      <Text style={styles.oppDescription} numberOfLines={3}>
        {item.description}
      </Text>

      <View style={styles.oppFooter}>
        <View style={styles.oppInfoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.infoText}>{item.deadline}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text style={styles.infoText}>{item.ville}</Text>
          </View>
        </View>
        <View style={styles.arrowButton}>
          <Ionicons name="arrow-forward" size={18} color={item.color} />
        </View>
      </View>

      {item.montant && (
        <View style={styles.montantBadge}>
          <Ionicons name="cash-outline" size={14} color="#059669" />
          <Text style={styles.montantText}>{item.montant}</Text>
        </View>
      )}
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
        {/* Search and Subscribe */}
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
              <Text style={styles.subscribeText}>S&apos;abonner aux alertes</Text>
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
    fontSize: 12,
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
  oppCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    position: "relative",
  },
  oppHeader: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  oppIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  oppHeaderText: {
    flex: 1,
    gap: 6,
  },
  typeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#FFF7ED",
    borderRadius: 12,
  },
  typeText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  oppTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 22,
  },
  oppDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 12,
  },
  oppFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  oppInfoRow: {
    flex: 1,
    gap: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  montantBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  montantText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#059669",
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
}