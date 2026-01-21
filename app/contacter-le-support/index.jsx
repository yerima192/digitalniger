import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Toast from "../../components/Toast";

export default function ContacterSupportScreen() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showToast, setShowToast] = useState(false);

  const displayToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const contactMethods = [
    {
      icon: "mail",
      label: "Email",
      value: "support@digitalmapniger.ne",
      gradient: ["#FFE8D6", "#FFD4B3"],
      color: "#FF6600"
    },
    {
      icon: "call",
      label: "Téléphone",
      value: "+227 20 00 00 00",
      gradient: ["#E8F0FF", "#D4E4FF"],
      color: "#3366FF"
    },
    {
      icon: "time",
      label: "Horaires",
      value: "Lun - Ven : 8h - 18h",
      gradient: ["#F0FDF4", "#DCFCE7"],
      color: "#10B981"
    }
  ];

  const categories = [
    { icon: "help-circle-outline", label: "Question générale", gradient: ["#E0E7FF", "#C7D2FE"], color: "#6366F1" },
    { icon: "bug-outline", label: "Problème technique", gradient: ["#FEE2E2", "#FECACA"], color: "#DC2626" },
    { icon: "business-outline", label: "Ajouter un acteur", gradient: ["#F0FDF4", "#DCFCE7"], color: "#10B981" },
    { icon: "calendar-outline", label: "Événement", gradient: ["#FFE8D6", "#FFD4B3"], color: "#FF6600" },
    { icon: "gift-outline", label: "Opportunité", gradient: ["#FDF4FF", "#FAE8FF"], color: "#A855F7" },
    { icon: "chatbubble-outline", label: "Autre", gradient: ["#FFF7ED", "#FFEDD5"], color: "#F97316" }
  ];

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
          title="Contacter le support"
          subtitle="Nous sommes là pour vous aider"
          showBack={true}
        />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons name="chatbubble-ellipses" size={24} color="#059669" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Support réactif</Text>
            <Text style={styles.infoText}>
              Notre équipe vous répondra dans les 24h ouvrées. Pour une réponse plus rapide,
              consultez notre FAQ.
            </Text>
          </View>
        </View>

        {/* SECTION : Moyens de contact */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>Nous contacter</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.card}>
            {contactMethods.map((method, index) => (
              <View key={index}>
                <TouchableOpacity style={styles.row} activeOpacity={0.7}>
                  <View style={styles.left}>
                    <LinearGradient
                      colors={method.gradient}
                      style={styles.iconCircle}
                    >
                      <Ionicons name={method.icon} size={20} color={method.color} />
                    </LinearGradient>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>{method.label}</Text>
                      <Text style={styles.subtext}>{method.value}</Text>
                    </View>
                  </View>
                  <View style={styles.chevronCircle}>
                    <Ionicons name="chevron-forward" size={18} color="#6B7280" />
                  </View>
                </TouchableOpacity>
                {index < contactMethods.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        </View>

        {/* SECTION : Catégorie */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>Catégorie</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryCard}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={category.gradient}
                  style={styles.categoryIconCircle}
                >
                  <Ionicons name={category.icon} size={24} color={category.color} />
                </LinearGradient>
                <Text style={styles.categoryLabel}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* SECTION : Formulaire */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>Envoyer un message</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.card}>
            {/* Nom */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <LinearGradient
                  colors={["#E0E7FF", "#C7D2FE"]}
                  style={styles.inputIconCircle}
                >
                  <Ionicons name="person-outline" size={20} color="#6366F1" />
                </LinearGradient>
                <Text style={styles.inputLabel}>Nom complet</Text>
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

            {/* Email */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <LinearGradient
                  colors={["#FFE8D6", "#FFD4B3"]}
                  style={styles.inputIconCircle}
                >
                  <Ionicons name="mail-outline" size={20} color="#FF6600" />
                </LinearGradient>
                <Text style={styles.inputLabel}>Email</Text>
              </View>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="votre.email@exemple.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.separator} />

            {/* Sujet */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <LinearGradient
                  colors={["#F0FDF4", "#DCFCE7"]}
                  style={styles.inputIconCircle}
                >
                  <Ionicons name="bookmark-outline" size={20} color="#10B981" />
                </LinearGradient>
                <Text style={styles.inputLabel}>Sujet</Text>
              </View>
              <TextInput
                style={styles.input}
                value={sujet}
                onChangeText={setSujet}
                placeholder="Décrivez brièvement votre demande"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.separator} />

            {/* Message */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <LinearGradient
                  colors={["#FDF4FF", "#FAE8FF"]}
                  style={styles.inputIconCircle}
                >
                  <Ionicons name="chatbubbles-outline" size={20} color="#A855F7" />
                </LinearGradient>
                <Text style={styles.inputLabel}>Message</Text>
              </View>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={message}
                onChangeText={setMessage}
                placeholder="Décrivez votre problème ou question en détail..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        {/* Boutons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.sendButton} 
            activeOpacity={0.8}
            onPress={() => {
              if (nom && email && sujet && message) {
                displayToast("Message envoyé avec succès", "success");
                setNom("");
                setEmail("");
                setSujet("");
                setMessage("");
              } else {
                displayToast("Veuillez remplir tous les champs", "error");
              }
            }}
          >
            <LinearGradient
              colors={["#FF7F27", "#FF6600"]}
              style={styles.sendButtonGradient}
            >
              <Ionicons name="send" size={20} color="#FFFFFF" />
              <Text style={styles.sendButtonText}>Envoyer le message</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.faqButton} 
            activeOpacity={0.7} 
            onPress={() => {
              displayToast("Ouverture de la FAQ", "info");
              router.push('aide-support');
            }}
          >
            <Ionicons name="help-circle-outline" size={20} color="#3B82F6" />
            <Text style={styles.faqButtonText}>Consulter la FAQ</Text>
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
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
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
    fontSize: 16,
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
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    width: "48%",
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
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  categoryIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
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
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
    gap: 12,
  },
  sendButton: {
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
  sendButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 10,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  faqButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    borderWidth: 1.5,
    borderColor: "#DBEAFE",
  },
  faqButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3B82F6",
  },
});