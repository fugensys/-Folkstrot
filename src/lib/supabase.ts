import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const isValidUrl = (url: string) => {
  try {
    if (!url) return false;
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isPlaceholder = (val: string) => !val || val.includes('placeholder') || val.includes('YOUR_');
const finalUrl = isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder.supabase.co';
const finalKey = supabaseAnonKey || 'placeholder-key';

if (isPlaceholder(supabaseUrl) || !supabaseAnonKey || !isValidUrl(supabaseUrl)) {
  console.warn('Supabase URL or Anon Key is missing, invalid, or using placeholder.');
}

export const supabase = createClient(finalUrl, finalKey);

// Connection test
export const testSupabaseConnection = async () => {
  return { connected: false, error: 'Database is currently disconnected. Using mock data mode.' };
};
