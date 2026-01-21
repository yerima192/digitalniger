import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};

// Types d'utilisateurs disponibles
export const USER_TYPES = {
  STUDENT: "student",
  PROFESSIONAL: "professional",
  DEVELOPER: "developer",
  DESIGNER: "designer",
  STARTUP: "startup",
  COMPANY: "company",
  ORGANIZATION: "organization",
  FREELANCER: "freelancer",
  CONSULTANT: "consultant",
  ADMIN: "admin"
};

// Roles disponibles
export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin"
};

// Tranches d'âge (selon cahier des charges)
export const AGE_RANGES = [
  "18-21",
  "22-25",
  "26-34",
  "35-40",
  "41-50",
  "51+"
];

// Genres
export const GENDERS = [
  "Homme",
  "Femme"
];

// Pays/Villes nigériennes
export const NIGERIA_LOCATIONS = {
  "Niger": [
    "Niamey",
    "Maradi",
    "Zinder",
    "Dosso",
    "Tahoua",
    "Agadez",
    "Diffa",
    "Tillabery",
    "Birni N'Konni"
  ],
  "Régions": ["Niamey", "Agadez", "Diffa", "Dosso", "Maradi", "Tahoua", "Tillabery", "Zinder"]
};

// Validations utilitaires
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validatePhone = (phone) => {
  // Format: +227 XX XX XX XX ou sans +
  const phoneRegex = /^(\+227|0)?[2-9]\d{7}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Charger l'utilisateur au démarrage
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user");
      const token = await AsyncStorage.getItem("@token");

      if (userData && token) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'utilisateur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Connexion
  const login = async (email, password) => {
    try {
      // Validations
      if (!validateEmail(email)) {
        return { success: false, error: "Email invalide" };
      }

      if (!validatePassword(password)) {
        return { success: false, error: "Mot de passe invalide" };
      }

      // Simulation d'une réponse API (à remplacer)
      const mockUser = {
        id: "1",
        name: "John Doe",
        email: email.toLowerCase(),
        avatar: "https://ui-avatars.com/api/?name=John+Doe",
        userType: USER_TYPES.PROFESSIONAL,
        role: USER_ROLES.USER,
        gender: "Homme",
        ageRange: "26-34",
        city: "Niamey",
        country: "Niger",
        phone: "+227 98 88 88 88",
        profileComplete: true,
        createdAt: new Date().toISOString(),
        preferences: {
          notifications: true,
          emailAlerts: true,
          categories: []
        }
      };
      const mockToken = "fake-jwt-token-" + Date.now();

      // Sauvegarder les données
      await AsyncStorage.setItem("@user", JSON.stringify(mockUser));
      await AsyncStorage.setItem("@token", mockToken);

      setUser(mockUser);
      setIsAuthenticated(true);

      return { success: true, user: mockUser };
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return { success: false, error: "Email ou mot de passe incorrect" };
    }
  };

  // Inscription
  const signup = async (name, email, password) => {
    try {
      // Validations
      if (!name || name.trim().length < 2) {
        return { success: false, error: "Le nom doit contenir au moins 2 caractères" };
      }
      
      if (!validateEmail(email)) {
        return { success: false, error: "Email invalide" };
      }
      
      if (!validatePassword(password)) {
        return { success: false, error: "Le mot de passe doit contenir au moins 6 caractères" };
      }

      // Simulation d'une réponse API (à remplacer)
      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
        userType: null, // À définir après signup
        role: USER_ROLES.USER,
        gender: null,
        ageRange: null,
        city: null,
        country: "Niger",
        phone: null,
        profileComplete: false, // Doit compléter le profil
        createdAt: new Date().toISOString(),
        preferences: {
          notifications: true,
          emailAlerts: true,
          categories: []
        }
      };
      const mockToken = "fake-jwt-token-" + Date.now();

      // Sauvegarder les données
      await AsyncStorage.setItem("@user", JSON.stringify(newUser));
      await AsyncStorage.setItem("@token", mockToken);

      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true, user: newUser, requiresProfileCompletion: true };
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      return { success: false, error: "Erreur lors de l'inscription" };
    }
  };

  // Déconnexion
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      await AsyncStorage.removeItem("@token");
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
      return { success: false };
    }
  };

  // Réinitialisation du mot de passe
  const resetPassword = async (email) => {
    try {
      // TODO: Remplacer par votre appel API réel
      // const response = await fetch("YOUR_API_URL/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });

      // Simulation
      console.log("Envoi de l'email de réinitialisation à:", email);
      return { success: true };
    } catch (error) {
      console.error("Erreur de réinitialisation:", error);
      return { success: false, error: "Erreur lors de l'envoi de l'email" };
    }
  };

  // Mettre à jour le profil
  const updateProfile = async (updates) => {
    try {
      // Validations
      if (updates.phone && !validatePhone(updates.phone)) {
        return { success: false, error: "Numéro de téléphone invalide" };
      }

      if (updates.email && !validateEmail(updates.email)) {
        return { success: false, error: "Email invalide" };
      }

      const updatedUser = { ...user, ...updates };
      
      // Marquer le profil comme complet si tous les champs obligatoires sont remplis
      if (updates.userType && updates.gender && updates.ageRange && updates.city) {
        updatedUser.profileComplete = true;
      }
      
      await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Erreur de mise à jour du profil:", error);
      return { success: false, error: "Erreur lors de la mise à jour du profil" };
    }
  };

  // Mettre à jour les préférences
  const updatePreferences = async (preferences) => {
    try {
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...preferences }
      };
      await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Erreur de mise à jour des préférences:", error);
      return { success: false };
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile,
    updatePreferences,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};