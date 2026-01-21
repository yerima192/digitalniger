import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Toast from "../../components/Toast";

export default function PolitiqueConfidentialite() {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showToast, setShowToast] = useState(false);

  // const displayToast = (message, type = "success") => {
  //   setToastMessage(message);
  //   setToastType(type);
  //   setShowToast(true);
  // };
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
          title="Politique de confidentialité"
          subtitle="Protection de vos données personnelles"
          showBack={true}
        />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <MaterialCommunityIcons name="shield-check" size={24} color="#8B5CF6" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Vos données sont protégées</Text>
            <Text style={styles.infoText}>
              Digital Map Niger s&apos;engage à protéger et respecter votre vie privée.
              Dernière mise à jour : 27 décembre 2024
            </Text>
          </View>
        </View>

        {/* SECTION : Collecte des données */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>Collecte des données</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.card}>
            <View style={styles.contentBlock}>
              <View style={styles.left}>
                <LinearGradient
                  colors={['#E0E7FF', '#C7D2FE']}
                  style={styles.iconCircle}
                >
                  <Ionicons name="document-text-outline" size={24} color="#6366F1" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Données collectées</Text>
                  <Text style={styles.description}>
                    Nous collectons uniquement les données nécessaires : nom, prénom, email, 
                    et localisation (si autorisée). Ces informations servent à personnaliser 
                    votre expérience.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.contentBlock}>
              <View style={styles.left}>
                <LinearGradient
                  colors={['#E8F0FF', '#D4E4FF']}
                  style={styles.iconCircle}
                >
                  <Ionicons name="settings-outline" size={24} color="#3366FF" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Utilisation des données</Text>
                  <Text style={styles.description}>
                    Vos données sont utilisées pour vous identifier, vous envoyer des 
                    notifications pertinentes, améliorer nos services et générer des 
                    statistiques anonymes.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION : Sécurité */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>Sécurité</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.card}>
            <View style={styles.contentBlock}>
              <View style={styles.left}>
                <LinearGradient
                  colors={['#F0FDF4', '#DCFCE7']}
                  style={styles.iconCircle}
                >
                  <Ionicons name="lock-closed-outline" size={24} color="#10B981" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Protection des données</Text>
                  <Text style={styles.description}>
                    Nous mettons en œuvre des mesures de sécurité techniques et 
                    organisationnelles pour protéger vos données contre tout accès 
                    non autorisé. Vos données sont chiffrées et stockées sur des serveurs sécurisés.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.contentBlock}>
              <View style={styles.left}>
                <LinearGradient
                  colors={['#FFF7ED', '#FFEDD5']}
                  style={styles.iconCircle}
                >
                  <Ionicons name="share-social-outline" size={24} color="#F97316" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Partage des données</Text>
                  <Text style={styles.description}>
                    Digital Map Niger ne vend, ne loue, ni ne partage vos données 
                    personnelles avec des tiers à des fins commerciales. Vos informations 
                    peuvent être partagées uniquement avec votre consentement explicite.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION : Vos droits */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>Vos droits</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.card}>
            <View style={styles.contentBlock}>
              <View style={styles.left}>
                <LinearGradient
                  colors={['#FDF4FF', '#FAE8FF']}
                  style={styles.iconCircle}
                >
                  <Ionicons name="finger-print-outline" size={24} color="#A855F7" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Accès et rectification</Text>
                  <Text style={styles.description}>
                    Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, 
                    de suppression, et de portabilité de vos données. Vous pouvez exercer ces 
                    droits à tout moment.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.contentBlock}>
              <View style={styles.left}>
                <LinearGradient
                  colors={['#FEF3C7', '#FDE68A']}
                  style={styles.iconCircle}
                >
                  <Ionicons name="timer-outline" size={24} color="#D97706" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Conservation</Text>
                  <Text style={styles.description}>
                    Vos données sont conservées pendant toute la durée d&apos;utilisation de votre 
                    compte. Vous pouvez demander leur suppression à tout moment depuis les paramètres.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.contentBlock}>
              <View style={styles.left}>
                <LinearGradient
                  colors={['#DBEAFE', '#BFDBFE']}
                  style={styles.iconCircle}
                >
                  <Ionicons name="notifications-outline" size={24} color="#3B82F6" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Cookies et traceurs</Text>
                  <Text style={styles.description}>
                    L&apos;application utilise des cookies pour améliorer votre expérience, 
                    mémoriser vos préférences et analyser l&apos;utilisation de nos services.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION : Contact */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>Contact</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.card}>
            <TouchableOpacity style={styles.row} activeOpacity={0.7}>
              <View style={styles.left}>
                <LinearGradient
                  colors={['#FFE8D6', '#FFD4B3']}
                  style={styles.iconCircle}
                >
                  <Ionicons name="mail-outline" size={24} color="#FF6600" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Email</Text>
                  <Text style={styles.subtext}>contact@digitalmapniger.ne</Text>
                </View>
              </View>
              <View style={styles.chevronCircle}>
                <Ionicons name="chevron-forward" size={18} color="#6B7280" />
              </View>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.row} activeOpacity={0.7}>
              <View style={styles.left}>
                <LinearGradient
                  colors={['#E8F0FF', '#D4E4FF']}
                  style={styles.iconCircle}
                >
                  <Ionicons name="call-outline" size={24} color="#3366FF" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Téléphone</Text>
                  <Text style={styles.subtext}>+227 XX XX XX XX</Text>
                </View>
              </View>
              <View style={styles.chevronCircle}>
                <Ionicons name="chevron-forward" size={18} color="#6B7280" />
              </View>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.row} activeOpacity={0.7}>
              <View style={styles.left}>
                <LinearGradient
                  colors={['#F0FDF4', '#DCFCE7']}
                  style={styles.iconCircle}
                >
                  <Ionicons name="location-outline" size={24} color="#10B981" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Adresse</Text>
                  <Text style={styles.subtext}>Niamey, Niger</Text>
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
  infoCard: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "#FDF4FF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FAE8FF",
    shadowColor: "#A855F7",
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
    backgroundColor: "#FAE8FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#7C3AED",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: "#A855F7",
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
  contentBlock: {
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    flex: 1,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
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
    marginBottom: 6,
  },
  subtext: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
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
    marginLeft: 66,
  },
});