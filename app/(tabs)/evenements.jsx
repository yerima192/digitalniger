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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import Header from "../../components/Header";
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
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.3)']}
          style={styles.imageGradient}
        />
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
        <View style={styles.typeContainer}>
          <View style={styles.typeDot} />
          <Text style={styles.eventType}>{item.type}</Text>
        </View>
        <Text style={styles.eventTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.eventDateContainer}>
          <View style={styles.iconWrapper}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          </View>
          <Text style={styles.eventDate}>{item.date}</Text>
        </View>
        <View style={styles.eventLocationContainer}>
          <View style={styles.iconWrapper}>
            <Ionicons name="location-outline" size={16} color="#6B7280" />
          </View>
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
            <View style={styles.searchIconCircle}>
              <Ionicons name="search-outline" size={18} color="#6B7280" />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un événement..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity
            style={[styles.filterButton, showFilters && styles.filterButtonActive]}
            onPress={() => setShowFilters(!showFilters)}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={showFilters ? ['#FF7F27', '#FF6600'] : ['#FFFFFF', '#FFFFFF']}
              style={styles.filterButtonGradient}
            >
              <Ionicons 
                name="options-outline" 
                size={20} 
                color={showFilters ? "#FFFFFF" : "#111827"} 
              />
              <Text style={[
                styles.filterButtonText,
                showFilters && styles.filterButtonTextActive
              ]}>
                Filtres
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
              <View style={styles.filterLabelContainer}>
                <Ionicons name="cash-outline" size={16} color="#6B7280" />
                <Text style={styles.filterLabel}>Prix</Text>
              </View>
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
            <View style={styles.emptyIconCircle}>
              <Ionicons name="calendar-outline" size={48} color="#9CA3AF" />
            </View>
            <Text style={styles.emptyText}>Aucun événement trouvé</Text>
            <Text style={styles.emptySubtext}>
              Essayez de modifier vos filtres
            </Text>
          </View>
        }
      />
      <View style={{ height: 0 }} />
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
    flexDirection: "row",
    gap: 12,
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
    borderColor: '#F3F4F6',
  },
  searchIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: "#111827",
    fontWeight: '500',
  },
  filterButton: {
    borderRadius: 24,
    overflow: 'hidden',
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
  filtersPanel: { 
    marginTop: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  filterSection: {
    marginBottom: 12,
  },
  filterLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderColor: '#E5E7EB',
  },
  filterBtnActive: {
    backgroundColor: "#FFF7ED",
    borderColor: '#FF6600',
  },
  filterBtnText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: '500',
  },
  filterBtnTextActive: {
    color: "#FF6600",
    fontWeight: "700",
  },
  eventsList: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  eventImageContainer: {
    position: "relative",
    height: 180,
  },
  eventImage: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  priceBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  gratuitBadge: {
    backgroundColor: "#D1FAE5",
  },
  payantBadge: {
    backgroundColor: "#FED7AA",
  },
  priceBadgeText: {
    fontSize: 12,
    fontWeight: "700",
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
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  typeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF6600",
  },
  eventType: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FF6600",
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  eventTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    lineHeight: 24,
  },
  eventDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  eventLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventDate: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: '500',
  },
  eventLocation: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: '500',
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
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: '500',
  },
});