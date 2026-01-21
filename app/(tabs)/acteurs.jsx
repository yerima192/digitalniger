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
import Header from '../../components/Header';
import { showToast } from '../../components/Toast';
import { useFavorites } from '../../context/FavoritesContext';
import { acteursData } from '../../data/acteursData';

// SearchBar
const SearchBar = ({ value, onChangeText }) => (
  <View style={styles.searchContainer}>
    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder="Chercher un acteur..."
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

// CityFilter
const CityFilter = ({ activeCity, onCityChange, onReset }) => (
  <View style={styles.filterContainer}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {['Tous', 'Niamey', 'Maradi', 'Agadez', 'Tahoua', 'Dosso'].map((city) => (
        <TouchableOpacity
          key={city}
          style={[
            styles.filterButton,
            activeCity === city && styles.filterButtonActive,
          ]}
          onPress={() => onCityChange(city)}
        >
          <Text
            style={[
              styles.filterText,
              activeCity === city && styles.filterTextActive,
            ]}
          >
            {city}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    {activeCity !== 'Tous' && (
      <TouchableOpacity onPress={onReset} style={styles.resetButton}>
        <Ionicons name="close" size={18} color="#999" />
      </TouchableOpacity>
    )}
  </View>
);

// ActorCard
const ActorCard = ({ actor, isFavorited, onFavPress, onPress }) => (
  <TouchableOpacity
    style={styles.actorCard}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.cardTop}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoPlaceholder}>
          {actor.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {actor.name}
        </Text>
        <Text style={styles.categoryText}>{actor.category}</Text>
      </View>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={onFavPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialCommunityIcons
          name={isFavorited ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavorited ? '#FF3B30' : '#FF6600'}
        />
      </TouchableOpacity>
    </View>

    <Text style={styles.description} numberOfLines={2}>
      {actor.description}
    </Text>

    <View style={styles.cardMeta}>
      <View style={styles.metaItem}>
        <Ionicons name="location" size={13} color="#FF6600" />
        <Text style={styles.metaText}>{actor.city}</Text>
      </View>

      <View style={styles.metaItem}>
        <MaterialCommunityIcons name="briefcase" size={13} color="#FF6600" />
        <Text style={styles.metaText}>{actor.domain}</Text>
      </View>
    </View>

    <View style={styles.cardFooter}>
      <TouchableOpacity style={styles.contactButton}>
        <Ionicons name="call" size={14} color="#fff" />
        <Text style={styles.contactButtonText}>{actor.phone}</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

// Main Screen
export default function ActeursScreen() {
  const router = useRouter();
  const { actors, toggleActorFavorite } = useFavorites();
  const [searchText, setSearchText] = useState('');
  const [activeCity, setActiveCity] = useState('Tous');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filtrer
  const filteredActors = acteursData.filter((actor) => {
    const matchesSearch =
      (actor.name && actor.name.toLowerCase().includes((searchText || '').toLowerCase())) ||
      (actor.domain && actor.domain.toLowerCase().includes((searchText || '').toLowerCase()));

    const matchesCity =
      activeCity === 'Tous' || actor.city === activeCity;

    return matchesSearch && matchesCity;
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
  const handleToggleFavorite = (actor) => {
    toggleActorFavorite(actor);
    const isFavorited = actors.some((a) => a.id === actor.id);
    showToast(
      isFavorited ? 'Retiré des favoris' : 'Ajouté aux favoris',
      'info'
    );
  };

  // Naviguer
  const handleActorPress = (actorId) => {
    router.push(`/acteur-detail?id=${actorId}`);
  };

  const handleResetFilter = () => {
    setActiveCity('Tous');
    showToast('Filtre réinitialisé', 'success');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Acteurs du Numérique" showNotification={true} />

      <SearchBar value={searchText} onChangeText={setSearchText} />

      <CityFilter
        activeCity={activeCity}
        onCityChange={(city) => {
          setActiveCity(city);
          showToast(`Filtre: ${city}`, 'info');
        }}
        onReset={handleResetFilter}
      />

      {filteredActors.length === 0 ? (
        <ScrollView
          style={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="account-search"
              size={64}
              color="#ddd"
            />
            <Text style={styles.emptyTitle}>Aucun acteur trouvé</Text>
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
          data={filteredActors}
          renderItem={({ item }) => (
            <ActorCard
              actor={item}
              isFavorited={actors.some((a) => a.id === item.id)}
              onFavPress={() => handleToggleFavorite(item)}
              onPress={() => handleActorPress(item.id)}
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
  actorCard: {
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
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6600',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoPlaceholder: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 18,
  },
  categoryText: {
    fontSize: 12,
    color: '#FF6600',
    fontWeight: '600',
    marginTop: 2,
  },
  favoriteButton: {
    padding: 6,
  },
  description: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  cardFooter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066FF',
    paddingVertical: 8,
    borderRadius: 6,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
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
    backgroundColor: '#0066FF',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
