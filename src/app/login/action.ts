"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validatedFields = loginSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return { error: true, message: "Invalid email or password format." };
  }

  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (!data.user) {
      return { error: true, message: "Login failed. Please try again." };
    }

    // Fetch user role from your database
    const { data: userData, error: userError } = await supabase
      .from('User')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (userError) throw userError;

    return {
      success: true,
      message: "Login successful",
      user: {
        id: data.user.id,
        email: data.user.email,
        role: userData.role,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: true,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

