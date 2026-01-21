/**
 * CONFIGURATION UX - Digital Niger Map
 * 
 * Ce fichier centralise la configuration des composants UX
 * pour assurer la cohérence dans toute l'application
 */

export const UX_CONFIG = {
  // TOAST CONFIGURATION
  TOAST: {
    DURATION_SHORT: 2000,      // Messages courts (succès, info)
    DURATION_MEDIUM: 3000,     // Messages moyens
    DURATION_LONG: 4000,       // Messages longs (erreurs)
    POSITION: "bottom",        // Position: 'top' | 'bottom' | 'center'
  },

  // SEARCH CONFIGURATION
  SEARCH: {
    DEBOUNCE_DELAY: 300,       // Délai avant filtrer (ms)
    MIN_CHARS: 1,              // Min caractères pour rechercher
    PLACEHOLDER: "Rechercher...",
    SHOW_FILTER_BUTTON: true,
  },

  // FILTER CONFIGURATION
  FILTER: {
    SHOW_PRICE: true,
    PRICE_MIN: 0,
    PRICE_MAX: 1000000,
    DEFAULT_SORT: "recent",    // 'recent' | 'popular' | 'price'
  },

  // LOADING CONFIGURATION
  LOADING: {
    SKELETON_COUNT: 3,         // Nombre de skeletons
    MIN_LOAD_TIME: 500,        // Durée minimum (pour UX)
    SHOW_PROGRESS: false,      // Afficher % progression
  },

  // SCROLL CONFIGURATION
  SCROLL: {
    SHOW_AFTER_OFFSET: 300,    // Pixels avant d'afficher FAB
    ANIMATION_DURATION: 300,   // Durée animation (ms)
    SMOOTH_SCROLL: true,
  },

  // PAGINATION CONFIGURATION
  PAGINATION: {
    PAGE_SIZE: 10,             // Items par page
    LOAD_MORE_OFFSET: 500,     // Pixels avant fin
    AUTO_LOAD: true,           // Charger automatique
  },

  // REFRESH CONFIGURATION
  REFRESH: {
    MIN_REFRESH_TIME: 1000,    // Durée minimum refresh (ms)
    SHOW_PROGRESS: true,       // Afficher indicateur
    HAPTIC_FEEDBACK: true,     // Vibration
  },

  // HAPTIC FEEDBACK
  HAPTIC: {
    LIGHT: {
      duration: 100,
      intensity: 0.5,
    },
    MEDIUM: {
      duration: 150,
      intensity: 0.75,
    },
    HEAVY: {
      duration: 200,
      intensity: 1,
    },
  },

  // COULEURS STANDARDS
  COLORS: {
    // Brand colors
    PRIMARY: "#FF6600",        // Orange principal
    PRIMARY_DARK: "#E55A00",   // Orange foncé
    PRIMARY_LIGHT: "#FFB84D",  // Orange clair

    // Semantic colors
    SUCCESS: "#059669",        // Vert succès
    ERROR: "#EF4444",          // Rouge erreur
    WARNING: "#F59E0B",        // Orange avertissement
    INFO: "#3B82F6",           // Bleu info

    // Neutrals
    BG_PRIMARY: "#F9FAFB",     // Fond gris très clair
    BG_SECONDARY: "#F3F4F6",   // Fond gris clair
    BG_TERTIARY: "#E5E7EB",    // Fond gris
    
    TEXT_PRIMARY: "#111827",   // Texte noir
    TEXT_SECONDARY: "#374151", // Texte gris foncé
    TEXT_MUTED: "#6B7280",     // Texte gris
    TEXT_LIGHT: "#9CA3AF",     // Texte gris clair

    BORDER: "#E5E7EB",         // Bordure
    BORDER_LIGHT: "#F3F4F6",   // Bordure légère
  },

  // FONTS
  FONTS: {
    SIZE_TINY: 11,
    SIZE_SMALL: 12,
    SIZE_REGULAR: 14,
    SIZE_MEDIUM: 16,
    SIZE_LARGE: 18,
    SIZE_XL: 20,
    SIZE_2XL: 24,
    SIZE_3XL: 28,

    WEIGHT_REGULAR: "400",
    WEIGHT_MEDIUM: "500",
    WEIGHT_SEMIBOLD: "600",
    WEIGHT_BOLD: "700",
    WEIGHT_EXTRABOLD: "800",
  },

  // SPACING
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 12,
    LG: 16,
    XL: 20,
    XXL: 24,
    XXXL: 32,
  },

  // BORDER RADIUS
  RADIUS: {
    NONE: 0,
    SM: 4,
    MD: 8,
    LG: 12,
    XL: 16,
    FULL: 999,
  },

  // SHADOW
  SHADOW: {
    LIGHT: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    MEDIUM: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    HEAVY: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
  },

  // ANIMATIONS
  ANIMATIONS: {
    DURATION_QUICK: 150,
    DURATION_BASE: 300,
    DURATION_SLOW: 500,
    FRICTION: 7,
    TENSION: 40,
  },
};

/**
 * PRESET TOAST MESSAGES
 * Utilisation: showToast(TOAST_MESSAGES.ADD_FAVORITE, 'success')
 */
export const TOAST_MESSAGES = {
  // Succès
  ADD_FAVORITE: "Ajouté aux favoris! ❤️",
  REMOVE_FAVORITE: "Retiré des favoris",
  PROFILE_UPDATED: "Profil mis à jour ✅",
  LOGIN_SUCCESS: "Bienvenue! 👋",
  LOGOUT_SUCCESS: "À bientôt! 👋",
  DATA_SAVED: "Données sauvegardées",
  SHARED_SUCCESS: "Partagé avec succès",

  // Erreurs
  ERROR_NETWORK: "Connexion internet requise",
  ERROR_GENERIC: "Une erreur s'est produite",
  ERROR_AUTH: "Erreur d'authentification",
  ERROR_LOAD: "Impossible de charger les données",
  ERROR_SAVE: "Impossible de sauvegarder",
  ERROR_DELETE: "Impossible de supprimer",

  // Info
  DATA_REFRESHED: "Données mises à jour",
  FILTERS_APPLIED: "Filtres appliqués",
  FILTERS_RESET: "Filtres réinitialisés",
  SEARCH_NO_RESULTS: "Aucun résultat",
  LOADING: "Chargement...",

  // Warning
  CONFIRM_DELETE: "Êtes-vous sûr?",
  UNSAVED_CHANGES: "Vous avez des modifications",
  DEADLINE_NEAR: "Deadline approche!",
};

/**
 * DONNÉES FILTRABLES
 */
export const FILTER_OPTIONS = {
  // Villes du Niger
  CITIES: [
    "Niamey",
    "Maradi",
    "Zinder",
    "Dosso",
    "Tahoua",
    "Agadez",
    "Diffa",
    "Tillabery",
    "Birni N'Konni",
  ],

  // Types d'événements
  EVENT_TYPES: [
    "Conférence",
    "Atelier",
    "Webinaire",
    "Rencontre",
    "Formation",
    "Séminaire",
  ],

  // Catégories d'opportunités
  OPPORTUNITY_TYPES: [
    "Formation",
    "Emploi",
    "Bourse",
    "Partenariat",
    "Financement",
    "Mentorat",
  ],

  // Domaines
  DOMAINS: [
    "Tech",
    "Business",
    "Design",
    "Marketing",
    "Finance",
    "Agriculture",
    "Santé",
    "Éducation",
  ],

  // Prix
  PRICE_RANGES: [
    { label: "Gratuit", min: 0, max: 0 },
    { label: "Moins de XOF 10k", min: 0, max: 10000 },
    { label: "XOF 10k - 50k", min: 10000, max: 50000 },
    { label: "XOF 50k - 100k", min: 50000, max: 100000 },
    { label: "Plus de XOF 100k", min: 100000, max: 1000000 },
  ],
};

/**
 * ENDPOINTS API (À REMPLACER PAR VOS VRAIS ENDPOINTS)
 */
export const API = {
  BASE_URL: "https://api.digitalniger.com",
  
  ENDPOINTS: {
    // Events
    GET_EVENTS: "/events",
    GET_EVENT: "/events/:id",
    CREATE_EVENT: "/events",
    UPDATE_EVENT: "/events/:id",
    DELETE_EVENT: "/events/:id",

    // Actors
    GET_ACTORS: "/actors",
    GET_ACTOR: "/actors/:id",
    SEARCH_ACTORS: "/actors/search",

    // Opportunities
    GET_OPPORTUNITIES: "/opportunities",
    GET_OPPORTUNITY: "/opportunities/:id",
    APPLY_OPPORTUNITY: "/opportunities/:id/apply",

    // User
    GET_PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
    GET_FAVORITES: "/user/favorites",
    ADD_FAVORITE: "/user/favorites",
    REMOVE_FAVORITE: "/user/favorites/:id",

    // Auth
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh",
  },

  TIMEOUT: 10000, // 10 secondes
};

/**
 * EXEMPLE D'UTILISATION
 * 
 * import { UX_CONFIG, TOAST_MESSAGES, FILTER_OPTIONS, API } from './config/uxConfig.js';
 * 
 * // Utiliser les couleurs
 * style={{ backgroundColor: UX_CONFIG.COLORS.PRIMARY }}
 * 
 * // Utiliser les toasts
 * showToast(TOAST_MESSAGES.ADD_FAVORITE, 'success');
 * 
 * // Utiliser les filtres
 * <FilterBar cities={FILTER_OPTIONS.CITIES} types={FILTER_OPTIONS.EVENT_TYPES} />
 * 
 * // Utiliser l'API
 * fetch(API.BASE_URL + API.ENDPOINTS.GET_EVENTS)
 */

export default UX_CONFIG;
