import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
// Données temporaires - à remplacer par votre backend
import { eventsData } from "../../data/eventsData";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";


export default function EvenementsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState("Tous");
  const [selectedPrice, setSelectedPrice] = useState("Tous");

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "Tous" || event.type === selectedType;
    const matchesPrice =
      selectedPrice === "Tous" || event.price === selectedPrice;
    return matchesSearch && matchesType && matchesPrice;
  });

  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => router.push({
        pathname: "/event-detail",
        params: { eventId: item.id }
      })}
      activeOpacity={0.7}
    >
      <View style={styles.eventImageContainer}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        <View
          style={[
            styles.priceBadge,
            item.price === "Gratuit" ? styles.gratuitBadge : styles.payantBadge,
          ]}
        >
          <Text
            style={[
              styles.priceBadgeText,
              item.price === "Gratuit" ? styles.gratuitText : styles.payantText,
            ]}
          >
            {item.price}
          </Text>
        </View>
      </View>
      <View style={styles.eventCardContent}>
        <Text style={styles.eventType}>{item.type}</Text>
        <Text style={styles.eventTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.eventDateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.eventDate}>{item.date}</Text>
        </View>
        <View style={styles.eventLocationContainer}>
          <Ionicons name="location-outline" size={16} color="#6B7280" />
          <Text style={styles.eventLocation}>
            {item.city}, {item.country}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const FilterButton = ({ label, selected, onPress }) => (
    <TouchableOpacity
      style={[styles.filterBtn, selected && styles.filterBtnActive]}
      onPress={onPress}
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

    {/* <ScreenWrapper> */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFF"
        translucent={false}
      />
      
      {/* Header */}
      <Header
        title="Événements"
        subtitle="Trouvez les derniers événements tech"
        badgeCount={filteredEvents.length}
      />

      <View style={styles.container}>
        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un événement..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="options-outline" size={20} color="#111827" />
            <Text style={styles.filterButtonText}>Filtres</Text>
          </TouchableOpacity>
        </View>

        {/* Filters Panel */}
        {showFilters && (
          <View style={styles.filtersPanel}>
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Type</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterOptions}>
                  {["Tous", "Conférence", "Atelier", "Meetup", "Formation"].map(
                    (type) => (
                      <FilterButton
                        key={type}
                        label={type}
                        selected={selectedType === type}
                        onPress={() => setSelectedType(type)}
                      />
                    )
                  )}
                </View>
              </ScrollView>
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Prix</Text>
              <View style={styles.filterOptions}>
                {["Tous", "Gratuit", "Payant"].map((price) => (
                  <FilterButton
                    key={price}
                    label={price}
                    selected={selectedPrice === price}
                    onPress={() => setSelectedPrice(price)}
                  />
                ))}
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Events List */}
      <FlatList
        data={filteredEvents}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>Aucun événement trouvé</Text>
            <Text style={styles.emptySubtext}>
              Essayez de modifier vos filtres
            </Text>
          </View>
        }
      />
    {/* </ScreenWrapper> */}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    gap: 6,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  filtersPanel: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
  },
  filterSection: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  filterBtnActive: {
    backgroundColor: "#FFF7ED",
  },
  filterBtnText: {
    fontSize: 14,
    color: "#111827",
  },
  filterBtnTextActive: {
    color: "#FF6600",
    fontWeight: "600",
  },
  eventsList: {
    padding: 16,
    // paddingBottom: 80,
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  eventImageContainer: {
    position: "relative",
    height: 180,
  },
  eventImage: {
    width: "100%",
    height: "100%",
  },
  priceBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  gratuitBadge: {
    backgroundColor: "#D1FAE5",
  },
  payantBadge: {
    backgroundColor: "#FED7AA",
  },
  priceBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  gratuitText: {
    color: "#059669",
  },
  payantText: {
    color: "#EA580C",
  },
  eventCardContent: {
    padding: 16,
  },
  eventType: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FF6600",
    marginBottom: 6,
  },
  eventTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  eventDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: "#6B7280",
  },
  eventLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  eventLocation: {
    fontSize: 14,
    color: "#6A737D",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
});