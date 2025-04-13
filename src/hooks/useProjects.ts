import { ProjectsIndexResponse } from '@/pages/api/projects'
import { useCallback } from 'react'
import useSWR from 'swr'

type FetcherParams = [string, number, string?]

export function useProjects({ page, status }: { page: number, status?: string }) {
  const fetcher = useCallback(([url, page, status]: FetcherParams) => {
    const query = new URLSearchParams({ page: page.toString() })
    if (status) query.set('status', status)
    return fetch(`${url}?${query}`).then((res) => res.json())
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
