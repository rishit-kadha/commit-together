import { View, Text, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useRevenueCat } from '@/src/hooks/useRevenueCat';

export default function MeScreen() {
  const { isPro, packages } = useRevenueCat();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 pt-4">
      <Animated.Text entering={FadeInDown.duration(400)} className="text-4xl font-syne text-foreground mb-8 mt-2 tracking-tight">
        Profile
      </Animated.Text>

      {/* Profile Header */}
      <Animated.View entering={FadeInDown.delay(100)} className="items-center mb-8">
        <View className="w-24 h-24 rounded-full bg-surface-soft items-center justify-center mb-4 border-4 border-surface">
          <Text className="text-4xl">😎</Text>
        </View>
        <Text className="text-2xl font-syne text-foreground">John Doe</Text>
        <Text className="font-dmsans text-muted">john@example.com</Text>
      </Animated.View>

      {/* Paywall Banner powered by useRevenueCat hook */}
      <Animated.View entering={FadeInDown.delay(200)} className="mb-8">
        {!isPro ? (
          <Pressable className="p-6 rounded-3xl bg-primary items-center shadow-lg">
            <Text className="text-background font-syne-black text-lg mb-1">Unlock Premium 🌟</Text>
            <Text className="text-background/80 font-dmsans-medium text-center">Get unlimited habits, advanced stats, and friend groups!</Text>
            {packages.length > 0 && (
              <View className="mt-4 px-4 py-2 bg-background rounded-full">
                <Text className="text-primary font-dmsans-bold">Start {packages[0].product.identifier}</Text>
              </View>
            )}
          </Pressable>
        ) : (
          <View className="p-6 rounded-3xl bg-warning items-center">
            <Text className="text-background font-syne-black text-lg">You are a Pro Member 👑</Text>
            <Text className="text-background/80 font-dmsans-bold">Thank you for your support!</Text>
          </View>
        )}
      </Animated.View>

      {/* Settings Options */}
      <Animated.View entering={FadeInDown.delay(300)} className="bg-surface rounded-3xl p-4 border border-surface-soft">
        <View className="flex-row items-center justify-between p-4 border-b border-surface-soft">
          <View className="flex-row items-center">
            <Ionicons name="notifications" size={24} color="#6b6a72" />
            <Text className="text-lg font-syne text-foreground ml-4">Notifications</Text>
          </View>
          <Switch value={true} />
        </View>
        <Pressable className="flex-row items-center justify-between p-4 bg-transparent active:bg-surface-soft rounded-2xl">
          <View className="flex-row items-center">
            <Ionicons name="log-out-outline" size={24} color="#f5a623" />
            <Text className="text-lg font-syne text-warning ml-4">Sign Out</Text>
          </View>
        </Pressable>
      </Animated.View>
      </View>
    </SafeAreaView>
  );
}
