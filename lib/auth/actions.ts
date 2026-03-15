'use server'

import { redirect } from 'next/navigation'

/**
 * Logout action - signs out the current user
 */
export async function logout() {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch (error) {
    console.warn('Supabase client unavailable in logout action:', error)
  }

  redirect('/login')
}
