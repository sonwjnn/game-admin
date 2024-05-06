'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type RechargeColumn = {
  id: string
  username: string
  cardNumber: string
  cardHolderName: string
  amount: string
  status: string
}

export const columns: ColumnDef<RechargeColumn>[] = [
  {
    accessorKey: 'username',
    header: 'User Name',
  },
  {
    accessorKey: 'cardNumber',
    header: 'Card Number',
  },
  {
    accessorKey: 'cardHolderName',
    header: 'Card Holder Name',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
