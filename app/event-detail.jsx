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
import { useRouter, useLocalSearchParams } from "expo-router";

// Données temporaires - à remplacer par votre backend
import { eventsData } from "../data/eventsData";
import SafeAreaWrapper from "../components/SafeAreaWrapper";

export default function EventDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // Récupérer l'événement depuis les données
  const event = eventsData.find((e) => e.id === params.eventId);

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <Text style={styles.errorText}>Événement introuvable</Text>
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
    // Ici, vous pouvez ajouter la logique pour sauvegarder dans AsyncStorage
    // ou envoyer à votre backend
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        {/* Fixed Header Buttons */}
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/evenements")}
          >
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#EF4444" : "#111827"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Image */}
          <View style={styles.heroContainer}>
            <Image source={{ uri: event.image }} style={styles.heroImage} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>{event.title}</Text>

            {/* Badges */}
            <View style={styles.badgesContainer}>
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>{event.type}</Text>
              </View>
              <View
                style={[
                  styles.priceBadge,
                  event.price === "Gratuit"
                    ? styles.gratuitBadge
                    : styles.payantBadge,
                ]}
              >
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
              <View style={styles.iconBox}>
                <Ionicons name="calendar-outline" size={24} color="#FF6600" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>{event.date}</Text>
                <Text style={styles.infoSubtitle}>{event.time}</Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{event.description}</Text>
            </View>

            {/* Location */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Lieu</Text>
              <View style={styles.locationCard}>
                <View style={styles.iconBox}>
                  <Ionicons name="location-outline" size={24} color="#FF6600" />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoTitle}>{event.location}</Text>
                  <Text style={styles.infoSubtitle}>
                    {event.city}, {event.country}
                  </Text>
                </View>
              </View>
            </View>

            {/* Organizer */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Organisateur</Text>
              <View style={styles.organizerContainer}>
                <View style={styles.organizerIcon}>
                  <Ionicons name="business" size={24} color="#fff" />
                </View>
                <View style={styles.organizerText}>
                  <Text style={styles.organizerTitle}>{event.organizer}</Text>
                  <Text style={styles.organizerSubtitle}>
                    {event.organizerTagline}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ height: 100 }} />
          </View>
        </ScrollView>

        {/* Register Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>S&apos;inscrire</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
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
    top: Platform.OS === "ios" ? 15 : 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  favoriteButton: {
    width: 35,
    height: 35,
    borderRadius: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroContainer: {
    height: 300,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
    lineHeight: 30,
  },
  badgesContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  typeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#FFF7ED",
    borderRadius: 20,
  },
  typeBadgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FF6600",
  },
  priceBadge: {
    paddingHorizontal: 14,
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
    fontSize: 13,
    fontWeight: "600",
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
    borderRadius: 16,
    marginBottom: 20,
    gap: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFE8D6",
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  infoSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#6B7280",
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    gap: 12,
  },
  organizerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    gap: 12,
  },
  organizerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#003D6B",
    justifyContent: "center",
    alignItems: "center",
  },
  organizerText: {
    flex: 1,
  },
  organizerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  organizerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
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
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  registerButton: {
    flexDirection: "row",
    backgroundColor: "#FF6600",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  registerButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  errorText: {
    fontSize: 18,
    color: "#6B7280",
  },
});
