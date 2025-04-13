import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'

export const testDb = drizzle(':memory:')
