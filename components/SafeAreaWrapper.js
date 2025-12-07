import React from "react";
import { SafeAreaView, StyleSheet, Platform } from "react-native";

export default function SafeAreaWrapper({ children, style }) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0, // pour éviter l’overlap sur Android
    backgroundColor: "#fff",
  },
});
