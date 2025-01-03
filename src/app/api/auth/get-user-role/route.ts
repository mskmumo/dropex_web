'use server'

import { createClient } from '@/utils/supabase/server'

export async function getUserRole() {
  const supabase = createClient()

  try {
    const { data: { user } } = await (await supabase).auth.getUser()

    if (!user) {
      throw new Error('User not found')
    }

    const { data, error } = await (await supabase)
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (error) throw error

    return data.role
  } catch (error) {
    console.error('Error fetching user role:', error)
    throw error
  }
}

