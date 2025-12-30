import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Header from "../../components/Header";
import { eventsData } from "../../data/eventsData";
import { acteursData } from "../../data/acteursData";
import { opportunitesData } from "../../data/opportunitesData";

export default function FavorisScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [tabWidth, setTabWidth] = useState(0);
  
  const tabs = ["Événements", "Acteurs", "Opportunités"];

// Simuler des favoris (vous pourrez plus tard gérer ça avec un state global ou stockage)
  const favoriteEvents = eventsData.slice(0, 3);
  const favoriteActeurs = acteursData.slice(0, 3);
  const favoriteOpportunites = opportunitesData.slice(0, 3);

  const handleTabChange = (index) => {
    setActiveTab(index);
    Animated.spring(slideAnim, {
      toValue: index,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  };

  const onTabsLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    const calculatedTabWidth = (width - 8) / 3; // 8 = padding (4*2)
    setTabWidth(calculatedTabWidth);
  };

  // Render Event Card
  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() =>
        router.push({
          pathname: "/event-detail",
          params: { eventId: item.id },
        })
      }
      activeOpacity={0.7}
    >
      <View style={styles.eventImageContainer}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.3)"]}
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
        <TouchableOpacity style={styles.favoriteIcon}>
          <Ionicons name="heart" size={20} color="#EF4444" />
        </TouchableOpacity>
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

  // Render Acteur Card
  const renderActeurCard = ({ item }) => (
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
      <TouchableOpacity style={styles.favoriteIconActeur}>
        <Ionicons name="heart" size={20} color="#EF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Render Opportunite Card
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
          style={[
            styles.oppIconContainer,
            { backgroundColor: `${item.color}15` },
          ]}
        >
          <Ionicons name={item.icon} size={24} color={item.color} />
        </View>

        <View style={styles.oppHeaderRight}>
          <Text style={[styles.typeText, { color: item.color }]}>
            {item.type.toUpperCase()}
          </Text>
          <TouchableOpacity style={styles.favoriteIconOpp}>
            <Ionicons name="heart" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.oppBody}>
        <Text style={styles.oppTitle} numberOfLines={2}>
          {item.titre}
        </Text>

        <Text style={styles.oppOrganisme} numberOfLines={1}>
          Par {item.organisation}
        </Text>

        {item.montant && (
          <View style={styles.montantBadge}>
            <Ionicons name="cash-outline" size={14} color="#059669" />
            <Text style={styles.montantText}>{item.montant}</Text>
          </View>
        )}
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

  const getTotalCount = () => {
    return favoriteEvents.length + favoriteActeurs.length + favoriteOpportunites.length;
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 0:
        return favoriteEvents;
      case 1:
        return favoriteActeurs;
      case 2:
        return favoriteOpportunites;
      default:
        return [];
    }
  };

  const renderItem = ({ item }) => {
    switch (activeTab) {
      case 0:
        return renderEventCard({ item });
      case 1:
        return renderActeurCard({ item });
      case 2:
        return renderOpportuniteCard({ item });
      default:
        return null;
    }
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case 0:
        return "Aucun événement favori";
      case 1:
        return "Aucun acteur favori";
      case 2:
        return "Aucune opportunité favorite";
      default:
        return "";
    }
  };

  return (
    <SafeAreaWrapper>
      <Header
        title="Favoris"
        subtitle="Organisez vos éléments préférés"
        badgeCount={getTotalCount()}
      />

      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabsContainer} onLayout={onTabsLayout}>
          {tabWidth > 0 && (
            <Animated.View
              style={[
                styles.tabActiveBg,
                {
                  width: tabWidth,
                  transform: [
                    {
                      translateX: slideAnim.interpolate({
                        inputRange: [0, 1, 2],
                        outputRange: [4, tabWidth + 4, tabWidth * 2 + 4],
                      }),
                    },
                  ],
                },
              ]}
            />
          )}

          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tabButton}
              onPress={() => handleTabChange(index)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === index && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content List */}
      <FlatList
        data={getCurrentData()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="heart-outline" size={48} color="#9CA3AF" />
            </View>
            <Text style={styles.emptyText}>{getEmptyMessage()}</Text>
            <Text style={styles.emptySubtext}>
              Ajoutez des favoris en appuyant sur l&apos;icône cœur
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
    paddingBottom: 16,
  },

  // Tabs
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 30,
    padding: 4,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 4,
  },
  tabActiveBg: {
    position: "absolute",
    top: 4,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FF6600",
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    paddingHorizontal: 8,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
  },
  tabTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  list: {
    padding: 16,
  },

  // Event Card Styles
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
    borderColor: "#F3F4F6",
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
    position: "absolute",
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
  favoriteIcon: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  eventCardContent: {
    padding: 16,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    textTransform: "uppercase",
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
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  eventDate: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  eventLocation: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  // Acteur Card Styles
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
  favoriteIconActeur: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
  },

  // Opportunite Card Styles
  oppCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  oppHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  oppIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  oppHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  typeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  favoriteIconOpp: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  oppBody: {
    marginBottom: 12,
    gap: 6,
  },
  oppTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 22,
  },
  oppOrganisme: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  montantBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
    marginTop: 4,
  },
  montantText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#059669",
  },
  oppFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  oppInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },

  // Empty State
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
    textAlign: "center",
  },
});