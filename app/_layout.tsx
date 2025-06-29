import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { TranslationProvider } from '@/context/TranslationContext';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
function RootLayoutNav() {
    const { isAuthenticated, isLoading } = useAuth();
    const { theme } = useTheme();
    const router = useRouter();
    const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    // Vérifiez vos routes réelles dans votre structure de fichiers
    const inApp = segments[0] === '(home)'; // Changé de (app) à (home)
    const inPublic = segments[0] === '(public)';

    if (!isAuthenticated && inApp) {
      // Utilisateur non connecté -> redirect login
      router.replace('../(pulic)/login'); // Chemin simplifié
    } else if (isAuthenticated && inPublic) {
      // Utilisateur connecté -> redirect app
      router.replace('/(home)'); // Utilisez le chemin qui existe réellement
    } else if (!isAuthenticated && !inPublic && segments.length <= 1) {
      // Premier lancement -> splash (changé === 0 en <= 1)
      router.replace('/splash');
    }
  }, [isAuthenticated, segments, isLoading, router]); // Ajouté router dans les dépendances

  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: theme.colors.background 
      }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style={theme.colors.background === '#000000' ? 'light' : 'dark'} />
      <Slot />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TranslationProvider>
        <RootLayoutNav />
        </TranslationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}