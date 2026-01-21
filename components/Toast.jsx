import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    View,
} from "react-native";

// Store toast queue globally
const toastQueue = [];
let toastListener = null;

export const showToast = (message, type = "info", duration = 2000) => {
  toastQueue.push({ message, type, duration });
  if (toastListener) {
    toastListener({ message, type, duration });
  }
};

/**
 * Toast Component - Affiche une notification toast
 * Props:
 *   - message (string): Le message à afficher
 *   - type (string): 'success' | 'error' | 'warning' | 'info'
 *   - duration (number): Durée en ms avant disparition (default: 2000)
 *   - onHide (function): Callback quand le toast disparait
 */
const Toast = ({ message, type = "info", duration = 2000, onHide }) => {
  const [displayMessage, setDisplayMessage] = useState(message);
  const [displayType, setDisplayType] = useState(type);
  const [displayDuration, setDisplayDuration] = useState(duration);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  // Register the listener when component mounts
  useEffect(() => {
    toastListener = ({ message: msg, type: msgType, duration: msgDuration }) => {
      setDisplayMessage(msg);
      setDisplayType(msgType);
      setDisplayDuration(msgDuration);
    };
    return () => {
      toastListener = null;
    };
  }, []);

  useEffect(() => {
    const currentMessage = displayMessage || message;
    if (currentMessage) {
      // Animate in
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 7,
        tension: 40,
      }).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          if (onHide) onHide();
          setDisplayMessage("");
        });
      }, displayDuration || duration);

      return () => clearTimeout(timer);
    }
  }, [displayMessage, displayDuration, duration, onHide, slideAnim]);

  if (!displayMessage && !message) return null;

  const currentMessage = displayMessage || message;
  const currentType = displayType || type;

  const getIcon = () => {
    switch (currentType) {
      case "success":
        return "checkmark-circle";
      case "error":
        return "close-circle";
      case "warning":
        return "alert-circle";
      default:
        return "information-circle";
    }
  };

  const getColor = () => {
    switch (currentType) {
      case "success":
        return "#059669";
      case "error":
        return "#EF4444";
      case "warning":
        return "#F59E0B";
      default:
        return "#3B82F6";
    }
  };

  const getBackground = () => {
    switch (currentType) {
      case "success":
        return "#D1FAE5";
      case "error":
        return "#FEE2E2";
      case "warning":
        return "#FEF3C7";
      default:
        return "#DBEAFE";
    }
  };

  const color = getColor();
  const background = getBackground();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={[styles.toast, { backgroundColor: background }]}>
        <Ionicons name={getIcon()} size={20} color={color} />
        <Text style={[styles.message, { color }]}>{currentMessage}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  message: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
});

export default Toast;
