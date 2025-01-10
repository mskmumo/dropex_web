"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import Link from 'next/link'
import { redirectBasedOnRole } from '@/lib/auth'

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Store the token in localStorage
      localStorage.setItem('token', data.token)

      toast({
        title: "Logged in successfully",
        description: "Redirecting to dashboard...",
      })
      
      // Redirect based on user role
      const redirectUrl = redirectBasedOnRole(data.user.role)
      router.push(redirectUrl)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy-600">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} className="border-navy-300 focus:border-navy-500" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy-600">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} className="border-navy-300 focus:border-navy-500" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-navy-600 hover:bg-navy-700 text-white" disabled={isLoading}>
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            'Log in'
          )}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Link href="/register" className="text-sm text-navy-600 hover:underline">
          Don't have an account? Register here
        </Link>
      </div>
      <div className="mt-2 text-center">
        <Link href="/forgot-password" className="text-sm text-navy-600 hover:underline">
          Forgot your password?
        </Link>
      </div>
    </Form>
  )
}
