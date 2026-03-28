import type { Config } from 'drizzle-kit';

export default {
  schema: [
    './src/lib/db/users.ts',
    './src/lib/db/habits.ts',
    './src/lib/db/groups.ts',
    './src/lib/db/reviews.ts',
    './src/lib/db/sync.ts'
  ],
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;
