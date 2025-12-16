import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeAreaWrapper({ children, style }) {
  return (
    <SafeAreaView style={[styles.container, style]} edges={["top", "left", "right",]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

