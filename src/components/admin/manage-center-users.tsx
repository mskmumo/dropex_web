"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

const centerUserSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(5, { message: "Phone number must be at least 5 characters." }),
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  role: z.enum(['WAREHOUSE_STAFF', 'LOGISTICS_COORDINATOR', 'CENTER_ADMIN']),
  employeeId: z.string().min(1, { message: "Employee ID is required." }),
  governmentId: z.string().optional(),
  workLocation: z.string().min(1, { message: "Work location is required." }),
  shift: z.string().min(1, { message: "Shift is required." }),
})

export function ManageCenterUsers() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof centerUserSchema>>({
    resolver: zodResolver(centerUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      username: "",
      role: "WAREHOUSE_STAFF",
      employeeId: "",
      governmentId: "",
      workLocation: "",
      shift: "",
    },
  })

  async function onSubmit(values: z.infer<typeof centerUserSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/create-center-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to create center user')
      }

      const data = await response.json()
      toast({
        title: "Success",
        description: `Center user ${data.name} created successfully.`,
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create center user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="WAREHOUSE_STAFF">Warehouse Staff</SelectItem>
                  <SelectItem value="LOGISTICS_COORDINATOR">Logistics Coordinator</SelectItem>
                  <SelectItem value="CENTER_ADMIN">Center Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input placeholder="EMP001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="governmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Government ID (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="ID12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Location</FormLabel>
              <FormControl>
                <Input placeholder="Warehouse A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shift"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shift</FormLabel>
              <FormControl>
                <Input placeholder="Morning Shift" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Center User"}
        </Button>
      </form>
    </Form>
  )
}

