import { StyleSheet, View } from "react-native";
import React from "react";
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import ScreenWrapper from "../components/ScreenWrapper";
import Header from "../components/Header";

const Opportinity = () => {
  return (
    <SafeAreaWrapper>
      <ScreenWrapper>
        <View style={styles.container}>
          {/* Header */}
          <Header
            title="Opportunités"
            subtitle="Découvrez les opportunités disponibles"
            badgeCount={44}
          />
        </View>
      </ScreenWrapper>
    </SafeAreaWrapper>
  );
};

export default Opportinity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
});
