/**
 * INTEGRATION_COMPLETE.jsx
 * Configuration complète d'intégration UX pour TOUTE l'application
 * Fichier de RÉFÉRENCE - Copiez les patterns pour vos écrans
 * 
 * ✅ À intégrer dans:
 *   - app/(tabs)/evenements.jsx
 *   - app/(tabs)/acteurs.jsx
 *   - app/(tabs)/opportunites.jsx
 *   - app/(tabs)/favoris.jsx
 */

// ============================================
// IMPORTS REQUIS POUR CHAQUE ÉCRAN
// ============================================

// import { useState, useRef } from "react";
// import {
//   View,
//   StyleSheet,
//   FlatList,
//   RefreshControl,
//   Dimensions,
//   ScrollView,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { useAuth } from "../../context/AuthContext";
// import Header from "../../components/Header";
// import SafeAreaWrapper from "../../components/SafeAreaWrapper";
// import { SearchBar } from "../../components/SearchBar";
// import { FilterBar } from "../../components/FilterBar";
// import { showToast } from "../../components/Toast";
// import { SkeletonLoader, ErrorState } from "../../components/LoadingStates";
// import { ScrollToTopFAB } from "../../components/ScrollToTopFAB";
// import { ProfileCompletionGuard } from "../../components/ProfileCompletionGuard";
// import { eventsData } from "../../data/eventsData";
// import EventCard from "../../components/EventCard";

// ============================================
// EXEMPLE COMPLET - EVENEMENTS.JSX
// ============================================

export const EVENEMENTS_INTEGRATION = `
import { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import { SearchBar } from "../../components/SearchBar";
import { FilterBar } from "../../components/FilterBar";
import { showToast } from "../../components/Toast";
import { SkeletonLoader, ErrorState } from "../../components/LoadingStates";
import { ScrollToTopFAB } from "../../components/ScrollToTopFAB";
import { ProfileCompletionGuard } from "../../components/ProfileCompletionGuard";
import { eventsData } from "../../data/eventsData";
import EventCard from "../../components/EventCard";

export default function EvenementsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const scrollViewRef = useRef(null);

  // États
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    cities: [],
    types: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Données filtrées
  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchText.toLowerCase()) ||
      event.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesCity =
      filters.cities.length === 0 || filters.cities.includes(event.city);

    const matchesType =
      filters.types.length === 0 || filters.types.includes(event.type);

    return matchesSearch && matchesCity && matchesType;
  });

  // Chercher
  const handleSearch = (text) => {
    setSearchText(text);
    if (text.length > 0) {
      showToast(\`Recherche: \${text}\`, "info");
    }
  };

  // Filtrer
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    showToast("Filtres appliqués", "success");
  };

  // Rafraîchir
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast("Événements mis à jour", "success");
    } catch (err) {
      showToast("Erreur de mise à jour", "error");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Ajouter aux favoris
  const handleToggleFavorite = (event) => {
    showToast(
      \`Ajouté aux favoris: \${event.title}\`,
      "success"
    );
  };

  // Afficher détail
  const handleEventPress = (event) => {
    showToast("Chargement détail événement...", "info");
    router.push({
      pathname: "/event-detail",
      params: { id: event.id },
    });
  };

  // Rendu d'un événement
  const renderEvent = ({ item }) => (
    <EventCard
      event={item}
      onPress={() => handleEventPress(item)}
      onFavoritePress={() => handleToggleFavorite(item)}
    />
  );

  // Rendu de la liste
  const renderList = () => {
    if (isLoading) {
      return <SkeletonLoader count={3} type="card" />;
    }

    if (error) {
      return (
        <ErrorState
          message={error}
          onRetry={() => {
            setError(null);
            setIsLoading(true);
          }}
        />
      );
    }

    if (filteredEvents.length === 0) {
      return (
        <ErrorState
          icon="search-off"
          message="Aucun événement trouvé"
          description="Essayez une autre recherche ou filtres"
        />
      );
    }

    return (
      <FlatList
        ref={scrollViewRef}
        data={filteredEvents}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    );
  };

  return (
    <SafeAreaWrapper>
      <ScrollView
        style={styles.container}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
      >
        {/* Bannière complétion profil */}
        <ProfileCompletionGuard />

        {/* Header */}
        <Header
          title="Événements"
          subtitle="Découvrez les événements du Niger"
          badgeCount={filteredEvents.length}
        />

        {/* Recherche */}
        <SearchBar
          placeholder="Chercher un événement..."
          onSearch={handleSearch}
          onFilterPress={() => {
            showToast("Ouverture des filtres...", "info");
          }}
        />

        {/* Filtres */}
        <FilterBar
          filters={filters}
          onFilterChange={handleApplyFilters}
          cities={["Niamey", "Maradi", "Zinder", "Dosso"]}
          categories={["Conférence", "Atelier", "Hackathon", "Meetup"]}
        />

        {/* Liste */}
        {renderList()}
      </ScrollView>

      {/* Bouton remontée */}
      <ScrollToTopFAB scrollViewRef={scrollViewRef} />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingVertical: 12 },
});
`;

// ============================================
// PATTERN PATTERNS PAR ÉCRAN
// ============================================

export const PATTERNS = {
  evenements: {
    imports: [
      "SearchBar",
      "FilterBar",
      "showToast",
      "SkeletonLoader",
      "ErrorState",
      "ScrollToTopFAB",
      "ProfileCompletionGuard",
    ],
    data: "eventsData",
    card: "EventCard",
    filters: {
      cities: ["Niamey", "Maradi", "Zinder", "Dosso"],
      categories: ["Conférence", "Atelier", "Hackathon", "Meetup"],
    },
    searchFields: ["title", "description"],
  },

  acteurs: {
    imports: [
      "SearchBar",
      "showToast",
      "SkeletonLoader",
      "ErrorState",
      "ScrollToTopFAB",
      "ProfileCompletionGuard",
    ],
    data: "acteursData",
    card: "ActorCard",
    searchFields: ["name", "domain"],
    filters: {
      cities: ["Niamey", "Maradi", "Zinder"],
    },
  },

  opportunites: {
    imports: [
      "SearchBar",
      "FilterBar",
      "showToast",
      "SkeletonLoader",
      "ErrorState",
      "ScrollToTopFAB",
      "ProfileCompletionGuard",
    ],
    data: "opportunitesData",
    card: "OpportunityCard",
    searchFields: ["title", "description"],
    filters: {
      categories: ["Stage", "Emploi", "Freelance", "Subvention"],
      types: ["Technologie", "Entrepreneuriat", "Design", "Marketing"],
    },
  },

  favoris: {
    imports: [
      "showToast",
      "SkeletonLoader",
      "ErrorState",
      "ScrollToTopFAB",
      "ProfileCompletionGuard",
    ],
    useFavoritesContext: true,
    multipleResourceTypes: true,
  },
};

// ============================================
// SNIPPETS DE TOASTS À UTILISER
// ============================================

export const TOAST_SNIPPETS = {
  success: {
    addFavorite: (title) => showToast(`✅ ${title} ajouté aux favoris`, "success"),
    removeFavorite: (title) => showToast(`❌ ${title} retiré des favoris`, "info"),
    updated: () => showToast("✅ Données mises à jour", "success"),
    submitted: () => showToast("✅ Formulaire soumis", "success"),
  },

  info: {
    loading: (name) => showToast(`⏳ Chargement ${name}...`, "info"),
    searching: (query) => showToast(`🔍 Recherche: ${query}`, "info"),
    filtersApplied: () => showToast("🎯 Filtres appliqués", "success"),
    noFilters: () => showToast("Filtres réinitialisés", "info"),
  },

  error: {
    loadFailed: () => showToast("❌ Erreur de chargement", "error"),
    noResults: () => showToast("Aucun résultat trouvé", "warning"),
    networkError: () => showToast("❌ Erreur réseau", "error"),
    deleteFailed: () => showToast("❌ Impossible de supprimer", "error"),
  },
};

// ============================================
// CHECKLIST D'INTÉGRATION PAR ÉCRAN
// ============================================

export const INTEGRATION_CHECKLIST = {
  evenements: [
    "✅ Imports (SearchBar, FilterBar, Toast, etc.)",
    "✅ State: searchText, filters, isLoading, isRefreshing, error",
    "✅ Fonction handleSearch()",
    "✅ Fonction handleApplyFilters()",
    "✅ Fonction handleRefresh()",
    "✅ Fonction handleToggleFavorite()",
    "✅ Fonction handleEventPress()",
    "✅ Filtrage des données (searchText + filters)",
    "✅ Rendu SkeletonLoader si loading",
    "✅ Rendu ErrorState si erreur",
    "✅ Rendu liste si succès",
    "✅ ScrollView avec ref",
    "✅ ScrollToTopFAB intégré",
    "✅ ProfileCompletionGuard en haut",
    "✅ Tous les handlePress avec Toast",
  ],

  acteurs: [
    "✅ Imports (SearchBar, Toast, etc.)",
    "✅ State: searchText, isLoading, isRefreshing, error",
    "✅ Fonction handleSearch()",
    "✅ Fonction handleRefresh()",
    "✅ Fonction handleToggleFavorite()",
    "✅ Fonction handleActorPress()",
    "✅ Filtrage des données",
    "✅ Rendu SkeletonLoader, ErrorState, liste",
    "✅ ScrollToTopFAB intégré",
    "✅ ProfileCompletionGuard en haut",
  ],

  opportunites: [
    "✅ Imports (SearchBar, FilterBar, Toast, etc.)",
    "✅ State: searchText, filters, isLoading, isRefreshing, error",
    "✅ Fonction handleSearch()",
    "✅ Fonction handleApplyFilters()",
    "✅ Fonction handleRefresh()",
    "✅ Fonction handleToggleFavorite()",
    "✅ Fonction handleOpportunityPress()",
    "✅ Filtrage des données",
    "✅ Rendu SkeletonLoader, ErrorState, liste",
    "✅ ScrollToTopFAB intégré",
    "✅ ProfileCompletionGuard en haut",
  ],

  favoris: [
    "✅ Imports (Toast, LoadingStates, etc.)",
    "✅ useFavorites() hook",
    "✅ Afficher favoris par type (onglets)",
    "✅ Fonction handleRemoveFavorite()",
    "✅ Fonction handleRefresh()",
    "✅ Grille 2 colonnes pour événements/opportunités",
    "✅ Liste pour acteurs",
    "✅ ScrollToTopFAB intégré",
    "✅ ProfileCompletionGuard en haut",
  ],
};

// ============================================
// CONFIGURATION PAR DÉFAUT
// ============================================

export const DEFAULT_CONFIG = {
  LOADING_DELAY: 800, // ms avant d'afficher skeleton
  REFRESH_DELAY: 1000, // ms pour simuler refresh
  SEARCH_DEBOUNCE: 300, // ms avant de filtrer
  TOAST_DURATION: 2000, // ms
  ITEMS_PER_PAGE: 10, // pour pagination
  SKELETON_COUNT: 3, // nombre de skeletons à afficher
};

// ============================================
// ÉTAPES D'INTÉGRATION
// ============================================

export const INTEGRATION_STEPS = [
  {
    step: 1,
    title: "Ajouter les imports",
    code: `import { SearchBar } from "../../components/SearchBar";
import { FilterBar } from "../../components/FilterBar";
import { showToast } from "../../components/Toast";
import { SkeletonLoader, ErrorState } from "../../components/LoadingStates";
import { ScrollToTopFAB } from "../../components/ScrollToTopFAB";
import { ProfileCompletionGuard } from "../../components/ProfileCompletionGuard";`,
  },

  {
    step: 2,
    title: "Ajouter les états",
    code: `const [searchText, setSearchText] = useState("");
const [filters, setFilters] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [isRefreshing, setIsRefreshing] = useState(false);
const [error, setError] = useState(null);
const scrollViewRef = useRef(null);`,
  },

  {
    step: 3,
    title: "Ajouter ProfileCompletionGuard en haut du rendu",
    code: `<ProfileCompletionGuard />`,
  },

  {
    step: 4,
    title: "Ajouter SearchBar",
    code: `<SearchBar
  placeholder="Rechercher..."
  onSearch={(text) => {
    setSearchText(text);
    showToast("Recherche: " + text, "info");
  }}
/>`,
  },

  {
    step: 5,
    title: "Ajouter FilterBar (si applicable)",
    code: `<FilterBar
  filters={filters}
  onFilterChange={(newFilters) => {
    setFilters(newFilters);
    showToast("Filtres appliqués", "success");
  }}
  cities={["Niamey", "Maradi"]}
/>`,
  },

  {
    step: 6,
    title: "Gérer les états de chargement",
    code: `{isLoading && <SkeletonLoader count={3} type="card" />}
{error && <ErrorState message={error} onRetry={() => { }} />}
{!isLoading && !error && <FlatList ... />}`,
  },

  {
    step: 7,
    title: "Ajouter ScrollToTopFAB",
    code: `<ScrollToTopFAB scrollViewRef={scrollViewRef} />`,
  },

  {
    step: 8,
    title: "Ajouter toasts sur tous les actions",
    code: `onPress={() => {
  showToast("Action effectuée", "success");
  // Ton code...
}}`,
  },
];

// ============================================
// EXPORT
// ============================================

export default {
  EVENEMENTS_INTEGRATION,
  PATTERNS,
  TOAST_SNIPPETS,
  INTEGRATION_CHECKLIST,
  DEFAULT_CONFIG,
  INTEGRATION_STEPS,
};
