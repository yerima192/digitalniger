import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Header from "../../components/Header";

export default function ProfilScreen() {
  const stats = [
    { icon: "heart", label: "Favoris", count: "12", gradient: ["#FEE2E2", "#FECACA"], color: "#DC2626" },
    { icon: "calendar", label: "Événements", count: "8", gradient: ["#FFE8D6", "#FFD4B3"], color: "#FF6600" },
    { icon: "gift", label: "Opportunités", count: "5", gradient: ["#FDF4FF", "#FAE8FF"], color: "#A855F7" },
  ];

  const menuItems = [
    {
      icon: "person-circle-outline",
      label: "Modifier mes informations",
      subtext: "Nom, email, téléphone",
      gradient: ["#E0E7FF", "#C7D2FE"],
      color: "#6366F1",
      route: "/modifier-mes-informations"
    },
    {
      icon: "lock-closed-outline",
      label: "Changer mon mot de passe",
      subtext: "Sécurisez votre compte",
      gradient: ["#FFE8D6", "#FFD4B3"],
      color: "#FF6600",
      route: "/modifier-mes-informations"
    },
    {
      icon: "notifications-outline",
      label: "Notifications",
      subtext: "Gérez vos alertes",
      gradient: ["#FDF4FF", "#FAE8FF"],
      color: "#A855F7",
      route: "/notifications"
    },
    {
      icon: "heart-outline",
      label: "Mes favoris",
      subtext: "Événements & opportunités sauvegardés",
      gradient: ["#FEE2E2", "#FECACA"],
      color: "#DC2626",
      route: "/favoris"
    },
  ];

  // const quickActions = [
  //   {
  //     icon: "settings-outline",
  //     label: "Paramètres",
  //     gradient: ["#E8F0FF", "#D4E4FF"],
  //     color: "#3366FF"
  //   },
  //   {
  //     icon: "help-circle-outline",
  //     label: "Aide",
  //     gradient: ["#F0FDF4", "#DCFCE7"],
  //     color: "#10B981"
  //   },
  //   {
  //     icon: "share-social-outline",
  //     label: "Partager",
  //     gradient: ["#FFF7ED", "#FFEDD5"],
  //     color: "#F97316"
  //   },
  // ];

  return (
    <SafeAreaWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header
          title="Mon Profil"
          subtitle="Gérez votre compte et vos préférences"
          badgeCount={3}
        />

        {/* Profil Card */}
        <View style={styles.profileSection}>
          <LinearGradient
            colors={["#FF7F27", "#FF6600"]}
            style={styles.profileCard}
          >
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                <Image
                  source={require("../../assets/images/profil.jpg")}
                  style={styles.avatar}
                />
                <TouchableOpacity style={styles.editAvatarButton} activeOpacity={0.8}>
                  <Ionicons name="camera" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Info */}
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Soumana Abassa</Text>
              <Text style={styles.profileEmail}>delomodibo@gmail.com</Text>
              <View style={styles.profileBadge}>
                <Ionicons name="shield-checkmark" size={14} color="#10B981" />
                <Text style={styles.profileBadgeText}>Compte vérifié</Text>
              </View>
            </View>

            {/* Edit Button */}
            <TouchableOpacity 
              style={styles.editProfileButton}
              activeOpacity={0.8}
              onPress={() => router.push("/modifier-mes-informations")}
            >
              <Ionicons name="create-outline" size={18} color="#FF6600" />
              <Text style={styles.editProfileText}>Modifier</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          {stats.map((stat, index) => (
            <TouchableOpacity key={index} style={styles.statCard} activeOpacity={0.8}>
              <LinearGradient
                colors={stat.gradient}
                style={styles.statIconContainer}
              >
                <Ionicons name={stat.icon} size={24} color={stat.color} />
              </LinearGradient>
              <Text style={styles.statCount}>{stat.count}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SECTION : Mon compte */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>Mon compte</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.card}>
            {menuItems.map((item, index) => (
              <View key={index}>
                <TouchableOpacity 
                  style={styles.row}
                  activeOpacity={0.7}
                  onPress={() => item.route && router.push(item.route)}
                >
                  <View style={styles.left}>
                    <LinearGradient
                      colors={item.gradient}
                      style={styles.iconCircle}
                    >
                      <Ionicons name={item.icon} size={22} color={item.color} />
                    </LinearGradient>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>{item.label}</Text>
                      <Text style={styles.subtext}>{item.subtext}</Text>
                    </View>
                  </View>
                  <View style={styles.chevronCircle}>
                    <Ionicons name="chevron-forward" size={18} color="#6B7280" />
                  </View>
                </TouchableOpacity>
                {index < menuItems.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        </View>

        {/* SECTION : Actions rapides */}
        {/* <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>Actions rapides</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.quickActionsContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionCard} activeOpacity={0.8}>
                <LinearGradient
                  colors={action.gradient}
                  style={styles.quickActionIconCircle}
                >
                  <Ionicons name={action.icon} size={28} color={action.color} />
                </LinearGradient>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}

        {/* SECTION : Application */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>Application</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.card}>
            <TouchableOpacity style={styles.row} activeOpacity={0.7}>
              <View style={styles.left}>
                <LinearGradient
                  colors={["#DBEAFE", "#BFDBFE"]}
                  style={styles.iconCircle}
                >
                  <Ionicons name="information-circle-outline" size={22} color="#3B82F6" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Version</Text>
                  <Text style={styles.subtext}>1.0.0 - Dernière mise à jour</Text>
                </View>
              </View>
              <View style={styles.versionBadge}>
                <Text style={styles.versionText}>Beta</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.row} activeOpacity={0.7}>
              <View style={styles.left}>
                <LinearGradient
                  colors={["#FEE2E2", "#FECACA"]}
                  style={styles.iconCircle}
                >
                  <Ionicons name="log-out-outline" size={22} color="#DC2626" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={[styles.text, { color: "#DC2626" }]}>Se déconnecter</Text>
                  <Text style={[styles.subtext, { color: "#F87171" }]}>Quitter l&apos;application</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  profileSection: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  profileCard: {
    borderRadius: 24,
    padding: 24,
    shadowColor: "#FF6600",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    position: "relative",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatarCircle: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FF6600",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
    marginBottom: 12,
  },
  profileBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  profileBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#10B981",
  },
  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 12,
    gap: 6,
  },
  editProfileText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FF6600",
  },
  statsSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCount: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
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
  line: {
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
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
  text: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  subtext: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  chevronCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 62,
  },
  versionBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  versionText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#3B82F6",
  },
  // quickActionsContainer: {
  //   flexDirection: "row",
  //   gap: 12,
  // },
  // quickActionCard: {
  //   flex: 1,
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 16,
  //   padding: 16,
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 3,
  //   },
  //   shadowOpacity: 0.08,
  //   shadowRadius: 8,
  //   elevation: 4,
  //   borderWidth: 1,
  //   borderColor: "#F3F4F6",
  // },
  // quickActionIconCircle: {
  //   width: 56,
  //   height: 56,
  //   borderRadius: 16,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginBottom: 10,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3,
  // },
  // quickActionLabel: {
  //   fontSize: 13,
  //   fontWeight: "600",
  //   color: "#374151",
  //   textAlign: "center",
  // },
});