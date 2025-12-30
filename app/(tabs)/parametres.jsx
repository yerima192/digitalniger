import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Animated,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/Header";
import { useRouter } from "expo-router";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import { useAuth } from "../../context/AuthContext";

export default function ParametresScreen() {
  const [notificationsPush, setNotificationsPush] = useState(true);
  const [modeHorsLigne, setModeHorsLigne] = useState(false);
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(animation, {
      toValue: notificationsPush ? 1.15 : 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [animation, notificationsPush]);

  const { logout, } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: async () => {
          const result = await logout();
          if (result.success) {
            router.replace("/auth");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          title="Paramètres"
          subtitle="Gérez vos préférences et votre compte"
          badgeCount={1}
        />

        {/* GÉNÉRAL Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleLine} />
            <Text style={styles.sectionTitle}>GÉNÉRAL</Text>
            <View style={styles.sectionTitleLine} />
          </View>

          <View style={styles.card}>
            {/* Notifications Push */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <LinearGradient
                  colors={["#FFE8D6", "#FFD4B3"]}
                  style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}
                >
                  <Ionicons name="notifications" size={24} color="#FF6600" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.settingText}>Notifications Push</Text>
                  <Text style={styles.settingSubtext}>
                    {notificationsPush ? "Activées" : "Désactivées"}
                  </Text>
                </View>
              </View>
              <Animated.View style={{ transform: [{ scale: animation }] }}>
                <Switch
                  value={notificationsPush}
                  onValueChange={setNotificationsPush}
                  trackColor={{ false: "#E5E7EB", true: "#FFB380" }}
                  thumbColor={notificationsPush ? "#FF6600" : "#FFFFFF"}
                  ios_backgroundColor="#E5E7EB"
                />
              </Animated.View>
            </View>

            <View style={styles.separator} />

            {/* Mode hors ligne */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <LinearGradient
                  colors={["#F3F4F6", "#E5E7EB"]}
                  style={[styles.iconCircle, { backgroundColor: "#F3F4F6" }]}
                >
                  <Ionicons
                    name="cloud-offline-outline"
                    size={24}
                    color="#6B7280"
                  />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.settingText}>Mode hors ligne</Text>
                  <Text style={styles.settingSubtext}>
                    {modeHorsLigne ? "Activé" : "Désactivé"}
                  </Text>
                </View>
              </View>
              <Switch
                value={modeHorsLigne}
                onValueChange={setModeHorsLigne}
                trackColor={{ false: "#E5E7EB", true: "#FFB380" }}
                thumbColor={modeHorsLigne ? "#FF6600" : "#FFFFFF"}
                ios_backgroundColor="#E5E7EB"
              />
            </View>
          </View>
        </View>

        {/* COMPTE Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleLine} />
            <Text style={styles.sectionTitle}>COMPTE</Text>
            <View style={styles.sectionTitleLine} />
          </View>

          <View style={styles.card}>
            {/* Gérer mon compte */}
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => router.push("/gerer-compte")}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <LinearGradient
                  colors={["#EFF6FF", "#DBEAFE"]}
                  style={[styles.iconCircle, { backgroundColor: "#EFF6FF" }]}
                >
                  <Ionicons name="person-outline" size={24} color="#3B82F6" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.settingText}>Gérer mon compte</Text>
                  <Text style={styles.settingSubtext}>
                    Informations personnelles
                  </Text>
                </View>
              </View>
              <View style={styles.chevronCircle}>
                <Ionicons name="chevron-forward" size={18} color="#6B7280" />
              </View>
            </TouchableOpacity>

            <View style={styles.separator} />

            {/* Se déconnecter */}
            <TouchableOpacity
              style={styles.settingRow}
              activeOpacity={0.7}
              onPress={handleLogout}
            >
              <View style={styles.settingLeft}>
                <LinearGradient
                  colors={["#FEE2E2", "#FECACA"]}
                  style={[styles.iconCircle, { backgroundColor: "#FEE2E2" }]}
                >
                  <Ionicons name="log-out-outline" size={24} color="#DC2626" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={[styles.settingText, { color: "#DC2626" }]}>
                    Se déconnecter
                  </Text>
                  <Text style={[styles.settingSubtext, { color: "#F87171" }]}>
                    Quitter l&apos;application
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* À PROPOS Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleLine} />
            <Text style={styles.sectionTitle}>À PROPOS</Text>
            <View style={styles.sectionTitleLine} />
          </View>

          <View style={styles.card}>
            {/* Aide et support */}
            <TouchableOpacity
              onPress={() => router.push("/aide-support")}
              style={styles.settingRow}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <LinearGradient
                  colors={["#F0FDF4", "#DCFCE7"]}
                  style={[styles.iconCircle, { backgroundColor: "#F0FDF4" }]}
                >
                  <Ionicons
                    name="help-circle-outline"
                    size={24}
                    color="#10B981"
                  />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.settingText}>Aide et support</Text>
                  <Text style={styles.settingSubtext}>
                    Besoin d&apos;assistance ?
                  </Text>
                </View>
              </View>
              <View style={styles.chevronCircle}>
                <Ionicons name="chevron-forward" size={18} color="#6B7280" />
              </View>
            </TouchableOpacity>

            <View style={styles.separator} />

            {/* Politique de confidentialité */}
            <TouchableOpacity
              onPress={() => router.push("/politique-confidentialite")}
              style={styles.settingRow}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <LinearGradient
                  colors={["#FDF4FF", "#FAE8FF"]}
                  style={[styles.iconCircle, { backgroundColor: "#FDF4FF" }]}
                >
                  <MaterialCommunityIcons
                    name="shield-check-outline"
                    size={24}
                    color="#A855F7"
                  />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.settingText}>
                    Politique de confidentialité
                  </Text>
                  <Text style={styles.settingSubtext}>
                    Vos données et vie privée
                  </Text>
                </View>
              </View>
              <View style={styles.chevronCircle}>
                <Ionicons name="chevron-forward" size={18} color="#6B7280" />
              </View>
            </TouchableOpacity>

            <View style={styles.separator} />

            {/* Version de l'application */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <LinearGradient
                  colors={["#E0E7FF", "#C7D2FE"]}
                  style={[styles.iconCircle, { backgroundColor: "#E0E7FF" }]}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color="#6366F1"
                  />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.settingText}>
                    Version de l&apos;application
                  </Text>
                  <Text style={styles.settingSubtext}>
                    Dernière mise à jour
                  </Text>
                </View>
              </View>
              <View style={styles.versionBadge}>
                <Text style={styles.versionText}>1.0.0</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Espacement en bas */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  sectionTitleLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 14,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  settingSubtext: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  separator: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 66,
  },
  chevronCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  versionBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  versionText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
});
