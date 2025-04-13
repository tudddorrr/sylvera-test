import { db as dbInstance } from '@/lib/db/db'
import { Project, projectsTable } from '@/lib/db/schema'
import { count, eq } from 'drizzle-orm'

type GetProjectsOpts = {
  page: number
  limit: number
  status?: string
}

export class ProjectsService {
  constructor(private db: typeof dbInstance) {}

  async getProjects(opts: GetProjectsOpts): Promise<[Project[], number]> {
    const whereClause = () => {
      if (opts.status) {
        return eq(projectsTable.status, opts.status)
      }
    }

    const projects = await this.db
      .select()
      .from(projectsTable)
      .where(whereClause)
      .limit(opts.limit)
      .offset(opts.page * opts.limit)

    const totalCount = await this.db
      .select({ totalCount: count() })
      .from(projectsTable)
      .where(whereClause)
      .then(result => result[0]?.totalCount || 0)

    return [projects, totalCount]
  }
}
