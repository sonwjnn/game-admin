'use client'

import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
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
import { useCurrentUser } from '@/hooks/use-current-user'
import { BankSchema } from '@/schemas'
import bankApi from '@/services/api/modules/bank-api'
import { useModal } from '@/store/use-modal-store'
import { Bank } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

type BankFormProps = {
  initialData: Bank
}

export const BankForm = ({ initialData }: BankFormProps) => {
  const user = useCurrentUser()
  const { onOpen } = useModal()

  const [isPending, startTransition] = useTransition()

  const title = initialData ? 'Edit bank' : 'Create bank'
  const description = initialData ? 'Edit a bank.' : 'Add a new bank'
  const toastMessage = initialData ? 'Bank updated.' : 'User created.'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm({
    resolver: zodResolver(BankSchema),
    defaultValues: {
      cardNumber: '',
      securityCode: '',
      cardHolderName: '',
      expiryDate: '',
    },
  })

  useEffect(() => {
    if (initialData) {
      form.setValue('cardNumber', initialData?.cardNumber || '')
      form.setValue('securityCode', initialData?.securityCode || '')
      form.setValue('cardHolderName', initialData?.cardHolderName || '')
      form.setValue('expiryDate', initialData?.expiryDate.toString() || '')
    }
  }, [initialData, form])

  const onSubmit = async (values: z.infer<typeof BankSchema>) => {
    if (!user) return

    startTransition(async () => {
      if (!initialData) {
        const { response, error } = await bankApi.create({
          ...values,
          expiryDate: new Date(values.expiryDate),
          userId: user?.id as string,
        })

        if (error) {
          toast.error('Something went wrong!')
          return
        }

        toast.success(toastMessage)
      } else {
        const { response, error } = await bankApi.update(
          {
            ...values,
            expiryDate: new Date(values.expiryDate),
          },
          initialData?.id
        )

        if (error) {
          toast.error('Something went wrong!')
          return
        }

        toast.success(toastMessage)
      }
    })
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isPending}
            variant="destructive"
            size="sm"
            onClick={() =>
              onOpen('deleteBank', {
                bankId: initialData.id,
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
          className="w-full space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Type your card number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="securityCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Security Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Type your security code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Holder Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Type your card holder name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <div>
                      <DatePicker
                        date={new Date(field.value ? field.value : new Date())}
                        setDate={date => field.onChange(date?.toString())}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isPending} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
