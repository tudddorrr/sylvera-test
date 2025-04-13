
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const projectsTable = sqliteTable('projects', {
  id: text().primaryKey(),
  url: text().notNull(),
  status: text().notNull(),
  country: text()
})
