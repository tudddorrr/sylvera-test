import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Project } from '@/lib/db/schema'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = {
  projects: Project[]
  totalCount: number
}

export function ProjectsTable({ projects, totalCount }: Props) {
  return (
    <Table>
      <TableCaption>Showing {projects.length} of {totalCount} projects</TableCaption>
      <TableHeader>
        <TableRow>
          {['ID', 'Status', 'URL', 'Country'].map((header) => (
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
            <TableCell className={cn('text-right', !project.country && 'text-gray-400')}>
              {project.country ?? 'No country'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
