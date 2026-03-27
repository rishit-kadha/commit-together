import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { Platform } from 'react-native';

export const initRevenueCat = () => {
  Purchases.setLogLevel(LOG_LEVEL.DEBUG);

  if (Platform.OS === 'ios') {
    if (process.env.EXPO_PUBLIC_RC_IOS_KEY) {
      Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_RC_IOS_KEY });
    }
  } else if (Platform.OS === 'android') {
    if (process.env.EXPO_PUBLIC_RC_ANDROID_KEY) {
      Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_RC_ANDROID_KEY });
    }
  }

  console.log('RevenueCat initialized for', Platform.OS);
};
