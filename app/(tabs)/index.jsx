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
        <ScrollView style={styles.container}>
          {/* Header */}
          <Header
            title="Bienvenue!"
            subtitle="Découvrez l'écosystème tech du Niger"
            badgeCount={44}
          />

          {/* Featured Card */}
          <View style={styles.featuredCard}>
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

            {/* Ton contenu */}
            <Text style={styles.featuredTitle}>Découvrez le Tech du Niger</Text>
            <Text style={styles.featuredDescription}>
              Explorez les projets, événements et opportunités qui transforment
              le digital dans notre pays.
            </Text>
            <TouchableOpacity
              style={styles.participerButton}
              // onPress={() => router.push("/evenements")}
            >
              <Text style={styles.participerText}>Participer</Text>
            </TouchableOpacity>
          </View>

          {/* Grid Cards */}
          <View style={styles.grid}>
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => router.push("/evenements")}
            >
              <View style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}>
                <Ionicons name="calendar" size={28} color="#FF6600" />
              </View>
              <Text style={styles.gridCardText}>Événements</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => router.push("/acteurs")}
            >
              <View style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}>
                <MaterialCommunityIcons
                  name="account-group"
                  size={28}
                  color="#FF6600"
                />
              </View>
              <Text style={styles.gridCardText}>Acteurs</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => router.push("/opportunites")}
            >
              <View style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}>
                <Ionicons name="briefcase" size={28} color="#FF6600" />
              </View>
              <Text style={styles.gridCardText}>Opportunités</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => router.push("/favoris")}
            >
              <View style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}>
                <Ionicons name="heart" size={28} color="#FF6600" />
              </View>
              <Text style={styles.gridCardText}>Favoris</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 30 }} />
        </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F9FAFB",
    backgroundColor: "#FFFFFF",
  },
  featuredCard: {
    overflow: "hidden",
    backgroundColor: "#003D6B",
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 20,
    borderRadius: 16,
    minHeight: 160,
  },
  animatedCircle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "#5b4e40d6",
    // backgroundColor: "#5b4e40bb",
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
