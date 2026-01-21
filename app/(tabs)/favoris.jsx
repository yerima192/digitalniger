import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../../components/Header';
import { showToast } from '../../components/Toast';
import { useFavorites } from '../../context/FavoritesContext';

// Tab Button
const TabButton = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.tabButton, isActive && styles.tabButtonActive]}
    onPress={onPress}
  >
    <Text
      style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// Event Card (Grid)
const EventCardGrid = ({ event, onDelete, onPress }) => (
  <TouchableOpacity
    style={styles.gridCard}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <ImageBackground
      source={{ uri: event.image || 'https://via.placeholder.com/200x150' }}
      style={styles.gridImage}
      imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
    >
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialCommunityIcons name="close-circle" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </ImageBackground>

    <View style={styles.gridContent}>
      <Text style={styles.gridTitle} numberOfLines={2}>
        {event.title}
      </Text>
      <Text style={styles.gridDate}>{event.date}</Text>
    </View>
  </TouchableOpacity>
);

// Actor Card (List)
const ActorCardList = ({ actor, onDelete, onPress }) => (
  <TouchableOpacity
    style={styles.listCard}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.listCardTop}>
      <View style={styles.listLogo}>
        <Text style={styles.listLogoText}>
          {actor.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.listInfo}>
        <Text style={styles.listTitle}>{actor.name}</Text>
        <Text style={styles.listCategory}>{actor.category}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteIconButton}
        onPress={onDelete}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialCommunityIcons name="trash-can" size={18} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

// Opportunity Card (Grid)
const OpportunityCardGrid = ({ opp, onDelete, onPress }) => {
  const getTypeColor = (type) => {
    const colors = {
      'Incubation': '#FF6600',
      'Bourse': '#10B981',
      'Formation': '#0066FF',
      'Stage': '#A855F7',
      'Appel à projets': '#F59E0B',
    };
    return colors[type] || '#999';
  };

  return (
    <TouchableOpacity
      style={styles.oppGridCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.oppBadge,
          { backgroundColor: getTypeColor(opp.type) },
        ]}
      >
        <Text style={styles.oppBadgeText}>{opp.type}</Text>
      </View>

      <TouchableOpacity
        style={styles.oppDeleteButton}
        onPress={onDelete}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialCommunityIcons name="close-circle" size={20} color="#FF3B30" />
      </TouchableOpacity>

      <Text style={styles.oppTitle} numberOfLines={3}>
        {opp.titre}
      </Text>

      <Text style={styles.oppOrg}>{opp.organisation}</Text>
    </TouchableOpacity>
  );
};

// Empty State
const EmptyState = ({ icon, title, subtitle }) => (
  <View style={styles.emptyState}>
    <MaterialCommunityIcons name={icon} size={64} color="#ddd" />
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptySubtitle}>{subtitle}</Text>
  </View>
);

// Main Screen
export default function FavorisScreen() {
  const router = useRouter();
  const { events: eventFavorites, actors: actorFavorites, opportunities: opportunityFavorites,
    toggleEventFavorite, toggleActorFavorite, toggleOpportunityFavorite } = useFavorites();

  const [activeTab, setActiveTab] = useState('events');

  const handleDeleteEvent = (event) => {
    Alert.alert(
      'Confirmer la suppression',
      `Retirer "${event.title}" de vos favoris?`,
      [
        { text: 'Annuler', onPress: () => {}, style: 'cancel' },
        {
          text: 'Retirer',
          onPress: () => {
            toggleEventFavorite(event);
            showToast('Retiré des favoris', 'success');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleDeleteActor = (actor) => {
    Alert.alert(
      'Confirmer la suppression',
      `Retirer "${actor.name}" de vos favoris?`,
      [
        { text: 'Annuler', onPress: () => {}, style: 'cancel' },
        {
          text: 'Retirer',
          onPress: () => {
            toggleActorFavorite(actor);
            showToast('Retiré des favoris', 'success');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleDeleteOpportunity = (opp) => {
    Alert.alert(
      'Confirmer la suppression',
      `Retirer "${opp.titre}" de vos favoris?`,
      [
        { text: 'Annuler', onPress: () => {}, style: 'cancel' },
        {
          text: 'Retirer',
          onPress: () => {
            toggleOpportunityFavorite(opp);
            showToast('Retiré des favoris', 'success');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Mes Favoris" />

      <View style={styles.tabsContainer}>
        <TabButton
          label={`Événements (${eventFavorites.length})`}
          isActive={activeTab === 'events'}
          onPress={() => {
            setActiveTab('events');
            showToast('Favoris - Événements', 'info');
          }}
        />
        <TabButton
          label={`Acteurs (${actorFavorites.length})`}
          isActive={activeTab === 'actors'}
          onPress={() => {
            setActiveTab('actors');
            showToast('Favoris - Acteurs', 'info');
          }}
        />
        <TabButton
          label={`Opportunités (${opportunityFavorites.length})`}
          isActive={activeTab === 'opportunities'}
          onPress={() => {
            setActiveTab('opportunities');
            showToast('Favoris - Opportunités', 'info');
          }}
        />
      </View>

      {activeTab === 'events' && (
        <>
          {eventFavorites.length === 0 ? (
            <EmptyState
              icon="heart-outline"
              title="Aucun événement en favoris"
              subtitle="Ajoutez des événements pour les retrouver ici"
            />
          ) : (
            <FlatList
              data={eventFavorites}
              renderItem={({ item }) => (
                <EventCardGrid
                  event={item}
                  onDelete={() => handleDeleteEvent(item)}
                  onPress={() => router.push(`/event-detail?id=${item.id}`)}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={styles.gridContent}
              columnWrapperStyle={styles.columnWrapper}
            />
          )}
        </>
      )}

      {activeTab === 'actors' && (
        <>
          {actorFavorites.length === 0 ? (
            <EmptyState
              icon="account-heart-outline"
              title="Aucun acteur en favoris"
              subtitle="Ajoutez des acteurs pour les retrouver ici"
            />
          ) : (
            <FlatList
              data={actorFavorites}
              renderItem={({ item }) => (
                <ActorCardList
                  actor={item}
                  onDelete={() => handleDeleteActor(item)}
                  onPress={() => router.push(`/acteur-detail?id=${item.id}`)}
                />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
            />
          )}
        </>
      )}

      {activeTab === 'opportunities' && (
        <>
          {opportunityFavorites.length === 0 ? (
            <EmptyState
              icon="briefcase-heart-outline"
              title="Aucune opportunité en favoris"
              subtitle="Ajoutez des opportunités pour les retrouver ici"
            />
          ) : (
            <FlatList
              data={opportunityFavorites}
              renderItem={({ item }) => (
                <OpportunityCardGrid
                  opp={item}
                  onDelete={() => handleDeleteOpportunity(item)}
                  onPress={() => router.push(`/opportunite-detail?id=${item.id}`)}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={styles.gridContent}
              columnWrapperStyle={styles.columnWrapper}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#0066FF',
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  tabButtonTextActive: {
    color: '#fff',
  },
  gridContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  gridCard: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  gridImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#e0e0e0',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  gridCardContent: {
    padding: 8,
  },
  gridTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: 14,
  },
  gridDate: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  listCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6600',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listLogoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  listInfo: {
    flex: 1,
  },
  listTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  listCategory: {
    fontSize: 11,
    color: '#FF6600',
    marginTop: 2,
  },
  deleteIconButton: {
    padding: 6,
  },
  oppGridCard: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  oppBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  oppBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  oppDeleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  oppTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: 14,
    marginBottom: 4,
  },
  oppOrg: {
    fontSize: 11,
    color: '#FF6600',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 6,
    textAlign: 'center',
  },
});
