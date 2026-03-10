'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Signup action - handles user registration with email/password
 */
export async function signup(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // Validate input
  if (!name || !email || !password || !confirmPassword) {
    return
  }

  if (password !== confirmPassword) {
    return
  }

  if (password.length < 6) {
    return
  }

  // Attempt to sign up
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (error) {
    return
  }

  // Redirect to login page on success
  redirect('/login')
}
