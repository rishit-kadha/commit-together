import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

export default function EntryPage() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background px-6">
      <View className="items-center justify-center">
        {/* Brand Name */}
        <Text className="text-foreground text-5xl font-syne text-center font-bold tracking-tight">
          Commit{'\n'}Together
        </Text>
        
        {/* Decorative Divider */}
        <View className="h-1.5 w-16 bg-primary rounded-full mt-8 mb-6 opacity-90 shadow-sm" />

        {/* Tagline */}
        <Text className="text-foreground/60 text-lg font-dm-sans-medium text-center">
          Achieve your goals, side by side.
        </Text>
      </View>
    </SafeAreaView>
  );
}
