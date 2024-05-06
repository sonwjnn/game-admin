'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type BankColumn = {
  id: string
  username: string
  cardNumber: string
  cardHolderName: string
  securityCode: string
  expiryDate: Date
}

export const columns: ColumnDef<BankColumn>[] = [
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
    accessorKey: 'securityCode',
    header: 'Security Code',
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
