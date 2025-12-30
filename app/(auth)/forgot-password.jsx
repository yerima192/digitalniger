import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import { useAuth } from "../../context/AuthContext";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      alert("Veuillez entrer votre adresse email");
      return;
    }

    setIsSubmitting(true);
    const result = await resetPassword(email);
    setIsSubmitting(false);

    if (result.success) {
      setEmailSent(true);
    } else {
      alert(result.error || "Erreur lors de l'envoi de l'email");
    }
  };

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header avec bouton retour */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={["#FFFFFF", "#F9FAFB"]}
                style={styles.backButtonGradient}
              >
                <Ionicons name="chevron-back" size={24} color="#111827" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Icône centrale */}
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={["#FEE2E2", "#FECACA"]}
              style={styles.iconCircle}
            >
              <Ionicons name="lock-closed" size={48} color="#EF4444" />
            </LinearGradient>
          </View>

          {/* Titre et description */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Mot de passe oublié ?</Text>
            <Text style={styles.subtitle}>
              {emailSent
                ? "Un email de réinitialisation a été envoyé à votre adresse email. Vérifiez votre boîte de réception."
                : "Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe."}
            </Text>
          </View>

          {/* Formulaire */}
          {!emailSent ? (
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                  <TextInput
                    style={styles.input}
                    placeholder="votre@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                onPress={handleResetPassword}
                activeOpacity={0.8}
                disabled={isSubmitting}
              >
                <LinearGradient
                  colors={["#FF7F27", "#FF6600"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.submitGradient}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Text style={styles.submitButtonText}>
                        Envoyer le lien de réinitialisation
                      </Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            // Message de succès
            <View style={styles.successContainer}>
              <View style={styles.successCard}>
                <View style={styles.successIconCircle}>
                  <Ionicons
                    name="checkmark-circle"
                    size={64}
                    color="#10B981"
                  />
                </View>
                <Text style={styles.successTitle}>Email envoyé !</Text>
                <Text style={styles.successText}>
                  Vérifiez votre boîte de réception et suivez les instructions
                  pour réinitialiser votre mot de passe.
                </Text>

                <TouchableOpacity
                  style={styles.backToLoginButton}
                  onPress={() => router.back()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.backToLoginText}>
                    Retour à la connexion
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.resendButton}
                onPress={handleResetPassword}
              >
                <Text style={styles.resendText}>
                  Vous n&apos;avez pas reçu l&apos;email ?{" "}
                  <Text style={styles.resendLink}>Renvoyer</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Lien retour connexion */}
          {!emailSent && (
            <TouchableOpacity
              style={styles.backToLogin}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={16} color="#6B7280" />
              <Text style={styles.backToLoginText2}>
                Retour à la connexion
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },

  // Header
  header: {
    marginBottom: 40,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    alignSelf: "flex-start",
  },
  backButtonGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  // Icon
  iconContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },

  // Content
  contentContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 16,
  },

  // Form
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
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
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },

  // Success
  successContainer: {
    gap: 24,
  },
  successCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  successIconCircle: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  successText: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  backToLoginButton: {
    backgroundColor: "#F9FAFB",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  backToLoginText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },
  resendButton: {
    alignItems: "center",
    padding: 16,
  },
  resendText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  resendLink: {
    color: "#FF6600",
    fontWeight: "700",
  },

  // Back to login
  backToLogin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
  },
  backToLoginText2: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
});