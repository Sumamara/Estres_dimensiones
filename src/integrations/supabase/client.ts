
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://guifmmxlfjpitoeuodwl.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1aWZtbXhsZmpwaXRvZXVvZHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxOTM0MzYsImV4cCI6MjA4NDc2OTQzNn0.q5xynLU_IDUf7NhD8gC_1HpdchfFdxsDhfVmESixP8k';

export const supabase = createClient(supabaseUrl, supabaseKey);
