import { testDb } from '@/lib/db/testDb'
import { migrate } from 'drizzle-orm/libsql/migrator'

beforeAll(async () => {
  const db = testDb
  await migrate(db, { migrationsFolder: './drizzle' })
})
