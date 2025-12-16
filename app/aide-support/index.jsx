import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Header from "../../components/Header";

export default function AideSupport() {
  return (
    <SafeAreaWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header
          title="Aide et support"
          showBack={true}
          subtitle="Besoin d'assistance ?"
        />

        {/* Contenu en cours de développement */}
        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <Ionicons name="construct-outline" size={32} color="#3B82F6" />
          </View>

          <Text style={styles.title}>Page en cours de développement</Text>
          <Text style={styles.subtitle}>
            Cette fonctionnalité sera disponible très bientôt.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
});









// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import SafeAreaWrapper from "../../components/SafeAreaWrapper";
// import Header from "../../components/Header";

// export default function AideSupport() {
//   return (
//     <SafeAreaWrapper>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
//         <Header
//           title="Aide & Support"
//           subtitle="Besoin d’assistance ? Nous sommes là pour vous aider"
//           showBack={true}
//         />

//         {/* SECTION : Assistance */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <View style={styles.line} />
//             <Text style={styles.sectionTitle}>Assistance</Text>
//             <View style={styles.line} />
//           </View>

//           <View style={styles.card}>
//             <TouchableOpacity style={styles.row}>
//               <View style={styles.left}>
//                 <View style={[styles.iconCircle, { backgroundColor: "#E8F0FF" }]}>
//                   <Ionicons name="help-circle-outline" size={24} color="#2563EB" />
//                 </View>
//                 <View>
//                   <Text style={styles.text}>Questions fréquentes</Text>
//                   <Text style={styles.subtext}>Consultez la FAQ</Text>
//                 </View>
//               </View>
//               <Ionicons name="chevron-forward" size={18} color="#6B7280" />
//             </TouchableOpacity>

//             <View style={styles.separator} />

//             <TouchableOpacity style={styles.row}>
//               <View style={styles.left}>
//                 <View style={[styles.iconCircle, { backgroundColor: "#ECFDF5" }]}>
//                   <Ionicons name="chatbubble-ellipses-outline" size={24} color="#059669" />
//                 </View>
//                 <View>
//                   <Text style={styles.text}>Contacter le support</Text>
//                   <Text style={styles.subtext}>Réponse rapide</Text>
//                 </View>
//               </View>
//               <Ionicons name="chevron-forward" size={18} color="#6B7280" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Info Card */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoIcon}>
//             <Ionicons name="information-circle" size={24} color="#2563EB" />
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.infoTitle}>Support réactif</Text>
//             <Text style={styles.infoText}>
//               Notre équipe est disponible pour vous accompagner et résoudre
//               rapidement vos problèmes.
//             </Text>
//           </View>
//         </View>

//         {/* SECTION : Autres */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <View style={styles.line} />
//             <Text style={styles.sectionTitle}>Autres</Text>
//             <View style={styles.line} />
//           </View>

//           <View style={styles.card}>
//             <TouchableOpacity style={styles.row}>
//               <View style={styles.left}>
//                 <View style={[styles.iconCircle, { backgroundColor: "#FFF7ED" }]}>
//                   <Ionicons name="mail-outline" size={24} color="#F97316" />
//                 </View>
//                 <View>
//                   <Text style={styles.text}>Nous écrire</Text>
//                   <Text style={styles.subtext}>support@exemple.com</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={{ height: 100 }} />
//       </ScrollView>
//     </SafeAreaWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//   },

//   section: {
//     marginTop: 24,
//     paddingHorizontal: 16,
//   },

//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//     gap: 12,
//   },

//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#E5E7EB",
//   },

//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#374151",
//     textTransform: "uppercase",
//   },

//   card: {
//     backgroundColor: "#FFF",
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: "#F3F4F6",
//   },

//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingVertical: 16,
//   },

//   left: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     flex: 1,
//   },

//   iconCircle: {
//     width: 52,
//     height: 52,
//     borderRadius: 16,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   text: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#111827",
//   },

//   subtext: {
//     fontSize: 13,
//     color: "#6B7280",
//     marginTop: 2,
//   },

//   separator: {
//     height: 1,
//     backgroundColor: "#F3F4F6",
//     marginLeft: 66,
//   },

//   infoCard: {
//     flexDirection: "row",
//     marginHorizontal: 16,
//     marginTop: 20,
//     backgroundColor: "#EFF6FF",
//     borderRadius: 16,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: "#DBEAFE",
//   },

//   infoIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     backgroundColor: "#DBEAFE",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },

//   infoTitle: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#1E40AF",
//     marginBottom: 4,
//   },

//   infoText: {
//     fontSize: 13,
//     color: "#3B82F6",
//     lineHeight: 18,
//   },
// });
