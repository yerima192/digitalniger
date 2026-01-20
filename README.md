# 🇳🇪 Digital Niger Map - Application Mobile

> **Plateforme de référence de l'écosystème numérique nigérien**

Connectez-vous avec les événements tech, les acteurs de l'innovation et les opportunités de formation au Niger.

![Status](https://img.shields.io/badge/Status-MVP%2B%20Development-blue?style=flat-square)
![Version](https://img.shields.io/badge/Version-0.2.0-success?style=flat-square)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow?style=flat-square)
![Framework](https://img.shields.io/badge/Framework-React%20Native-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Stack Technologique](#-stack-technologique)
- [Installation](#-installation)
- [Structure du Projet](#-structure-du-projet)
- [Documentation](#-documentation)
- [Contribuer](#-contribuer)

---

## ✨ Fonctionnalités

### 🔐 Authentification Complète
- [x] **Inscription & Connexion** - Email/mot de passe sécurisés
- [x] **Types d'Utilisateurs** - 9 catégories (Étudiant, Pro, Dev, Designer, Freelancer, Consultant, Startup, Entreprise, Organisation)
- [x] **Profil Utilisateur** - Genre, âge, localisation, préférences
- [x] **Gestion de Compte** - Modification, changement mot de passe, déconnexion

### 📅 Gestion des Événements
- [x] **Liste d'Événements** - Conférences, hackathons, ateliers, formations
- [x] **Détails Complets** - Lieu, organisateur, description, inscription
- [x] **Favoris** - Sauvegardez vos événements préférés
- [x] **Notifications** - Soyez alerté des nouveaux événements

### 🏢 Cartographie des Acteurs
- [x] **Répertoire des Acteurs** - Startups, hubs, freelances, organisations
- [x] **Profils Détaillés** - Logo, description, contact, réseaux sociaux
- [x] **Localisation GPS** - Coordonnées et localisation
- [x] **Favoris** - Sauvegardez vos acteurs préférés

### 💡 Opportunités & Formation
- [x] **Appels à Projets** - Financement pour startups (jusqu'à 50M FCFA)
- [x] **Bourses d'Études** - Formation et financement éducatif
- [x] **Formations Certifiantes** - Bootcamps et certifications
- [x] **Stages & Emploi** - Opportunités professionnelles
- [x] **Alertes** - Notification pour nouvelles opportunités

### ❤️ Gestion des Favoris
- [x] **Multi-ressources** - Événements, acteurs, opportunités
- [x] **Interface Dédiée** - Onglets organisés par catégorie
- [x] **Persistance** - Sauvegardés localement avec AsyncStorage
- [x] **Suppression Rapide** - Accès via chaque carte

### 🔔 Notifications & Alertes
- [x] **Système de Notifications** - Événements, opportunités, messages
- [x] **Alertes Personnalisées** - Souscrivez à vos catégories préférées
- [x] **Compteur Non-Lu** - Badge sur les onglets
- [x] **Gestion** - Marquer comme lu, supprimer

---

## 🛠 Stack Technologique

```json
{
  "framework": "Expo Router 6.0+ | React Native 0.81",
  "language": "JavaScript ES6+ (JSX)",
  "storage": "AsyncStorage 2.2+",
  "navigation": "React Navigation + Bottom Tabs",
  "ui": "React Native StyleSheet",
  "icons": "MaterialCommunityIcons + Ionicons",
  "styling": "expo-linear-gradient"
}
```

---

## 🚀 Installation

### Prérequis
- **Node.js** 16+ et **npm** ou **yarn**
- **Expo CLI** : `npm install -g expo-cli`
- **Android Studio** ou **Xcode** (pour émulateur)
- **Expo Go** (pour tester sur appareil)

### Démarrage Rapide

```bash
# 1. Cloner le repository
git clone https://github.com/yourusername/Digital-Niger-Map-Mobile.git
cd Digital-Niger-Map-Mobile

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur
npx expo start

# 4. Choisir votre plateforme:
# - Appuyez sur 'a' pour Android
# - Appuyez sur 'i' pour iOS
# - Appuyez sur 'w' pour Web
# - Scannez le QR code avec Expo Go
```

### Développement
```bash
# Accès aux détails de démarrage
npx expo start --dev-client

# Mode avec Clear Console
npx expo start --clear
```

---

## 📂 Structure du Projet

```
Digital-Niger-Map-Mobile/
├── app/                           # Routes Expo Router
│   ├── _layout.jsx               # Layout racine + Contextes
│   ├── index.jsx                 # Splash/Landing
│   ├── (auth)/                   # Routes authentification
│   │   ├── index.jsx             # Login/Signup
│   │   ├── select-user-type.jsx  # ✨ Sélection profil
│   │   ├── complete-profile.jsx  # ✨ Complétion profil
│   │   └── forgot-password.jsx
│   ├── (tabs)/                   # Routes principales
│   │   ├── _layout.jsx           # Tab Navigation
│   │   ├── index.jsx             # Accueil
│   │   ├── evenements.jsx        # Événements
│   │   ├── acteurs.jsx           # Acteurs/Organisations
│   │   ├── opportunites.jsx      # Opportunités
│   │   ├── favoris.jsx           # ✨ Favoris
│   │   └── parametres.jsx        # Paramètres
│   ├── event-detail.jsx
│   ├── acteur-detail.jsx
│   └── opportunite-detail.jsx
│
├── components/                    # Composants réutilisables
│   ├── EventCard.jsx             # ✨ Carte événement
│   ├── ActorCard.jsx             # ✨ Carte acteur
│   ├── OpportunityCard.jsx       # ✨ Carte opportunité
│   ├── Header.jsx
│   ├── AuthGuard.jsx
│   └── SafeAreaWrapper.js
│
├── context/                       # État global
│   ├── AuthContext.jsx            # ✨ Auth + Profil
│   ├── FavoritesContext.jsx       # ✨ Favoris
│   └── NotificationsContext.jsx   # ✨ Notifications
│
├── data/                          # Données statiques
│   ├── eventsData.js              # ✨ 8 événements
│   ├── acteursData.js             # Acteurs nigériens
│   └── opportunitesData.js        # ✨ 8 opportunités
│
├── styles/
│   ├── colors.js                  # Palette couleurs
│   └── ...
│
├── ARCHITECTURE.md                # 📄 Doc technique
├── GUIDE_UTILISATEUR.md           # 📄 Guide utilisateur
└── README.md                      # ⬅️ Ce fichier
```

---

## 📚 Documentation

### Voir aussi
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Architecture technique complète
- **[GUIDE_UTILISATEUR.md](GUIDE_UTILISATEUR.md)** - Guide utilisateur en français
- **[Expo Docs](https://docs.expo.dev)** - Documentation Expo
- **[React Native Docs](https://reactnative.dev)** - Documentation React Native

---

## 🎯 Objectifs

Devenir la plateforme de référence de l'écosystème numérique nigérien:
- 🌟 Découvrir les événements tech
- 🏢 Identifier les acteurs de l'innovation
- 💡 Accéder aux opportunités (formation, financement, emploi)

**Public:** Étudiants, Développeurs, Startups, PMEs, Organisations, ONG

---

## 🤝 Contribuer

### Signaler un Bug
1. Allez à [Issues](https://github.com/yourusername/Digital-Niger-Map-Mobile/issues)
2. Cliquez "New Issue"
3. Décrivez le problème avec screenshots

### Soumettre une Fonctionnalité
1. Créez une branche: `git checkout -b feature/ma-feature`
2. Committez: `git commit -m "feat: description"`
3. Poussez: `git push origin feature/ma-feature`
4. Ouvrez une Pull Request

### Code Style
- Utiliser ES6+ moderne
- Respecter la structure des fichiers
- Commenter les sections complexes
- Tester avant de committer

---

## 📞 Support

- **Email:** dev@digitalniger.ne
- **Téléphone:** +227 98 88 88 88
- **Discord:** [Community Server](https://discord.gg/...)

---

## 📄 Licence

MIT License - Voir [LICENSE](LICENSE) pour les détails

```
Copyright (c) 2024 Digital Niger Map Contributors
```

---

## 🚀 Commencez Maintenant!

```bash
npx expo start
```

**Merci d'utiliser Digital Niger Map!** 🇳🇪 ❤️

---

**Dernière mise à jour:** Janvier 2025  
**Maintaineur:** Digital Niger Team  
**Status:** Développement Actif 🚀
