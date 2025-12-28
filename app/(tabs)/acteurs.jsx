import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Header from "../../components/Header";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import { acteursData } from "../../data/acteursData";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MAP_WIDTH = SCREEN_WIDTH - 32;
const MAP_HEIGHT = 500;

export default function ActeursScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState("Tous");
  const [selectedVille, setSelectedVille] = useState("Tous");
  const [viewMode, setViewMode] = useState("Liste");
  const slideAnim = useRef(new Animated.Value(0)).current;
  const filterAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: viewMode === "Liste" ? 0 : 1,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [slideAnim, viewMode]);

  useEffect(() => {
    Animated.spring(filterAnim, {
      toValue: showFilters ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
    }).start();
  }, [filterAnim, showFilters]);

  const filteredActeurs = acteursData.filter((acteur) => {
    const matchesSearch =
      acteur.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acteur.domaine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategorie =
      selectedCategorie === "Tous" || acteur.categorie === selectedCategorie;
    const matchesVille =
      selectedVille === "Tous" || acteur.ville === selectedVille;
    return matchesSearch && matchesCategorie && matchesVille;
  });

  // Positionnement intelligent des marqueurs sur la carte
  const getMarkerPosition = (index, total) => {
    const rows = Math.ceil(Math.sqrt(total));
    const cols = Math.ceil(total / rows);
    const row = Math.floor(index / cols);
    const col = index % cols;

    const padding = 60;
    const availableWidth = MAP_WIDTH - padding * 2;
    const availableHeight = MAP_HEIGHT - 180;

    const cellWidth = availableWidth / cols;
    const cellHeight = availableHeight / rows;

    // Ajouter un décalage aléatoire pour plus de naturel
    const randomOffsetX = (Math.random() - 0.5) * 30;
    const randomOffsetY = (Math.random() - 0.5) * 30;

    return {
      left: padding + col * cellWidth + cellWidth / 2 - 24 + randomOffsetX,
      top: 120 + row * cellHeight + cellHeight / 2 - 24 + randomOffsetY,
    };
  };

  const renderActeurCard = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.acteurCard}
        onPress={() =>
          router.push({
            pathname: "/acteur-detail",
            params: { acteurId: item.id },
          })
        }
        activeOpacity={0.97}
      >
        <View style={styles.acteurLogoContainer}>
          <Image source={{ uri: item.logo }} style={styles.acteurLogo} />
        </View>
        <View style={styles.acteurContent}>
          <Text style={styles.acteurNom} numberOfLines={1}>
            {item.nom}
          </Text>
          <Text style={styles.acteurDomaine} numberOfLines={1}>
            {item.domaine}
          </Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color="#9CA3AF" />
            <Text style={styles.acteurLocation} numberOfLines={1}>
              {item.ville}, {item.pays}
            </Text>
          </View>
        </View>
        <View style={styles.cardArrow}>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </TouchableOpacity>
    );
  };

  const renderMapMarker = (acteur, index) => {
    const position = getMarkerPosition(index, filteredActeurs.length);

    return (
      <TouchableOpacity
        key={acteur.id}
        style={[styles.mapMarker, position]}
        onPress={() =>
          router.push({
            pathname: "/acteur-detail",
            params: { acteurId: acteur.id },
          })
        }
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.markerCircle,
            { backgroundColor: acteur.color || "#FF6600" },
          ]}
        >
          <Image source={{ uri: acteur.logo }} style={styles.markerLogo} />
          <View style={styles.markerPulse} />
        </View>
        <View style={styles.markerTooltip}>
          <Text style={styles.markerText} numberOfLines={1}>
            {acteur.nom}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const FilterButton = ({ label, selected, onPress }) => (
    <TouchableOpacity
      style={[styles.filterBtn, selected && styles.filterBtnActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {selected && (
        <LinearGradient
          colors={["#FF7F27", "#FF6600"]}
          style={StyleSheet.absoluteFill}
        />
      )}
      <Text
        style={[styles.filterBtnText, selected && styles.filterBtnTextActive]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const regionsNiger = [
    { name: "Niamey", top: 120, left: 30 },
    { name: "Tillabéri", top: 90, left: 80 },
    { name: "Dosso", top: 200, left: 50 },
    { name: "Tahoua", top: 140, left: 140 },
    { name: "Maradi", top: 220, right: 80 },
    { name: "Zinder", top: 180, right: 40 },
    { name: "Diffa", top: 250, right: 20 },
    { name: "Agadez", top: 60, left: 180 },
  ];

  const legendItems = [
    { label: "Startup", color: "#10B981" },
    { label: "Hub", color: "#F97316" },
    { label: "Organisation", color: "#8B5CF6" },
    { label: "Autres", color: "#0EA5E9" },
  ];

  const statsItems = [
    {
      label: "Acteurs",
      number: filteredActeurs.length,
      icon: "business",
      color: "#FF6600",
    },
    { label: "Régions", number: 8, icon: "location", color: "#3B82F6" },
    { label: "Membres", number: "250+", icon: "people", color: "#10B981" },
  ];

  return (
    <SafeAreaWrapper>
      <Header
        title="Acteurs Tech"
        subtitle="L'écosystème numérique du Niger"
        badgeCount={filteredActeurs.length}
      />

      <View style={styles.container}>
        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <View style={styles.searchIconCircle}>
              <Ionicons name="search-outline" size={20} color="#9CA3AF" />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un acteur..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
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
        </View>

        {/* View Mode Toggle */}
        <View style={styles.viewModeContainer}>
          <Animated.View
            style={[
              styles.viewModeActiveBg,
              {
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 120],
                    }),
                  },
                ],
              },
            ]}
          />

          <TouchableOpacity
            style={styles.viewModeButton}
            onPress={() => setViewMode("Liste")}
            activeOpacity={0.8}
          >
            <Ionicons
              name="list"
              size={18}
              color={viewMode === "Liste" ? "#FFFFFF" : "#6B7280"}
            />
            <Text
              style={[
                styles.viewModeText,
                viewMode === "Liste" && styles.viewModeTextActive,
              ]}
            >
              Liste
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewModeButton}
            onPress={() => setViewMode("Carte")}
            activeOpacity={0.8}
          >
            <Ionicons
              name="map"
              size={18}
              color={viewMode === "Carte" ? "#FFFFFF" : "#6B7280"}
            />
            <Text
              style={[
                styles.viewModeText,
                viewMode === "Carte" && styles.viewModeTextActive,
              ]}
            >
              Carte
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filters Panel */}
        {showFilters && (
          <Animated.View
            style={[
              styles.filtersPanel,
              {
                opacity: filterAnim,
                transform: [
                  {
                    translateY: filterAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.filterSection}>
              <View style={styles.filterLabelContainer}>
                <Ionicons name="pricetag-outline" size={16} color="#6B7280" />
                <Text style={styles.filterLabel}>Catégorie</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterOptions}>
                  {[
                    "Tous",
                    "Startup",
                    "Hub",
                    "Freelance",
                    "Organisation",
                    "ONG",
                  ].map((cat) => (
                    <FilterButton
                      key={cat}
                      label={cat}
                      selected={selectedCategorie === cat}
                      onPress={() => setSelectedCategorie(cat)}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={styles.filterSection}>
              <View style={styles.filterLabelContainer}>
                <Ionicons name="location-outline" size={16} color="#6B7280" />
                <Text style={styles.filterLabel}>Ville</Text>
              </View>
              <View style={styles.filterOptions}>
                {["Tous", "Niamey", "Zinder", "Maradi", "Tahoua"].map(
                  (ville) => (
                    <FilterButton
                      key={ville}
                      label={ville}
                      selected={selectedVille === ville}
                      onPress={() => setSelectedVille(ville)}
                    />
                  )
                )}
              </View>
            </View>
          </Animated.View>
        )}
      </View>

      {/* Content - Liste ou Carte */}
      {viewMode === "Liste" ? (
        <FlatList
          data={filteredActeurs}
          renderItem={renderActeurCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.acteursList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="business-outline" size={48} color="#9CA3AF" />
              </View>
              <Text style={styles.emptyText}>Aucun acteur trouvé</Text>
              <Text style={styles.emptySubtext}>
                Essayez de modifier vos filtres
              </Text>
            </View>
          }
        />
      ) : (
        <ScrollView
          style={styles.mapScrollView}
          contentContainerStyle={styles.mapContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mapContainer}>
            {/* Map Background */}
            <LinearGradient
              colors={["#E0F2FE", "#F0F9FF", "#FFFFFF"]}
              style={styles.mapBackground}
            >
              {/* Map Header */}
              <View style={styles.mapHeader}>
                <LinearGradient
                  colors={["#FF7F27", "#FF6600"]}
                  style={styles.mapTitleContainer}
                >
                  <Text style={styles.mapTitle}>NIGER</Text>
                  <Text style={styles.mapSubtitle}>Écosystème Tech</Text>
                </LinearGradient>
              </View>

              {/* Régions Labels */}
              {regionsNiger.map((region, index) => (
                <View
                  key={index}
                  style={[
                    styles.cityLabel,
                    {
                      top: region.top,
                      bottom: region.bottom,
                      left: region.left,
                      right: region.right,
                    },
                  ]}
                >
                  <View style={styles.cityDot} />
                  <Text style={styles.cityName}>{region.name}</Text>
                </View>
              ))}

              {/* Map Markers - Acteurs */}
              {filteredActeurs.map((acteur, index) =>
                renderMapMarker(acteur, index)
              )}

              {/* Legend */}
              <View style={styles.mapLegend}>
                <View style={styles.legendHeader}>
                  <Ionicons name="color-palette" size={16} color="#FF6600" />
                  <Text style={styles.legendTitle}>Légende</Text>
                </View>
                {legendItems.map((item, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendDot,
                        { backgroundColor: item.color },
                      ]}
                    />
                    <Text style={styles.legendText}>{item.label}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>

            {/* Map Stats */}
            <View style={styles.mapStats}>
              {statsItems.map((item, index) => (
                <LinearGradient
                  key={index}
                  colors={["#FFFFFF", "#F9FAFB"]}
                  style={styles.statCard}
                >
                  <View
                    style={[
                      styles.statIconContainer,
                      { backgroundColor: `${item.color}15` },
                    ]}
                  >
                    <Ionicons name={item.icon} size={24} color={item.color} />
                  </View>
                  <Text style={styles.statNumber}>{item.number}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </LinearGradient>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  searchIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInputContainer: {
    flex: 1,
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
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
  filterButton: {
    borderRadius: 26,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  filterButtonActive: {
    shadowColor: "#FF6600",
    shadowOpacity: 0.3,
  },
  filterButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 16,
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

  viewModeContainer: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 30,
    padding: 4,
    marginBottom: 20,
    width: 260,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  viewModeActiveBg: {
    position: "absolute",
    top: 4,
    left: 4,
    width: 124,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FF6600",
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  viewModeButton: {
    flex: 1,
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    zIndex: 1,
  },
  viewModeText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },
  viewModeTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  filtersPanel: {
    marginBottom: 16,
    padding: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  filterBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  filterBtnActive: {
    borderColor: "#FF6600",
  },
  filterBtnText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
  filterBtnTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  acteursList: {
    padding: 16,
  },
  acteurCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 14,
    padding: 16,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  acteurLogoContainer: {
    width: 68,
    height: 68,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#F9FAFB",
    position: "relative",
  },
  acteurLogo: {
    width: "100%",
    height: "100%",
  },
  acteurContent: {
    flex: 1,
    gap: 4,
  },
  acteurNom: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  acteurDomaine: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  acteurLocation: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  cardArrow: {
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
    paddingVertical: 80,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#374151",
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 15,
    color: "#9CA3AF",
    marginTop: 8,
    fontWeight: "500",
  },
  // Map Styles
  mapScrollView: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  mapContentContainer: {
    paddingBottom: 40,
  },
  mapContainer: {
    margin: 16,
  },
  mapBackground: {
    height: MAP_HEIGHT,
    borderRadius: 24,
    padding: 16,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  mapHeader: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  mapTitleContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  mapTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 6,
    textAlign: "center",
  },
  mapSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
    fontWeight: "600",
    textAlign: "center",
  },
  cityLabel: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(243, 244, 246, 0.8)",
  },
  cityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
  },
  cityName: {
    fontSize: 11,
    fontWeight: "700",
    color: "#111827",
  },
  mapMarker: {
    position: "absolute",
    alignItems: "center",
    zIndex: 10,
  },
  markerCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    position: "relative",
  },
  markerLogo: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  markerPulse: {
    position: "absolute",
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "rgba(255, 102, 0, 0.3)",
  },
  markerTooltip: {
    marginTop: 8,
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  markerText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  mapLegend: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  legendHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  legendTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111827",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
  mapStats: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 18,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  statIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
});
