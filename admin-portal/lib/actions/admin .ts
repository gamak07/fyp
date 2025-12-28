import { createClient } from '@supabase/supabase-js'

// Note: Ensure you add NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY to your .env.local
// WARNING: Never use this client on the browser/client-side code!
export const createAdminClient = () => 
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )