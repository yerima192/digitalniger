import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Header from "../../components/Header";

export default function FavorisScreen() {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        {/* Header */}
        <Header
          title="Favoris"
          subtitle="Organisez vos éléments préférés"
          badgeCount={44}
        />

        {/* Card info */}
        <View style={styles.infoCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="heart-outline" size={28} color="#EF4444" />
          </View>

          <Text style={styles.title}>Fonctionnalité en cours</Text>
          <Text style={styles.text}>
            La gestion des favoris est actuellement en cours de développement.
            Vous pourrez bientôt retrouver ici tous vos contenus préférés.
          </Text>
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

  infoCard: {
    marginTop: 40,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  text: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "500",
  },
});
