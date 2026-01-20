import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth, USER_TYPES } from "../../context/AuthContext";

const SelectUserType = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState(null);

  const userTypesList = [
    {
      id: USER_TYPES.STUDENT,
      label: "Étudiant",
      description: "Chercheur de formation et d'opportunités",
      icon: "school"
    },
    {
      id: USER_TYPES.PROFESSIONAL,
      label: "Professionnel",
      description: "Développeur, designer, expert",
      icon: "briefcase"
    },
    {
      id: USER_TYPES.DEVELOPER,
      label: "Développeur",
      description: "Spécialisé en développement logiciel",
      icon: "code-braces"
    },
    {
      id: USER_TYPES.DESIGNER,
      label: "Designer",
      description: "UX/UI, Graphique ou produit",
      icon: "palette"
    },
    {
      id: USER_TYPES.FREELANCER,
      label: "Freelancer",
      description: "Travailleur indépendant",
      icon: "laptop"
    },
    {
      id: USER_TYPES.CONSULTANT,
      label: "Consultant",
      description: "Expertise et conseil",
      icon: "head-question"
    },
    {
      id: USER_TYPES.STARTUP,
      label: "Startup",
      description: "Jeune entreprise innovante",
      icon: "rocket"
    },
    {
      id: USER_TYPES.COMPANY,
      label: "Entreprise",
      description: "PME ou grande entreprise",
      icon: "city"
    },
    {
      id: USER_TYPES.ORGANIZATION,
      label: "Organisation/ONG",
      description: "Association ou structure à but non lucratif",
      icon: "hands-together"
    },
  ];

  const handleContinue = () => {
    if (selectedType) {
      router.push({
        pathname: "/(auth)/complete-profile",
        params: { userType: selectedType }
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Quel type de profil es-tu ?</Text>
          <Text style={styles.subtitle}>
            Sélectionne le profil qui te correspond le mieux pour personnaliser ton expérience
          </Text>
        </View>

        <View style={styles.typesContainer}>
          {userTypesList.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                selectedType === type.id && styles.typeCardSelected
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={type.icon}
                  size={32}
                  color={selectedType === type.id ? "#0066FF" : "#666"}
                />
              </View>
              <View style={styles.typeContent}>
                <Text style={styles.typeLabel}>{type.label}</Text>
                <Text style={styles.typeDescription}>{type.description}</Text>
              </View>
              {selectedType === type.id && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={24}
                  color="#0066FF"
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueBtn, !selectedType && styles.continueBtnDisabled]}
          onPress={handleContinue}
          disabled={!selectedType}
        >
          <Text style={styles.continueBtnText}>Continuer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  typesContainer: {
    marginBottom: 30,
  },
  typeCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  typeCardSelected: {
    borderColor: "#0066FF",
    backgroundColor: "#F0F7FF",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  typeContent: {
    flex: 1,
  },
  typeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 13,
    color: "#6B7280",
  },
  checkIcon: {
    marginLeft: 10,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  continueBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
  },
  continueBtnDisabled: {
    backgroundColor: "#D1D5DB",
  },
  continueBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default SelectUserType;
