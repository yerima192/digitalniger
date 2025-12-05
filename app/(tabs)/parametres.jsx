import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Animated,
  StatusBar,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";

export default function ParametresScreen() {
  const [notificationsPush, setNotificationsPush] = useState(true);
  const [modeHorsLigne, setModeHorsLigne] = useState(false);
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(animation, {
      toValue: notificationsPush ? 1.15 : 1, // petite augmentation
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [animation, notificationsPush]);

  return (
    <ScreenWrapper>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFF"
        translucent={false}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
          <Header title="Paramètres" badgeCount={1} />

        {/* GÉNÉRAL Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GÉNÉRAL</Text>
          <View style={styles.card}>
            {/* Notifications Push */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}
                >
                  <Ionicons name="notifications" size={20} color="#FF6600" />
                </View>
                <Text style={styles.settingText}>Notifications Push</Text>
              </View>
              <Animated.View style={{ transform: [{ scale: animation }] }}>
                <Switch
                  value={notificationsPush}
                  onValueChange={setNotificationsPush}
                  trackColor={{ false: "#E0E0E0", true: "#FFB380" }}
                  thumbColor={notificationsPush ? "#FF6600" : "#f4f3f4"}
                />
              </Animated.View>
            </View>

            {/* Séparateur */}
            <View style={styles.separator} />

            {/* Mode hors ligne */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#E8E8E8" }]}
                >
                  <Ionicons
                    name="cloud-offline-outline"
                    size={20}
                    color="#666"
                  />
                </View>
                <Text style={styles.settingText}>Mode hors ligne</Text>
              </View>
              <Animated.View style={{ transform: [{ scale: animation }] }}>
                <Switch
                  value={modeHorsLigne}
                  onValueChange={setModeHorsLigne}
                  trackColor={{ false: "#E0E0E0", true: "#FFB380" }}
                  thumbColor={modeHorsLigne ? "#FF6600" : "#f4f3f4"}
                />
              </Animated.View>
            </View>
          </View>
        </View>

        {/* COMPTE Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>COMPTE</Text>
          <View style={styles.card}>
            {/* Gérer mon compte */}
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#E8E8E8" }]}
                >
                  <Ionicons name="person-outline" size={20} color="#666" />
                </View>
                <Text style={styles.settingText}>Gérer mon compte</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            {/* Séparateur */}
            <View style={styles.separator} />

            {/* Se déconnecter */}
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#FFE8E8" }]}
                >
                  <Ionicons name="log-out-outline" size={20} color="#FF0000" />
                </View>
                <Text style={[styles.settingText, { color: "#FF0000" }]}>
                  Se déconnecter
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* À PROPOS Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À PROPOS</Text>
          <View style={styles.card}>
            {/* Aide et support */}
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#E8E8E8" }]}
                >
                  <Ionicons name="help-circle-outline" size={20} color="#666" />
                </View>
                <Text style={styles.settingText}>Aide et support</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            {/* Séparateur */}
            <View style={styles.separator} />

            {/* Politique de confidentialité */}
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#E8E8E8" }]}
                >
                  <MaterialCommunityIcons
                    name="shield-check-outline"
                    size={20}
                    color="#666"
                  />
                </View>
                <Text style={styles.settingText}>
                  Politique de confidentialité
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            {/* Séparateur */}
            <View style={styles.separator} />

            {/* Version de l'application */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#E8E8E8" }]}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={20}
                    color="#666"
                  />
                </View>
                <Text style={styles.settingText}>
                  Version de l&apos;application
                </Text>
              </View>
              <Text style={styles.versionText}>1.0.0</Text>
            </View>
          </View>
        </View>

        {/* Espacement en bas */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#999",
    marginLeft: 16,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginLeft: 52,
  },
  versionText: {
    fontSize: 15,
    color: "#999",
    fontWeight: "500",
  },
});
