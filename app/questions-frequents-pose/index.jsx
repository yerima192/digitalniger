import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Header from "../../components/Header";
import { router } from "expo-router";

export default function FAQScreen() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqData = [
    {
      category: "Général",
      icon: "information-circle-outline",
      gradient: ["#E0E7FF", "#C7D2FE"],
      color: "#6366F1",
      questions: [
        {
          question: "Qu'est-ce que Digital Map Niger ?",
          answer:
            "Digital Map Niger est la plateforme de référence de l'écosystème numérique nigérien. Elle centralise les événements tech, la cartographie des acteurs du numérique et les opportunités (bourses, concours, formations).",
        },
        {
          question: "L'application est-elle gratuite ?",
          answer:
            "Oui, Digital Map Niger est entièrement gratuite. Vous pouvez accéder à toutes les fonctionnalités sans aucun frais.",
        },
        {
          question: "Sur quels appareils puis-je utiliser l'application ?",
          answer:
            "L'application est disponible sur Android (version 8 et supérieure). Une version iOS est prévue prochainement.",
        },
      ],
    },
    {
      category: "Événements",
      icon: "calendar-outline",
      gradient: ["#FFE8D6", "#FFD4B3"],
      color: "#FF6600",
      questions: [
        {
          question: "Comment trouver des événements tech ?",
          answer:
            "Allez dans la section 'Événements' et utilisez les filtres (ville, date, type, gratuit/payant) pour trouver les événements qui vous intéressent.",
        },
        {
          question: "Puis-je ajouter un événement à mes favoris ?",
          answer:
            "Oui, cliquez sur l'icône cœur sur la fiche de l'événement pour l'ajouter à vos favoris. Vous pourrez les retrouver dans la section Favoris.",
        },
        {
          question: "Comment m'inscrire à un événement ?",
          answer:
            "Sur la fiche détaillée de l'événement, cliquez sur le bouton 'S'inscrire' qui vous redirigera vers le formulaire d'inscription de l'organisateur.",
        },
      ],
    },
    {
      category: "Acteurs Tech",
      icon: "business-outline",
      gradient: ["#F0FDF4", "#DCFCE7"],
      color: "#10B981",
      questions: [
        {
          question: "Comment rechercher un acteur tech ?",
          answer:
            "Utilisez la barre de recherche dans la section 'Acteurs Tech' ou naviguez sur la carte interactive. Vous pouvez filtrer par catégorie (startup, hub, freelance...) et par ville.",
        },
        {
          question: "Puis-je ajouter mon entreprise/profil ?",
          answer:
            "Actuellement, l'ajout d'acteurs est géré par notre équipe. Contactez-nous via le support pour soumettre votre profil ou entreprise.",
        },
        {
          question: "Comment fonctionne la carte interactive ?",
          answer:
            "La carte affiche tous les acteurs tech du Niger. Cliquez sur un marqueur pour voir les détails de l'acteur. Vous pouvez zoomer et explorer les différentes régions.",
        },
      ],
    },
    {
      category: "Opportunités",
      icon: "gift-outline",
      gradient: ["#FDF4FF", "#FAE8FF"],
      color: "#A855F7",
      questions: [
        {
          question: "Quels types d'opportunités sont disponibles ?",
          answer:
            "Vous trouverez des bourses d'études, formations, concours, appels à projets, programmes d'incubation et offres d'emploi tech.",
        },
        {
          question:
            "Comment recevoir des alertes sur les nouvelles opportunités ?",
          answer:
            "Activez les notifications push dans les Paramètres pour être informé dès qu'une nouvelle opportunité est publiée.",
        },
        {
          question: "Les opportunités sont-elles vérifiées ?",
          answer:
            "Oui, notre équipe vérifie chaque opportunité avant publication pour garantir leur authenticité et pertinence.",
        },
      ],
    },
    {
      category: "Compte & Paramètres",
      icon: "settings-outline",
      gradient: ["#FFF7ED", "#FFEDD5"],
      color: "#F97316",
      questions: [
        {
          question: "Comment modifier mes informations personnelles ?",
          answer:
            "Allez dans Paramètres > Gérer mon compte > Modifier mes informations. Vous pourrez y changer votre nom, email, téléphone et adresse.",
        },
        {
          question: "Comment changer mon mot de passe ?",
          answer:
            "Dans Paramètres > Gérer mon compte > Changer mon mot de passe. Utilisez un mot de passe fort avec au moins 8 caractères.",
        },
        {
          question: "Puis-je utiliser l'application hors ligne ?",
          answer:
            "Oui, activez le mode hors ligne dans les Paramètres pour consulter les contenus déjà téléchargés sans connexion internet.",
        },
      ],
    },
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedIndex(expandedIndex === key ? null : key);
  };

  return (
    <SafeAreaWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header
          title="Questions fréquentes"
          subtitle="Trouvez rapidement des réponses"
          showBack={true}
        />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons name="help-circle" size={24} color="#2563EB" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Besoin d&apos;aide ?</Text>
            <Text style={styles.infoText}>
              Consultez les questions fréquentes ci-dessous ou contactez notre
              support.
            </Text>
          </View>
        </View>

        {/* FAQ par catégorie */}
        {faqData.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.line} />
              <Text style={styles.sectionTitle}>{category.category}</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.card}>
              {category.questions.map((item, questionIndex) => {
                const isExpanded =
                  expandedIndex === `${categoryIndex}-${questionIndex}`;
                return (
                  <View key={questionIndex}>
                    <TouchableOpacity
                      style={styles.questionRow}
                      onPress={() =>
                        toggleQuestion(categoryIndex, questionIndex)
                      }
                      activeOpacity={0.7}
                    >
                      <View style={styles.questionLeft}>
                        <LinearGradient
                          colors={category.gradient}
                          style={styles.questionIconCircle}
                        >
                          <Ionicons
                            name={category.icon}
                            size={20}
                            color={category.color}
                          />
                        </LinearGradient>
                        <Text style={styles.questionText}>{item.question}</Text>
                      </View>
                      <View style={styles.expandIconCircle}>
                        <Ionicons
                          name={isExpanded ? "chevron-up" : "chevron-down"}
                          size={20}
                          color="#6B7280"
                        />
                      </View>
                    </TouchableOpacity>

                    {isExpanded && (
                      <View style={styles.answerContainer}>
                        <View style={styles.answerLine} />
                        <Text style={styles.answerText}>{item.answer}</Text>
                      </View>
                    )}

                    {questionIndex < category.questions.length - 1 && (
                      <View style={styles.separator} />
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        {/* Contact Support */}
        <View style={styles.contactSection}>
          <LinearGradient
            colors={["#EFF6FF", "#DBEAFE"]}
            style={styles.contactCard}
          >
            <View style={styles.contactIconContainer}>
              <Ionicons name="chatbubble-ellipses" size={32} color="#3B82F6" />
            </View>
            <Text style={styles.contactTitle}>
              Vous ne trouvez pas de réponse ?
            </Text>
            <Text style={styles.contactText}>
              Notre équipe support est là pour vous aider
            </Text>
            <TouchableOpacity style={styles.contactButton} activeOpacity={0.8} onPress={() => router.push('aide-support')}>
              <LinearGradient
                colors={["#FF7F27", "#FF6600"]}
                style={styles.contactButtonGradient}
              >
                <Ionicons name="headset" size={20} color="#FFFFFF" />
                <Text style={styles.contactButtonText}>
                  Contacter le support
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
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
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
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
  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  questionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  questionIconCircle: {
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
  questionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 20,
  },
  expandIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  answerContainer: {
    paddingLeft: 52,
    paddingRight: 16,
    paddingBottom: 16,
  },
  answerLine: {
    width: 3,
    height: "100%",
    backgroundColor: "#E5E7EB",
    position: "absolute",
    left: 20,
    top: 0,
    bottom: 16,
  },
  answerText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
    fontWeight: "500",
  },
  separator: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 52,
  },
  contactSection: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  contactCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  contactIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 8,
    textAlign: "center",
  },
  contactText: {
    fontSize: 14,
    color: "#3B82F6",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
  },
  contactButton: {
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#FF6600",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  contactButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
