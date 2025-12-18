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
import { eventsData } from "../data/eventsData";
// import SafeAreaWrapper from "../components/SafeAreaWrapper";
// import SafeAreaWrapper from "../components/SafeAreaWrapper";

export default function EventDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const event = eventsData.find((e) => e.id === params.eventId);

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <View style={styles.errorIconCircle}>
          <Ionicons name="alert-circle-outline" size={64} color="#9CA3AF" />
        </View>
        <Text style={styles.errorText}>Événement introuvable</Text>
        <TouchableOpacity
          style={styles.errorButton}
          onPress={() => router.back()}
        >
          <Text style={styles.errorButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleRegister = () => {
    if (event.registrationLink) {
      Linking.openURL(event.registrationLink).catch(() => {
        Alert.alert("Erreur", "Impossible d'ouvrir le lien d'inscription");
      });
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    // <SafeAreaWrapper>
    <View style={styles.container}>
      <StatusBar barStyle="light" translucent backgroundColor="transparent" />
      {/* Fixed Header Buttons */}
      <View style={styles.headerButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/evenements")}
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
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: event.image }} style={styles.heroImage} />
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.6)"]}
            style={styles.heroGradient}
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>

          {/* Badges */}
          <View style={styles.badgesContainer}>
            <LinearGradient
              colors={["#FFF7ED", "#FFEDD5"]}
              style={styles.typeBadge}
            >
              <View style={styles.typeDot} />
              <Text style={styles.typeBadgeText}>{event.type}</Text>
            </LinearGradient>
            <View
              style={[
                styles.priceBadge,
                event.price === "Gratuit"
                  ? styles.gratuitBadge
                  : styles.payantBadge,
              ]}
            >
              <Ionicons
                name={
                  event.price === "Gratuit"
                    ? "checkmark-circle"
                    : "cash-outline"
                }
                size={14}
                color={event.price === "Gratuit" ? "#059669" : "#EA580C"}
              />
              <Text
                style={[
                  styles.priceBadgeText,
                  event.price === "Gratuit"
                    ? styles.gratuitText
                    : styles.payantText,
                ]}
              >
                {event.price}
              </Text>
            </View>
          </View>

          {/* Date & Time */}
          <View style={styles.infoCard}>
            <LinearGradient
              colors={["#FFE8D6", "#FFD4B3"]}
              style={styles.iconBox}
            >
              <Ionicons name="calendar-outline" size={24} color="#FF6600" />
            </LinearGradient>
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>{event.date}</Text>
              <Text style={styles.infoSubtitle}>{event.time}</Text>
            </View>
            <View style={styles.infoArrow}>
              <Ionicons name="time-outline" size={20} color="#9CA3AF" />
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
              <Text style={styles.description}>{event.description}</Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="location-outline" size={20} color="#FF6600" />
              <Text style={styles.sectionTitle}>Lieu</Text>
            </View>
            <View style={styles.locationCard}>
              <LinearGradient
                colors={["#EFF6FF", "#DBEAFE"]}
                style={styles.iconBox}
              >
                <Ionicons name="map-outline" size={24} color="#3B82F6" />
              </LinearGradient>
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>{event.location}</Text>
                <Text style={styles.infoSubtitle}>
                  {event.city}, {event.country}
                </Text>
              </View>
              <TouchableOpacity style={styles.mapButton}>
                <Ionicons name="navigate-outline" size={20} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Organizer */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="people-outline" size={20} color="#FF6600" />
              <Text style={styles.sectionTitle}>Organisateur</Text>
            </View>
            <View style={styles.organizerContainer}>
              <LinearGradient
                colors={["#003D6B", "#005A8F"]}
                style={styles.organizerIcon}
              >
                <Ionicons name="business" size={24} color="#fff" />
              </LinearGradient>
              <View style={styles.organizerText}>
                <Text style={styles.organizerTitle}>{event.organizer}</Text>
                <Text style={styles.organizerSubtitle}>
                  {event.organizerTagline}
                </Text>
              </View>
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={{ height: 100 }} /> */}
        </View>
      </ScrollView>

      {/* Register Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#FF7F27", "#FF6600"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.registerGradient}
          >
            <Text style={styles.registerButtonText}>S&apos;inscrire</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
    // </SafeAreaWrapper>
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
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
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
    backgroundColor: "#FF6600",
  },
  typeBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FF6600",
  },
  priceBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  gratuitBadge: {
    backgroundColor: "#D1FAE5",
  },
  payantBadge: {
    backgroundColor: "#FED7AA",
  },
  priceBadgeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  gratuitText: {
    color: "#059669",
  },
  payantText: {
    color: "#EA580C",
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
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  infoSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  infoArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
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
  mapButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  organizerContainer: {
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
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#003D6B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
  contactButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
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
  registerButton: {
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  registerGradient: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  registerButtonText: {
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
