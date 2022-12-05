import { createClient } from '@supabase/supabase-js'

if(!process.env.REACT_APP_SUPABASE_URL) {
    throw new Error ("Need to supply URL")
}

if(!process.env.REACT_APP_SUPABASE_URL) {
    throw new Error ("Need to supply an ANON KEY")
}


const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)