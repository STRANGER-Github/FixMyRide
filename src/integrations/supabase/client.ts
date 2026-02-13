import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tbpbnptyzyohxhgxblel.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRicGJucHR5enlvaHhoZ3hibGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTIzNDIsImV4cCI6MjA4NjM4ODM0Mn0.2f-QnjD-Np2tV1HGcTfps-6-D9HO8YPSsJ4qK1OKUSU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});