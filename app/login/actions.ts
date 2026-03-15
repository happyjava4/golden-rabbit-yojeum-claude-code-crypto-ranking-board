'use server'

import { redirect } from 'next/navigation'

/**
 * Login action - handles email/password authentication
 */
export async function login(formData: FormData) {
  // Supabase 환경 변수가 없으면 로그인을 우회합니다 (개발 환경용)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    console.log('Supabase disabled - redirecting to home page')
    redirect('/')
    return
  }

  let supabase
  try {
    const { createClient } = await import('@/lib/supabase/server')
    supabase = await createClient()
  } catch (error) {
    console.warn('Supabase client unavailable in login action:', error)
    redirect('/')
    return
  }

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
