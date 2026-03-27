import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDbIfNeeded } from '@/src/lib/db';
import { PostHogProvider } from 'posthog-react-native';

import { posthog } from '@/src/lib/posthog';
import { initRevenueCat } from '@/src/lib/revenuecat';
import { useSyncEngine } from '@/src/hooks/useSync';

// Fonts
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Syne_700Bold, Syne_800ExtraBold } from '@expo-google-fonts/syne';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';

SplashScreen.preventAutoHideAsync();

// Orchestrator that binds the SyncEngine natively to the app lifecycle
function SyncManager() {
  useSyncEngine();
  return null;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Syne_700Bold,
    Syne_800ExtraBold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    initRevenueCat();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PostHogProvider client={posthog}>
      <SQLiteProvider databaseName="commit-together.db" onInit={migrateDbIfNeeded}>
        <SyncManager />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
        </Stack>
        <StatusBar style="light" />
      </SQLiteProvider>
    </PostHogProvider>
  );
}
