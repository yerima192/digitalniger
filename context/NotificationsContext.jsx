import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const NotificationsContext = createContext({});

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications doit être utilisé dans un NotificationsProvider");
  }
  return context;
};

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les notifications au démarrage
  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const savedNotifications = await AsyncStorage.getItem("@notifications");
      const savedAlerts = await AsyncStorage.getItem("@alerts");

      if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
      if (savedAlerts) setAlerts(JSON.parse(savedAlerts));
    } catch (error) {
      console.error("Erreur lors du chargement des notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Ajouter une notification
  const addNotification = async (notification) => {
    try {
      const newNotification = {
        id: Date.now().toString(),
        type: notification.type, // 'event', 'opportunity', 'actor'
        title: notification.title,
        message: notification.message,
        data: notification.data,
        read: false,
        createdAt: new Date().toISOString(),
      };

      const updatedNotifications = [newNotification, ...notifications];
      await AsyncStorage.setItem("@notifications", JSON.stringify(updatedNotifications));
      setNotifications(updatedNotifications);
      return { success: true, notification: newNotification };
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une notification:", error);
      return { success: false };
    }
  };

  // Marquer une notification comme lue
  const markNotificationAsRead = async (notificationId) => {
    try {
      const updatedNotifications = notifications.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      await AsyncStorage.setItem("@notifications", JSON.stringify(updatedNotifications));
      setNotifications(updatedNotifications);
      return { success: true };
    } catch (error) {
      console.error("Erreur lors du marquage de la notification:", error);
      return { success: false };
    }
  };

  // Supprimer une notification
  const deleteNotification = async (notificationId) => {
    try {
      const updatedNotifications = notifications.filter(notif => notif.id !== notificationId);
      await AsyncStorage.setItem("@notifications", JSON.stringify(updatedNotifications));
      setNotifications(updatedNotifications);
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la suppression d'une notification:", error);
      return { success: false };
    }
  };

  // Ajouter une alerte (souscription à des catégories)
  const addAlert = async (alert) => {
    try {
      const newAlert = {
        id: Date.now().toString(),
        type: alert.type, // 'opportunity', 'event'
        category: alert.category,
        keywords: alert.keywords || [],
        city: alert.city,
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      const updatedAlerts = [...alerts, newAlert];
      await AsyncStorage.setItem("@alerts", JSON.stringify(updatedAlerts));
      setAlerts(updatedAlerts);
      return { success: true, alert: newAlert };
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une alerte:", error);
      return { success: false };
    }
  };

  // Retirer une alerte
  const removeAlert = async (alertId) => {
    try {
      const updatedAlerts = alerts.filter(alert => alert.id !== alertId);
      await AsyncStorage.setItem("@alerts", JSON.stringify(updatedAlerts));
      setAlerts(updatedAlerts);
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la suppression d'une alerte:", error);
      return { success: false };
    }
  };

  // Obtenir le nombre de notifications non lues
  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  const value = {
    notifications,
    addNotification,
    markNotificationAsRead,
    deleteNotification,
    getUnreadCount,
    alerts,
    addAlert,
    removeAlert,
    isLoading,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
