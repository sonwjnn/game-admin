'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { useCurrentUser } from '@/hooks/use-current-user'
import { TableSchema } from '@/schemas'
import tableApi from '@/services/api/modules/table-api'
import { useModal } from '@/store/use-modal-store'
import { Table } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

type TableFormProps = {
  initialData: Table | null
}

export const TableForm = ({ initialData }: TableFormProps) => {
  const { onOpen } = useModal()

  const user = useCurrentUser()
  const router = useRouter()
  const { update } = useSession()

  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit table' : 'Create table'
  const description = initialData ? 'Edit a table.' : 'Add a new table'
  const toastMessage = initialData ? 'Table updated.' : 'Table created.'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<z.infer<typeof TableSchema>>({
    resolver: zodResolver(TableSchema),
    defaultValues: initialData || {
      name: '',
      minBuyIn: '',
      ante: '',
      chatBanned: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof TableSchema>) => {
    try {
      if (!user) return

      setLoading(true)

      if (initialData) {
        const { response, error } = await tableApi.update(
          { ...values, minBuyIn: +values.minBuyIn, ante: +values.ante },
          initialData?.id as string
        )
        if (error) {
          toast.error('Some thing went wrong.')
          return
        }
      } else {
        const { response, error } = await tableApi.create({
          ...values,
          minBuyIn: +values.minBuyIn,
          ante: +values.ante,
          userId: user.id,
        })
        if (error) {
          toast.error('Some thing went wrong.')
          return
        }
      }

      router.push(`/tables`)
      router.refresh()
      toast.success(toastMessage)
    } catch (error: any) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() =>
              onOpen('deleteTable', {
                table: {
                  id: initialData.id,
                  name: initialData.name,
                  min: initialData.minBuyIn.toString(),
                  max: initialData.maxBuyIn.toString(),
                  ante: initialData.ante.toString(),
                  owner: initialData.userId,
                },
              })
            }
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Table name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minBuyIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min buy-in</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input disabled={loading} {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ante"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ante</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input disabled={loading} {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chatBanned"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <FormLabel>Chat Banned</FormLabel>
                  <FormControl>
                    <Switch
                      disabled={loading}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
