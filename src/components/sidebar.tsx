import { cn } from '@/lib/utils'
import { LayoutDashboard, Table, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { UserButton } from './auth/user-button'
import { SidebarItem } from './sidebar-item'

type Props = {
  className?: string
}

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]',
        className
      )}
    >
      <Link href="/">
        <div className="flex items-center gap-x-3 pb-7 pt-8">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full max-w-full"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem
          label="Overview"
          href="/"
          icon={<LayoutDashboard className="mr-5" />}
        />
        <SidebarItem
          label="Users"
          href="/users"
          icon={<User className="mr-5" />}
        />
        <SidebarItem
          label="Tables"
          href="/tables"
          icon={<Table className="mr-5" />}
        />
      </div>
      <div className="p-4">
        <UserButton />
      </div>
    </div>
  )
}
