import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const OpportunityCard = ({ opportunity, onPress, isFavorited, onFavPress }) => {
  const getTypeColor = (type) => {
    const colors = {
      "Appel à projets": "#FF6600",
      Bourse: "#10B981",
      Formation: "#0066FF",
      Concours: "#EC4899",
      Incubation: "#8B5CF6",
      Stage: "#F97316",
      Emploi: "#06B6D4",
    };
    return colors[type] || "#6B7280";
  };

  const getTypeIcon = (type) => {
    const icons = {
      "Appel à projets": "lightbulb",
      Bourse: "school",
      Formation: "book",
      Concours: "trophy",
      Incubation: "flower",
      Stage: "briefcase",
      Emploi: "briefcase-search",
    };
    return icons[type] || "star";
  };

  const typeColor = getTypeColor(opportunity.type);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      {/* Header avec type et favoris */}
      <View style={styles.header}>
        <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
          <MaterialCommunityIcons
            name={getTypeIcon(opportunity.type)}
            size={16}
            color="#FFFFFF"
          />
          <Text style={styles.typeText}>{opportunity.type}</Text>
        </View>

        {onFavPress && (
          <TouchableOpacity onPress={onFavPress}>
            <MaterialCommunityIcons
              name={isFavorited ? "heart" : "heart-outline"}
              size={20}
              color={isFavorited ? "#FF3B30" : "#9CA3AF"}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Titre */}
      <Text style={styles.title} numberOfLines={2}>
        {opportunity.titre}
      </Text>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {opportunity.description}
      </Text>

      {/* Info clés */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="building" size={14} color="#FF6600" />
          <Text style={styles.infoText} numberOfLines={1}>
            {opportunity.organisation}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="map-marker" size={14} color="#FF6600" />
          <Text style={styles.infoText}>{opportunity.ville}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.deadlineContainer}>
          <MaterialCommunityIcons name="calendar-alert" size={14} color="#F59E0B" />
          <Text style={styles.deadline}>Deadline: {opportunity.deadline}</Text>
        </View>

        {opportunity.montant && (
          <Text style={[styles.montant, { color: typeColor }]}>
            {opportunity.montant}
          </Text>
        )}
      </View>

      {/* Tags */}
      {opportunity.tags && opportunity.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {opportunity.tags.slice(0, 2).map((tag, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
          {opportunity.tags.length > 2 && (
            <Text style={styles.moreTagsText}>+{opportunity.tags.length - 2}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    marginBottom: 12,
  },
  infoSection: {
    marginBottom: 12,
    gap: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    color: "#374151",
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  deadlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  deadline: {
    fontSize: 12,
    color: "#F59E0B",
    fontWeight: "600",
  },
  montant: {
    fontSize: 14,
    fontWeight: "700",
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 11,
    color: "#374151",
    fontWeight: "500",
  },
  moreTagsText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
});

export default OpportunityCard;
