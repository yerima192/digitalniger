// components/Header.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import { LinearGradient } from 'expo-linear-gradient';

export default function Header({ title, subtitle, badgeCount, showBack = false }) {
  const router = useRouter();
  
  return (
    <View style={styles.headerContainer}>
      {/* <LinearGradient colors={['#FFFFFF', '#F8FAFC']}></LinearGradient> */}
      <View style={styles.gradientBackground}>
        <View style={styles.header}>
          {/* --- Back Button --- */}
          {showBack && (
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>
                <Ionicons name="arrow-back" size={22} color="#1F2937" />
              </View>
            </TouchableOpacity>
          )}
          
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
          </View>
          
          {/* --- Icons Right --- */}
          {!showBack && (
            <View style={styles.headerIcons}>
              <TouchableOpacity 
                style={styles.iconButton}
                activeOpacity={0.7}
                onPress={() => router.push('user-notifications')}
              >
                <View style={styles.iconWrapper}>
                  <Ionicons name="notifications-outline" size={22} color="#1F2937" />
                  {badgeCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {badgeCount > 99 ? '99+' : badgeCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.iconButton}
                activeOpacity={0.7}
                onPress={() => router.push('user-profil')}
              >
                <View style={[styles.iconWrapper, styles.profileWrapper]}>
                  <Ionicons name="person-circle-outline" size={26} color="#1F2937" />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      
      {/* Subtle shadow line */}
      <View style={styles.shadowLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "transparent",
  },
  backButton: {
    marginRight: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  profileWrapper: {
    backgroundColor: '#EFF6FF',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
    fontWeight: "500",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 8,
    alignItems: 'center',
  },
  iconButton: {
    padding: 2,
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#FF7F27",
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: "#EF4444",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  shadowLine: {
    height: 1,
    backgroundColor: '#E5E7EB',
    opacity: 0.5,
  },
});