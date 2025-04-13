import { db } from '@/lib/db/db'
import { projectsTable } from '@/lib/db/schema'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  projects: typeof projectsTable.$inferSelect[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const projects = await db.select().from(projectsTable)
  res.status(200).json({ projects })
}
