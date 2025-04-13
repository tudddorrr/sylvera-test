import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useProjects } from '@/hooks/useProjects'
import { cn } from '@/lib/utils'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const { projects, isLoading, isError } = useProjects()
  return (
    <main className='p-8 md:p-24'>
      <Head>
        <title>Projects</title>
      </Head>

      {isLoading && (
        <div className='text-center'>
          <p className='text-lg'>Loading...</p>
        </div>
      )}

      {isError && (
        <div className='text-center'>
          <p className='text-lg'>Error loading projects</p>
        </div>
      )}

      {projects && (
        <Table>
          <TableHeader>
            <TableRow>
              {['ID', 'Status', 'URL', 'Status', 'Country'].map((header) => (
                <TableHead key={header} className={cn('font-bold', header === 'Country' ? 'text-right' : '')}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  {project.id}
                </TableCell>
                <TableCell>
                  {project.status}
                </TableCell>
                <TableCell>
                  <Link href={project.url} className='text-emerald-600 hover:underline' target='_blank' rel='noopener noreferrer'>
                    {project.url}
                  </Link>
                </TableCell>
                <TableCell>
                  {project.status}
                </TableCell>
                <TableCell className={cn('text-right', !project.country && 'text-gray-400')}>
                  {project.country ?? 'No country'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  )
}
