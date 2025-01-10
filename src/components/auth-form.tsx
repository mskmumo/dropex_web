'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { register } from '@/app/api/auth/register/route'
import { Loader2 } from 'lucide-react'

const passwordMatchSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
})

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(1, 'Please select a country'),
  countryCode: z.string().min(1, 'Please select a country code'),
  phone: z.string().min(5, 'Phone number must be at least 5 characters'),
  role: z.enum(['USER', 'ADMIN', 'CENTER_USER']),
  agreement: z.boolean().refine((val) => val === true, 'You must agree to the terms and conditions'),
}).and(passwordMatchSchema)


const countryCodes = [
  { value: "+1", label: "+1 (US, Canada)" },
  { value: "+52", label: "+52 (Mexico)" },
  { value: "+55", label: "+55 (Brazil)" },
  { value: "+54", label: "+54 (Argentina)" },
  { value: "+56", label: "+56 (Chile)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+49", label: "+49 (Germany)" },
  { value: "+33", label: "+33 (France)" },
  { value: "+39", label: "+39 (Italy)" },
  { value: "+34", label: "+34 (Spain)" },
  { value: "+31", label: "+31 (Netherlands)" },
  { value: "+90", label: "+90 (Turkey)" },
  { value: "+86", label: "+86 (China)" },
  { value: "+91", label: "+91 (India)" },
  { value: "+66", label: "+66 (Thailand)" },
  { value: "+971", label: "+971 (UAE)" },
  { value: "+27", label: "+27 (South Africa)" },
  { value: "+20", label: "+20 (Egypt)" },
  { value: "+254", label: "+254 (Kenya)" },
  { value: "+256", label: "+256 (Uganda)" },
  { value: "+250", label: "+250 (Rwanda)" },
  { value: "+234", label: "+234 (Nigeria)" },
  { value: "+260", label: "+260 (Zambia)" },
  { value: "+243", label: "+243 (DRC)" },
  { value: "+255", label: "+255 (Tanzania)" },
]

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "br", label: "Brazil" },
  { value: "ar", label: "Argentina" },
  { value: "cl", label: "Chile" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "nl", label: "Netherlands" },
  { value: "tr", label: "Turkey" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "th", label: "Thailand" },
  { value: "ae", label: "UAE" },
  { value: "za", label: "South Africa" },
  { value: "eg", label: "Egypt" },
  { value: "ke", label: "Kenya" },
  { value: "ug", label: "Uganda" },
  { value: "rw", label: "Rwanda" },
  { value: "ng", label: "Nigeria" },
  { value: "zm", label: "Zambia" },
  { value: "cd", label: "DRC" },
  { value: "tz", label: "Tanzania" },
]

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null)
  const router = useRouter()
  // const [showVerificationDialog, setShowVerificationDialog] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      country: '',
      countryCode: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      role: 'USER',
      agreement: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setServerError(null)
    setConfirmationMessage(null)

    try {
      const response = await registerUser({
        name: values.name,
        email: values.email,
        country: values.country,
        countryCode: values.countryCode,
        phone: values.phone,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        role: values.role,
        agreement: values.agreement
      })

      if (response.error) {
        setServerError(response.message)
      } else {
        setConfirmationMessage("Registration successful! Please check your email for a verification link.")
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} className="bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} className="bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-gray-700">Country Code</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countryCodes.map((code) => (
                        <SelectItem key={code.value} value={code.value}>
                          {code.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-[2]">
                  <FormLabel className="text-gray-700">Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} className="bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} className="bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password" {...field} className="bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </FormControl>
                <FormMessage className="text-red-600" />
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
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="CENTER_USER">Center User</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agreement"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-gray-700">
                    I agree to the <Link href="/terms" className="underline text-blue-500">Terms and Conditions</Link> and <Link href="/license" className="underline text-blue-500">License Agreement</Link>
                  </FormLabel>
                  <FormMessage className="text-red-600" />
                </div>
              </FormItem>
            )}
          />
          {serverError && (
            <div className="text-red-600 text-sm">{serverError}</div>
          )}
          {confirmationMessage && (
            <div className="text-green-600 text-sm">{confirmationMessage}</div>
          )}
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Register'
            )}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center">
        <Link href="/login" className="text-sm text-gray-600 hover:underline">
          Already have an account? Log in here
        </Link>
      </div>
    </div>
  )
}

