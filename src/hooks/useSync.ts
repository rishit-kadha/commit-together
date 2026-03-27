import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useAuth } from './useAuth';
import { syncWithFirestore } from '../lib/sync';

export function useSyncEngine() {
  const db = useSQLiteContext();
  const { user } = useAuth();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // We immediately trigger a Sync when the hook is first mounted (e.g., App Cold Start)
    if (user && db) {
      syncWithFirestore(db, user.uid);
    }

    // Subscribe to Foreground/Background App Transitions
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      // If the user brings the app back to the Foreground from the background, we automatically PULL.
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        if (user && db) {
          syncWithFirestore(db, user.uid);
        }
      }
      
      // If the user backgrounds the app, we could trigger a push, but our sync logic is bidirectional anyway.
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [user, db]);
}
