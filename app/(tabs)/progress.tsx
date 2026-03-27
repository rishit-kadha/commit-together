import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { BarChart } from 'react-native-gifted-charts';

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
        <Animated.Text entering={FadeIn.duration(400)} className="text-4xl font-syne text-foreground mb-8 mt-2 tracking-tight">
          Your Progress
        </Animated.Text>

        <Animated.View entering={FadeIn.delay(200).duration(500)} className="p-6 rounded-3xl bg-surface border border-surface-soft mb-6">
          <Text className="text-lg font-syne text-foreground mb-6">Completions This Week</Text>
          <BarChart
            frontColor={'#c8f549'}
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

        <View className="flex-row justify-between mb-20">
          <Animated.View entering={FadeIn.delay(400)} className="flex-1 p-5 mr-2 rounded-3xl bg-warning/20 border border-warning/50">
            <Text className="text-3xl font-syne text-warning mb-1">12</Text>
            <Text className="text-xs font-dmsans-bold uppercase tracking-wider text-warning">Day Streak 🔥</Text>
          </Animated.View>
          <Animated.View entering={FadeIn.delay(500)} className="flex-1 p-5 ml-2 rounded-3xl bg-primary/20 border border-primary/50">
            <Text className="text-3xl font-syne text-primary mb-1">87%</Text>
            <Text className="text-xs font-dmsans-bold uppercase tracking-wider text-primary">Completion 📈</Text>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
