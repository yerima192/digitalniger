import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Header from "../../components/Header";

export default function ActeursScreen() {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Header
          title="Acteurs"
          subtitle="L'écosystème numérique du Niger"
          badgeCount={44}
        />

        {/* Card en cours de développement */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="construct-outline" size={32} color="#3B82F6" />
          </View>

          <Text style={styles.title}>Page en cours de développement</Text>
          <Text style={styles.text}>
            Cette fonctionnalité sera bientôt disponible.  
            Nous travaillons activement dessus.
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
    paddingHorizontal: 16,
  },
  card: {
    marginTop: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 8,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "500",
  },
});
