import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInRight, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const ALL_HABITS = [
  { id: '1', title: 'Drink Water', streak: 12, theme: 'bg-primary/20 text-primary' },
  { id: '2', title: 'Read', streak: 5, theme: 'bg-groups/20 text-groups' },
  { id: '3', title: 'Code', streak: 30, theme: 'bg-primary/20 text-primary' },
  { id: '4', title: 'Meditation', streak: 0, theme: 'bg-warning/20 text-warning' },
];

export default function HabitsScreen() {
  const fabScale = useSharedValue(1);
  const fabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ paddingBottom: 120 }}>
        <Animated.Text entering={FadeIn.duration(400)} className="text-3xl font-syne text-foreground mb-6 tracking-tight">
          All Habits
        </Animated.Text>
        
        {ALL_HABITS.map((habit, index) => (
          <Animated.View 
            key={habit.id} 
            entering={SlideInRight.delay(index * 100).springify()}
            className="flex-row justify-between items-center p-5 mb-4 rounded-3xl bg-surface border border-surface-soft"
          >
            <View className={`px-4 py-2 rounded-xl ${habit.theme.split(' ')[0]}`}>
              <Text className={`font-dmsans-bold uppercase text-xs tracking-wider ${habit.theme.split(' ')[1]}`}>
                {habit.title}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="flame" size={20} color={habit.streak > 0 ? '#f5a623' : '#6b6a72'} />
              <Text className="text-lg font-syne text-foreground ml-1">
                {habit.streak}
              </Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <Animated.View style={fabStyle} className="absolute bottom-6 right-6">
        <Pressable 
          onPressIn={() => fabScale.value = withSpring(0.9)}
          onPressOut={() => fabScale.value = withSpring(1)}
          className="w-16 h-16 bg-primary rounded-full items-center justify-center shadow-lg"
        >
          <Ionicons name="add" size={32} color="#0d0d0f" />
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}
