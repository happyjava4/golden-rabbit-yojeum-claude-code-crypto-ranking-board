import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Create a Supabase client for Client Components
 * Used in components that run in the browser
 */
export function createClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !key) {
    if (typeof window !== 'undefined') {
      console.warn('Supabase environment variables are not configured for the browser client.')
    }
    return null
  }

  return createBrowserClient(url, key)
}
