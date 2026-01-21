import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

/**
 * GradientButton - Bouton gradient réutilisable
 * Utilise le design uniforme de l'application
 */
export const GradientButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  icon,
  style,
  ...props
}) => (
  <TouchableOpacity
    style={[styles.submitButton, style, disabled && styles.submitButtonDisabled]}
    onPress={onPress}
    disabled={disabled || loading}
    activeOpacity={0.8}
    {...props}
  >
    <LinearGradient
      colors={["#FF8C42", "#FF6600"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.submitGradient}
    >
      {loading ? (
        <Text style={styles.submitButtonText}>Chargement...</Text>
      ) : (
        <>
          <Text style={styles.submitButtonText}>{title}</Text>
          {icon && (
            <MaterialCommunityIcons name={icon} size={20} color="#fff" />
          )}
        </>
      )}
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 8,
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitGradient: {
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
});
