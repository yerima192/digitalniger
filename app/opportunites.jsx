import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import Header from "../components/Header";

const Opportinity = () => {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Header
          title="Opportunités"
          subtitle="Découvrez les opportunités disponibles"
          badgeCount={44}
        />

        {/* Carte info */}
        <View style={styles.infoCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="construct-outline" size={28} color="#2563EB" />
          </View>

          <Text style={styles.title}>Page en cours de développement</Text>
          <Text style={styles.description}>
            Cette fonctionnalité sera bientôt disponible. 
            Nous travaillons activement pour vous offrir une meilleure expérience.
          </Text>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default Opportinity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  infoCard: {
    marginTop: 80,
    marginHorizontal: 24,
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: 8,
    textAlign: "center",
  },

  description: {
    fontSize: 14,
    color: "#3B82F6",
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "500",
  },
});
