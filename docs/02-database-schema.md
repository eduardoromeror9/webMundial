# MLB Picks — Esquema de base de datos

## Convenciones

- Usar `auth.users` para credenciales de Supabase.
- Usar `profiles` para datos públicos y estado de acceso.
- Guardar horas como `timestamptz` en UTC.
- Convertir la hora solo al mostrarla en la interfaz.
- Usar nombres de equipo y, si es posible, códigos oficiales MLB.

## profiles

Datos de usuario que no pertenecen directamente a Auth.

```text
id                uuid, PK, referencia a auth.users(id)
email             text, único
phone             text, opcional
nickname          text, no nulo
status            pending | approved | rejected
role              user | admin
created_at        timestamptz
updated_at        timestamptz
```

Notas:

- El nickname es el único dato de perfil expuesto en la tabla pública.
- El administrador puede modificar el nickname.
- `role = admin` no debe poder cambiarlo un usuario normal.

## games

```text
id                bigint, PK
mlb_game_id       bigint, único, opcional para carga manual
game_date         date
start_time        timestamptz
home_team         text
away_team         text
home_score        integer, nulo hasta el final
away_score        integer, nulo hasta el final
status            scheduled | live | final | postponed | cancelled
source            mlb_api | manual
created_at        timestamptz
updated_at        timestamptz
```

Índices requeridos:

- `mlb_game_id` único cuando exista.
- `game_date`.
- `start_time`.

## picks

```text
id                bigint, PK
user_id           uuid, FK a profiles(id)
game_id           bigint, FK a games(id)
game_date         date
selected_team     text
created_at        timestamptz
updated_at        timestamptz
```

Restricciones requeridas:

- Un usuario no puede tener más de un pick para el mismo juego: `unique(user_id, game_id)`.
- `selected_team` debe ser el equipo local o visitante del juego.
- Solo se permiten tres picks por usuario y fecha.
- No se puede insertar ni editar cuando `now() >= games.start_time`.

Las dos últimas reglas deben vivir en una función RPC o trigger de Postgres. Validarlas en JavaScript mejora la experiencia, pero no es suficiente para seguridad.

## daily_records

Tabla materializada por jornada para historial y eficiencia.

```text
id                bigint, PK
user_id           uuid, FK a profiles(id)
game_date         date
wins              integer, no nulo, default 0
losses            integer, no nulo, default 0
pick_count        integer, no nulo, default 0
is_perfect        boolean, no nulo, default false
calculated_at     timestamptz
unique(user_id, game_date)
```

Un día perfecto significa exactamente tres picks finalizados y tres victorias.

## Vistas recomendadas

### public_leaderboard

Debe devolver únicamente:

```text
nickname
wins_total
losses_total
percentage
perfect_days
position
```

Orden:

1. Porcentaje descendente.
2. Días perfectos descendente.
3. Victorias descendente.
4. Nickname ascendente.

### user_history

Debe servir el historial de un usuario con:

```text
game_date
wins
losses
pick_count
is_perfect
```

## Reglas RLS mínimas

- Visitantes pueden leer `public_leaderboard` y juegos públicos.
- Usuario autenticado puede leer solo su fila de `profiles`.
- Usuario aprobado puede leer, crear y actualizar solo sus picks, bajo las reglas de hora y máximo.
- Usuario nunca puede leer picks de otra persona.
- Admin puede administrar perfiles, juegos, resultados y picks.
- Las operaciones sensibles de admin deben usar una Edge Function o RPC autorizada, no una clave secreta dentro del navegador.

## Datos de prueba

Crear al menos:

- Un perfil admin.
- Tres perfiles aprobados.
- Un perfil pendiente.
- Tres juegos finalizados y tres juegos programados.
- Un usuario con un día perfecto.
