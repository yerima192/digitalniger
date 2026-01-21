import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Rediriger selon l'état d'authentification
      if (isAuthenticated) {
        router.replace("(tabs)");
      } else {
        router.replace("(auth)");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <View style={styles.container}>
      {/* <ActivityIndicator size="large" color="#FF6600" />
       */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.avatar}
        />
        <Text style={styles.subtitle}>
          Connectez-vous à l&apos;écosystème numérique nigérien
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  avatar: {
    width: 200,
    height: 100,
  },
  logoContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingBottom: 40,
    marginBottom: 16,
  },
    subtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 32,
    lineHeight: 20,
  },
});

// import { useEffect } from "react";
// import { View, ActivityIndicator, StyleSheet } from "react-native";
// import { useRouter } from "expo-router";
// import { useAuth } from "../context/AuthContext";

// export default function Index() {
//   const { isAuthenticated, isLoading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading) {
//       // Rediriger selon l'état d'authentification
//       if (isAuthenticated) {
//         router.replace("(tabs)");
//       } else {
//         router.replace("(auth)");
//       }
//     }
//   }, [isAuthenticated, isLoading, router]);

//   return (
//     <View style={styles.container}>
//       <ActivityIndicator size="large" color="#FF6600" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F9FAFB",
//   },
// });
