import { getCurrentUser, getCurrentProfile } from './auth.js';

/**
 * Exige que el usuario tenga una sesión activa.
 * @param {string} [redirectUrl='login.html']
 * @returns {Promise<{ user: Object, profile: Object }|null>}
 */
export async function requireAuth(redirectUrl = 'login.html') {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = redirectUrl;
    return null;
  }

  const profile = await getCurrentProfile(user.id);
  return { user, profile };
}

/**
 * Exige que el usuario esté autenticado y tenga estado 'approved'.
 * Si está pendiente o rechazado, redirige a login.html con el parámetro de estado correspondiente.
 * @returns {Promise<{ user: Object, profile: Object }|null>}
 */
export async function requireApprovedUser() {
  const authData = await requireAuth('login.html');
  if (!authData) return null;

  const { profile } = authData;

  if (!profile || profile.status !== 'approved') {
    window.location.href = `login.html?status=${profile ? profile.status : 'pending'}`;
    return null;
  }

  return authData;
}

/**
 * Exige que el usuario esté autenticado y tenga rol de 'admin'.
 * @returns {Promise<{ user: Object, profile: Object }|null>}
 */
export async function requireAdmin() {
  const authData = await requireAuth('login.html');
  if (!authData) return null;

  const { profile } = authData;

  if (!profile || profile.role !== 'admin') {
    alert('Acceso restringido: Esta sección requiere permisos de administrador.');
    window.location.href = 'dashboard.html';
    return null;
  }

  return authData;
}

/**
 * Redirige a los usuarios que ya están autenticados y aprobados
 * (útil en páginas de login y registro)
 */
export async function redirectIfAuthenticated() {
  const user = await getCurrentUser();
  if (!user) return;

  const profile = await getCurrentProfile(user.id);
  if (!profile) return;

  if (profile.role === 'admin') {
    window.location.href = 'admin.html';
  } else if (profile.status === 'approved') {
    window.location.href = 'dashboard.html';
  }
}
