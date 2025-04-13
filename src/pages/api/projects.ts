import { db } from '@/lib/db/db'
import { Project } from '@/lib/db/schema'
import { ProjectsService } from '@/services/projects.service'
import type { NextApiRequest, NextApiResponse } from 'next'

export type ProjectsIndexResponse = {
  projects: Project[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectsIndexResponse>,
) {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }

  const service = new ProjectsService(db)
  const projects = await service.getProjects()
  res.status(200).json({ projects })
}
