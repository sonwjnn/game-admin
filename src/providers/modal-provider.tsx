'use client'

import { DeleteTableModal } from '@/components/modals/delete-table-modal'
import { DeleteUserModal } from '@/components/modals/delete-user-modal'
import { useOrigin } from '@/hooks/use-origin'

export const ModalProvider = () => {
  const origin = useOrigin()

  if (!origin) {
    return null
  }

  return (
    <>
      <DeleteTableModal />
      <DeleteUserModal />
    </>
  )
}
