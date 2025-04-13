import { describe, it, beforeEach, expect } from 'vitest'
import { ProjectsService } from '@/services/projects.service'
import { testDb } from '@/lib/db/testDb'
import { projectsTable } from '@/lib/db/schema'

describe('ProjectsService', () => {
  const service = new ProjectsService(testDb)

  beforeEach(async () => {
    await testDb.delete(projectsTable)
  })

  it('should return all projects when no filter is applied', async () => {
    await testDb.insert(projectsTable).values([
      { id: 'cfafa6a2-6bca-45d1-9ae3-8ed7bc01d99d', status: 'Under validation', url: 'https://registry.verra.org/app/projectDetail/VCS/4699' },
      { id: '05488a5c-268e-498a-90e9-97d87e728040', status: 'Registration requested', url: 'https://registry.verra.org/app/projectDetail/VCS/4670', country: 'China' },
      { id: '1f6c85ee-ad77-42f5-822a-407496a77091', status: 'Under development', url: 'https://registry.verra.org/app/projectDetail/VCS/4671' },
    ])

    const [projects, total] = await service.getProjects({ page: 0, limit: 10 })
    expect(projects.length).toBe(3)
    expect(total).toBe(3)
  })

  it('should filter projects by status', async () => {
    await testDb.insert(projectsTable).values([
      { id: 'cfafa6a2-6bca-45d1-9ae3-8ed7bc01d99d', status: 'Under validation', url: 'https://registry.verra.org/app/projectDetail/VCS/4699' },
      { id: '1f6c85ee-ad77-42f5-822a-407496a77091', status: 'Under validation', url: 'https://registry.verra.org/app/projectDetail/VCS/4671' },
      { id: '05488a5c-268e-498a-90e9-97d87e728040', status: 'Registration requested', url: 'https://registry.verra.org/app/projectDetail/VCS/4670', country: 'China' }
    ])

    const [projects, total] = await service.getProjects({ page: 0, limit: 10, status: 'Under validation' })
    expect(projects.length).toBe(2)
    expect(total).toBe(2)
  })

  it('should return paginated results', async () => {
    await testDb.insert(projectsTable).values([
      { id: 'cfafa6a2-6bca-45d1-9ae3-8ed7bc01d99d', status: 'Under validation', url: 'https://registry.verra.org/app/projectDetail/VCS/4699' },
      { id: '05488a5c-268e-498a-90e9-97d87e728040', status: 'Registration requested', url: 'https://registry.verra.org/app/projectDetail/VCS/4670', country: 'China' },
      { id: '1f6c85ee-ad77-42f5-822a-407496a77091', status: 'Under development', url: 'https://registry.verra.org/app/projectDetail/VCS/4671' },
    ])

    const [projects, total] = await service.getProjects({ page: 0, limit: 2 })
    expect(projects.length).toBe(2)
    expect(total).toBe(3)
  })
})
