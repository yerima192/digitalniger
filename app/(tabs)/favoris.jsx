import { View, StyleSheet } from "react-native";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Header from "../../components/Header";

export default function FavorisScreen() {
  return (
    <SafeAreaWrapper>
        <View style={styles.container}>
          {/* Header */}
          <Header
            title="Favoris"
            subtitle="Organisez vos éléments préférés"
            badgeCount={44}
          />
        </View>

    </SafeAreaWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F9FAFB",
  },
});
