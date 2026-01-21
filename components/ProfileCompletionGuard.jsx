import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { showToast } from "./Toast";

const { width } = Dimensions.get("window");

/**
 * ProfileCompletionGuard - Affiche une bannière si le profil n'est pas complété
 * Utilisé dans les écrans principaux pour encourager l'utilisateur à compléter son profil
 */
export const ProfileCompletionGuard = ({ style = {} }) => {
  const { user } = useAuth();
  const router = useRouter();
  const slideAnim = React.useRef(new Animated.Value(-80)).current;

  React.useEffect(() => {
    if (user && !user.profileComplete) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 7,
        tension: 40,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -80,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [user, slideAnim]);

  if (!user || user.profileComplete) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
        style,
      ]}
    >
      <View style={styles.content}>
        <Ionicons name="alert-circle" size={20} color="#fff" />
        <Text style={styles.text}>
          Complétez votre profil pour accéder à toutes les fonctionnalités
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          showToast("Redirection vers complétion du profil", "info");
          router.push({
            pathname: "/(auth)/complete-profile",
            params: { userType: user?.userType || "SEEKER" }
          });
        }}
      >
        <Text style={styles.buttonText}>Compléter</Text>
        <Ionicons name="arrow-forward" size={16} color="#FF6600" />
      </TouchableOpacity>
    </Animated.View>
  );
};

/**
 * ProfileCompletionModal - Modal de redirection forcée au démarrage
 * Utilisé au démarrage de l'app si profil pas complété
 */
export const ProfileCompletionModal = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || user.profileComplete) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modal}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-add" size={48} color="#FF6600" />
        </View>

        <Text style={styles.modalTitle}>Complétez votre profil</Text>
        <Text style={styles.modalSubtitle}>
          Pour une meilleure expérience, veuillez remplir vos informations
          personnelles
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            showToast("Redirection vers complétion du profil", "info");
            router.push({
              pathname: "/(auth)/complete-profile",
              params: { userType: user?.userType || "SEEKER" }
            });
          }}
        >
          <Text style={styles.primaryButtonText}>Compléter maintenant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            showToast(
              "Vous pouvez compléter plus tard depuis les paramètres",
              "info"
            );
          }}
        >
          <Text style={styles.secondaryButtonText}>Plus tard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * useIsProfileComplete - Hook pour vérifier si le profil est complet
 * Retourne un boolean
 */
export const useIsProfileComplete = () => {
  const { user } = useAuth();
  return user?.profileComplete || false;
};

/**
 * withProfileCompletionGuard - HOC pour wrapper un composant
 * Affiche une bannière si profil pas complet
 */
export const withProfileCompletionGuard = (Component) => {
  const WrappedComponent = (props) => (
    <View style={{ flex: 1 }}>
      <ProfileCompletionGuard />
      <Component {...props} />
    </View>
  );
  
  WrappedComponent.displayName = `withProfileCompletionGuard(${Component.displayName || Component.name || 'Component'})`;
  
  return WrappedComponent;
};

const styles = StyleSheet.create({
  // Bannière
  container: {
    backgroundColor: "#FF6600",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  text: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 10,
    flex: 1,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  buttonText: {
    color: "#FF6600",
    fontWeight: "600",
    fontSize: 12,
  },

  // Modal
  modalOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: width * 0.85,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#FF6600",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryButton: {
    width: "100%",
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: "#374151",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
});
