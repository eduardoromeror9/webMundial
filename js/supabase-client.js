import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * Configuración pública de Supabase para el cliente web.
 *
 * Las credenciales se inyectan desde `js/config.js` (window.MLB_PICKS_CONFIG),
 * que debe ser generado en el build a partir de variables de entorno.
 * NUNCA se hardcodean claves aquí.
 *
 * Compatibilidad: si tu proyecto aún expone window.SUPABASE_URL / window.SUPABASE_ANON_KEY,
 * se respetan como fallback, pero se recomienda migrar a MLB_PICKS_CONFIG.
 */
const config = window.MLB_PICKS_CONFIG || {};
const SUPABASE_URL = config.supabaseUrl
  || window.SUPABASE_URL
  || null;
const SUPABASE_ANON_KEY = config.supabaseAnonKey
  || window.SUPABASE_ANON_KEY
  || null;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    '[MLB PICKS] Falta la configuración de Supabase. ' +
    'Copia js/config.example.js a js/config.js y completa URL y anon key. ' +
    'La aplicación no podrá autenticarse ni acceder a datos.'
  );
}

/**
 * Cliente único de Supabase para la aplicación.
 */
export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: window.localStorage
      }
    })
  : null;
