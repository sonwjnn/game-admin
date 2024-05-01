'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import tableApi from '@/services/api/modules/table-api'
import userApi from '@/services/api/modules/user-api'
import { useModal } from '@/store/use-modal-store'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'

export const DeleteTableModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'deleteTable'
  const [isLoading, setLoading] = useState(false)

  const { table } = data

  const onClick = async () => {
    try {
      if (!table) return

      setLoading(true)
      const { response, error } = await tableApi.delete(table.id)

      if (error) {
        toast.error('Something went wrong')
        return
      }

      toast.success('Table deleted!')
      onClose()
      router.push(`/tables`)
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Delete Table
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to do this? <br />
            <span className="font-semibold text-indigo-500">
              #{table?.name}
            </span>{' '}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
