import { View, Platform } from "react-native";

export default function ScreenWrapper({ children, style }) {
  return ( <View style={[{ flex: 1, marginBottom: Platform.OS === "android" ? 90 : 0, },style]}>{children}</View> );
  // return ( <View style={[{ flex: 1, marginBottom: Platform.OS === "android" ? 90 : 0, },style]}>{children}</View> );
}
