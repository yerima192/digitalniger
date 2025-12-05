import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFF"
        translucent={false}
      />
      <ScrollView style={styles.container}>
        {/* Header */}
        <Header
          title="Bienvenue!"
          subtitle="Découvrez l'écosystème tech du Niger"
          badgeCount={44}
        />

        {/* Featured Card */}
        <View style={styles.featuredCard}>
          <Text style={styles.featuredTitle}>Niger Langues & IA Challenge</Text>
          <Text style={styles.featuredDescription}>
            Contribuez à l&apos;innovation en intelligence artificielle pour les
            langues locales.
          </Text>
          <TouchableOpacity style={styles.participerButton}>
            <Text style={styles.participerText}>Participer</Text>
          </TouchableOpacity>
        </View>

        {/* Grid Cards */}
        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridCard} onPress={() => router.push("/evenements")}>
            <View style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}>
              <Ionicons name="calendar" size={28} color="#FF6600" />
            </View>
            <Text style={styles.gridCardText}>Événements</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard}>
            <View style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}>
              <MaterialCommunityIcons
                name="account-group"
                size={28}
                color="#FF6600"
              />
            </View>
            <Text style={styles.gridCardText}>Acteurs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard}>
            <View style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}>
              <Ionicons name="briefcase" size={28} color="#FF6600" />
            </View>
            <Text style={styles.gridCardText}>Opportunités</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard}>
            <View style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}>
              <Ionicons name="heart" size={28} color="#FF6600" />
            </View>
            <Text style={styles.gridCardText}>Favoris</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  featuredCard: {
    backgroundColor: "#003D6B",
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 20,
    borderRadius: 16,
    minHeight: 160,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  featuredDescription: {
    fontSize: 14,
    color: "#E0E0E0",
    marginBottom: 16,
    lineHeight: 20,
  },
  participerButton: {
    backgroundColor: "#FF7F27",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  participerText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  gridCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    width: "47.5%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 130,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  gridCardText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
});
