import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

const MOCK_HABITS = [
  { id: '1', title: 'Drink Water (3 Glasses)', completed: false },
  { id: '2', title: 'Read 20 pages', completed: true },
  { id: '3', title: 'Code for 1 hour', completed: false },
  { id: '4', title: 'Meditation', completed: true },
];

const HabitItem = ({ habit, index }: { habit: any, index: number }) => {
  const [completed, setCompleted] = useState(habit.completed);
  const scale = useSharedValue(1);
  const colorScheme = useColorScheme();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => { scale.value = withSpring(0.92); };
  const handlePressOut = () => { scale.value = withSpring(1); };
  const toggle = () => setCompleted(!completed);

  return (
    <Animated.View entering={FadeInDown.delay(index * 150).springify()}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={toggle}
        className="flex-row items-center p-5 mb-4 bg-surface rounded-3xl border border-surface-soft"
      >
        <Animated.View style={animatedStyle} className="mr-4">
          <Ionicons 
            name={completed ? 'checkmark-circle' : 'ellipse-outline'} 
            size={32} 
            color={completed ? '#c8f549' : '#6b6a72'} 
          />
        </Animated.View>
        <Text className={`text-lg font-dmsans ${completed ? 'text-muted line-through' : 'text-foreground'}`}>
          {habit.title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default function TodayScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ paddingBottom: 100 }}>
        <Animated.View entering={FadeInDown.duration(600).springify()}>
          <Text className="text-4xl font-syne text-foreground mb-2 mt-2 tracking-tight">
            Morning Crew 👋
          </Text>
          <Text className="text-lg font-dmsans text-muted mb-8">
            Let's nail today's progress.
          </Text>
        </Animated.View>
        
        {MOCK_HABITS.map((h, i) => (
          <HabitItem key={h.id} habit={h} index={i} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
