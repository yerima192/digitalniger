import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
    Animated,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export const PullToRefresh = ({
  onRefresh = () => {},
  children,
  refreshing = false,
  style = {},
  tintColor = "#FF6600",
}) => {
  return (
    <ScrollView
      style={[styles.container, style]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={tintColor}
          progressBackgroundColor="#F9FAFB"
          colors={[tintColor]}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

// Composant plus simple avec skeleton loader
export const SkeletonLoader = ({ count = 3, type = "card" }) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const renderCardSkeleton = () => (
    <View style={styles.cardSkeleton}>
      <Animated.View style={[styles.imageSkeleton, { opacity }]} />
      <View style={styles.contentSkeleton}>
        <Animated.View style={[styles.titleSkeleton, { opacity }]} />
        <Animated.View style={[styles.subtitleSkeleton, { opacity }]} />
        <Animated.View style={[styles.subtitleSkeleton, { opacity, width: "60%" }]} />
      </View>
    </View>
  );

  const renderListSkeleton = () => (
    <View style={styles.listSkeleton}>
      <View style={styles.listItemSkeleton}>
        <Animated.View style={[styles.avatarSkeleton, { opacity }]} />
        <View style={styles.listContentSkeleton}>
          <Animated.View style={[styles.titleSkeleton, { opacity }]} />
          <Animated.View style={[styles.subtitleSkeleton, { opacity, width: "70%" }]} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.skeletonContainer}>
      {Array.from({ length: count }).map((_, i) =>
        type === "card" ? (
          <View key={i}>{renderCardSkeleton()}</View>
        ) : (
          <View key={i}>{renderListSkeleton()}</View>
        )
      )}
    </View>
  );
};

// Composant Loading Overlay
export const LoadingOverlay = ({ visible = false, message = "Chargement..." }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [visible]);

  if (!visible) return null;

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.loadingOverlay}>
      <Animated.View style={[styles.spinnerContainer, { transform: [{ rotate }] }]}>
        <MaterialCommunityIcons name="loading" size={48} color="#FF6600" />
      </Animated.View>
      <Text style={styles.loadingMessage}>{message}</Text>
    </View>
  );
};

// Composant Error State
export const ErrorState = ({
  message = "Une erreur s'est produite",
  onRetry = () => {},
  icon = "alert-circle",
}) => {
  return (
    <View style={styles.errorContainer}>
      <MaterialCommunityIcons name={icon} size={64} color="#EF4444" />
      <Text style={styles.errorMessage}>{message}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <MaterialCommunityIcons name="refresh" size={20} color="#FFFFFF" />
        <Text style={styles.retryButtonText}>Réessayer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  // Skeleton Loaders
  skeletonContainer: {
    padding: 16,
    gap: 16,
  },
  cardSkeleton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageSkeleton: {
    height: 140,
    backgroundColor: "#E5E7EB",
  },
  contentSkeleton: {
    padding: 12,
    gap: 8,
  },
  titleSkeleton: {
    height: 16,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    width: "80%",
  },
  subtitleSkeleton: {
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    width: "100%",
  },

  listSkeleton: {
    gap: 12,
  },
  listItemSkeleton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatarSkeleton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E5E7EB",
  },
  listContentSkeleton: {
    flex: 1,
    gap: 8,
  },

  // Loading
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  spinnerContainer: {
    marginBottom: 16,
  },
  loadingMessage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // Error
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  errorMessage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#EF4444",
    gap: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default PullToRefresh;
