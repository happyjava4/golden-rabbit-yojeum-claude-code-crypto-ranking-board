'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Login action - handles email/password authentication
 */
export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validate input
  if (!email || !password) {
    console.error('Login failed: Email or password missing')
    return
  }

  // Attempt to sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Login error:', error.message, error.status)
    return
  }

  console.log('Login successful for user:', data.user?.email)

  // Redirect to home page on success
  redirect('/')
}
