import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { AGE_RANGES, GENDERS, NIGERIA_LOCATIONS, useAuth } from "../../context/AuthContext";

const CompleteProfile = () => {
  const router = useRouter();
  const { updateProfile } = useAuth();
  const { userType } = useLocalSearchParams();

  const [formData, setFormData] = useState({
    gender: null,
    ageRange: null,
    country: "Niger",
    city: null,
    phone: "",
  });

  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCompleteProfile = async () => {
    if (!formData.gender || !formData.ageRange || !formData.city) {
      Alert.alert("Erreur", "Veuillez compléter tous les champs obligatoires");
      return;
    }

    const result = await updateProfile({
      userType,
      gender: formData.gender,
      ageRange: formData.ageRange,
      city: formData.city,
      phone: formData.phone,
      country: formData.country,
      profileComplete: true,
    });

    if (result.success) {
      router.replace("/(tabs)/");
    } else {
      Alert.alert("Erreur", "Impossible de compléter le profil");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.title}>Complète ton profil</Text>
        </View>

        <Text style={styles.subtitle}>
          Ces informations nous aideront à personnaliser ton expérience
        </Text>

        {/* Genre */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Genre *</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowGenderModal(true)}
          >
            <Text style={formData.gender ? styles.selectButtonText : styles.selectButtonPlaceholder}>
              {formData.gender || "Sélectionne ton genre"}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Tranche d'âge */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Tranche d'âge *</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowAgeModal(true)}
          >
            <Text style={formData.ageRange ? styles.selectButtonText : styles.selectButtonPlaceholder}>
              {formData.ageRange || "Sélectionne ta tranche d'âge"}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Ville */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Ville *</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowCityModal(true)}
          >
            <Text style={formData.city ? styles.selectButtonText : styles.selectButtonPlaceholder}>
              {formData.city || "Sélectionne ta ville"}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Téléphone */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Téléphone</Text>
          <TextInput
            style={styles.input}
            placeholder="+227 XX XX XX XX"
            placeholderTextColor="#D1D5DB"
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
            keyboardType="phone-pad"
          />
        </View>
      </ScrollView>

      {/* Modal Genre */}
      <Modal
        visible={showGenderModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionne ton genre</Text>
              <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                <MaterialCommunityIcons name="close" size={28} color="#1F2937" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={GENDERS}
              keyExtractor={(item) => item}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    handleInputChange("gender", item);
                    setShowGenderModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                  {formData.gender === item && (
                    <MaterialCommunityIcons name="check" size={24} color="#0066FF" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Modal Tranche d'âge */}
      <Modal
        visible={showAgeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAgeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionne ta tranche d'âge</Text>
              <TouchableOpacity onPress={() => setShowAgeModal(false)}>
                <MaterialCommunityIcons name="close" size={28} color="#1F2937" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={AGE_RANGES}
              keyExtractor={(item) => item}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    handleInputChange("ageRange", item);
                    setShowAgeModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item} ans</Text>
                  {formData.ageRange === item && (
                    <MaterialCommunityIcons name="check" size={24} color="#0066FF" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Modal Ville */}
      <Modal
        visible={showCityModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCityModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionne ta ville</Text>
              <TouchableOpacity onPress={() => setShowCityModal(false)}>
                <MaterialCommunityIcons name="close" size={28} color="#1F2937" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={NIGERIA_LOCATIONS["Niger"]}
              keyExtractor={(item) => item}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    handleInputChange("city", item);
                    setShowCityModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                  {formData.city === item && (
                    <MaterialCommunityIcons name="check" size={24} color="#0066FF" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.completeBtn} onPress={handleCompleteProfile}>
          <Text style={styles.completeBtnText}>Compléter mon profil</Text>
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginLeft: 16,
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 30,
    lineHeight: 20,
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  selectButtonText: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  selectButtonPlaceholder: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 14,
    color: "#1F2937",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalItemText: {
    fontSize: 16,
    color: "#1F2937",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  completeBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
  },
  completeBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default CompleteProfile;
