/**
 * MLB Picks — Configuración del cliente Supabase.
 *
 * Este archivo es una PLANTILLA. Para que la aplicación funcione:
 *
 *   1. Copia este archivo como `js/config.js` (mismo directorio).
 *   2. Reemplaza los valores por tu proyecto Supabase real
 *      (URL pública y ANON KEY del panel de Supabase > Settings > API).
 *
 *   cp js/config.example.js js/config.js
 *
 * En Netlify (o tu hosting) NO comitees `js/config.js`: genera el archivo en el
 * build a partir de variables de entorno, por ejemplo con un script:
 *
 *   echo "window.MLB_PICKS_CONFIG = {
 *     supabaseUrl: '$SUPABASE_URL',
 *     supabaseAnonKey: '$SUPABASE_ANON_KEY'
 *   };" > js/config.js
 *
 * IMPORTANTE: aquí solo se colocan claves PÚBLICAS (URL y anon key).
 * NUNCA pongas `service_role` ni otros secretos en el frontend.
 */
window.MLB_PICKS_CONFIG = {
  supabaseUrl: 'https://TU-PROYECTO.supabase.co',
  supabaseAnonKey: 'TU_ANON_KEY_PUBLICA'
};
