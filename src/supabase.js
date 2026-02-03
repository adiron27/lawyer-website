import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qcmpjezgdmnqscgwpmrm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjbXBqZXpnZG1ucXNjZ3dwbXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMDk1OTUsImV4cCI6MjA4NTY4NTU5NX0.YJrRwoTI--9dSyFtlo5XeVzK_eSEto3njQ7Q50nyhYc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
