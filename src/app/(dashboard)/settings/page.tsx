'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'

const FormSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
})
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'


import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Package2,
} from 'lucide-react'
import React from 'react'

const Settings = async () => {
  
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      security_emails: true,
    },
  })
  
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav
          className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Users
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Admin
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              {/*<Menu className="h-5 w-5" />*/}
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="/users/list"
                className="text-muted-foreground hover:text-foreground"
              >
                Users
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        {/*<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">*/}
        {/*  <form className="ml-auto flex-1 sm:flex-initial">*/}
        {/*    <div className="relative">*/}
        {/*      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />*/}
        {/*      <Input*/}
        {/*        type="search"*/}
        {/*        placeholder="Search products..."*/}
        {/*        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </form>*/}
        {/*  <DropdownMenu>*/}
        {/*    <DropdownMenuTrigger asChild>*/}
        {/*      <Button variant="secondary" size="icon" className="rounded-full">*/}
        {/*        /!*<CircleUser className="h-5 w-5" />*!/*/}
        {/*        <span className="sr-only">Toggle user menu</span>*/}
        {/*      </Button>*/}
        {/*    </DropdownMenuTrigger>*/}
        {/*    <DropdownMenuContent align="end">*/}
        {/*      <DropdownMenuLabel>My Account</DropdownMenuLabel>*/}
        {/*      <DropdownMenuSeparator />*/}
        {/*      <DropdownMenuItem>Settings</DropdownMenuItem>*/}
        {/*      <DropdownMenuItem>Support</DropdownMenuItem>*/}
        {/*      <DropdownMenuSeparator />*/}
        {/*      <DropdownMenuItem>Logout</DropdownMenuItem>*/}
        {/*    </DropdownMenuContent>*/}
        {/*  </DropdownMenu>*/}
        {/*</div>*/}
      </header>
      <main
        className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div
          className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="/users/list">Security</Link>
            <Link href="/users/admin">Support</Link>
            <Link href="#">Advanced</Link>
          </nav>
          
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="marketing_emails"
                      render={({ field }) => (
                        <FormItem
                          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Marketing emails</FormLabel>
                            <FormDescription>
                              Receive emails about new products, features, and more.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="security_emails"
                      render={({ field }) => (
                        <FormItem
                          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Security emails</FormLabel>
                            <FormDescription>
                              Receive emails about your account security.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled
                              aria-readonly
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="marketing_emails"
                      render={({ field }) => (
                        <FormItem
                          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Marketing emails</FormLabel>
                            <FormDescription>
                              Receive emails about new products, features, and more.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="security_emails"
                      render={({ field }) => (
                        <FormItem
                          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Security emails</FormLabel>
                            <FormDescription>
                              Receive emails about your account security.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled
                              aria-readonly
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="marketing_emails"
                      render={({ field }) => (
                        <FormItem
                          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Marketing emails</FormLabel>
                            <FormDescription>
                              Receive emails about new products, features, and more.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="security_emails"
                      render={({ field }) => (
                        <FormItem
                          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Security emails</FormLabel>
                            <FormDescription>
                              Receive emails about your account security.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled
                              aria-readonly
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="marketing_emails"
                      render={({ field }) => (
                        <FormItem
                          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Marketing emails</FormLabel>
                            <FormDescription>
                              Receive emails about new products, features, and more.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="security_emails"
                      render={({ field }) => (
                        <FormItem
                          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Security emails</FormLabel>
                            <FormDescription>
                              Receive emails about your account security.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled
                              aria-readonly
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
         
          
          
          {/*<div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-2">*/}
          {/*  <Card x-chunk="dashboard-04-chunk-1">*/}
          {/*    <CardHeader>*/}
          {/*      <CardTitle>Store Name</CardTitle>*/}
          {/*      <CardDescription>*/}
          {/*        Used to identify your store in the marketplace.*/}
          {/*      </CardDescription>*/}
          {/*    </CardHeader>*/}
          {/*    <CardContent>*/}
          {/*      <form>*/}
          {/*        <Input placeholder="Store Name" />*/}
          {/*      </form>*/}
          {/*    </CardContent>*/}
          {/*    <CardFooter className="border-t px-6 py-4">*/}
          {/*      <Button>Save</Button>*/}
          {/*    </CardFooter>*/}
          {/*  </Card>*/}
          {/*  <Card x-chunk="dashboard-04-chunk-2">*/}
          {/*    <CardHeader>*/}
          {/*      <CardTitle>Store Name</CardTitle>*/}
          {/*      <CardDescription>*/}
          {/*        Used to identify your store in the marketplace.*/}
          {/*      </CardDescription>*/}
          {/*    </CardHeader>*/}
          {/*    <CardContent>*/}
          {/*      <form className="flex flex-col gap-4">*/}
          {/*        <Input*/}
          {/*          placeholder="Project Name"*/}
          {/*          defaultValue="Project Name ...."*/}
          {/*        />*/}
          {/*        <div className="flex items-center space-x-2">*/}
          {/*          <Checkbox id="include" defaultChecked />*/}
          {/*          <label*/}
          {/*            htmlFor="include"*/}
          {/*            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
          {/*          >*/}
          {/*            Allow*/}
          {/*          </label>*/}
          {/*        </div>*/}
          {/*      </form>*/}
          {/*    </CardContent>*/}
          {/*    <CardFooter className="border-t px-6 py-4">*/}
          {/*      <Button>Save</Button>*/}
          {/*    </CardFooter>*/}
          {/*  </Card>*/}
          {/*  <Card x-chunk="dashboard-04-chunk-1">*/}
          {/*    <CardHeader>*/}
          {/*      <CardTitle>Store Name</CardTitle>*/}
          {/*      <CardDescription>*/}
          {/*        Used to identify your store in the marketplace.*/}
          {/*      </CardDescription>*/}
          {/*    </CardHeader>*/}
          {/*    <CardContent>*/}
          {/*      <form>*/}
          {/*        <Input placeholder="Store Name" />*/}
          {/*      </form>*/}
          {/*    </CardContent>*/}
          {/*    <CardFooter className="border-t px-6 py-4">*/}
          {/*      <Button>Save</Button>*/}
          {/*    </CardFooter>*/}
          {/*  </Card>*/}
          {/*  <Card x-chunk="dashboard-04-chunk-2">*/}
          {/*    <CardHeader>*/}
          {/*      <CardTitle>Store Name</CardTitle>*/}
          {/*      <CardDescription>*/}
          {/*        Used to identify your store in the marketplace.*/}
          {/*      </CardDescription>*/}
          {/*    </CardHeader>*/}
          {/*    <CardContent>*/}
          {/*      <form className="flex flex-col gap-4">*/}
          {/*        <Input*/}
          {/*          placeholder="Project Name"*/}
          {/*          defaultValue="Project Name ...."*/}
          {/*        />*/}
          {/*        <div className="flex items-center space-x-2">*/}
          {/*          <Checkbox id="include" defaultChecked />*/}
          {/*          <label*/}
          {/*            htmlFor="include"*/}
          {/*            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
          {/*          >*/}
          {/*            Allow*/}
          {/*          </label>*/}
          {/*        </div>*/}
          {/*      </form>*/}
          {/*    </CardContent>*/}
          {/*    <CardFooter className="border-t px-6 py-4">*/}
          {/*      <Button>Save</Button>*/}
          {/*    </CardFooter>*/}
          {/*  </Card>*/}
          {/*  */}
          {/*</div>*/}
        
        
        </div>
      </main>
    
    
    </div>
  )
}

export default Settings



