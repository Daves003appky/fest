import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xgiyrhrkethfqmimqmkm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnaXlyaHJrZXRoZnFtaW1xbWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NTY1NDksImV4cCI6MjA2NDQzMjU0OX0.383JvEZuPIDYlwgVuyLmkzYo3Pp_ePPb332V4d2-I0E';

export const supabase = createClient(supabaseUrl, supabaseKey);
