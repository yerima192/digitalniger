import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)/index" />
      <Stack.Screen name="(tabs)/evenements" />
      <Stack.Screen name="(tabs)/acteurs" />
      <Stack.Screen name="opportinity" />
      <Stack.Screen name="event-detail" />
      <Stack.Screen name="favoris" />
      <Stack.Screen name="parametres" />
      <Stack.Screen name="(tabs)/_layout" />
    </Stack>
  );
}
