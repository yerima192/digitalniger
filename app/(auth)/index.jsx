import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import { useAuth } from "../../context/AuthContext";

export default function AuthScreen() {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [tabWidth, setTabWidth] = useState(0);

  // États pour la connexion
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // États pour l'inscription
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const tabs = ["Se connecter", "S'inscrire"];

  const handleTabChange = (index) => {
    setActiveTab(index);
    Animated.spring(slideAnim, {
      toValue: index,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  };

  const onTabsLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    const calculatedTabWidth = (width - 8) / 2;
    setTabWidth(calculatedTabWidth);
  };

  // Fonction de connexion
  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setLoginLoading(true);
    try {
      const result = await login(loginEmail, loginPassword);
      if (result.success) {
        router.replace("/(tabs)");
      } else {
        Alert.alert("Erreur", result.error || "Email ou mot de passe incorrect");
      }
    } catch (_error) {
      Alert.alert("Erreur", "Erreur de connexion");
    } finally {
      setLoginLoading(false);
    }
  };

  // Fonction d'inscription avec redirection vers sélection du type
  const handleSignup = async () => {
    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    if (!acceptedTerms) {
      Alert.alert("Erreur", "Veuillez accepter les conditions d'utilisation");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    if (signupPassword.length < 6) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    // Valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupEmail)) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email valide");
      return;
    }

    setSignupLoading(true);
    try {
      const result = await signup(signupName, signupEmail, signupPassword);
      if (result.success) {
        // Rediriger vers la sélection du type d'utilisateur
        router.push("/(auth)/select-user-type");
      } else {
        Alert.alert("Erreur", result.error || "Erreur lors de l'inscription");
      }
    } catch (_error) {
      Alert.alert("Erreur", "Erreur lors de l'inscription");
    } finally {
      setSignupLoading(false);
    }
  };

  // Formulaire de connexion
  const renderLoginForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.input}
            placeholder="votre@email.com"
            value={loginEmail}
            onChangeText={setLoginEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mot de passe</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry={!showLoginPassword}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity
            onPress={() => setShowLoginPassword(!showLoginPassword)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={showLoginPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => router.push("/forgot-password")}
      >
        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.submitButton,
          loginLoading && styles.submitButtonDisabled,
        ]}
        onPress={handleLogin}
        activeOpacity={0.8}
        disabled={loginLoading}
      >
        <LinearGradient
          colors={["#FF7F27", "#FF6600"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.submitGradient}
        >
          {loginLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.submitButtonText}>Se connecter</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OU</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
        <Ionicons name="logo-google" size={20} color="#EA4335" />
        <Text style={styles.socialButtonText}>Continuer avec Google</Text>
      </TouchableOpacity>
    </View>
  );

  // Formulaire d'inscription
  const renderSignupForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nom complet</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.input}
            placeholder="Votre nom"
            value={signupName}
            onChangeText={setSignupName}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.input}
            placeholder="votre@email.com"
            value={signupEmail}
            onChangeText={setSignupEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
      

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mot de passe</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={signupPassword}
            onChangeText={setSignupPassword}
            secureTextEntry={!showSignupPassword}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity
            onPress={() => setShowSignupPassword(!showSignupPassword)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={showSignupPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirmer le mot de passe</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={signupConfirmPassword}
            onChangeText={setSignupConfirmPassword}
            secureTextEntry={!showSignupConfirmPassword}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity
            onPress={() =>
              setShowSignupConfirmPassword(!showSignupConfirmPassword)
            }
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={
                showSignupConfirmPassword ? "eye-outline" : "eye-off-outline"
              }
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity 
          style={styles.termsCheckbox}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
        >
          <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
            {acceptedTerms && (
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            )}
          </View>
          <Text style={styles.termsText}>
            En vous inscrivant, vous acceptez nos{" "}
            <Text style={styles.termsLink}>Conditions d&apos;utilisation</Text> et
            notre{" "}
            <Text style={styles.termsLink}>Politique de confidentialité</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.submitButtonRegister}
        onPress={handleSignup}
        activeOpacity={0.8}
        disabled={signupLoading || !acceptedTerms}
      >
        <LinearGradient
          colors={["#FF7F27", "#FF6600"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.submitGradient}
        >
          {signupLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.submitButtonText}>S&apos;inscrire</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OU</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
        <Ionicons name="logo-google" size={20} color="#EA4335" />
        <Text style={styles.socialButtonText}>S&apos;inscrire avec Google</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo et titre */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              {/* <LinearGradient
                colors={["#FF7F27", "#FF6600"]}
                style={styles.logoGradient}
              >
                <Ionicons name="flag" size={40} color="#fff" />
              </LinearGradient> */}
              <Image
                source={require("../../assets/images/logo.png")}
                style={styles.avatar}
              />
            </View>
            {/* <Text style={styles.title}>DIGITAL-NIGER</Text> */}
            <Text style={styles.subtitle}>
              Connectez-vous à l&apos;écosystème numérique nigérien
            </Text>
          </View>

          {/* Système d'onglets */}
          <View style={styles.tabsWrapper}>
            <View style={styles.tabsContainer} onLayout={onTabsLayout}>
              {tabWidth > 0 && (
                <Animated.View
                  style={[
                    styles.tabActiveBg,
                    {
                      width: tabWidth,
                      transform: [
                        {
                          translateX: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [4, tabWidth + 4],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              )}

              {tabs.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.tabButton}
                  onPress={() => handleTabChange(index)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === index && styles.tabTextActive,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Contenu des formulaires */}
          {activeTab === 0 ? renderLoginForm() : renderSignupForm()}
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
    paddingTop: 40,
    paddingBottom: 40,
  },
  avatar: {
    width: 200,
    height: 100,
  },

  // Header
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 32,
    lineHeight: 20,
  },

  // Tabs
  tabsWrapper: {
    marginBottom: 24,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 30,
    padding: 4,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabActiveBg: {
    position: "absolute",
    top: 4,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FF6600",
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    paddingHorizontal: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
  },
  tabTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // Form
  formContainer: {
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
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6600",
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
  submitButtonRegister: {
    // overflow: "hidden",
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

  // Divider
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9CA3AF",
  },

  // Social button
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },

  // Terms
  termsContainer: {
    marginTop: -8,
  },
  termsCheckbox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: "#FF6600",
    borderColor: "#FF6600",
  },
  termsText: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    flex: 1,
  },
  termsLink: {
    color: "#FF6600",
    fontWeight: "600",
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
});
