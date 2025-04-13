import { ProjectsIndexResponse } from '@/pages/api/projects'
import { useCallback } from 'react'
import useSWR from 'swr'

export function useProjects({ page, status }: { page: number, status?: string }) {
  const fetcher = useCallback(([url, page, status]: [string, number, string?]) => {
    return fetch(`${url}?page=${page}${status ? `&status=${status}` : ''}`).then((res) => res.json())
  }, [])

  const { data, error, isLoading, mutate } = useSWR<ProjectsIndexResponse>(
    ['/api/projects', page, status],
    fetcher
  )

  return {
    projects: data?.projects ?? [],
    itemsPerPage: data?.itemsPerPage ?? 0,
    totalCount: data?.totalCount ?? 0,
    isLastPage: data?.isLastPage ?? false,
    isLoading,
    isError: error,
    mutate
  }
}
