import { ProjectsIndexResponse } from '@/pages/api/projects'
import { useCallback } from 'react'
import useSWR from 'swr'

export function useProjects() {
  const fetcher = useCallback((url: string) => {
    return fetch(url).then((res) => res.json())
  }, [])

  const { data, error, isLoading, mutate } = useSWR<ProjectsIndexResponse>('/api/projects', fetcher)

  return {
    projects: data?.projects,
    isLoading,
    isError: error,
    mutate
  }
}
