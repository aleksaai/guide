import { createClient } from '@supabase/supabase-js'

// Same Supabase project as the rest of Aleksa's ai-team stack.
// Anon key is a public JWT — safe to commit. Lesson from IBCB migration:
// hardcoding protects against env-var silent overrides on Netlify.
const SUPABASE_URL = 'https://znltfcxpngtztiwbcamm.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpubHRmY3hwbmd0enRpd2JjYW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMTcwNzUsImV4cCI6MjA3MTc5MzA3NX0.3wEqXGqrCiERW-e6aY3eMcLY7Yt6uDDBmO_Y-MrXnos'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
})

export const EDGE = `${SUPABASE_URL}/functions/v1`
