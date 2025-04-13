import { ProjectStatusDropdown } from '@/components/project-status-dropdown'
import { ProjectsTable } from '@/components/projects-table'
import { useProjects } from '@/hooks/useProjects'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [page, setPage] = useState(0)
  const [status, setStatus] = useState<string | undefined>(undefined)

  const { projects, totalCount, isLastPage, isLoading, isError } = useProjects({ page, status })

  return (
    <main className='p-8 lg:p-24 space-y-8'>
      <Head>
        <title>Projects</title>
      </Head>

      {isLoading && (
        <div className='text-center'>
          <p>Loading...</p>
        </div>
      )}

      {isError && (
        <div className='text-center'>
          <p>Error loading projects</p>
        </div>
      )}

      <div className='space-y-2'>
        <p className='font-bold'>Status</p>
        <ProjectStatusDropdown status={status} onStatusChange={setStatus} />
      </div>

      {!isLoading && !isError && (
        <ProjectsTable
          projects={projects}
          totalCount={totalCount}
        />
      )}

      <div className='flex justify-center items-center space-x-8'>
        <button
          type='button'
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 0}
          className={cn('bg-emerald-600 w-8 h-8 flex items-center justify-center rounded-full text-white', page === 0 && 'invisible')}
        >
          <ArrowLeft className='w-4 h-4' />
        </button>
        <p className='text-center text-sm'>
          Page {page + 1}
        </p>
        <button
          type='button'
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isLastPage}
          className={cn('bg-emerald-600 w-8 h-8 flex items-center justify-center rounded-full text-white', isLastPage && 'invisible')}
        >
          <ArrowRight className='w-4 h-4' />
        </button>
      </div>
    </main>
  )
}
