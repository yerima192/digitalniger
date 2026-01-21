import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export function AuthGuard({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";
    const inCompleteProfile = segments[1] === "complete-profile";
    const profileComplete = user?.profileComplete;

    console.log("Auth Guard:", {
      isAuthenticated,
      profileComplete,
      segments,
      inAuthGroup,
      inTabsGroup,
      inCompleteProfile,
    });

    if (!isAuthenticated && !inAuthGroup) {
      // Si non connecté et pas sur une page auth, rediriger vers auth
      router.replace("(auth)");
    } else if (isAuthenticated && profileComplete && inAuthGroup && !inCompleteProfile) {
      // Si connecté avec profil complet et sur une page auth (sauf complete-profile), rediriger vers l'app
      router.replace("(tabs)");
    } else if (isAuthenticated && !profileComplete && inTabsGroup) {
      // Si connecté mais profil pas complet et sur les tabs, rediriger vers complete-profile
      router.replace({
        pathname: "/(auth)/complete-profile",
        params: { userType: user?.userType || "SEEKER" }
      });
    }
  }, [isAuthenticated, user?.profileComplete, segments, isLoading, router, user?.userType]);

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