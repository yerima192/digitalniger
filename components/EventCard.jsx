import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const EventCard = ({ event, onPress, isFavorited, onFavPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      {/* Image */}
      <Image source={{ uri: event.image }} style={styles.image} />

      {/* Favoris Button */}
      {onFavPress && (
        <TouchableOpacity style={styles.favoriteBtn} onPress={onFavPress}>
          <MaterialCommunityIcons
            name={isFavorited ? "heart" : "heart-outline"}
            size={24}
            color={isFavorited ? "#FF3B30" : "#FFFFFF"}
          />
        </TouchableOpacity>
      )}

      {/* Type Badge */}
      <View style={styles.typeBadge}>
        <Text style={styles.typeText}>{event.type}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="calendar" size={14} color="#6B7280" />
          <Text style={styles.infoText}>{event.date}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="clock" size={14} color="#6B7280" />
          <Text style={styles.infoText}>{event.time}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="map-marker" size={14} color="#6B7280" />
          <Text style={styles.infoText}>{event.city}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={[styles.price, event.price === "Gratuit" && styles.free]}>
              {event.price}
            </Text>
          </View>
          <Text style={styles.registered}>
            {event.registered}/{event.capacity} inscrits
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
    backgroundColor: "#F3F4F6",
  },
  favoriteBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  typeBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#FF6600",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 6,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF6600",
  },
  free: {
    color: "#10B981",
  },
  registered: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "right",
  },
});

export default EventCard;
