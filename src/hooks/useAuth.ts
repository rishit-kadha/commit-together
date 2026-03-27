import { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Automatically sign in anonymously if no user is found
        try {
          await auth().signInAnonymously();
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

  // Provide a method to seamlessly upgrade anonymous account later 
  // (e.g. auth().currentUser.linkWithCredential(...))

  return { user, initializing };
};
