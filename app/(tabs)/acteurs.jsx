import { View, StyleSheet } from "react-native";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";

export default function ActeursScreen() {
  return (
    <SafeAreaWrapper>
      <ScreenWrapper>
        <View style={styles.container}>
          {/* Header */}
          <Header
            title="Acteurs"
            subtitle="L'écosystème numérique du Niger"
            badgeCount={44}
          />
        </View>
      </ScreenWrapper>
    </SafeAreaWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
});
