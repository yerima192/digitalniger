import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from "react-native";

import EventCard from "../../components/EventCard";
import FilterBar from "../../components/FilterBar";
import Header from "../../components/Header";
import { ErrorState, PullToRefresh, SkeletonLoader } from "../../components/LoadingStates";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import ScrollToTopFAB from "../../components/ScrollToTopFAB";
import SearchBar from "../../components/SearchBar";
import { showToast } from "../../components/Toast";

// Données de test
const SAMPLE_EVENTS = [
  {
    id: "1",
    title: "Conférence Tech Niger",
    date: "15 Juin 2024",
    city: "Niamey",
    country: "Niger",
    type: "Conférence",
    price: "Gratuit",
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: "2",
    title: "Workshop React Native",
    date: "20 Juin 2024",
    city: "Maradi",
    country: "Niger",
    type: "Atelier",
    price: "XOF 25,000",
    image: "https://via.placeholder.com/400x200",
  },
];

const CITIES = ["Niamey", "Maradi", "Zinder", "Dosso", "Tahoua"];
const TYPES = ["Conférence", "Atelier", "Webinaire", "Rencontre", "Formation"];

/**
 * EXEMPLE COMPLET D'ÉCRAN AVEC TOUTES LES AMÉLIORATIONS UX
 * 
 * Ce fichier montre comment intégrer:
 * - SearchBar pour la recherche
 * - FilterBar pour les filtres avancés
 * - PullToRefresh pour le rechargement
 * - SkeletonLoader pendant chargement
 * - ErrorState en cas d'erreur
 * - ScrollToTopFAB pour remonter
 * - Toast pour les notifications
 */

export default function EvenementsExampleScreen() {
  const router = useRouter();
  const scrollViewRef = useRef(null);

  // États
  const [events, setEvents] = useState(SAMPLE_EVENTS);
  const [filteredEvents, setFilteredEvents] = useState(SAMPLE_EVENTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  /**
   * CHARGER LES ÉVÉNEMENTS
   */
  const handleLoadEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simuler appel API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // En prod, faire un vrai appel:
      // const data = await fetchEventsFromAPI();
      
      setEvents(SAMPLE_EVENTS);
      applyFilters(search, {});

      showToast("Événements chargés", "success");
    } catch (err) {
      setError("Impossible de charger les événements");
      showToast("Erreur de chargement", "error");
    } finally {
      setLoading(false);
    }
  };

  /**
   * RAFRAÎCHIR LES DONNÉES (Pull-to-Refresh)
   */
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setEvents(SAMPLE_EVENTS);
      applyFilters(search, filters);
      
      showToast("✅ Données mises à jour", "success");
    } catch (err) {
      showToast("❌ Erreur de rafraîchissement", "error");
    } finally {
      setRefreshing(false);
    }
  };

  /**
   * RECHERCHE (SearchBar)
   */
  const handleSearch = (text) => {
    setSearch(text);
    applyFilters(text, filters);
  };

  /**
   * FILTRES (FilterBar)
   */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(search, newFilters);
    showToast("Filtres appliqués", "info");
  };

  /**
   * RÉINITIALISER FILTRES
   */
  const handleResetFilters = () => {
    setSearch("");
    setFilters({});
    applyFilters("", {});
    showToast("Filtres réinitialisés", "info");
  };

  /**
   * APPLIQUER RECHERCHE + FILTRES
   */
  const applyFilters = (searchText, activeFilters) => {
    let result = events;

    // Filtre par texte recherché
    if (searchText) {
      result = result.filter((event) =>
        event.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filtre par ville
    if (activeFilters.city) {
      result = result.filter((event) => event.city === activeFilters.city);
    }

    // Filtre par type
    if (activeFilters.types && activeFilters.types.length > 0) {
      result = result.filter((event) =>
        activeFilters.types.includes(event.type)
      );
    }

    setFilteredEvents(result);
  };

  /**
   * AFFICHER ÉVÉNEMENT
   */
  const handleViewEvent = (event) => {
    router.push({
      pathname: "/event-detail",
      params: { eventId: event.id },
    });
    showToast("Ouverture de l'événement...", "info");
  };

  /**
   * RENDRE UNE CARTE ÉVÉNEMENT
   */
  const renderEventItem = ({ item }) => (
    <EventCard
      event={item}
      onPress={() => handleViewEvent(item)}
    />
  );

  return (
    <SafeAreaWrapper>
      {/* HEADER */}
      <Header
        title="Événements"
        subtitle="Découvrez tous les événements du Niger"
        badgeCount={filteredEvents.length}
      />

      {/* SEARCH + FILTER BAR */}
      <View style={styles.topBar}>
        <SearchBar
          placeholder="Rechercher un événement..."
          onSearch={handleSearch}
          showFilter={true}
        />
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          cities={CITIES}
          types={TYPES}
        />
      </View>

      {/* CONTENU PRINCIPAL */}
      {error ? (
        // ❌ ÉTAT ERREUR
        <ErrorState
          message={error}
          onRetry={handleLoadEvents}
          icon="alert-circle"
        />
      ) : loading ? (
        // ⏳ ÉTAT CHARGEMENT
        <SkeletonLoader count={3} type="card" />
      ) : (
        // ✅ AFFICHER LES DONNÉES
        <PullToRefresh
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ref={scrollViewRef}
        >
          {filteredEvents.length === 0 ? (
            // 🔍 AUCUN RÉSULTAT
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Aucun événement trouvé</Text>
              <Text style={styles.emptySubtitle}>
                Essayez une autre recherche ou réinitialisez les filtres
              </Text>
            </View>
          ) : (
            // 📝 LISTE D'ÉVÉNEMENTS
            <FlatList
              data={filteredEvents}
              renderItem={renderEventItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              scrollEnabled={false}
              onScroll={(event) => {
                // Optionnel: pour contrôler le scroll-to-top
              }}
            />
          )}
        </PullToRefresh>
      )}

      {/* ⬆️ BOUTON RETOUR EN HAUT */}
      <ScrollToTopFAB 
        scrollViewRef={scrollViewRef} 
        showAfterOffset={300} 
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  listContainer: {
    padding: 16,
    gap: 12,
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 64,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
    textAlign: "center",
  },

  emptySubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 20,
  },
});
