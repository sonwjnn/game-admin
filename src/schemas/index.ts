// import { ChannelType, CleaningDelay, Statuses } from '@prisma/client'
import * as z from 'zod'

export const LoginSchema = z.object({
  username: z.string().min(1, { message: 'User name is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  username: z.string().min(6, { message: 'Minimun 6 characters required' }),
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Minimun 6 characters required' }),
})

export const ChatItemSchema = z.object({
  content: z.string().min(1),
})

export const UserSchema = z.object({
  username: z.string().min(1, { message: 'User name is required' }),
  email: z.string().email({ message: 'Email is required' }),
  name: z.string().min(1, { message: 'User name is required' }),
  image: z.string().min(1, { message: 'User image is required' }),
  role: z.string().min(1, { message: 'User role is required' }),
})

export const TableSchema = z
  .object({
    name: z.string().min(1, { message: 'Table name is required' }),
    minBuyIn: z
      .string()
      .min(1, { message: 'Minimum buy in is required' })
      .refine(value => !isNaN(Number(value)), {
        message: 'Minimum buy in must be a number',
      }),
    ante: z
      .string()
      .min(1, { message: 'Ante is required' })
      .refine(value => !isNaN(Number(value)), {
        message: 'Ante must be a number',
      }),
    chatBanned: z.boolean(),
  })
  .refine(data => Number(data.minBuyIn) >= Number(data.ante), {
    message: 'Ante must be less than or equal to Minimum buy in',
  })

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: 'Minimum 6 characters is required',
    }),
    newPassword: z.string().min(6, {
      message: 'Minimum 6 characters is required',
    }),
    confirmNewPassword: z.string().min(6, {
      message: 'Minimum 6 characters is required',
    }),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  })

export const CardActionSchema = z.object({
  amount: z.number().min(1, { message: 'Amount is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
})

export const BankSchema = z.object({
  cardNumber: z
    .string()
    .min(1, { message: 'Card number is required' })
    .regex(/^[0-9]+$/, { message: 'Card number must be a number' }),
  securityCode: z.string().min(1, { message: 'Security code is required' }),
  cardHolderName: z
    .string()
    .min(1, { message: 'Card holder name is required' }),
  expiryDate: z.string().min(1, { message: 'Expiry date is required' }),
})

export const RechargeSchema = z.object({
  amount: z
    .string()
    .min(1, { message: 'Amount is required' })
    .regex(/^[0-9]+$/, { message: 'Card number must be a number' }),
  status: z.string().min(1, { message: 'Status is required' }),
})

export const WithdrawSchema = z.object({
  amount: z
    .string()
    .min(1, { message: 'Amount is required' })
    .regex(/^[0-9]+$/, { message: 'Card number must be a number' }),
  status: z.string().min(1, { message: 'Status is required' }),
})
