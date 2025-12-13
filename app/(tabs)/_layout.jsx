import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF6600",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginBottom: Platform.OS === 'ios' ? 0 : 6,
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 88,
          paddingTop: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 20,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'ios' ? 4 : 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="evenements"
        options={{
          title: "Événements",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <Ionicons 
                name={focused ? "calendar" : "calendar-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="acteurs"
        options={{
          title: "Acteurs",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <MaterialCommunityIcons 
                name={focused ? "account-group" : "account-group-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="favoris"
        options={{
          title: "Favoris",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <Ionicons 
                name={focused ? "heart" : "heart-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="parametres"
        options={{
          title: "Paramètres",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <Ionicons 
                name={focused ? "settings" : "settings-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconWrapperActive: {
    backgroundColor: 'transparent',
    // backgroundColor: '#FFF7ED',
  },
});

// import {
//   NativeTabs,
//   Icon,
//   VectorIcon,
//   Label,
// } from "expo-router/unstable-native-tabs";
// import { Platform } from "react-native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import Ionicons from "@expo/vector-icons/Ionicons";

// export default function TabLayout() {
//   const activeColor = "#FF6600";
//   const inactiveColor = "#9CA3AF";

//   return (
//     <NativeTabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: activeColor,
//         tabBarInactiveTintColor: inactiveColor,
//         tabBarShowLabel: true,
//         tabBarStyle: {
//           backgroundColor: "#FFFFFF",
//           borderTopWidth: 0,
//           height: Platform.OS === 'ios' ? 88 : 70,
//           paddingBottom: Platform.OS === 'ios' ? 20 : 10,
//           paddingTop: 10,
//           shadowColor: "#000",
//           shadowOffset: {
//             width: 0,
//             height: -4,
//           },
//           shadowOpacity: 0.1,
//           shadowRadius: 12,
//           elevation: 20,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: "600",
//           marginTop: 4,
//         },
//         tabBarIconStyle: {
//           marginTop: 4,
//         },
//         tabBarItemStyle: {
//           paddingVertical: 4,
//         },
//       }}
//     >
//       <NativeTabs.Trigger name="index">
//         <Label style={{ fontWeight: "600" }}>Home</Label>
//         {Platform.select({
//           ios: <Icon sf="house.fill" />,
//           android: (
//             <Icon src={<VectorIcon family={MaterialIcons} name="home" size={24} />} />
//           ),
//         })}
//       </NativeTabs.Trigger>

//       <NativeTabs.Trigger name="evenements">
//         <Label style={{ fontWeight: "600" }}>Événements</Label>
//         {Platform.select({
//           ios: <Icon sf="calendar" />,
//           android: (
//             <Icon src={<VectorIcon family={MaterialIcons} name="event" size={24} />} />
//           ),
//         })}
//       </NativeTabs.Trigger>

//       <NativeTabs.Trigger name="acteurs">
//         <Label style={{ fontWeight: "600" }}>Acteurs</Label>
//         {Platform.select({
//           ios: <Icon sf="person.3.fill" />,
//           android: (
//             <Icon src={<VectorIcon family={MaterialIcons} name="people" size={24} />} />
//           ),
//         })}
//       </NativeTabs.Trigger>

//       <NativeTabs.Trigger name="favoris">
//         <Label style={{ fontWeight: "600" }}>Favoris</Label>
//         {Platform.select({
//           ios: <Icon sf="heart.fill" />,
//           android: <Icon src={<VectorIcon family={Ionicons} name="heart" size={24} />} />,
//         })}
//       </NativeTabs.Trigger>

//       <NativeTabs.Trigger name="parametres">
//         <Label style={{ fontWeight: "600" }}>Paramètres</Label>
//         {Platform.select({
//           ios: <Icon sf="gearshape.fill" />,
//           android: (
//             <Icon src={<VectorIcon family={MaterialIcons} name="settings" size={24} />} />
//           ),
//         })}
//       </NativeTabs.Trigger>
//     </NativeTabs>
//   );
// }