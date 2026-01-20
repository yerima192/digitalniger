import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ActorCard = ({ actor, onPress, isFavorited, onFavPress }) => {
  const getCategoryColor = (category) => {
    const colors = {
      Startup: "#FF6600",
      Hub: "#0066FF",
      Freelancer: "#10B981",
      Organisation: "#8B5CF6",
      Entreprise: "#F97316",
      Consultant: "#EC4899",
    };
    return colors[category] || "#6B7280";
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        {/* Logo */}
        <Image
          source={{ uri: actor.logo }}
          style={[styles.logo, { backgroundColor: getCategoryColor(actor.categorie) }]}
        />

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {actor.nom}
          </Text>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(actor.categorie) }]}>
            <Text style={styles.categoryText}>{actor.categorie}</Text>
          </View>
        </View>

        {/* Favoris */}
        {onFavPress && (
          <TouchableOpacity onPress={onFavPress} style={styles.favBtn}>
            <MaterialCommunityIcons
              name={isFavorited ? "heart" : "heart-outline"}
              size={20}
              color={isFavorited ? "#FF3B30" : "#9CA3AF"}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {actor.description}
      </Text>

      {/* Domaine */}
      <View style={styles.domaine}>
        <MaterialCommunityIcons name="briefcase" size={14} color="#FF6600" />
        <Text style={styles.domaineText}>{actor.domaine}</Text>
      </View>

      {/* Contact Info */}
      <View style={styles.contactContainer}>
        <View style={styles.contactItem}>
          <MaterialCommunityIcons name="map-marker" size={14} color="#6B7280" />
          <Text style={styles.contactText}>{actor.ville}</Text>
        </View>
        <View style={styles.contactItem}>
          <MaterialCommunityIcons name="phone" size={14} color="#6B7280" />
          <Text style={styles.contactText}>{actor.contact}</Text>
        </View>
      </View>

      {/* Réseaux sociaux */}
      {actor.reseauxSociaux && (
        <View style={styles.socialIcons}>
          {actor.reseauxSociaux.facebook && (
            <TouchableOpacity style={styles.socialIcon}>
              <MaterialCommunityIcons name="facebook" size={18} color="#1877F2" />
            </TouchableOpacity>
          )}
          {actor.reseauxSociaux.twitter && (
            <TouchableOpacity style={styles.socialIcon}>
              <MaterialCommunityIcons name="twitter" size={18} color="#1DA1F2" />
            </TouchableOpacity>
          )}
          {actor.reseauxSociaux.linkedin && (
            <TouchableOpacity style={styles.socialIcon}>
              <MaterialCommunityIcons name="linkedin" size={18} color="#0A66C2" />
            </TouchableOpacity>
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
    marginBottom: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  favBtn: {
    padding: 8,
  },
  description: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    marginBottom: 12,
  },
  domaine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  domaineText: {
    fontSize: 12,
    color: "#374151",
    marginLeft: 6,
    fontWeight: "500",
  },
  contactContainer: {
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  contactText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 6,
  },
  socialIcons: {
    flexDirection: "row",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  socialIcon: {
    marginRight: 12,
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ActorCard;
