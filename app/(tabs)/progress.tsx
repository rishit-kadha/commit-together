import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { BarChart } from 'react-native-gifted-charts';

import { StreaksCard } from '@/src/components/streaks-card';

const barData = [
  { value: 2, label: 'Mon' },
  { value: 5, label: 'Tue' },
  { value: 4, label: 'Wed' },
  { value: 6, label: 'Thu' },
  { value: 3, label: 'Fri' },
  { value: 7, label: 'Sat' },
  { value: 5, label: 'Sun' },
];

export default function ProgressScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ paddingBottom: 100 }}>
        <Animated.Text entering={FadeIn.duration(400)} className="mb-8 mt-2 text-4xl font-syne tracking-tight text-foreground">
          Your Progress
        </Animated.Text>

        <Animated.View entering={FadeIn.delay(200).duration(500)} className="mb-6 rounded-3xl border border-surface-soft bg-surface p-6">
          <Text className="mb-6 text-lg font-syne text-foreground">Completions This Week</Text>
          <BarChart
            frontColor="#c8f549"
            barWidth={22}
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            noOfSections={3}
            maxValue={10}
            xAxisLabelTextStyle={{ color: '#6b6a72', fontSize: 12, fontFamily: 'DMSans_400Regular' }}
            yAxisTextStyle={{ color: '#6b6a72', fontSize: 12, fontFamily: 'DMSans_400Regular' }}
          />
        </Animated.View>

        <Animated.View entering={FadeIn.delay(400).duration(500)} className="mb-20">
          <StreaksCard
            streak={12}
            longestStreak={18}
            completionRate={87}
            streakLabel="You are holding pace with your best week this month."
            recentDays={[
              { label: 'M', completed: true },
              { label: 'T', completed: true },
              { label: 'W', completed: true },
              { label: 'T', completed: false },
              { label: 'F', completed: true },
              { label: 'S', completed: true },
              { label: 'S', completed: true },
            ]}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
