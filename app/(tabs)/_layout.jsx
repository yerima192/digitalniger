import {
  NativeTabs,
  Icon,
  VectorIcon,
  Label,
} from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const activeColor = "#FF6600";
  const inactiveColor = "#888888";

  return (
    <NativeTabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E5E5",
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        {Platform.select({
          ios: <Icon sf="house.fill" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="home" />} />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="evenements">
        <Label>Événements</Label>
        {Platform.select({
          ios: <Icon sf="calendar" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="event" />} />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="acteurs">
        <Label>Acteurs</Label>
        {Platform.select({
          ios: <Icon sf="person.3.fill" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="people" />} />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="favoris">
        <Label>Favoris</Label>
        {Platform.select({
          ios: <Icon sf="heart.fill" />,
          android: <Icon src={<VectorIcon family={Ionicons} name="heart" />} />,
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="parametres">
        <Label>Paramètres</Label>
        {Platform.select({
          ios: <Icon sf="gearshape.fill" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="settings" />} />
          ),
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}




// import { Tabs } from "expo-router";
// import { Platform } from "react-native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import Ionicons from "@expo/vector-icons/Ionicons";

// export default function TabLayout() {
//   const activeColor = "#FF6600";
//   const inactiveColor = "#9CA3AF";

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: activeColor,
//         tabBarInactiveTintColor: inactiveColor,
//         tabBarStyle: {
//           backgroundColor: "#FFFFFF",
//           borderTopWidth: 1,
//           borderTopColor: "#E5E7EB",
//           height: 65,
//           paddingBottom: 8,
//           paddingTop: 8,
//           shadowColor: "#000",
//           shadowOffset: { width: 0, height: -2 },
//           shadowOpacity: 0.08,
//           shadowRadius: 8,
//           elevation: 8,
//         },
//         tabBarLabelStyle: {
//           fontSize: 11,
//           fontWeight: "600",
//           marginTop: 2,
//         },
//         tabBarItemStyle: {
//           paddingVertical: 4,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Accueil",
//           tabBarIcon: ({ color, focused }) => (
//             <MaterialIcons 
//               name="home" 
//               size={focused ? 28 : 26} 
//               color={color} 
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="evenements"
//         options={{
//           title: "Événements",
//           tabBarIcon: ({ color, focused }) => (
//             <Ionicons 
//               name="calendar" 
//               size={focused ? 26 : 24} 
//               color={color} 
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="acteurs"
//         options={{
//           title: "Acteurs",
//           tabBarIcon: ({ color, focused }) => (
//             <MaterialIcons 
//               name="people" 
//               size={focused ? 28 : 26} 
//               color={color} 
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="favoris"
//         options={{
//           title: "Favoris",
//           tabBarIcon: ({ color, focused }) => (
//             <Ionicons 
//               name={focused ? "heart" : "heart-outline"} 
//               size={focused ? 26 : 24} 
//               color={color} 
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="parametres"
//         options={{
//           title: "Paramètres",
//           tabBarIcon: ({ color, focused }) => (
//             <Ionicons 
//               name={focused ? "settings" : "settings-outline"} 
//               size={focused ? 26 : 24} 
//               color={color} 
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }