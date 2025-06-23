import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://pcpaqaejaxxncumimevw.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcGFxYWVqYXh4bmN1bWltZXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NDQ4MDIsImV4cCI6MjA2NTMyMDgwMn0.amHYyeE674sfm4hhpCtr-xO68nTqwc9SvoBpaET897A"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
