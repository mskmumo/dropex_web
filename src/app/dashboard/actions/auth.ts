'use server'

import { cookies } from 'next/headers'

export async function getAuthData() {
  const cookieStore = cookies()
  return {
    token: (await cookieStore).get('token')?.value,
    // other cookie data you need
  }
}