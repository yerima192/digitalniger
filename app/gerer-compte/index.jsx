import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import Header from "../../components/Header";

export default function GererCompteScreen() {
  return (
    <SafeAreaWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <Header
          title="Gérer mon compte"
          subtitle="Mettre à jour vos informations personnelles"
          badgeCount={1}
          showBack={true}
        />

        {/* SECTION : Informations personnelles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleLine} />
            <Text style={styles.sectionTitle}>Informations personnelles</Text>
            <View style={styles.sectionTitleLine} />
          </View>

          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.row}
              activeOpacity={0.7}
            >
              <View style={styles.left}>
                <LinearGradient
                  colors={['#FFE8D6', '#FFD4B3']}
                  style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}
                >
                  <Ionicons name="person-circle-outline" size={24} color="#FF6600" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Modifier mes informations</Text>
                  <Text style={styles.subtext}>Nom, prénom, adresse</Text>
                </View>
              </View>
              <View style={styles.chevronCircle}>
                <Ionicons name="chevron-forward" size={18} color="#6B7280" />
              </View>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity 
              style={styles.row}
              activeOpacity={0.7}
            >
              <View style={styles.left}>
                <LinearGradient
                  colors={['#E8F0FF', '#D4E4FF']}
                  style={[styles.iconCircle, { backgroundColor: "#E8F0FF" }]}
                >
                  <Ionicons name="lock-closed-outline" size={24} color="#3366FF" />
                </LinearGradient>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Changer mon mot de passe</Text>
                  <Text style={styles.subtext}>Sécurisez votre compte</Text>
                </View>
              </View>
              <View style={styles.chevronCircle}>
                <Ionicons name="chevron-forward" size={18} color="#6B7280" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="information-circle" size={24} color="#3B82F6" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Protégez vos données</Text>
            <Text style={styles.infoText}>
              Vos informations personnelles sont sécurisées et chiffrées. 
              Changez régulièrement votre mot de passe.
            </Text>
          </View>
        </View>

        {/* SECTION : Zone dangereuse */}
        <View style={styles.dangerSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleLine} />
            <Text style={[styles.sectionTitle, { color: '#DC2626' }]}>Zone dangereuse</Text>
            <View style={styles.sectionTitleLine} />
          </View>

          <TouchableOpacity 
            style={styles.dangerButton}
            activeOpacity={0.7}
          >
            <View style={styles.dangerButtonContent}>
              <View style={styles.dangerIconCircle}>
                <Ionicons name="trash-outline" size={24} color="#DC2626" />
              </View>
              <View style={styles.dangerTextContainer}>
                <Text style={styles.dangerButtonText}>Supprimer mon compte</Text>
                <Text style={styles.dangerButtonSubtext}>
                  Cette action est irréversible
                </Text>
              </View>
            </View>
            <View style={styles.dangerChevronCircle}>
              <Ionicons name="chevron-forward" size={18} color="#DC2626" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitleLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  subtext: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  chevronCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 66,
  },
  
  // Info Card
  infoCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#3B82F6',
    lineHeight: 18,
    fontWeight: '500',
  },
  
  // Danger Section
  dangerSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FEE2E2',
    shadowColor: "#DC2626",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  dangerButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  dangerIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerTextContainer: {
    flex: 1,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 4,
  },
  dangerButtonSubtext: {
    fontSize: 13,
    color: '#F87171',
    fontWeight: '500',
  },
  dangerChevronCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from 'expo-linear-gradient';
// import SafeAreaWrapper from "../../components/SafeAreaWrapper";
// import Header from "../../components/Header";

// export default function GererCompteScreen() {
//   return (
//     <SafeAreaWrapper>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         {/* HEADER */}
//         <Header
//           title="Gérer mon compte"
//           subtitle="Mettre à jour vos informations personnelles"
//           badgeCount={1}
//           showBack={true}
//         />

//         {/* SECTION : Informations personnelles */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <View style={styles.sectionTitleLine} />
//             <Text style={styles.sectionTitle}>Informations personnelles</Text>
//             <View style={styles.sectionTitleLine} />
//           </View>

//           <View style={styles.card}>
//             <TouchableOpacity 
//               style={styles.row}
//               activeOpacity={0.7}
//             >
//               <View style={styles.left}>
//                 <LinearGradient
//                   colors={['#FFE8D6', '#FFD4B3']}
//                   style={[styles.iconCircle, { backgroundColor: "#FFE8D6" }]}
//                 >
//                   <Ionicons name="person-circle-outline" size={24} color="#FF6600" />
//                 </LinearGradient>
//                 <View style={styles.textContainer}>
//                   <Text style={styles.text}>Modifier mes informations</Text>
//                   <Text style={styles.subtext}>Nom, prénom, adresse</Text>
//                 </View>
//               </View>
//               <View style={styles.chevronCircle}>
//                 <Ionicons name="chevron-forward" size={18} color="#6B7280" />
//               </View>
//             </TouchableOpacity>

//             <View style={styles.separator} />

//             <TouchableOpacity 
//               style={styles.row}
//               activeOpacity={0.7}
//             >
//               <View style={styles.left}>
//                 <LinearGradient
//                   colors={['#E8F0FF', '#D4E4FF']}
//                   style={[styles.iconCircle, { backgroundColor: "#E8F0FF" }]}
//                 >
//                   <Ionicons name="lock-closed-outline" size={24} color="#3366FF" />
//                 </LinearGradient>
//                 <View style={styles.textContainer}>
//                   <Text style={styles.text}>Changer mon mot de passe</Text>
//                   <Text style={styles.subtext}>Sécurisez votre compte</Text>
//                 </View>
//               </View>
//               <View style={styles.chevronCircle}>
//                 <Ionicons name="chevron-forward" size={18} color="#6B7280" />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Info card */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoIconContainer}>
//             <Ionicons name="information-circle" size={24} color="#3B82F6" />
//           </View>
//           <View style={styles.infoTextContainer}>
//             <Text style={styles.infoTitle}>Protégez vos données</Text>
//             <Text style={styles.infoText}>
//               Vos informations personnelles sont sécurisées et chiffrées. 
//               Changez régulièrement votre mot de passe.
//             </Text>
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
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     gap: 12,
//   },
//   sectionTitleLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#E5E7EB',
//   },
//   sectionTitle: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#374151",
//     letterSpacing: 0.5,
//     textTransform: 'uppercase',
//   },
//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 4,
//     borderWidth: 1,
//     borderColor: '#F3F4F6',
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
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#111827",
//     marginBottom: 4,
//   },
//   subtext: {
//     fontSize: 13,
//     color: "#6B7280",
//     fontWeight: "500",
//   },
//   chevronCircle: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#F3F4F6',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: "#F3F4F6",
//     marginLeft: 66,
//   },
  
//   // Info Card
//   infoCard: {
//     flexDirection: 'row',
//     marginHorizontal: 16,
//     marginTop: 20,
//     backgroundColor: '#EFF6FF',
//     borderRadius: 16,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#DBEAFE',
//     shadowColor: "#3B82F6",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   infoIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     backgroundColor: '#DBEAFE',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   infoTextContainer: {
//     flex: 1,
//   },
//   infoTitle: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#1E40AF',
//     marginBottom: 4,
//   },
//   infoText: {
//     fontSize: 13,
//     color: '#3B82F6',
//     lineHeight: 18,
//     fontWeight: '500',
//   },
// });