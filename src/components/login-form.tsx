// "use client"

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
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
// import { loginUser } from "@/app/login/action";
// import { toast } from "@/hooks/use-toast"
// import Link from 'next/link'
// import GoogleSignin from '@/app/login/GoogleSignin'

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
//   const [serverError, setServerError] = useState<string | null>(null)

//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   const onSubmit=async (values: z.infer<typeof loginSchema>) => {
//     setServerError(null);
//     setIsLoading(true)
//     try {
//       const response = await loginUser({
//         email: values.email,
//         password: values.password,
//       });

//       const data = response as { success: boolean; message?: string; user: { id: unknown; email: unknown; role: string } } | { error: boolean; message: unknown }

//       if ('success' in data && data.success) {
//         toast({
//           title: "Logged in successfully",
//           description: "Redirecting to dashboard...",
//         })
        
//         // Redirect based on user role
//         const role = data.user.role;
//         switch (role) {
//           case 'SUPER_ADMIN':
//             router.push('/admin')
//             break
//           case 'CENTER_ADMIN':
//           case 'WAREHOUSE_STAFF':
//           case 'LOGISTICS_COORDINATOR':
//             router.push('/center')
//             break
//           default:
//             router.push('/dashboard')
//         }
//       } else {
//         throw new Error(typeof data.message === 'string' ? data.message : 'An error occurred during login')
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

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-navy-600">Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter your email" {...field} className="border-navy-300 focus:border-navy-500" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-navy-600">Password</FormLabel>
//                 <FormControl>
//                   <Input type="password" placeholder="Enter your password" {...field} className="border-navy-300 focus:border-navy-500" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
            
//           />
//           {serverError && (
//             <p className="text-red-500 text-sm mt-2">{serverError}</p>
//           )}
          
//           <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
//             {isLoading ? (
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//             ) : (
//               'Log in'
//             )}
//           </Button>
//           <GoogleSignin />
//         </form>
//       </Form>
//       <div className="mt-4 text-center">
//         <Link href="/register" className="text-sm text-navy-600 hover:underline">
//           Don&apos;t have an account? Register here
//         </Link>
//         <div className="text-muted-foreground text-sm">
//             Forgot password?{" "}
//             <Link
//               href={`/forgot-password${
//                 form.getValues("email") ? `?email=${encodeURIComponent(form.getValues("email"))}` : ""
//               }`}
//               className="underline"
//             >
//               Reset my password
//             </Link>
//           </div>
//       </div>
//     </div>
//   )
// }

// export default LoginForm;

"use client";

import React from 'react';
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
import { loginUser } from "../app/login/action"
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link'
import GoogleSignin from '../app/login/GoogleSignin'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const LoginForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setServerError(null);
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);
      
      const response = await loginUser(formData);

      if ('success' in response && response.success) {
        toast({
          title: "Logged in successfully",
          description: "Redirecting to dashboard...",
        });
        
        // Redirect based on user role
        const role = response.user.role;
        switch (role) {
          case 'SUPER_ADMIN':
            router.push('/admin');
            break;
          case 'CENTER_ADMIN':
          case 'WAREHOUSE_STAFF':
          case 'LOGISTICS_COORDINATOR':
            router.push('/center');
            break;
          default:
            router.push('/dashboard');
        }
      } else {
        throw new Error(response.message || 'An error occurred during login');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        {serverError && <p className="text-red-500 text-sm mt-2">{serverError}</p>}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        <GoogleSignin />
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

