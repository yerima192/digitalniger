import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
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
      // TODO: Remplacer par votre appel API réel
      // const response = await fetch("YOUR_API_URL/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();

      // Simulation d'une réponse API (à remplacer)
      const mockUser = {
        id: "1",
        name: "John Doe",
        email: email,
        avatar: "https://ui-avatars.com/api/?name=John+Doe",
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
      // TODO: Remplacer par votre appel API réel
      // const response = await fetch("YOUR_API_URL/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name, email, password }),
      // });
      // const data = await response.json();

      // Simulation d'une réponse API (à remplacer)
      const mockUser = {
        id: "1",
        name: name,
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${name}`,
      };
      const mockToken = "fake-jwt-token-" + Date.now();

      // Sauvegarder les données
      await AsyncStorage.setItem("@user", JSON.stringify(mockUser));
      await AsyncStorage.setItem("@token", mockToken);

      setUser(mockUser);
      setIsAuthenticated(true);

      return { success: true, user: mockUser };
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
      const updatedUser = { ...user, ...updates };
      await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Erreur de mise à jour du profil:", error);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};