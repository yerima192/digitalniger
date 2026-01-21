import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Toast from "../../components/Toast";

export default function NotificationsScreen() {
  const [filter, setFilter] = useState("Toutes");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showToast, setShowToast] = useState(false);

  const displayToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const notifications = [
    {
      id: 1,
      type: "event",
      icon: "calendar",
      gradient: ["#FFE8D6", "#FFD4B3"],
      color: "#FF6600",
      title: "Nouvel événement",
      message: "Tech Summit Niger 2024 - Conférence annuelle du numérique",
      time: "Il y a 2h",
      read: false
    },
    {
      id: 2,
      type: "opportunity",
      icon: "gift",
      gradient: ["#FDF4FF", "#FAE8FF"],
      color: "#A855F7",
      title: "Nouvelle opportunité",
      message: "Bourse d'études en développement web - Date limite : 15 janvier",
      time: "Il y a 5h",
      read: false
    },
    {
      id: 3,
      type: "acteur",
      icon: "business",
      gradient: ["#F0FDF4", "#DCFCE7"],
      color: "#10B981",
      title: "Nouvel acteur ajouté",
      message: "Niger Tech Hub a rejoint la plateforme",
      time: "Il y a 1 jour",
      read: true
    },
    {
      id: 4,
      type: "event",
      icon: "calendar",
      gradient: ["#FFE8D6", "#FFD4B3"],
      color: "#FF6600",
      title: "Rappel d'événement",
      message: "Hackathon Innovation commence demain à 9h",
      time: "Il y a 1 jour",
      read: true
    },
    {
      id: 5,
      type: "system",
      icon: "information-circle",
      gradient: ["#DBEAFE", "#BFDBFE"],
      color: "#3B82F6",
      title: "Mise à jour disponible",
      message: "Une nouvelle version de l'application est disponible",
      time: "Il y a 2 jours",
      read: true
    },
    {
      id: 6,
      type: "opportunity",
      icon: "gift",
      gradient: ["#FDF4FF", "#FAE8FF"],
      color: "#A855F7",
      title: "Opportunité expirée",
      message: "Concours StartupWeekend Niger - Date limite dépassée",
      time: "Il y a 3 jours",
      read: true
    },
    {
      id: 7,
      type: "event",
      icon: "calendar",
      gradient: ["#FFE8D6", "#FFD4B3"],
      color: "#FF6600",
      title: "Événement annulé",
      message: "Workshop UX/UI Design a été annulé par l'organisateur",
      time: "Il y a 4 jours",
      read: true
    },
    {
      id: 8,
      type: "acteur",
      icon: "business",
      gradient: ["#F0FDF4", "#DCFCE7"],
      color: "#10B981",
      title: "Mise à jour profil",
      message: "Digital Sahel a mis à jour ses informations",
      time: "Il y a 5 jours",
      read: true
    }
  ];

  const filters = ["Toutes", "Événements", "Opportunités", "Acteurs", "Système"];

  const getFilteredNotifications = () => {
    if (filter === "Toutes") return notifications;
    
    const typeMap = {
      "Événements": "event",
      "Opportunités": "opportunity",
      "Acteurs": "acteur",
      "Système": "system"
    };
    
    return notifications.filter(n => n.type === typeMap[filter]);
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaWrapper>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onHide={() => setShowToast(false)}
        />
      )}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header
          title="Notifications"
          subtitle={`${unreadCount} non lues`}
          badgeCount={unreadCount}
        />

        {/* Actions rapides */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={styles.actionButton} 
            activeOpacity={0.8}
            onPress={() => {
              displayToast("Toutes les notifications marquées comme lues", "success");
            }}
          >
            <LinearGradient
              colors={["#E0E7FF", "#C7D2FE"]}
              style={styles.actionButtonGradient}
            >
              <Ionicons name="checkmark-done" size={20} color="#6366F1" />
              <Text style={styles.actionButtonText}>Tout marquer comme lu</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton} 
            activeOpacity={0.8}
            onPress={() => {
              displayToast("Toutes les notifications supprimées", "success");
            }}
          >
            <View style={styles.actionButtonOutline}>
              <Ionicons name="trash-outline" size={20} color="#DC2626" />
              <Text style={[styles.actionButtonText, { color: "#DC2626" }]}>Tout effacer</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Filtres */}
        <View style={styles.filtersSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filtersContainer}>
              {filters.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterChip,
                    filter === item && styles.filterChipActive
                  ]}
                  onPress={() => {
                    setFilter(item);
                    displayToast(`Filtre: ${item}`, "info");
                  }}
                  activeOpacity={0.7}
                >
                  {filter === item && (
                    <LinearGradient
                      colors={["#FF7F27", "#FF6600"]}
                      style={StyleSheet.absoluteFill}
                    />
                  )}
                  <Text
                    style={[
                      styles.filterChipText,
                      filter === item && styles.filterChipTextActive
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Info si non lues */}
        {unreadCount > 0 && (
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons name="notifications" size={24} color="#F97316" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Nouvelles notifications</Text>
              <Text style={styles.infoText}>
                Vous avez {unreadCount} notification{unreadCount > 1 ? "s" : ""} non lue{unreadCount > 1 ? "s" : ""}
              </Text>
            </View>
          </View>
        )}

        {/* Liste des notifications */}
        <View style={styles.notificationsSection}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  !notification.read && styles.notificationCardUnread
                ]}
                activeOpacity={0.8}
              >
                <View style={styles.notificationContent}>
                  <LinearGradient
                    colors={notification.gradient}
                    style={styles.notificationIconCircle}
                  >
                    <Ionicons name={notification.icon} size={24} color={notification.color} />
                  </LinearGradient>

                  <View style={styles.notificationTextContainer}>
                    <View style={styles.notificationHeader}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      {!notification.read && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.notificationMessage} numberOfLines={2}>
                      {notification.message}
                    </Text>
                    <View style={styles.notificationFooter}>
                      <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                      <Text style={styles.notificationTime}>{notification.time}</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
                    <Ionicons name="ellipsis-vertical" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="notifications-off-outline" size={48} color="#9CA3AF" />
              </View>
              <Text style={styles.emptyText}>Aucune notification</Text>
              <Text style={styles.emptySubtext}>
                Vous n&apos;avez pas de notifications pour ce filtre
              </Text>
            </View>
          )}
        </View>

        {/* Section préférences */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>Préférences</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.card}>
            <TouchableOpacity style={styles.row} activeOpacity={0.7}>
              <View style={styles.left}>
                <LinearGradient
                  colors={["#FFE8D6", "#FFD4B3"]}
                  style={styles.iconCircle}
                >
                  <Ionicons name="settings-outline" size={22} color="#FF6600" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Gérer les notifications</Text>
                  <Text style={styles.subtext}>Push, email, événements...</Text>
                </View>
              </View>
              <View style={styles.chevronCircle}>
                <Ionicons name="chevron-forward" size={18} color="#6B7280" />
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
  actionsSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 14,
    overflow: "hidden",
  },
  actionButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 6,
  },
  actionButtonOutline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#FEE2E2",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6366F1",
  },
  filtersSection: {
    marginTop: 20,
    paddingLeft: 16,
  },
  filtersContainer: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 16,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  filterChipActive: {
    borderColor: "#FF6600",
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  infoCard: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFEDD5",
    shadowColor: "#F97316",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFEDD5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#C2410C",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: "#F97316",
    lineHeight: 18,
    fontWeight: "500",
  },
  notificationsSection: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  notificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  notificationCardUnread: {
    borderColor: "#FF6600",
    borderWidth: 1.5,
    backgroundColor: "#FFF7ED",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  notificationIconCircle: {
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
  notificationTextContainer: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6600",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    fontWeight: "500",
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginTop: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 6,
    fontWeight: "500",
    textAlign: "center",
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
});