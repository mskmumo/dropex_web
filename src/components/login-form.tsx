

// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// // import { loginUser } from "../app/login/action"
// import { toast } from "@/hooks/use-toast"
// import Link from 'next/link'
// // import GoogleSignin from '../app/login/GoogleSignin'
// import { FcGoogle } from 'react-icons/fc'
// // import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { createClient } from '@/lib/supabase/client'

// const loginSchema = z.object({
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   password: z.string().min(1, {
//     message: "Password is required.",
//   }),
// })

// export function LoginForm() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   // const supabase = createClientComponentClient()
//   const supabase = createClient()

//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   async function onSubmit(values: z.infer<typeof loginSchema>) {
//     setIsLoading(true)
//     setServerError(null)
//     try {
//       const { error } = await supabase.auth.signInWithPassword({
//         email: values.email,
//         password: values.password,
//       })

//       if (error) {
//         setServerError(error.message)
//         setIsLoading(false)
//         return
//       }

//       // Fetch user role
//       const roleResponse = await fetch('/api/auth/get-user-role')
//       const { role } = await roleResponse.json()

//       if (!role) throw new Error('User role not found')

//       toast({
//         title: "Logged in successfully",
//         description: "Redirecting to dashboard...",
//       })
      
//       // Redirect based on user role
//       switch (role) {
//         case 'ADMIN':
//           router.push('/admin')
//           break
//         case 'CENTER':
//           router.push('/center')
//           break
//         case 'USER':
//         default:
//           router.push('/dashboard')
//           break
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error instanceof Error ? error.message : "An unexpected error occurred",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleGoogleSignIn = async () => {
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//       })
//       if (error) throw error
//       // Note: After Google sign-in, the user will be redirected back to the app
//       // You'll need to handle the redirect in your app to check the user's role and redirect accordingly
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error instanceof Error ? error.message : "An unexpected error occurred",
//         variant: "destructive",
//       })
//     }
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-gray-700">Email</FormLabel>
//               <FormControl>
//                 <Input placeholder="Email" {...field} className="bg-white" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-gray-700">Password</FormLabel>
//               <FormControl>
//                 <Input type="password" placeholder="Password" {...field} className="bg-white" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
    
    
//         <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
//           {isLoading ? "Logging in..." : "Login"}
//         </Button>
//         {/* <GoogleSignin /> */}
//         <div className="mt-4">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={handleGoogleSignIn}
//           className="w-full"
//         >
//           <FcGoogle className="w-5 h-5 mr-2" />
//           Sign in with Google
//         </Button>
//       </div>
//       </form>
//       <div className="mt-6 text-center">
//         <p className="text-gray-600">
//           Don&apos;t have an account?{' '}
//           <Link href="/register" className="text-blue-600 hover:underline font-medium">
//             Register
//           </Link>
//         </p>
//       </div>
//       <div className="mt-2 text-center">
//         <span className="text-gray-600 text-sm">
//           Forgot password?{' '}
//           <Link
//             href={`/forgot-password${
//               form.getValues("email") ? `?email=${encodeURIComponent(form.getValues("email"))}` : ""
//             }`}
//             className="text-blue-600 hover:underline font-medium"
//           >
//             Reset my password
//           </Link>
//         </span>
//       </div>
//     </Form>
//   )
// }

// export default LoginForm;

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { toast } from "@/hooks/use-toast"
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { createClient } from '@/utils/supabase/client'

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
  const [serverError, setServerError] = useState<string | null>(null)
  const supabase = createClient()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    setServerError(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) {
        setServerError(error.message)
        setIsLoading(false)
        return
      }

      // Fetch user role
      const { data: userData, error: roleError } = await supabase
        .from('users')
        .select('role')
        .single()

      if (roleError) throw new Error('Failed to fetch user role')

      toast({
        title: "Logged in successfully",
        description: "Redirecting to dashboard...",
      })
      
      // Redirect based on user role
      switch (userData.role) {
        case 'ADMIN':
          router.push('/admin')
          break
        case 'CENTER_USER':
          router.push('/center')
          break
        case 'USER':
        default:
          router.push('/dashboard')
          break
      }
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

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
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
              <FormLabel className="text-gray-700">Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} className="bg-white" />
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
              <FormLabel className="text-gray-700">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {serverError && (
          <div className="text-red-600 text-sm">{serverError}</div>
        )}
    
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Sign in with Google
          </Button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </div>
      <div className="mt-2 text-center">
        <span className="text-gray-600 text-sm">
          Forgot password?{' '}
          <Link
            href={`/forgot-password${
              form.getValues("email") ? `?email=${encodeURIComponent(form.getValues("email"))}` : ""
            }`}
            className="text-blue-600 hover:underline font-medium"
          >
            Reset my password
          </Link>
        </span>
      </div>
    </Form>
  )
}

export default LoginForm;

