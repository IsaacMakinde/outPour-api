// src/db/supabaseClient.js

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// If you're on the backend, use the SERVICE_ROLE_KEY instead of ANON_KEY
// It has full access and ignores RLS (careful! keep it secret).
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
