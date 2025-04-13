import { db } from '@/lib/db/db'
import { Project } from '@/lib/db/schema'
import { ProjectsService } from '@/services/projects.service'
import type { NextApiRequest, NextApiResponse } from 'next'

export type ProjectsIndexResponse = {
  projects: Project[]
  itemsPerPage: number
  totalCount: number
  isLastPage: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectsIndexResponse>,
) {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }

  const { page, status } = req.query
  if (typeof page !== 'string') {
    res.status(400).end('Page is required')
    return
  }

  const service = new ProjectsService(db)
  const itemsPerPage = 10

  const [projects, totalCount] = await service.getProjects({
    page: Number(page),
    limit: itemsPerPage,
    status: status as string | undefined
  })

  res.status(200).json({
    projects,
    totalCount,
    itemsPerPage,
    isLastPage: projects.length < itemsPerPage,
  })
}
