'use server'

import { redirect } from 'next/navigation'

/**
 * Signup action - handles user registration with email/password
 */
export async function signup(formData: FormData) {
  // Supabase 환경 변수가 없으면 회원가입을 우회합니다 (개발 환경용)
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
    console.warn('Supabase client unavailable in signup action:', error)
    redirect('/')
    return
  }

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // Validate input
  if (!name || !email || !password || !confirmPassword) {
    console.error('Signup failed: Missing required fields')
    return
  }

  if (password !== confirmPassword) {
    console.error('Signup failed: Passwords do not match')
    return
  }

  if (password.length < 6) {
    console.error('Signup failed: Password too short')
    return
  }

  // Attempt to sign up
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
      // 이메일 확인 없이 자동 로그인 (개발 환경)
      emailRedirectTo: undefined,
    },
  })

  if (error) {
    console.error('Signup error:', error.message, error.status)
    return
  }

  console.log('Signup successful for user:', data.user?.email)
  console.log('Email confirmation required:', data.user?.email_confirmed_at === null)

  // Redirect to login page on success
  redirect('/login')
}
