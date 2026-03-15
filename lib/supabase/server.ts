import "server-only";
import { createServerClient } from '@supabase/ssr'

/**
 * Create a Supabase client for Server Components, Server Actions, and Route Handlers
 * Uses cookies for authentication state management
 */
export async function createClient() {
  // Supabase 환경 변수가 없으면 에러 방지
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    throw new Error('Supabase environment variables are not configured');
  }

  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component에서는 쿠키 설정이 불가능할 수 있음
            // Middleware에서 처리됨
          }
        },
      },
    }
  )
}
