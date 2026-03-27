import { useState, useEffect } from 'react';
import Purchases, { CustomerInfo, PurchasesPackage } from 'react-native-purchases';
import { Platform } from 'react-native';

const ENTITLEMENT_ID = 'pro';

export const useRevenueCat = () => {
  const [isPro, setIsPro] = useState(false);
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    const setup = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        setIsPro(typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined');

        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (e) {
        console.warn('Error fetching RevenueCat data:', e);
      }
    };

    setup();

    // Attach active listener to state updates from RevenueCat
    const updateListener = (customerInfo: CustomerInfo) => {
      setIsPro(typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined');
    };
    
    Purchases.addCustomerInfoUpdateListener(updateListener);
  }, []);

  const purchasePackage = async (pack: PurchasesPackage) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pack);
      if (typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined') {
        setIsPro(true);
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        console.error('Purchase failed', e);
      }
    }
  };

  const restorePurchases = async () => {
    setIsRestoring(true);
    try {
      const customerInfo = await Purchases.restorePurchases();
      if (typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined') {
        setIsPro(true);
      }
    } catch (e) {
      console.warn('Restore failed', e);
    } finally {
      setIsRestoring(false);
    }
  };

  return { isPro, packages, purchasePackage, restorePurchases, isRestoring };
};
