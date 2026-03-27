import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';

const MOCK_GROUPS = [
  { id: '1', name: 'Early Birds 🌅', members: 4, activity: 'High' },
  { id: '2', name: 'Code 100 Days 💻', members: 12, activity: 'Medium' },
  { id: '3', name: 'Fitness Addicts 💪', members: 6, activity: 'High' },
];

export default function GroupsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ paddingBottom: 100 }}>
      <Animated.Text entering={FadeInUp.duration(400)} className="text-4xl font-syne text-foreground mb-2 mt-2 tracking-tight">
        Squads
      </Animated.Text>
      <Text className="text-base text-muted mb-8 font-dmsans">
        Accountability is everything.
      </Text>

      {MOCK_GROUPS.map((group, index) => (
        <Animated.View 
          key={group.id} 
          entering={FadeInUp.delay((index + 1) * 150).springify()}
          className="p-6 mb-5 rounded-3xl bg-surface border border-surface-soft"
        >
          <Text className="text-xl font-syne text-foreground mb-4">
            {group.name}
          </Text>
          <View className="flex-row justify-between items-center">
            <View className="flex-row -space-x-4">
              {[1,2,3].map((i) => (
                <View key={i} className="w-10 h-10 rounded-full bg-groups border-2 border-surface items-center justify-center">
                  <Text className="font-dmsans-bold text-white pr-1">🤖</Text>
                </View>
              ))}
              <View className="w-10 h-10 rounded-full bg-surface-soft border-2 border-surface items-center justify-center">
                <Text className="text-xs font-dmsans-bold text-foreground">+{group.members}</Text>
              </View>
            </View>
            <View className="px-4 py-2 rounded-full bg-primary/20">
              <Text className="text-xs font-dmsans-bold uppercase tracking-wider text-primary">{group.activity} Activity</Text>
            </View>
          </View>
        </Animated.View>
      ))}

      <Pressable className="mt-4 p-5 rounded-3xl border border-dashed border-groups items-center bg-groups/10">
        <Text className="text-lg font-syne text-groups">+ Join or Create a Squad</Text>
      </Pressable>
    </ScrollView>
    </SafeAreaView>
  );
}
