import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export const SearchBar = ({
  placeholder = "Rechercher...",
  onSearch = () => {},
  onFilterPress = () => {},
  showFilter = true,
  style = {},
}) => {
  const [searchText, setSearchText] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleChangeText = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  const handleClear = () => {
    setSearchText("");
    onSearch("");
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.searchContainer, isActive && styles.searchContainerActive]}>
        <Ionicons
          name="search"
          size={18}
          color={isActive ? "#FF6600" : "#9CA3AF"}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={handleChangeText}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {showFilter && (
        <TouchableOpacity
          style={[styles.filterButton, isActive && styles.filterButtonActive]}
          onPress={onFilterPress}
        >
          <Ionicons
            name="funnel-outline"
            size={20}
            color={isActive ? "#FF6600" : "#6B7280"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchContainerActive: {
    borderColor: "#FF6600",
    backgroundColor: "#FFF7ED",
  },
  searchIcon: {
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterButtonActive: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FF6600",
  },
});
