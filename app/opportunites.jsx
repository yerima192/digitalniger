import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import { showToast } from '../components/Toast';
import { useFavorites } from '../context/FavoritesContext';
import { opportunitesData } from '../data/opportunitesData';

// SearchBar
const SearchBar = ({ value, onChangeText }) => (
  <View style={styles.searchContainer}>
    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder="Chercher une opportunité..."
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#999"
    />
    {value ? (
      <TouchableOpacity onPress={() => onChangeText('')}>
        <Ionicons name="close-circle" size={20} color="#999" />
      </TouchableOpacity>
    ) : null}
  </View>
);

// FilterBar
const FilterBar = ({ activeFilter, onFilterChange, onReset }) => (
  <View style={styles.filterContainer}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {['Tous', 'Incubation', 'Bourse', 'Formation', 'Stage', 'Appel à projets'].map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterButton,
            activeFilter === filter && styles.filterButtonActive,
          ]}
          onPress={() => onFilterChange(filter)}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === filter && styles.filterTextActive,
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    {activeFilter !== 'Tous' && (
      <TouchableOpacity onPress={onReset} style={styles.resetButton}>
        <Ionicons name="close" size={18} color="#999" />
      </TouchableOpacity>
    )}
  </View>
);

// OpportunityCard
const OpportunityCard = ({ opp, isFavorited, onFavPress, onPress }) => {
  const getTypeColor = (type) => {
    const colors = {
      'Incubation': '#FF6600',
      'Bourse': '#10B981',
      'Formation': '#FF8C42',
      'Stage': '#A855F7',
      'Appel à projets': '#F59E0B',
    };
    return colors[type] || '#999';
  };

  return (
    <TouchableOpacity
      style={styles.oppCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.typeBadge,
            { backgroundColor: getTypeColor(opp.type) },
          ]}
        >
          <Text style={styles.typeBadgeText}>{opp.type}</Text>
        </View>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorited ? '#FF3B30' : getTypeColor(opp.type)}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.cardTitle} numberOfLines={2}>
        {opp.titre}
      </Text>

      <Text style={styles.organization}>{opp.organisation}</Text>

      <View style={styles.cardMeta}>
        <Ionicons name="calendar" size={13} color="#666" />
        <Text style={styles.metaText}>Deadline: {opp.deadline}</Text>
      </View>

      {opp.montant && (
        <View style={styles.cardMeta}>
          <MaterialCommunityIcons name="cash" size={13} color="#10B981" />
          <Text style={styles.metaTextValue}>{opp.montant}</Text>
        </View>
      )}

      <View style={styles.tagsContainer}>
        {opp.tags?.slice(0, 2).map((tag, idx) => (
          <View key={idx} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

// Main Screen
export default function OpportunitesScreen() {
  const router = useRouter();
  const { opportunities, toggleOpportunityFavorite } = useFavorites();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filtrer
  const filteredOpps = opportunitesData.filter((opp) => {
    const matchesSearch =
      (opp.titre && opp.titre.toLowerCase().includes((searchText || '').toLowerCase())) ||
      (opp.organisation && opp.organisation.toLowerCase().includes((searchText || '').toLowerCase()));

    const matchesFilter =
      activeFilter === 'Tous' || opp.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // Refresh
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Données actualisées!', 'success');
    }, 1500);
  }, []);

  // Toggle favoris
  const handleToggleFavorite = (opp) => {
    toggleOpportunityFavorite(opp);
    const isFavorited = opportunities.some((o) => o.id === opp.id);
    showToast(
      isFavorited ? 'Retiré des favoris' : 'Ajouté aux favoris',
      'info'
    );
  };

  // Naviguer
  const handleOppPress = (oppId) => {
    router.push(`/opportunite-detail?id=${oppId}`);
  };

  const handleResetFilter = () => {
    setActiveFilter('Tous');
    showToast('Filtre réinitialisé', 'success');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Opportunités" showNotification={true} />

      <SearchBar value={searchText} onChangeText={setSearchText} />

      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={(filter) => {
          setActiveFilter(filter);
          showToast(`Filtre: ${filter}`, 'info');
        }}
        onReset={handleResetFilter}
      />

      {filteredOpps.length === 0 ? (
        <ScrollView
          style={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="briefcase-search"
              size={64}
              color="#ddd"
            />
            <Text style={styles.emptyTitle}>Aucune opportunité trouvée</Text>
            <Text style={styles.emptySubtitle}>
              Essayez d&apos;autres critères de recherche
            </Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleResetFilter}
            >
              <Text style={styles.retryButtonText}>Réinitialiser les filtres</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={filteredOpps}
          renderItem={({ item }) => (
            <OpportunityCard
              opp={item}
              isFavorited={opportunities.some((o) => o.id === item.id)}
              onFavPress={() => handleToggleFavorite(item)}
              onPress={() => handleOppPress(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#FF8C42',
    borderColor: '#FF8C42',
  },
  filterText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  resetButton: {
    padding: 6,
    marginLeft: 8,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  oppCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 18,
    marginBottom: 4,
  },
  organization: {
    fontSize: 12,
    color: '#FF6600',
    fontWeight: '600',
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  metaTextValue: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    marginLeft: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 11,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FF8C42',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
