import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn, LinearTransition, useSharedValue, useAnimatedStyle, withSpring, useAnimatedProps } from 'react-native-reanimated';
import { useState, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const MOCK_HABITS = [
  { id: '1', title: 'Morning run', frequency: 'Every day · 6:00 AM', completed: true, streak: 14, color: '#c8f549' },
  { id: '2', title: 'Read 20 mins', frequency: 'Every day · anytime', completed: true, streak: 7, color: '#c8f549' },
  { id: '3', title: 'Drink 2L water', frequency: 'Every day · reminder 12pm', completed: true, streak: 5, color: '#c8f549' },
  { id: '4', title: 'Meditate', frequency: 'Weekdays · 7:00 AM', completed: true, streak: 3, color: '#c8f549' },
  { id: '5', title: 'No social media 9-12', frequency: 'Every day · morning block', completed: false, streak: 2, color: '#7b5ef8' },
  { id: '6', title: 'Cold shower', frequency: 'Every day · morning', completed: false, streak: 0, color: '#f5a623' },
];

const MOCK_LATEST_GROUPS = [
  { id: 'g1', boldName: "Sia", text: " hit 100% in Morning Crew today 🎉", time: "2 min ago · Morning Crew", initial: "S", color: "#3f6212", nameColor: '#c8f549', icon: "🏆" },
  { id: 'g2', boldName: "Aryan", text: " completed Morning run", time: "14 min ago · Morning Crew", initial: "A", color: "#312e81", nameColor: '#a78bfa', icon: "🏃‍♂️" },
  { id: 'g3', boldName: "Karan", text: " is on a 10 day streak in Study", time: "1 hour ago · Exam Prep", initial: "K", color: "#713f12", nameColor: '#fbbf24', icon: "" }, // No icon for Karan in screenshot except maybe flame implicitly
];

// Reusable Circular SVG Progress Component
const ProgressRing = ({ percentage }: { percentage: number }) => {
  const radius = 35;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  
  const animatedProps = useAnimatedProps(() => {
    // 0% completion means strokeDashoffset = circumference
    // 100% completion means strokeDashoffset = 0
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return {
      strokeDashoffset: withSpring(strokeDashoffset, { damping: 20, stiffness: 90 }),
    };
  });

  return (
    <View className="relative items-center justify-center mr-5">
      <Svg width={90} height={90}>
        <Circle
          cx={45}
          cy={45}
          r={radius}
          stroke="#27272a" 
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={45}
          cy={45}
          r={radius}
          stroke="#c8f549" // Acid Green Primary
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          fill="none"
          rotation="-90"
          origin="45, 45"
        />
      </Svg>
      {/* Centered Text Graphic */}
      <View className="absolute items-center justify-center">
        <Text className="text-xl font-syne-black text-foreground">{Math.round(percentage)}%</Text>
        <Text className="text-[10px] font-dmsans text-muted uppercase tracking-wider">done</Text>
      </View>
    </View>
  );
};

const HabitItem = ({ habit, index, onToggle }: { habit: any, index: number, onToggle: (id: string) => void }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => { scale.value = withSpring(0.96, { damping: 15, stiffness: 400 }); };
  const handlePressOut = () => { scale.value = withSpring(1, { damping: 15, stiffness: 400 }); };
  
  const toggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onToggle(habit.id);
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).springify()}
      layout={LinearTransition.springify().damping(16).stiffness(150)}
      className="mb-3.5"
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={toggle}
        className="flex-row items-center p-4 rounded-[20px] bg-surface overflow-hidden relative border border-transparent"
      >
        {/* Left colored stripe perfectly matching the mockups */}
        <Animated.View 
          className="absolute left-0 top-0 bottom-0 w-2"
          style={{ backgroundColor: habit.color }} 
        />
        
        {/* Check Circle (Hollow or Complete) */}
        <View className="ml-3 mr-4">
          <View className={`w-[32px] h-[32px] rounded-full items-center justify-center border-2 border-[#27272a] ${habit.completed ? 'bg-primary border-primary' : 'bg-transparent'}`}>
            {habit.completed && <Ionicons name="checkmark" size={20} color="#141418" />}
          </View>
        </View>

        {/* Target Typography */}
        <View className="flex-1 py-1">
          <Text className={`text-lg font-dmsans leading-none ${habit.completed ? 'text-muted line-through' : 'text-foreground'}`}>
            {habit.title}
          </Text>
          <Text className="text-sm font-dmsans text-muted mt-2">
            {habit.frequency}
          </Text>
        </View>

        {/* Subtle Dark Pill Streak Counter */}
        <View className="flex-row items-center px-3 py-1.5 rounded-full bg-[#1c1c22] border border-[#27272a] ml-2">
          {habit.streak > 0 ? (
            <Text className="text-xs mr-1">🔥</Text>
          ) : (
            <Text className="text-xs text-muted mr-1">—</Text>
          )}
          <Text className="text-sm font-syne text-foreground">{habit.streak}</Text>
        </View>

      </Pressable>
    </Animated.View>
  );
};

export default function TodayScreen() {
  const [habits, setHabits] = useState(MOCK_HABITS);

  const toggleHabit = (id: string) => {
    setHabits(current => 
      current.map(h => 
        h.id === id ? { ...h, completed: !h.completed } : h
      )
    );
  };

  // Ensure inactive habits surface to the top for completion
  const sortedHabits = useMemo(() => {
    return [...habits].sort((a, b) => Number(a.completed) - Number(b.completed));
  }, [habits]);

  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const progressPercentage = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* 1. Header Progress Card mimicking mockup precisely */}
        <Animated.View entering={FadeInDown.duration(600).springify()} className="bg-surface rounded-3xl p-5 mb-8 flex-row items-center border border-transparent">
          <ProgressRing percentage={progressPercentage} />
          
          <View className="flex-1 justify-center pt-1">
            <Text className="text-xl font-syne-black text-foreground mb-1 leading-tight">Today's progress</Text>
            <Text className="text-sm font-dmsans text-muted mb-4">{completedCount} of {totalCount} habits completed</Text>
            
            {/* The segmented blocks horizontal chart */}
            <View className="flex-row gap-1">
              {habits.map((_, i) => {
                const isCompletedBlock = i < completedCount;
                return (
                  <View 
                    key={`block-${i}`} 
                    className={`h-7 w-6 rounded-sm ${isCompletedBlock ? 'bg-primary' : 'bg-[#27272a]'}`} 
                  />
                );
              })}
            </View>
          </View>
        </Animated.View>

        {/* 2. Today's Habits Header layout */}
        <View className="flex-row justify-between items-end mb-4 px-1">
          <Text className="text-lg font-syne-black text-foreground tracking-tight">Today's habits</Text>
          <Text className="text-sm font-dmsans-bold text-primary">See all</Text>
        </View>

        {sortedHabits.map((h, i) => (
          <HabitItem key={h.id} habit={h} index={i} onToggle={toggleHabit} />
        ))}

        {/* 3. Add Habit Command Row */}
        <Animated.View entering={FadeIn.delay(500)} className="flex-row gap-3 mt-4 mb-10 px-1">
          <Pressable className="flex-1 flex-row items-center justify-center py-4 bg-surface rounded-2xl active:opacity-75">
            <Text className="text-foreground font-syne-black mr-2">+</Text>
            <Text className="text-lg font-syne-black text-foreground tracking-tight">Add habit</Text>
          </Pressable>
          <Pressable className="px-5 py-4 bg-surface rounded-2xl items-center justify-center active:opacity-75">
            <Text className="text-xl">📋</Text>
          </Pressable>
        </Animated.View>

        {/* 4. Group Activity Integration */}
        <View className="flex-row justify-between items-end mb-4 px-1">
          <Text className="text-lg font-syne-black text-foreground tracking-tight">Group activity</Text>
          <Text className="text-sm font-dmsans-bold text-primary">See groups</Text>
        </View>

        {MOCK_LATEST_GROUPS.map((g, i) => (
          <Animated.View 
            entering={FadeInDown.delay(700 + (i * 100)).springify()} 
            key={g.id} 
            className="flex-row items-center p-5 mb-3 rounded-2xl bg-surface"
          >
            {/* Avatar block matching the deeply colored squares found in the mockups */}
            <View 
              className="w-12 h-12 rounded-2xl items-center justify-center flex-shrink-0 mr-4"
              style={{ backgroundColor: g.color }}
            >
              <Text className="text-xl font-syne-black" style={{ color: g.nameColor }}>{g.initial}</Text>
            </View>

            {/* Content Body */}
            <View className="flex-1 justify-center pr-2">
              <Text className="text-[15px] font-dmsans text-foreground leading-tight" numberOfLines={2}>
                <Text className="font-dmsans-bold" style={{ color: g.nameColor }}>{g.boldName}</Text>
                {g.text}
              </Text>
              <Text className="text-xs font-dmsans text-muted mt-1.5">{g.time}</Text>
            </View>

            {/* Optional Right Action icon block */}
            {g.icon !== "" && (
              <Text className="text-2xl">{g.icon}</Text>
            )}
          </Animated.View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}
