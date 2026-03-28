import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

import * as usersSchema from './users';
import * as habitsSchema from './habits';
import * as groupsSchema from './groups';
import * as reviewsSchema from './reviews';
import * as syncSchema from './sync';

export const schema = {
  ...usersSchema,
  ...habitsSchema,
  ...groupsSchema,
  ...reviewsSchema,
  ...syncSchema,
};

const expoDb = openDatabaseSync('commit_together.db');

export const db = drizzle(expoDb, { schema });
