import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../components/Header";
import { ProfileCompletionGuard } from "../../components/ProfileCompletionGuard";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import { showToast } from "../../components/Toast";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [homeStats, setHomeStats] = useState({
    upcomingEvents: 0,
    popularActors: 0,
    recentOpportunities: 0,
  });
  const circle1 = useRef(new Animated.Value(0)).current;
  const circle2 = useRef(new Animated.Value(0)).current;

  // Charger statistiques au démarrage
  useEffect(() => {
    loadHomeStats();
  }, []);

  const loadHomeStats = async () => {
    try {
      // Simulation de chargement de statistiques
      // À remplacer par un appel API réel
      setHomeStats({
        upcomingEvents: Math.floor(Math.random() * 20) + 8,
        popularActors: Math.floor(Math.random() * 15) + 10,
        recentOpportunities: Math.floor(Math.random() * 12) + 5,
      });
    } catch (error) {
      console.error("Erreur du chargement statistiques:", error);
    }
  };

  // Pull to refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadHomeStats();
      showToast("Données mises à jour", "success");
    } catch (_error) {
      showToast("Erreur de mise à jour", "error");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(circle1, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(circle1, {
          toValue: 0,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(circle2, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(circle2, {
          toValue: 0,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [circle1, circle2]);

  return (
    <SafeAreaWrapper>
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Bannière de complétion profil */}
        <ProfileCompletionGuard />

        {/* Header */}
        <Header
          title={`Bienvenue, ${user?.name?.split(" ")[0] || "Utilisateur"}!`}
          subtitle="Découvrez l'écosystème tech du Niger"
          badgeCount={homeStats.upcomingEvents + homeStats.recentOpportunities}
        />

        {/* Featured Card */}
        <View style={styles.featuredCardContainer}>
          <LinearGradient
            colors={['#003D6B', '#004d7a']}
            style={styles.featuredCard}
          >
            {/* Cercles animés */}
            <Animated.View
              style={[
                styles.animatedCircle,
                {
                  bottom: 10,
                  right: 9,
                  opacity: circle1,
                  transform: [
                    {
                      scale: circle1.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1.3],
                      }),
                    },
                  ],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.animatedCircle,
                {
                  bottom: 30,
                  right: 40,
                  opacity: circle2,
                  transform: [
                    {
                      scale: circle2.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.6, 1.4],
                      }),
                    },
                  ],
                },
              ]}
            />

            {/* Contenu */}
            <Text style={styles.featuredTitle}>Découvrez le Tech du Niger</Text>
            <Text style={styles.featuredDescription}>
              Explorez les projets, événements et opportunités qui transforment
              le digital dans notre pays.
            </Text>
            <TouchableOpacity
              style={styles.participerButton}
              onPress={() => {
                showToast("Navigation vers les événements", "info");
                router.push("/evenements");
              }}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FF7F27', '#FF6600']}
                style={styles.buttonGradient}
              >
                <Text style={styles.participerText}>Participer</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="calendar" size={24} color="#FF6600" />
            </View>
            <Text style={styles.statValue}>{homeStats.upcomingEvents}</Text>
            <Text style={styles.statLabel}>Événements à venir</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialCommunityIcons name="account-group" size={24} color="#059669" />
            </View>
            <Text style={styles.statValue}>{homeStats.popularActors}</Text>
            <Text style={styles.statLabel}>Acteurs populaires</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="briefcase" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.statValue}>{homeStats.recentOpportunities}</Text>
            <Text style={styles.statLabel}>Opportunités récentes</Text>
          </View>
        </View>

        {/* Grid Cards */}
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Explorez</Text>
        </View>
        
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => {
              showToast("Chargement des événements...", "info");
              router.push("/evenements");
            }}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#FFE8D6', '#FFD4B3']}
              style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}
            >
              <Ionicons name="calendar" size={28} color="#FF6600" />
            </LinearGradient>
            <Text style={styles.gridCardText}>Événements</Text>
            <Text style={styles.gridCardSubtext}>{homeStats.upcomingEvents} à venir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => {
              showToast("Chargement des acteurs...", "info");
              router.push("/acteurs");
            }}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#DCE8FF', '#C7D9FF']}
              style={[styles.iconCircle, { backgroundColor: "#DCE8FF" }]}
            >
              <MaterialCommunityIcons
                name="account-group"
                size={28}
                color="#3B82F6"
              />
            </LinearGradient>
            <Text style={styles.gridCardText}>Acteurs</Text>
            <Text style={styles.gridCardSubtext}>{homeStats.popularActors} actifs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => {
              showToast("Chargement des opportunités...", "info");
              router.push("/opportunites");
            }}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#DBEAFE', '#BFDBFE']}
              style={[styles.iconCircle, { backgroundColor: "#DBEAFE" }]}
            >
              <Ionicons name="briefcase" size={28} color="#059669" />
            </LinearGradient>
            <Text style={styles.gridCardText}>Opportunités</Text>
            <Text style={styles.gridCardSubtext}>{homeStats.recentOpportunities} récentes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => {
              showToast("Chargement vos favoris...", "info");
              router.push("/favoris");
            }}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#FFE8D6', '#FFD4B3']}
              style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}
            >
              <Ionicons name="heart" size={28} color="#EF4444" />
            </LinearGradient>
            <Text style={styles.gridCardText}>Favoris</Text>
            <Text style={styles.gridCardSubtext}>Mes sauvegardes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  featuredCardContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#003D6B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  featuredCard: {
    padding: 20,
    minHeight: 160,
  },
  animatedCircle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "#5b4e40d6",
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
    alignSelf: "flex-start",
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  participerText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },

  // Statistiques
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
  },

  // Section
  sectionTitle: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
  gridCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    width: "47.5%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    minHeight: 150,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridCardText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  gridCardSubtext: {
    fontSize: 12,
    color: "#6B7280",
  },
});