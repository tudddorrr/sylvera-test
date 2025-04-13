import { db as dbInstance } from '@/lib/db/db'
import { Project, projectsTable } from '@/lib/db/schema'

export class ProjectsService {
  constructor(private db: typeof dbInstance) {}

  async getProjects(): Promise<Project[]> {
    const projects = await this.db.select().from(projectsTable)
    return projects
  }
}
