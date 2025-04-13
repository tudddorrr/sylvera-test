import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = {
  status?: string
  onStatusChange?: (status: string) => void
}

enum ProjectStatus {
  UnderDevelopment = 'Under development',
  UnderValidation = 'Under validation',
  RegistrationRequested = 'Registration requested'
}

export function ProjectStatusDropdown({ status, onStatusChange }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='min-w-[200px] p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50'>
          {status || 'Select Status'}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={status} onValueChange={onStatusChange}>
          <DropdownMenuRadioItem value={''}>All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={ProjectStatus.UnderDevelopment}>Under development</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={ProjectStatus.UnderValidation}>Under validation</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={ProjectStatus.RegistrationRequested}>Registration requested</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
