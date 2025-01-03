'use server'

import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(1, 'Please select a country'),
  countryCode: z.string().min(1, 'Please select a country code'),
  phone: z.string().min(5, 'Phone number must be at least 5 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['USER', 'ADMIN', 'CENTER_USER']),
  agreement: z.enum(['true', 'false']).transform((val) => val === 'true'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export async function register(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries())
  
  try {
    const validatedData = registerSchema.parse(rawFormData)

    if (!validatedData.agreement) {
      return { success: false, error: 'You must agree to the terms and conditions' }
    }

    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          name: validatedData.name,
          country: validatedData.country,
          country_code: validatedData.countryCode,
          phone: validatedData.phone,
          role: validatedData.role,
        }
      }
    })

    if (error) {
      return { success: false, error: error.message }
    }

    // Insert additional user data into the users table
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: data.user?.id,
        email: validatedData.email,
        password: validatedData.password, // Note: In a real-world scenario, you should never store plain-text passwords
        name: validatedData.name,
        country: validatedData.country,
        country_code: validatedData.countryCode,
        phone: validatedData.phone,
        role: validatedData.role,
        agreement: validatedData.agreement,
      })

    if (profileError) {
      // If there's an error inserting into the users table, we should delete the auth user
      await supabase.auth.admin.deleteUser(data.user!.id)
      return { success: false, error: profileError.message }
    }

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: 'An unexpected error occurred' }
  }
}

