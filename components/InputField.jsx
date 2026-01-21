import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

/**
 * InputField - Composant input réutilisable
 * Utilise le design uniforme de l'application
 */
export const InputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  rightIcon,
  onRightIconPress,
  ...props
}) => (
  <View style={styles.inputContainer}>
    {icon && <Ionicons name={icon} size={20} color="#9CA3AF" />}
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
    {rightIcon && (
      <Ionicons
        name={rightIcon}
        size={20}
        color="#9CA3AF"
        onPress={onRightIconPress}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
});
