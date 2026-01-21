import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export const FilterBar = ({
  filters = {},
  onFilterChange = () => {},
  onReset = () => {},
  cities = [],
  categories = [],
  types = [],
  showPrice = false,
  priceRange = [0, 1000000],
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(filters);

  const handleFilterToggle = (filterKey, value) => {
    const newFilters = { ...selectedFilters };
    
    if (Array.isArray(newFilters[filterKey])) {
      const index = newFilters[filterKey].indexOf(value);
      if (index > -1) {
        newFilters[filterKey].splice(index, 1);
      } else {
        newFilters[filterKey].push(value);
      }
    } else {
      newFilters[filterKey] = value;
    }
    
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    setSelectedFilters({});
    onReset();
    setShowFilterModal(false);
  };

  const activeFilterCount = Object.values(selectedFilters).filter(
    (v) => v && (Array.isArray(v) ? v.length > 0 : true)
  ).length;

  return (
    <>
      <TouchableOpacity
        style={[styles.filterButton, activeFilterCount > 0 && styles.filterButtonActive]}
        onPress={() => setShowFilterModal(true)}
      >
        <Ionicons name="funnel-outline" size={20} color={activeFilterCount > 0 ? "#FF6600" : "#6B7280"} />
        {activeFilterCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{activeFilterCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtres</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={28} color="#1F2937" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filterList} showsVerticalScrollIndicator={false}>
              {/* Ville */}
              {cities.length > 0 && (
                <View style={styles.filterSection}>
                  <Text style={styles.filterSectionTitle}>Ville</Text>
                  <View style={styles.filterOptions}>
                    {cities.map((city) => (
                      <TouchableOpacity
                        key={city}
                        style={[
                          styles.filterOption,
                          selectedFilters.city === city && styles.filterOptionSelected,
                        ]}
                        onPress={() => handleFilterToggle("city", city)}
                      >
                        <Text
                          style={[
                            styles.filterOptionText,
                            selectedFilters.city === city && styles.filterOptionTextSelected,
                          ]}
                        >
                          {city}
                        </Text>
                        {selectedFilters.city === city && (
                          <Ionicons name="checkmark" size={16} color="#FF6600" />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* Catégorie */}
              {categories.length > 0 && (
                <View style={styles.filterSection}>
                  <Text style={styles.filterSectionTitle}>Catégorie</Text>
                  <View style={styles.filterOptions}>
                    {categories.map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        style={[
                          styles.filterOption,
                          selectedFilters.categories?.includes(cat) && styles.filterOptionSelected,
                        ]}
                        onPress={() => handleFilterToggle("categories", cat)}
                      >
                        <Text
                          style={[
                            styles.filterOptionText,
                            selectedFilters.categories?.includes(cat) && styles.filterOptionTextSelected,
                          ]}
                        >
                          {cat}
                        </Text>
                        {selectedFilters.categories?.includes(cat) && (
                          <Ionicons name="checkmark" size={16} color="#FF6600" />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* Type */}
              {types.length > 0 && (
                <View style={styles.filterSection}>
                  <Text style={styles.filterSectionTitle}>Type</Text>
                  <View style={styles.filterOptions}>
                    {types.map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.filterOption,
                          selectedFilters.types?.includes(type) && styles.filterOptionSelected,
                        ]}
                        onPress={() => handleFilterToggle("types", type)}
                      >
                        <Text
                          style={[
                            styles.filterOptionText,
                            selectedFilters.types?.includes(type) && styles.filterOptionTextSelected,
                          ]}
                        >
                          {type}
                        </Text>
                        {selectedFilters.types?.includes(type) && (
                          <Ionicons name="checkmark" size={16} color="#FF6600" />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>Réinitialiser</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={styles.applyButtonText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    position: "relative",
  },
  filterButtonActive: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FF6600",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#FF6600",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    paddingTop: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  filterList: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  filterOptions: {
    gap: 8,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterOptionSelected: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FF6600",
  },
  filterOptionText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  filterOptionTextSelected: {
    color: "#FF6600",
    fontWeight: "600",
  },

  // Footer
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 16,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B7280",
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#FF6600",
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
