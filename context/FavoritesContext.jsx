import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext({});

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites doit être utilisé dans un FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [actors, setActors] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les favoris au démarrage
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoriteEvents = await AsyncStorage.getItem("@favorites_events");
      const favoriteActors = await AsyncStorage.getItem("@favorites_actors");
      const favoriteOpportunities = await AsyncStorage.getItem("@favorites_opportunities");

      if (favoriteEvents) setEvents(JSON.parse(favoriteEvents));
      if (favoriteActors) setActors(JSON.parse(favoriteActors));
      if (favoriteOpportunities) setOpportunities(JSON.parse(favoriteOpportunities));
    } catch (error) {
      console.error("Erreur lors du chargement des favoris:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Ajouter/Retirer un événement des favoris
  const toggleEventFavorite = async (event) => {
    try {
      let updatedEvents;
      const isAlreadyFavorited = events.some(e => e.id === event.id);

      if (isAlreadyFavorited) {
        updatedEvents = events.filter(e => e.id !== event.id);
      } else {
        updatedEvents = [...events, event];
      }

      await AsyncStorage.setItem("@favorites_events", JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
      return { success: true, isFavorited: !isAlreadyFavorited };
    } catch (error) {
      console.error("Erreur lors de la modification des favoris événement:", error);
      return { success: false };
    }
  };

  // Ajouter/Retirer un acteur des favoris
  const toggleActorFavorite = async (actor) => {
    try {
      let updatedActors;
      const isAlreadyFavorited = actors.some(a => a.id === actor.id);

      if (isAlreadyFavorited) {
        updatedActors = actors.filter(a => a.id !== actor.id);
      } else {
        updatedActors = [...actors, actor];
      }

      await AsyncStorage.setItem("@favorites_actors", JSON.stringify(updatedActors));
      setActors(updatedActors);
      return { success: true, isFavorited: !isAlreadyFavorited };
    } catch (error) {
      console.error("Erreur lors de la modification des favoris acteur:", error);
      return { success: false };
    }
  };

  // Ajouter/Retirer une opportunité des favoris
  const toggleOpportunityFavorite = async (opportunity) => {
    try {
      let updatedOpportunities;
      const isAlreadyFavorited = opportunities.some(o => o.id === opportunity.id);

      if (isAlreadyFavorited) {
        updatedOpportunities = opportunities.filter(o => o.id !== opportunity.id);
      } else {
        updatedOpportunities = [...opportunities, opportunity];
      }

      await AsyncStorage.setItem("@favorites_opportunities", JSON.stringify(updatedOpportunities));
      setOpportunities(updatedOpportunities);
      return { success: true, isFavorited: !isAlreadyFavorited };
    } catch (error) {
      console.error("Erreur lors de la modification des favoris opportunité:", error);
      return { success: false };
    }
  };

  // Vérifier si un élément est en favori
  const isEventFavorited = (eventId) => events.some(e => e.id === eventId);
  const isActorFavorited = (actorId) => actors.some(a => a.id === actorId);
  const isOpportunityFavorited = (opportunityId) => opportunities.some(o => o.id === opportunityId);

  const value = {
    // Events
    events,
    toggleEventFavorite,
    isEventFavorited,

    // Actors
    actors,
    toggleActorFavorite,
    isActorFavorited,

    // Opportunities
    opportunities,
    toggleOpportunityFavorite,
    isOpportunityFavorited,

    isLoading,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
