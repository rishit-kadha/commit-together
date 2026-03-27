import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type StreaksCardProps = {
  streak: number;
  longestStreak: number;
  completionRate: number;
  streakLabel?: string;
  recentDays?: Array<{
    label: string;
    completed: boolean;
  }>;
};

export function StreaksCard({
  streak,
  longestStreak,
  completionRate,
  streakLabel = 'Daily consistency',
  recentDays = [
    { label: 'M', completed: true },
    { label: 'T', completed: true },
    { label: 'W', completed: true },
    { label: 'T', completed: false },
    { label: 'F', completed: true },
    { label: 'S', completed: true },
    { label: 'S', completed: true },
  ],
}: StreaksCardProps) {
  return (
    <View className="rounded-[32px] border border-surface-soft bg-surface p-6">
      <View className="mb-6 flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <Text className="mb-2 text-xs font-dmsans-bold uppercase tracking-[2.5px] text-warning">
            Streaks
          </Text>
          <Text className="mb-2 text-3xl font-syne-black tracking-tight text-foreground">
            {streak} day streak
          </Text>
          <Text className="text-sm font-dmsans leading-6 text-muted">
            {streakLabel}
          </Text>
        </View>

        <View className="h-14 w-14 items-center justify-center rounded-full border border-warning/35 bg-warning/15">
          <Ionicons name="flame" size={24} color="#f5a623" />
        </View>
      </View>

      <View className="mb-6 rounded-[28px] bg-background px-4 py-4">
        <View className="flex-row items-end justify-between">
          <View>
            <Text className="mb-1 text-xs font-dmsans-bold uppercase tracking-[2px] text-muted">
              Current
            </Text>
            <Text className="text-4xl font-syne-black text-warning">{streak}</Text>
          </View>

          <View className="items-end">
            <Text className="mb-1 text-xs font-dmsans-bold uppercase tracking-[2px] text-muted">
              Best
            </Text>
            <Text className="text-2xl font-syne text-foreground">{longestStreak} days</Text>
          </View>
        </View>
      </View>

      <View className="mb-5 flex-row gap-3">
        <View className="flex-1 rounded-[24px] border border-primary/25 bg-primary/10 p-4">
          <Text className="mb-2 text-xs font-dmsans-bold uppercase tracking-[2px] text-primary">
            Completion
          </Text>
          <Text className="text-2xl font-syne text-foreground">{completionRate}%</Text>
        </View>

        <View className="flex-1 rounded-[24px] border border-surface-soft bg-surface-soft p-4">
          <Text className="mb-2 text-xs font-dmsans-bold uppercase tracking-[2px] text-muted">
            Momentum
          </Text>
          <Text className="text-2xl font-syne text-foreground">Strong</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between rounded-[24px] bg-background px-4 py-4">
        {recentDays.map((day, index) => (
          <View key={`${day.label}-${index}`} className="items-center">
            <View
              className={`mb-3 h-10 w-10 items-center justify-center rounded-2xl border ${
                day.completed
                  ? 'border-primary/40 bg-primary'
                  : 'border-surface-soft bg-surface-soft'
              }`}
            >
              <Ionicons
                name={day.completed ? 'checkmark' : 'remove'}
                size={18}
                color={day.completed ? '#0d0d0f' : '#6b6a72'}
              />
            </View>
            <Text className="text-xs font-dmsans-bold uppercase text-muted">{day.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
