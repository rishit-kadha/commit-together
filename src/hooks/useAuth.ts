import { useState, useEffect } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged, FirebaseAuthTypes } from '@react-native-firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    
    // Updated to Firebase v22 Modular API
    const subscriber = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error('Anonymous sign-in failed:', error);
        }
      }
      
      if (initializing) {
        setInitializing(false);
      }
    });
    
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  return { user, initializing };
};
