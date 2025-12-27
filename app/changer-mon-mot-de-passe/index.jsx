import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Header from "../../components/Header";

export default function ChangerMotDePasse() {
  const [ancienMotDePasse, setAncienMotDePasse] = useState("");
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState("");
  
  const [showAncien, setShowAncien] = useState(false);
  const [showNouveau, setShowNouveau] = useState(false);
  const [showConfirmer, setShowConfirmer] = useState(false);

  return (
    <SafeAreaWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header
          title="Changer mon mot de passe"
          subtitle="Sécurisez votre compte"
          showBack={true}
        />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="shield-checkmark" size={24} color="#10B981" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Sécurité renforcée</Text>
            <Text style={styles.infoText}>
              Utilisez un mot de passe fort avec au moins 8 caractères,
              incluant majuscules, minuscules et chiffres.
            </Text>
          </View>
        </View>

        {/* SECTION : Mot de passe actuel */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleLine} />
            <Text style={styles.sectionTitle}>Mot de passe actuel</Text>
            <View style={styles.sectionTitleLine} />
          </View>

          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <LinearGradient
                  colors={["#E0E7FF", "#C7D2FE"]}
                  style={styles.inputIconCircle}
                >
                  <Ionicons name="lock-closed-outline" size={20} color="#6366F1" />
                </LinearGradient>
                <Text style={styles.inputLabel}>Ancien mot de passe</Text>
              </View>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={ancienMotDePasse}
                  onChangeText={setAncienMotDePasse}
                  placeholder="Entrez votre mot de passe actuel"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showAncien}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowAncien(!showAncien)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showAncien ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION : Nouveau mot de passe */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleLine} />
            <Text style={styles.sectionTitle}>Nouveau mot de passe</Text>
            <View style={styles.sectionTitleLine} />
          </View>

          <View style={styles.card}>
            {/* Nouveau mot de passe */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <LinearGradient
                  colors={["#FFE8D6", "#FFD4B3"]}
                  style={styles.inputIconCircle}
                >
                  <Ionicons name="key-outline" size={20} color="#FF6600" />
                </LinearGradient>
                <Text style={styles.inputLabel}>Nouveau mot de passe</Text>
              </View>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={nouveauMotDePasse}
                  onChangeText={setNouveauMotDePasse}
                  placeholder="Minimum 8 caractères"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showNouveau}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowNouveau(!showNouveau)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showNouveau ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.separator} />

            {/* Confirmer mot de passe */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <LinearGradient
                  colors={["#E8F0FF", "#D4E4FF"]}
                  style={styles.inputIconCircle}
                >
                  <Ionicons name="checkmark-circle-outline" size={20} color="#3366FF" />
                </LinearGradient>
                <Text style={styles.inputLabel}>Confirmer le mot de passe</Text>
              </View>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={confirmerMotDePasse}
                  onChangeText={setConfirmerMotDePasse}
                  placeholder="Resaisissez le mot de passe"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmer}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmer(!showConfirmer)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showConfirmer ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Critères de sécurité */}
        <View style={styles.criteriaSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleLine} />
            <Text style={styles.sectionTitle}>Critères de sécurité</Text>
            <View style={styles.sectionTitleLine} />
          </View>

          <View style={styles.criteriaCard}>
            <View style={styles.criteriaItem}>
              <View style={styles.criteriaIconCircle}>
                <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Text style={styles.criteriaText}>Au moins 8 caractères</Text>
            </View>

            <View style={styles.criteriaItem}>
              <View style={styles.criteriaIconCircle}>
                <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Text style={styles.criteriaText}>Une lettre majuscule</Text>
            </View>

            <View style={styles.criteriaItem}>
              <View style={styles.criteriaIconCircle}>
                <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Text style={styles.criteriaText}>Une lettre minuscule</Text>
            </View>

            <View style={styles.criteriaItem}>
              <View style={styles.criteriaIconCircle}>
                <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Text style={styles.criteriaText}>Un chiffre (0-9)</Text>
            </View>

            <View style={styles.criteriaItem}>
              <View style={styles.criteriaIconCircle}>
                <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Text style={styles.criteriaText}>Un caractère spécial (!@#$%)</Text>
            </View>
          </View>
        </View>

        {/* Boutons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
            <LinearGradient
              colors={["#FF7F27", "#FF6600"]}
              style={styles.saveButtonGradient}
            >
              <Ionicons name="shield-checkmark" size={24} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Modifier le mot de passe</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} activeOpacity={0.7}>
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
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
  infoCard: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "#ECFDF5",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    shadowColor: "#10B981",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#047857",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: "#10B981",
    lineHeight: 18,
    fontWeight: "500",
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
  inputGroup: {
    paddingVertical: 16,
  },
  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  inputIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
  eyeButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  separator: {
    height: 1,
    backgroundColor: "#F3F4F6",
  },
  criteriaSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  criteriaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
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
    gap: 14,
  },
  criteriaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  criteriaIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
  },
  criteriaText: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
    gap: 12,
  },
  saveButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#FF6600",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  saveButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
});