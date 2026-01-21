import { useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

/**
 * TabBar - Composant tab bar animé réutilisable
 * Utilise le même pattern que la page auth
 */
export const TabBar = ({ tabs, onTabChange, activeTab: initialActive = 0 }) => {
  const [activeTab, setActiveTab] = useState(initialActive);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [tabWidth, setTabWidth] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
    Animated.spring(slideAnim, {
      toValue: index,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
    onTabChange?.(index);
  };

  const onTabsLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    const calculatedTabWidth = (width - 8) / tabs.length;
    setTabWidth(calculatedTabWidth);
  };

  return (
    <View style={styles.tabsWrapper}>
      <View style={styles.tabsContainer} onLayout={onTabsLayout}>
        {tabWidth > 0 && (
          <Animated.View
            style={[
              styles.tabActiveBg,
              {
                width: tabWidth,
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: Array.from({ length: tabs.length }, (_, i) => i),
                      outputRange: Array.from(
                        { length: tabs.length },
                        (_, i) => i * tabWidth + 4
                      ),
                    }),
                  },
                ],
              },
            ]}
          />
        )}

        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tabButton}
            onPress={() => handleTabChange(index)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsWrapper: {
    marginBottom: 24,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 30,
    padding: 4,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabActiveBg: {
    position: "absolute",
    top: 4,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FF6600",
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    paddingHorizontal: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
  },
  tabTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
