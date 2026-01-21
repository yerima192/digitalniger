import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Toast from "../../components/Toast";

export default function ModifierInformations() {
  const [nom, setNom] = useState("Amadou");
  const [prenom, setPrenom] = useState("Moussa");
  const [email, setEmail] = useState("amadou.moussa@email.com");
  const [telephone, setTelephone] = useState("+227 90 12 34 56");
  const [adresse, setAdresse] = useState("Quartier Plateau, Niamey");
  const [ville, setVille] = useState("Niamey");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showToast, setShowToast] = useState(false);

  const displayToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

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
          title="Modifier mes informations"
          subtitle="Mettez à jour vos informations personnelles"
          showBack={true}
        />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="information-circle" size={24} color="#3B82F6" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Informations importantes</Text>
            <Text style={styles.infoText}>
              Assurez-vous que vos informations sont exactes et à jour pour
              profiter pleinement de l&apos;application.
            </Text>
          </View>
        </View>

        {/* SECTION : Informations personnelles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleLine} />
            <Text style={styles.sectionTitle}>Informations personnelles</Text>
            <View style={styles.sectionTitleLine} />
          </View>

          <View style={styles.card}>
            {/* Nom */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <LinearGradient
                  colors={["#FFE8D6", "#FFD4B3"]}
                  style={styles.inputIconCircle}
                >
                  <Ionicons name="person-outline" size={20} color="#FF6600" />
                </LinearGradient>
                <Text style={styles.inputLabel}>Nom</Text>
              </View>
              <TextInput
                style={styles.input}
                value={nom}
                onChangeText={setNom}
                placeholder="Entrez votre nom"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.separator} />

            {/* Prénom */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <LinearGradient
                  colors={["#E8F0FF", "#D4E4FF"]}
                  style={styles.inputIconCircle}
                >
                  <Ionicons name="person-outline" size={20} color="#3366FF" />
                </LinearGradient>
                <Text style={styles.inputLabel}>Prénom</Text>
              </View>
              <TextInput
                style={styles.input}
                value={prenom}
                onChangeText={setPrenom}
                placeholder="Entrez votre prénom"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        {/* SECTION : Contact */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleLine} />
            <Text style={styles.sectionTitle}>Contact</Text>
            <View style={styles.sectionTitleLine} />
          </View>

          <View style={styles.card}>
            {/* Email */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <LinearGradient
                  colors={["#F0FDF4", "#DCFCE7"]}
                  style={styles.inputIconCircle}
                >
                  <Ionicons name="mail-outline" size={20} color="#10B981" />
                </LinearGradient>
                <Text style={styles.inputLabel}>Email</Text>
              </View>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="exemple@email.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.separator} />

            {/* Téléphone */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <LinearGradient
                  colors={["#FDF4FF", "#FAE8FF"]}
                  style={styles.inputIconCircle}
                >
                  <Ionicons name="call-outline" size={20} color="#A855F7" />
                </LinearGradient>
                <Text style={styles.inputLabel}>Téléphone</Text>
              </View>
              <TextInput
                style={styles.input}
                value={telephone}
                onChangeText={setTelephone}
                placeholder="+227 XX XX XX XX"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        {/* SECTION : Localisation */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleLine} />
            <Text style={styles.sectionTitle}>Localisation</Text>
            <View style={styles.sectionTitleLine} />
          </View>

          <View style={styles.card}>
            {/* Adresse */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <LinearGradient
                  colors={["#FFF7ED", "#FFEDD5"]}
                  style={styles.inputIconCircle}
                >
                  <Ionicons name="home-outline" size={20} color="#F97316" />
                </LinearGradient>
                <Text style={styles.inputLabel}>Adresse</Text>
              </View>
              <TextInput
                style={styles.input}
                value={adresse}
                onChangeText={setAdresse}
                placeholder="Entrez votre adresse"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.separator} />

            {/* Ville */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <LinearGradient
                  colors={["#E0E7FF", "#C7D2FE"]}
                  style={styles.inputIconCircle}
                >
                  <Ionicons name="location-outline" size={20} color="#6366F1" />
                </LinearGradient>
                <Text style={styles.inputLabel}>Ville</Text>
              </View>
              <TextInput
                style={styles.input}
                value={ville}
                onChangeText={setVille}
                placeholder="Entrez votre ville"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        {/* Bouton Enregistrer */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.saveButton} 
            activeOpacity={0.8}
            onPress={() => {
              displayToast("Modifications enregistrées avec succès", "success");
            }}
          >
            <LinearGradient
              colors={["#FF7F27", "#FF6600"]}
              style={styles.saveButtonGradient}
            >
              <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton} 
            activeOpacity={0.7}
            onPress={() => {
              displayToast("Annulation", "info");
            }}
          >
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
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    shadowColor: "#3B82F6",
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
    backgroundColor: "#DBEAFE",
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
    color: "#1E40AF",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: "#3B82F6",
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
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  separator: {
    height: 1,
    backgroundColor: "#F3F4F6",
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