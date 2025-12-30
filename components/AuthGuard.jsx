import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export function AuthGuard({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    console.log("Auth Guard:", {
      isAuthenticated,
      segments,
      inAuthGroup,
      inTabsGroup,
    });

    if (!isAuthenticated && !inAuthGroup) {
      // Si non connecté et pas sur une page auth, rediriger vers auth
      router.replace("(auth)");
    } else if (isAuthenticated && inAuthGroup) {
      // Si connecté et sur une page auth, rediriger vers l'app
      router.replace("(tabs)");
    }
  }, [isAuthenticated, segments, isLoading, router]);

  // Afficher un loader pendant le chargement
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6600" />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
});