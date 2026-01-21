import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCompleteProfile = async () => {
    if (!formData.gender || !formData.ageRange || !formData.city) {
      Alert.alert("Erreur", "Veuillez compléter tous les champs obligatoires");
      return;
    }

    // Validation téléphone si fourni
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^(\+227|0)?[2-9]\d{7}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        Alert.alert("Erreur", "Numéro de téléphone invalide");
        return;
      }
    }

    setIsLoading(true);
    const result = await updateProfile({
      userType,
      gender: formData.gender,
      ageRange: formData.ageRange,
      city: formData.city,
      phone: formData.phone || null,
      country: formData.country,
      profileComplete: true,
    });

    setIsLoading(false);

    if (result.success) {
      router.replace("/(tabs)/");
    } else {
      Alert.alert("Erreur", result.error || "Impossible de compléter le profil");
    }
  };

  const getProgress = () => {
    let count = 0;
    if (formData.gender) count++;
    if (formData.ageRange) count++;
    if (formData.city) count++;
    if (formData.phone) count++;
    return Math.round((count / 4) * 100);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.title}>Complète ton profil</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={["#FF6600", "#FF8533"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${getProgress()}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{getProgress()}% complété</Text>
        </View>

        <Text style={styles.subtitle}>
          Ces informations nous aideront à personnaliser ton expérience
        </Text>

        {/* Genre */}
        <View style={styles.formSection}>
          <View style={styles.labelContainer}>
            <MaterialCommunityIcons name="human" size={18} color="#FF6600" />
            <Text style={styles.label}>Genre *</Text>
          </View>
          <TouchableOpacity
            style={[styles.selectButton, formData.gender && styles.selectButtonActive]}
            onPress={() => setShowGenderModal(true)}
          >
            <Text style={formData.gender ? styles.selectButtonText : styles.selectButtonPlaceholder}>
              {formData.gender || "Sélectionne ton genre"}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color={formData.gender ? "#FF6600" : "#6B7280"} />
          </TouchableOpacity>
        </View>

        {/* Tranche d'âge */}
        <View style={styles.formSection}>
          <View style={styles.labelContainer}>
            <MaterialCommunityIcons name="birthday-cake" size={18} color="#FF6600" />
            <Text style={styles.label}>Tranche d&apos;âge *</Text>
          </View>
          <TouchableOpacity
            style={[styles.selectButton, formData.ageRange && styles.selectButtonActive]}
            onPress={() => setShowAgeModal(true)}
          >
            <Text style={formData.ageRange ? styles.selectButtonText : styles.selectButtonPlaceholder}>
              {formData.ageRange ? `${formData.ageRange} ans` : "Sélectionne ta tranche d'âge"}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color={formData.ageRange ? "#FF6600" : "#6B7280"} />
          </TouchableOpacity>
        </View>

        {/* Ville */}
        <View style={styles.formSection}>
          <View style={styles.labelContainer}>
            <MaterialCommunityIcons name="map-marker" size={18} color="#FF6600" />
            <Text style={styles.label}>Ville *</Text>
          </View>
          <TouchableOpacity
            style={[styles.selectButton, formData.city && styles.selectButtonActive]}
            onPress={() => setShowCityModal(true)}
          >
            <Text style={formData.city ? styles.selectButtonText : styles.selectButtonPlaceholder}>
              {formData.city || "Sélectionne ta ville"}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color={formData.city ? "#FF6600" : "#6B7280"} />
          </TouchableOpacity>
        </View>

        {/* Téléphone */}
        <View style={styles.formSection}>
          <View style={styles.labelContainer}>
            <MaterialCommunityIcons name="phone" size={18} color="#FF6600" />
            <Text style={styles.label}>Téléphone</Text>
          </View>
          <TextInput
            style={[styles.input, formData.phone && styles.inputActive]}
            placeholder="+227 XX XX XX XX"
            placeholderTextColor="#D1D5DB"
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
            keyboardType="phone-pad"
          />
          <Text style={styles.hint}>Optionnel - Format: +227 XXXXXXXX ou 0XXXXXXXX</Text>
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
                <Ionicons name="close" size={28} color="#1F2937" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={GENDERS}
              keyExtractor={(item) => item}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.modalItem, formData.gender === item && styles.modalItemSelected]}
                  onPress={() => {
                    handleInputChange("gender", item);
                    setShowGenderModal(false);
                  }}
                >
                  <Text style={[styles.modalItemText, formData.gender === item && styles.modalItemTextSelected]}>{item}</Text>
                  {formData.gender === item && (
                    <Ionicons name="checkmark-circle" size={24} color="#FF6600" />
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
              <Text style={styles.modalTitle}>Sélectionne ta tranche d&apos;âge</Text>
              <TouchableOpacity onPress={() => setShowAgeModal(false)}>
                <Ionicons name="close" size={28} color="#1F2937" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={AGE_RANGES}
              keyExtractor={(item) => item}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.modalItem, formData.ageRange === item && styles.modalItemSelected]}
                  onPress={() => {
                    handleInputChange("ageRange", item);
                    setShowAgeModal(false);
                  }}
                >
                  <Text style={[styles.modalItemText, formData.ageRange === item && styles.modalItemTextSelected]}>{item} ans</Text>
                  {formData.ageRange === item && (
                    <Ionicons name="checkmark-circle" size={24} color="#FF6600" />
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
                <Ionicons name="close" size={28} color="#1F2937" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={NIGERIA_LOCATIONS["Niger"]}
              keyExtractor={(item) => item}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.modalItem, formData.city === item && styles.modalItemSelected]}
                  onPress={() => {
                    handleInputChange("city", item);
                    setShowCityModal(false);
                  }}
                >
                  <Text style={[styles.modalItemText, formData.city === item && styles.modalItemTextSelected]}>{item}</Text>
                  {formData.city === item && (
                    <Ionicons name="checkmark-circle" size={24} color="#FF6600" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.completeBtn, (!formData.gender || !formData.ageRange || !formData.city) && styles.completeBtnDisabled]}
          onPress={handleCompleteProfile}
          disabled={!formData.gender || !formData.ageRange || !formData.city || isLoading}
        >
          {isLoading ? (
            <Text style={styles.completeBtnText}>Chargement...</Text>
          ) : (
            <>
              <Text style={styles.completeBtnText}>Compléter mon profil</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" style={{ marginLeft: 8 }} />
            </>
          )}
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
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  placeholder: {
    width: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    flex: 1,
    textAlign: "center",
  },
  progressSection: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 30,
    lineHeight: 20,
  },
  formSection: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  selectButtonActive: {
    borderColor: "#FF6600",
    backgroundColor: "#FFF7ED",
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
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 14,
    color: "#1F2937",
  },
  inputActive: {
    borderColor: "#FF6600",
    backgroundColor: "#FFF7ED",
  },
  hint: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 6,
    fontStyle: "italic",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
  modalItemSelected: {
    backgroundColor: "#FFF7ED",
  },
  modalItemText: {
    fontSize: 16,
    color: "#1F2937",
  },
  modalItemTextSelected: {
    color: "#FF6600",
    fontWeight: "600",
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
    borderRadius: 14,
    backgroundColor: "#FF6600",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  completeBtnDisabled: {
    opacity: 0.5,
  },
  completeBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default CompleteProfile;
