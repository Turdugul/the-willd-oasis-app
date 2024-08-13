import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://mvupyxghclvnzzhdrffd.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12dXB5eGdoY2x2bnp6aGRyZmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyODkzMzIsImV4cCI6MjAzNjg2NTMzMn0.rRAbKbrN5Wy8iDGC1MUTClyUhAr-RVUrzdLvvn-V-YQ'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase
