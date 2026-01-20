import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import { useFavorites } from "../context/FavoritesContext";
import { opportunitesData } from "../data/opportunitesData";

export default function OpportuniteDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { isOpportunityFavorited, toggleOpportunityFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  const opportunite = opportunitesData.find((o) => o.id === params.opportuniteId);

  useEffect(() => {
    if (opportunite) {
      setIsFavorite(isOpportunityFavorited(opportunite.id));
    }
  }, [opportunite]);

  if (!opportunite) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorIconCircle}>
          <Ionicons name="alert-circle-outline" size={64} color="#9CA3AF" />
        </View>
        <Text style={styles.errorText}>Opportunité introuvable</Text>
        <TouchableOpacity
          style={styles.errorButton}
          onPress={() => router.back()}
        >
          <Text style={styles.errorButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleVisitSite = () => {
    if (opportunite.lien) {
      Linking.openURL(opportunite.lien).catch(() => {
        Alert.alert("Erreur", "Impossible d'ouvrir le lien");
      });
    }
  };

  const toggleFavorite = async () => {
    await toggleOpportunityFavorite(opportunite);
    setIsFavorite(!isFavorite);
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        {/* Fixed Header Buttons */}
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/opportunites")}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={["#FFFFFF", "#F9FAFB"]}
              style={styles.headerButtonGradient}
            >
              <Ionicons name="chevron-back" size={24} color="#111827" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={
                isFavorite ? ["#FEE2E2", "#FECACA"] : ["#FFFFFF", "#F9FAFB"]
              }
              style={styles.headerButtonGradient}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? "#EF4444" : "#111827"}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroContainer}>
            <LinearGradient
              colors={[`${opportunite.color}30`, `${opportunite.color}10`]}
              style={styles.heroGradient}
            />
            <View style={[styles.heroIcon, { backgroundColor: `${opportunite.color}20` }]}>
              <Ionicons name={opportunite.icon} size={64} color={opportunite.color} />
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>{opportunite.titre}</Text>

            {/* Badges */}
            <View style={styles.badgesContainer}>
              <LinearGradient
                colors={["#FFF7ED", "#FFEDD5"]}
                style={styles.typeBadge}
              >
                <View style={[styles.typeDot, { backgroundColor: opportunite.color }]} />
                <Text style={[styles.typeBadgeText, { color: opportunite.color }]}>
                  {opportunite.type}
                </Text>
              </LinearGradient>
              <View style={styles.categorieBadge}>
                <Ionicons name="albums" size={12} color="#6B7280" />
                <Text style={styles.categorieBadgeText}>{opportunite.categorie}</Text>
              </View>
            </View>

            {/* Deadline */}
            <View style={styles.infoCard}>
              <LinearGradient
                colors={["#FEE2E2", "#FECACA"]}
                style={styles.iconBox}
              >
                <Ionicons name="time-outline" size={24} color="#DC2626" />
              </LinearGradient>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Date limite</Text>
                <Text style={styles.infoTitle}>{opportunite.deadline}</Text>
              </View>
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentText}>Urgent</Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#FF6600"
                />
                <Text style={styles.sectionTitle}>Description</Text>
              </View>
              <View style={styles.descriptionCard}>
                <Text style={styles.description}>{opportunite.description}</Text>
              </View>
            </View>

            {/* Informations clés */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#FF6600"
                />
                <Text style={styles.sectionTitle}>Informations clés</Text>
              </View>

              {/* Date début */}
              <View style={styles.infoRow}>
                <LinearGradient
                  colors={["#DBEAFE", "#BFDBFE"]}
                  style={styles.smallIconBox}
                >
                  <Ionicons name="calendar" size={20} color="#3B82F6" />
                </LinearGradient>
                <View style={styles.infoRowText}>
                  <Text style={styles.infoRowLabel}>Date de début</Text>
                  <Text style={styles.infoRowValue}>{opportunite.dateDebut}</Text>
                </View>
              </View>

              {/* Durée */}
              <View style={styles.infoRow}>
                <LinearGradient
                  colors={["#E9D5FF", "#D8B4FE"]}
                  style={styles.smallIconBox}
                >
                  <Ionicons name="hourglass" size={20} color="#9333EA" />
                </LinearGradient>
                <View style={styles.infoRowText}>
                  <Text style={styles.infoRowLabel}>Durée</Text>
                  <Text style={styles.infoRowValue}>{opportunite.duree}</Text>
                </View>
              </View>

              {/* Montant */}
              {opportunite.montant && (
                <View style={styles.infoRow}>
                  <LinearGradient
                    colors={["#D1FAE5", "#A7F3D0"]}
                    style={styles.smallIconBox}
                  >
                    <Ionicons name="cash" size={20} color="#059669" />
                  </LinearGradient>
                  <View style={styles.infoRowText}>
                    <Text style={styles.infoRowLabel}>Montant</Text>
                    <Text style={styles.infoRowValue}>{opportunite.montant}</Text>
                  </View>
                </View>
              )}

              {/* Nombre de places */}
              {opportunite.nombrePlaces && (
                <View style={styles.infoRow}>
                  <LinearGradient
                    colors={["#FED7AA", "#FDBA74"]}
                    style={styles.smallIconBox}
                  >
                    <Ionicons name="people" size={20} color="#EA580C" />
                  </LinearGradient>
                  <View style={styles.infoRowText}>
                    <Text style={styles.infoRowLabel}>Places disponibles</Text>
                    <Text style={styles.infoRowValue}>{opportunite.nombrePlaces}</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Critères */}
            {opportunite.criteres && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#FF6600" />
                  <Text style={styles.sectionTitle}>Critères d&apos;éligibilité</Text>
                </View>
                <View style={styles.listCard}>
                  {opportunite.criteres.map((critere, index) => (
                    <View key={index} style={styles.listItem}>
                      <View style={styles.bulletPoint}>
                        <Ionicons name="checkmark" size={16} color="#059669" />
                      </View>
                      <Text style={styles.listItemText}>{critere}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Avantages */}
            {opportunite.avantages && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="star-outline" size={20} color="#FF6600" />
                  <Text style={styles.sectionTitle}>Avantages</Text>
                </View>
                <View style={styles.listCard}>
                  {opportunite.avantages.map((avantage, index) => (
                    <View key={index} style={styles.listItem}>
                      <View style={styles.bulletPoint}>
                        <Ionicons name="star" size={16} color="#F59E0B" />
                      </View>
                      <Text style={styles.listItemText}>{avantage}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Organisateur */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="business-outline" size={20} color="#FF6600" />
                <Text style={styles.sectionTitle}>Organisateur</Text>
              </View>
              <View style={styles.organizerCard}>
                <View style={[styles.organizerIcon, { backgroundColor: `${opportunite.color}20` }]}>
                  <Ionicons name="business" size={28} color={opportunite.color} />
                </View>
                <View style={styles.organizerText}>
                  <Text style={styles.organizerTitle}>{opportunite.organisation}</Text>
                  <Text style={styles.organizerSubtitle}>
                    {opportunite.organisationTagline}
                  </Text>
                </View>
              </View>
            </View>

            {/* Localisation */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="location-outline" size={20} color="#FF6600" />
                <Text style={styles.sectionTitle}>Localisation</Text>
              </View>
              <View style={styles.locationCard}>
                <LinearGradient
                  colors={["#EFF6FF", "#DBEAFE"]}
                  style={styles.iconBox}
                >
                  <Ionicons name="map-outline" size={24} color="#3B82F6" />
                </LinearGradient>
                <View style={styles.infoText}>
                  <Text style={styles.infoTitle}>
                    {opportunite.ville}, {opportunite.pays}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Action Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleVisitSite}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[opportunite.color, `${opportunite.color}CC`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.actionGradient}
            >
              <Text style={styles.actionButtonText}>Visiter le site</Text>
              <Ionicons name="open-outline" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  headerButtons: {
    position: "absolute",
    top: Platform.OS === "ios" ? 30 : 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  headerButtonGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heroContainer: {
    height: 250,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  heroGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroIcon: {
    width: 120,
    height: 120,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 8 },
    // shadowOpacity: 0.15,
    // shadowRadius: 16,
    // elevation: 12,
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
    lineHeight: 32,
  },
  badgesContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  typeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  typeBadgeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  categorieBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
    backgroundColor: "#F3F4F6",
  },
  categorieBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6B7280",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF7ED",
    borderRadius: 20,
    marginBottom: 24,
    gap: 12,
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  urgentBadge: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  urgentText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFF",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  descriptionCard: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#6B7280",
    fontWeight: "500",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    gap: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  smallIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  infoRowText: {
    flex: 1,
  },
  infoRowLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
    marginBottom: 4,
  },
  infoRowValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  listCard: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  listItem: {
    flexDirection: "row",
    gap: 10,
  },
  bulletPoint: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#D1FAE5",
    justifyContent: "center",
    alignItems: "center",
  },
  listItemText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
    fontWeight: "500",
  },
  organizerCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  organizerIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  organizerText: {
    flex: 1,
  },
  organizerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  organizerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  actionButton: {
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionGradient: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  errorIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  errorText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 24,
  },
  errorButton: {
    backgroundColor: "#FF6600",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  errorButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});