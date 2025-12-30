import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useEffect, useRef } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "../../components/Header";
import { useRouter } from "expo-router";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";

export default function HomeScreen() {
  const router = useRouter();
  const circle1 = useRef(new Animated.Value(0)).current;
  const circle2 = useRef(new Animated.Value(0)).current;

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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          title="Bienvenue !"
          // title={`Bienvenue, ${user?.nom || "Utilisateur"}!`}
          subtitle="Découvrez l'écosystème tech du Niger"
          badgeCount={44}
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
              onPress={() => router.push("/evenements")}
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

        {/* Grid Cards */}
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push("/evenements")}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#FFE8D6', '#FFD4B3']}
              style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}
            >
              <Ionicons name="calendar" size={28} color="#FF6600" />
            </LinearGradient>
            <Text style={styles.gridCardText}>Événements</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push("/acteurs")}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#FFE8D6', '#FFD4B3']}
              style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}
            >
              <MaterialCommunityIcons
                name="account-group"
                size={28}
                color="#FF6600"
              />
            </LinearGradient>
            <Text style={styles.gridCardText}>Acteurs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push("/opportunites")}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#FFE8D6', '#FFD4B3']}
              style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}
            >
              <Ionicons name="briefcase" size={28} color="#FF6600" />
            </LinearGradient>
            <Text style={styles.gridCardText}>Opportunités</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push("/favoris")}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#FFE8D6', '#FFD4B3']}
              style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}
            >
              <Ionicons name="heart" size={28} color="#FF6600" />
            </LinearGradient>
            <Text style={styles.gridCardText}>Favoris</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ height: 30 }} /> */}
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F9FAFB",
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  gridCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    width: "47.5%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    minHeight: 130,
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
  },
});