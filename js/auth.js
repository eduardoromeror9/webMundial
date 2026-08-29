import { supabase } from './supabase-client.js';

/**
 * Traduce errores comunes de Supabase Auth al español
 * @param {Error|Object} error 
 * @returns {string} Mensaje claro en español
 */
export function mapAuthError(error) {
  if (!error) return 'Ha ocurrido un error inesperado.';
  const msg = error.message || '';

  if (msg.includes('Invalid login credentials')) {
    return 'Correo electrónico o contraseña incorrectos.';
  }
  if (msg.includes('User already registered') || msg.includes('already registered')) {
    return 'Este correo electrónico ya se encuentra registrado.';
  }
  if (msg.includes('Password should be at least')) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  if (msg.includes('rate limit')) {
    return 'Demasiados intentos. Por favor espera unos minutos antes de reintentar.';
  }
  if (msg.includes('Email not confirmed')) {
    return 'Debes confirmar tu correo electrónico antes de ingresar.';
  }
  return msg || 'Error al procesar la solicitud de autenticación.';
}

/**
 * Registra un nuevo usuario en Supabase Auth
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 * @param {string} params.nickname
 * @param {string} [params.phone]
 */
export async function signUp({ email, password, nickname, phone = null }) {
  try {
    if (!supabase) {
      return { success: false, error: 'Configuración de Supabase no disponible. Revisa js/config.js.' };
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanNickname = nickname.trim();

    if (!cleanEmail || !password || !cleanNickname) {
      throw new Error('Por favor completa todos los campos obligatorios.');
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: password,
      options: {
        data: {
          nickname: cleanNickname,
          phone: phone ? phone.trim() : null
        }
      }
    });

    if (error) throw error;

    return { success: true, user: data.user, session: data.session };
  } catch (error) {
    console.error('Error en signUp:', error);
    return { success: false, error: mapAuthError(error) };
  }
}

/**
 * Inicia sesión con correo y contraseña
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 */
export async function signIn({ email, password }) {
  try {
    if (!supabase) {
      return { success: false, error: 'Configuración de Supabase no disponible. Revisa js/config.js.' };
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      throw new Error('Ingresa tu correo y contraseña.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password
    });

    if (error) throw error;

    // Obtener perfil asociado para conocer estado y rol
    const profile = await getCurrentProfile(data.user.id);

    return {
      success: true,
      user: data.user,
      session: data.session,
      profile: profile
    };
  } catch (error) {
    console.error('Error en signIn:', error);
    return { success: false, error: mapAuthError(error) };
  }
}

/**
 * Cierra la sesión activa
 */
export async function signOut() {
  try {
    if (!supabase) return { success: true };
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error en signOut:', error);
    return { success: false, error: mapAuthError(error) };
  }
}

/**
 * Obtiene el usuario autenticado actual desde la sesión activa
 */
export async function getCurrentUser() {
  try {
    if (!supabase) return null;
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch (error) {
    return null;
  }
}

/**
 * Obtiene el perfil público y estado desde la tabla profiles
 * @param {string} [userId] - Opcional, si no se envía se usa el usuario autenticado actual
 */
export async function getCurrentProfile(userId = null) {
  try {
    if (!supabase) return null;
    let targetId = userId;
    if (!targetId) {
      const user = await getCurrentUser();
      if (!user) return null;
      targetId = user.id;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, phone, nickname, status, role, created_at')
      .eq('id', targetId)
      .single();

    if (error) {
      console.warn('No se pudo obtener el perfil:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error en getCurrentProfile:', error);
    return null;
  }
}

/**
 * Escucha cambios en el estado de autenticación (SIGNED_IN, SIGNED_OUT, etc.)
 * @param {Function} callback 
 */
export function onAuthStateChange(callback) {
  if (!supabase) return () => {};
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}
