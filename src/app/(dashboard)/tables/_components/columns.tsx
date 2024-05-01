'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type TableColumn = {
  id: string
  name: string
  owner: string
  min: string
  max: string
}

export const columns: ColumnDef<TableColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'owner',
    header: 'Owner',
  },
  {
    accessorKey: 'min',
    header: 'Min Buy-in',
  },
  {
    accessorKey: 'max',
    header: 'Max Buy-in',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
