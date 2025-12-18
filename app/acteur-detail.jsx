import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Linking,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import { acteursData } from "../data/acteursData";
import SafeAreaWrapper from "../components/SafeAreaWrapper";

export default function ActeurDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const acteur = acteursData.find((a) => a.id === params.acteurId);

  if (!acteur) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <View style={styles.errorIconCircle}>
          <Ionicons name="alert-circle-outline" size={64} color="#9CA3AF" />
        </View>
        <Text style={styles.errorText}>Acteur introuvable</Text>
        <TouchableOpacity
          style={styles.errorButton}
          onPress={() => router.back()}
        >
          <Text style={styles.errorButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCall = () => {
    if (acteur.contact) {
      Linking.openURL(`tel:${acteur.contact}`).catch(() => {
        Alert.alert("Erreur", "Impossible d'ouvrir l'application téléphone");
      });
    }
  };

  const handleEmail = () => {
    if (acteur.email) {
      Linking.openURL(`mailto:${acteur.email}`).catch(() => {
        Alert.alert("Erreur", "Impossible d'ouvrir l'application email");
      });
    }
  };

  const handleWebsite = () => {
    if (acteur.website) {
      Linking.openURL(acteur.website).catch(() => {
        Alert.alert("Erreur", "Impossible d'ouvrir le site web");
      });
    }
  };

  const handleSocialMedia = (url) => {
    Linking.openURL(url).catch(() => {
      Alert.alert("Erreur", "Impossible d'ouvrir ce lien");
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <StatusBar barStyle="light" translucent backgroundColor="transparent" />

        {/* Fixed Header Buttons */}
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/acteurs")}
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
          {/* Hero Section with Logo */}
          <View style={styles.heroContainer}>
            <LinearGradient
              colors={[`${acteur.color}20`, `${acteur.color}05`]}
              style={styles.heroGradient}
            />
            <View style={styles.logoContainer}>
              <Image source={{ uri: acteur.logo }} style={styles.logo} />
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>{acteur.nom}</Text>
              <View
                style={[
                  styles.categorieBadge,
                  { backgroundColor: `${acteur.color}15` },
                ]}
              >
                <View
                  style={[
                    styles.categorieDot,
                    { backgroundColor: acteur.color },
                  ]}
                />
                <Text
                  style={[styles.categorieBadgeText, { color: acteur.color }]}
                >
                  {acteur.categorie}
                </Text>
              </View>
            </View>

            {/* Domaine */}
            <View style={styles.domaineCard}>
              <View
                style={[
                  styles.domaineIcon,
                  { backgroundColor: `${acteur.color}20` },
                ]}
              >
                <Ionicons name="briefcase" size={20} color={acteur.color} />
              </View>
              <Text style={styles.domaineText}>{acteur.domaine}</Text>
            </View>

            {/* Description */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#FF6600"
                />
                <Text style={styles.sectionTitle}>À propos</Text>
              </View>
              <View style={styles.descriptionCard}>
                <Text style={styles.description}>{acteur.description}</Text>
              </View>
            </View>

            {/* Informations */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#FF6600"
                />
                <Text style={styles.sectionTitle}>Informations</Text>
              </View>

              {/* Contact */}
              <TouchableOpacity
                style={styles.infoCard}
                onPress={handleCall}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={["#DBEAFE", "#BFDBFE"]}
                  style={styles.iconBox}
                >
                  <Ionicons name="call" size={24} color="#3B82F6" />
                </LinearGradient>
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Contact</Text>
                  <Text style={styles.infoValue}>{acteur.contact}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              {/* Email */}
              <TouchableOpacity
                style={styles.infoCard}
                onPress={handleEmail}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={["#FED7AA", "#FDBA74"]}
                  style={styles.iconBox}
                >
                  <Ionicons name="mail" size={24} color="#EA580C" />
                </LinearGradient>
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue} numberOfLines={1}>
                    {acteur.email}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              {/* Website */}
              {acteur.website && (
                <TouchableOpacity
                  style={styles.infoCard}
                  onPress={handleWebsite}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={["#D1FAE5", "#A7F3D0"]}
                    style={styles.iconBox}
                  >
                    <Ionicons name="globe" size={24} color="#059669" />
                  </LinearGradient>
                  <View style={styles.infoText}>
                    <Text style={styles.infoLabel}>Site web</Text>
                    <Text style={styles.infoValue} numberOfLines={1}>
                      {acteur.website}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              )}

              {/* Année de création */}
              {acteur.dateCreation && (
                <View style={styles.infoCard}>
                  <LinearGradient
                    colors={["#E9D5FF", "#D8B4FE"]}
                    style={styles.iconBox}
                  >
                    <Ionicons name="calendar" size={24} color="#9333EA" />
                  </LinearGradient>
                  <View style={styles.infoText}>
                    <Text style={styles.infoLabel}>Année de création</Text>
                    <Text style={styles.infoValue}>{acteur.dateCreation}</Text>
                  </View>
                </View>
              )}

              {/* Effectif */}
              {acteur.effectif && (
                <View style={styles.infoCard}>
                  <LinearGradient
                    colors={["#FECACA", "#FCA5A5"]}
                    style={styles.iconBox}
                  >
                    <Ionicons name="people" size={24} color="#DC2626" />
                  </LinearGradient>
                  <View style={styles.infoText}>
                    <Text style={styles.infoLabel}>Effectif</Text>
                    <Text style={styles.infoValue}>{acteur.effectif}</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Réseaux Sociaux */}
            {/* Section Réseaux sociaux */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="share-social-outline"
                  size={20}
                  color="#FF6600"
                />
                <Text style={styles.sectionTitle}>Réseaux sociaux</Text>
              </View>

              <View style={styles.socialContainer}>
                {acteur.reseauxSociaux.facebook && (
                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      { backgroundColor: "#F3F4F6" }, // fond gris clair
                    ]}
                    onPress={() =>
                      handleSocialMedia(acteur.reseauxSociaux.facebook)
                    }
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="logo-facebook"
                      size={28}
                      color={
                        acteur.activeSocial === "facebook"
                          ? "#FF6600"
                          : "#1877F2"
                      }
                    />
                  </TouchableOpacity>
                )}

                {acteur.reseauxSociaux.twitter && (
                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      { backgroundColor: "#F3F4F6" },
                    ]}
                    onPress={() =>
                      handleSocialMedia(acteur.reseauxSociaux.twitter)
                    }
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="logo-twitter"
                      size={28}
                      color={
                        acteur.activeSocial === "twitter"
                          ? "#FF6600"
                          : "#1DA1F2"
                      }
                    />
                  </TouchableOpacity>
                )}

                {acteur.reseauxSociaux.linkedin && (
                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      { backgroundColor: "#F3F4F6" },
                    ]}
                    onPress={() =>
                      handleSocialMedia(acteur.reseauxSociaux.linkedin)
                    }
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="logo-linkedin"
                      size={28}
                      color={
                        acteur.reseauxSociaux === "linkedin" ? "red" : "#0A66C2"
                      }
                    />
                  </TouchableOpacity>
                )}
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
                  <Text style={styles.infoValue}>{acteur.adresse}</Text>
                  <Text style={styles.locationSubtext}>
                    {acteur.ville}, {acteur.pays}
                  </Text>
                </View>
                <TouchableOpacity style={styles.mapButton}>
                  <Ionicons name="navigate-outline" size={20} color="#3B82F6" />
                </TouchableOpacity>
              </View>

              {/* Map Placeholder */}
              <View style={styles.mapPlaceholder}>
                <View style={styles.mapIcon}>
                  <Ionicons name="location" size={32} color={acteur.color} />
                </View>
                <Text style={styles.mapText}>Voir sur la carte</Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
    top: Platform.OS === "ios" ? 60 : 60,
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
    height: 300,
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
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#fff",
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 62,
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  categorieBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  categorieDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  categorieBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  domaineCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  domaineIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  domaineText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
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
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    gap: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
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
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  socialButton: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: Platform.OS === "ios" ? 12 : 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    gap: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  locationSubtext: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    marginTop: 4,
  },
  mapButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
  },
  mapIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mapText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
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
