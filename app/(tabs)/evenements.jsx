import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    FlatList,
    ImageBackground,
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
import { eventsData } from '../../data/eventsData';

// SearchBar
const SearchBar = ({ value, onChangeText }) => (
  <View style={styles.searchContainer}>
    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder="Chercher un événement..."
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
      {['Tous', 'Hackathon', 'Atelier', 'Formation', 'Conférence'].map((filter) => (
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

// EventCard
const EventCard = ({ event, isFavorited, onFavPress, onPress }) => (
  <TouchableOpacity
    style={styles.eventCard}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <ImageBackground
      source={{ uri: event.image || 'https://via.placeholder.com/400x200' }}
      style={styles.cardImage}
      imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
    >
      <View style={styles.cardBadge}>
        <Text style={styles.cardBadgeText}>{event.type}</Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={onFavPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialCommunityIcons
          name={isFavorited ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorited ? '#FF3B30' : '#fff'}
        />
      </TouchableOpacity>
    </ImageBackground>

    <View style={styles.cardContent}>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {event.title}
      </Text>

      <View style={styles.cardMeta}>
        <Ionicons name="calendar" size={14} color="#FF6600" />
        <Text style={styles.cardMetaText}>{event.date}</Text>
      </View>

      <View style={styles.cardMeta}>
        <Ionicons name="time" size={14} color="#FF6600" />
        <Text style={styles.cardMetaText}>{event.time}</Text>
      </View>

      <View style={styles.cardMeta}>
        <Ionicons name="location" size={14} color="#FF6600" />
        <Text style={styles.cardMetaText}>{event.city}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.priceText}>{event.price}</Text>
        <Text style={styles.participantsText}>
          {event.registered}/{event.capacity} inscrits
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Main Screen
export default function EvenementsScreen() {
  const router = useRouter();
  const { events, toggleEventFavorite } = useFavorites();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filtrer
  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      (event.title && event.title.toLowerCase().includes((searchText || '').toLowerCase())) ||
      (event.city && event.city.toLowerCase().includes((searchText || '').toLowerCase()));

    const matchesFilter =
      activeFilter === 'Tous' || event.type === activeFilter;

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
  const handleToggleFavorite = (event) => {
    toggleEventFavorite(event);
    const isFavorited = events.some((e) => e.id === event.id);
    showToast(
      isFavorited ? 'Retiré des favoris' : 'Ajouté aux favoris',
      'info'
    );
  };

  // Naviguer
  const handleEventPress = (eventId) => {
    router.push(`/event-detail?id=${eventId}`);
  };

  const handleResetFilter = () => {
    setActiveFilter('Tous');
    showToast('Filtre réinitialisé', 'success');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Événements" showNotification={true} />

      <SearchBar value={searchText} onChangeText={setSearchText} />

      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={(filter) => {
          setActiveFilter(filter);
          showToast(`Filtre: ${filter}`, 'info');
        }}
        onReset={handleResetFilter}
      />

      {filteredEvents.length === 0 ? (
        <ScrollView
          style={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="calendar-search"
              size={64}
              color="#ddd"
            />
            <Text style={styles.emptyTitle}>Aucun événement trouvé</Text>
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
          data={filteredEvents}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              isFavorited={events.some((e) => e.id === item.id)}
              onFavPress={() => handleToggleFavorite(item)}
              onPress={() => handleEventPress(item.id)}
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
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#e0e0e0',
  },
  cardBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF6600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cardBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: 18,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardMetaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  participantsText: {
    fontSize: 12,
    color: '#999',
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
