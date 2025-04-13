import { ProjectsTable } from '@/components/projects-table'
import { useProjects } from '@/hooks/useProjects'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [page, setPage] = useState(0)
  const { projects, totalCount, isLastPage, isLoading, isError } = useProjects({ page })

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
          className={cn('bg-emerald-500 w-8 h-8 flex items-center justify-center rounded-full text-white', page === 0 && 'invisible')}
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
          className={cn('bg-emerald-500 w-8 h-8 flex items-center justify-center rounded-full text-white', isLastPage && 'invisible')}
        >
          <ArrowRight className='w-4 h-4' />
        </button>
      </div>
    </main>
  )
}
