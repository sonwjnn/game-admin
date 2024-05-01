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
import withdrawApi from '@/services/api/modules/withdraw-api'
import { useModal } from '@/store/use-modal-store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export const DeleteWithdrawModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'deleteWithdraw'
  const [isLoading, setLoading] = useState(false)

  const { withdrawId } = data

  const onClick = async () => {
    try {
      if (!withdrawId) return

      setLoading(true)
      const { response, error } = await withdrawApi.delete(withdrawId)

      if (error) {
        toast.error('Something went wrong')
        return
      }

      toast.success('Withdraw deleted!')
      onClose()
      router.push(`/withdraws`)
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
            Delete Withdraw
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to do this? <br />
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
