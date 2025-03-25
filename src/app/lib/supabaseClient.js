// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';





const supabaseUrl = process.env.NEXT_PUBLIC_supabase_url;
const supabaseKey = process.env.NEXT_PUBLIC_supabase_key;





const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;