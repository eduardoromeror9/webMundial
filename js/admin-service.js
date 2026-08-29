import { supabase } from './supabase-client.js';

/**
 * MLB Picks — Servicio de Administración
 * Todas las operaciones sensibles se ejecutan mediante RPC SECURITY DEFINER,
 * que validan el rol admin en el backend. RLS restringe también el acceso.
 */

const BADGE = {
  pending: 'badge badge-pending',
  approved: 'badge badge-approved',
  rejected: 'badge badge-rejected',
};
const STATUS_TEXT = {
  pending: 'Pendiente',
  approved: 'Aprobado',
  rejected: 'Rechazado',
};

function mapError(error, fallback = 'Error en la operación.') {
  const msg = error?.message || '';
  const codes = {
    P0008: 'Acceso denegado: operación reservada para administradores.',
    P0003: 'El registro no existe.',
    P0006: 'Datos no válidos.',
  };
  for (const [code, text] of Object.entries(codes)) {
    if (msg.includes(`P000${code.slice(-1)}`) || msg.includes(code)) return text;
  }
  return msg || fallback;
}

/**
 * Lista perfiles por estado (pendientes, aprobados o todos).
 */
export async function listProfiles(status = null) {
  try {
    if (!supabase) return { success: false, error: 'Configuración de Supabase no disponible.', data: [] };
    let query = supabase
      .from('profiles')
      .select('id, email, phone, nickname, status, role, created_at')
      .order('created_at', { ascending: false });

    if (status) query = query.eq('status', status);

    const { data, error } = await query;
    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    return { success: false, error: mapError(error), data: [] };
  }
}

/**
 * Aprobar una solicitud.
 */
export async function approveUser(userId) {
  if (!supabase) return { success: false, error: 'Configuración de Supabase no disponible.' };
  const { data, error } = await supabase.rpc('approve_profile', { p_user_id: userId });
  if (error) return { success: false, error: mapError(error) };
  return { success: true, data };
}

/**
 * Rechazar una solicitud.
 */
export async function rejectUser(userId) {
  if (!supabase) return { success: false, error: 'Configuración de Supabase no disponible.' };
  const { data, error } = await supabase.rpc('reject_profile', { p_user_id: userId });
  if (error) return { success: false, error: mapError(error) };
  return { success: true, data };
}

/**
 * Cambiar el apodo público de un usuario.
 */
export async function updateNickname(userId, nickname) {
  if (!supabase) return { success: false, error: 'Configuración de Supabase no disponible.' };
  const { data, error } = await supabase.rpc('set_nickname', {
    p_user_id: userId,
    p_nickname: nickname,
  });
  if (error) return { success: false, error: mapError(error) };
  return { success: true, data };
}

/**
 * Tabla de posiciones pública.
 */
export async function getLeaderboard() {
  try {
    if (!supabase) return { success: false, error: 'Configuración de Supabase no disponible.', data: [] };
    const { data, error } = await supabase
      .from('public_leaderboard')
      .select('position, nickname, wins_total, losses_total, percentage, perfect_days')
      .order('position', { ascending: true });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    return { success: false, error: mapError(error), data: [] };
  }
}

/**
 * Picks de una fecha (por defecto hoy).
 */
export async function getPicksByDate(gameDate = null) {
  try {
    if (!supabase) return { success: false, error: 'Configuración de Supabase no disponible.', data: [] };
    const date = gameDate || new Date().toISOString().slice(0, 10);

    // Consulta join picks + games + profiles de forma legible.
    const { data, error } = await supabase
      .from('picks')
      .select(`
        id, game_id, user_id, selected_team, game_date, created_at, updated_at,
        profiles (nickname),
        games (start_time, home_team, away_team, status)
      `)
      .eq('game_date', date)
      .order('created_at', { ascending: true });

    if (error) return { success: false, error: mapError(error), data: [] };

    const dataNormalized = (data || []).map((row) => ({
      id: row.id,
      game_id: row.game_id,
      user_id: row.user_id,
      nickname: row.profiles?.nickname || '—',
      selected_team: row.selected_team,
      game_date: row.game_date,
      start_time: row.games?.start_time || null,
      home_team: row.games?.home_team || '—',
      away_team: row.games?.away_team || '—',
      status: row.games?.status || '—',
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));

    return { success: true, data: dataNormalized };
  } catch (error) {
    return { success: false, error: mapError(error), data: [] };
  }
}

/**
 * Juegos por fecha.
 */
export async function getGamesByDate(gameDate = null) {
  try {
    if (!supabase) return { success: false, error: 'Configuración de Supabase no disponible.', data: [] };
    const date = gameDate || new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from('games')
      .select('id, mlb_game_id, game_date, start_time, home_team, away_team, home_score, away_score, status, source')
      .eq('game_date', date)
      .order('start_time', { ascending: true });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    return { success: false, error: mapError(error), data: [] };
  }
}

/**
 * Guardar resultado (marca final y recalcula).
 */
export async function setGameResult(gameId, homeScore, awayScore) {
  if (!supabase) return { success: false, error: 'Configuración de Supabase no disponible.' };
  const { data, error } = await supabase.rpc('set_game_result', {
    p_game_id: gameId,
    p_home_score: homeScore,
    p_away_score: awayScore,
  });
  if (error) return { success: false, error: mapError(error) };
  return { success: true, data };
}

/**
 * Cambiar estado de un juego.
 */
export async function setGameStatus(gameId, status) {
  if (!supabase) return { success: false, error: 'Configuración de Supabase no disponible.' };
  const { data, error } = await supabase.rpc('set_game_status', {
    p_game_id: gameId,
    p_status: status,
  });
  if (error) return { success: false, error: mapError(error) };
  return { success: true, data };
}

/**
 * Crear/editar un juego manual.
 */
export async function upsertGame(payload) {
  if (!supabase) return { success: false, error: 'Configuración de Supabase no disponible.' };
  const { data, error } = await supabase.rpc('upsert_game', {
    p_game_id: payload.game_id ?? null,
    p_game_date: payload.game_date,
    p_start_time: payload.start_time ?? null,
    p_home_team: payload.home_team,
    p_away_team: payload.away_team,
    p_status: payload.status ?? 'scheduled',
    p_source: payload.source ?? 'manual',
  });
  if (error) return { success: false, error: mapError(error) };
  return { success: true, data };
}

export { BADGE, STATUS_TEXT };
