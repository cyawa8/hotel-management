import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://swxxsnbhjjjilhxrhvtq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3eHhzbmJoampqaWxoeHJodnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MjY0MzksImV4cCI6MjA1MjUwMjQzOX0.eZMMLax0mMNinknX1svokMSxaq0QYK8YY4VCnvsav1c";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

