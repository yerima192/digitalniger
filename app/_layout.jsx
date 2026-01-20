import { Stack } from "expo-router";
import { AuthGuard } from "../components/AuthGuard";
import { AuthProvider } from "../context/AuthContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { NotificationsProvider } from "../context/NotificationsContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <NotificationsProvider>
          <AuthGuard>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "fade",
                contentStyle: { backgroundColor: "#F9FAFB" },
              }}
            >
              {/* Page d'accueil/Splash */}
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                }}
              />

              {/* Groupe d'authentification */}
              <Stack.Screen
                name="(auth)/index"
                options={{
                  headerShown: false,
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen
                name="(auth)/forgot-password"
                options={{
                  headerShown: false,
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="(auth)/select-user-type"
                options={{
                  headerShown: false,
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="(auth)/complete-profile"
                options={{
                  headerShown: false,
                  animation: "slide_from_right",
                }}
              />

              {/* Groupe principal avec tabs (protégé) */}
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />

              {/* Écrans de détails */}
              <Stack.Screen
                name="event-detail"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="acteur-detail"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="opportunites"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />

          {/* Autres écrans */}
          <Stack.Screen
            name="aide-support/index"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="changer-mon-mot-de-passe/index"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="contacter-le-support/index"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="gerer-compte/index"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="modifier-mes-informations/index"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="politique-confidentialite/index"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="questions-frequents-pose/index"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="user-notifications/index"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="user-profil/index"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
        </Stack>
          </AuthGuard>
        </NotificationsProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
