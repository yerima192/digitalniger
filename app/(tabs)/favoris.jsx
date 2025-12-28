import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useRouter } from "expo-router";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Header from "../../components/Header";
import { eventsData } from "../../data/eventsData";
import { acteursData } from "../../data/acteursData";
import { opportunitesData } from "../../data/opportunitesData";

export default function FavorisScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Événements");

  // Simuler des favoris (prendre les 2 premiers de chaque type)
  const favorisEvents = eventsData.slice(0, 2);
  const favorisActeurs = acteursData.slice(0, 3);
  const favorisOpportunites = opportunitesData.slice(0, 2);

  const tabs = ["Événements", "Acteurs", "Opportunités"];

  // Render Event Card (comme dans EvenementsScreen)
  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => router.push({ pathname: "/event-detail", params: { eventId: item.id } })}
      activeOpacity={0.7}
    >
      <View style={styles.eventImageContainer}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.3)"]}
          style={styles.imageGradient}
        />
        <View style={[styles.priceBadge, item.price === "Gratuit" ? styles.gratuitBadge : styles.payantBadge]}>
          <Text style={[styles.priceBadgeText, item.price === "Gratuit" ? styles.gratuitText : styles.payantText]}>
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

  // Render Acteur Card (comme dans ActeursScreen)
  const renderActeurCard = ({ item }) => (
    <TouchableOpacity
      style={styles.acteurCard}
      onPress={() => router.push({ pathname: "/acteur-detail", params: { acteurId: item.id } })}
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

  // Render Opportunite Card (comme dans OpportunitesScreen)
  const renderOpportuniteCard = ({ item }) => (
    <TouchableOpacity
      style={styles.oppCard}
      onPress={() => router.push({ pathname: "/opportunite-detail", params: { opportuniteId: item.id } })}
      activeOpacity={0.7}
    >
      <View style={styles.oppMain}>
        <View style={[styles.oppIconContainer, { backgroundColor: `${item.color}15` }]}>
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

  const getContent = () => {
    switch (activeTab) {
      case "Événements":
        return (
          <FlatList
            data={favorisEvents}
            renderItem={renderEventCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.eventsList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIconCircle}>
                  <Ionicons name="calendar-outline" size={48} color="#9CA3AF" />
                </View>
                <Text style={styles.emptyText}>Aucun événement favori</Text>
                <Text style={styles.emptySubtext}>
                  Ajoutez des événements à vos favoris
                </Text>
              </View>
            }
          />
        );
      case "Acteurs":
        return (
          <FlatList
            data={favorisActeurs}
            renderItem={renderActeurCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.acteursList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIconCircle}>
                  <Ionicons name="business-outline" size={48} color="#9CA3AF" />
                </View>
                <Text style={styles.emptyText}>Aucun acteur favori</Text>
                <Text style={styles.emptySubtext}>
                  Ajoutez des acteurs à vos favoris
                </Text>
              </View>
            }
          />
        );
      case "Opportunités":
        return (
          <FlatList
            data={favorisOpportunites}
            renderItem={renderOpportuniteCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.oppList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIconCircle}>
                  <Ionicons name="briefcase-outline" size={48} color="#9CA3AF" />
                </View>
                <Text style={styles.emptyText}>Aucune opportunité favorite</Text>
                <Text style={styles.emptySubtext}>
                  Ajoutez des opportunités à vos favoris
                </Text>
              </View>
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaWrapper>
      <Header
        title="Mes Favoris"
        subtitle="Organisez vos éléments préférés"
        badgeCount={favorisEvents.length + favorisActeurs.length + favorisOpportunites.length}
      />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            {activeTab === tab && <View style={styles.activeIndicator} />}
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {getContent()}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    backgroundColor: "#F9FAFB",
    paddingTop: 20,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    position: "relative",
  },
  tabActive: {
    borderBottomWidth: 0,
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#FF6600",
    borderRadius: 2,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  tabTextActive: {
    color: "#FF6600",
    fontWeight: "700",
  },

  // Events Styles (from EvenementsScreen)
  eventsList: {
    padding: 16,
    backgroundColor: "#F9FAFB",
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

  // Acteurs Styles (from ActeursScreen)
  acteursList: {
    padding: 16,
    backgroundColor: "#F9FAFB",
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

  // Opportunites Styles (from OpportunitesScreen)
  oppList: {
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
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

  // Empty State
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
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