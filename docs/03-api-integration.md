# MLB Picks — Integración de datos MLB

## Objetivo

Obtener los juegos y resultados oficiales de MLB sin hacer que la aplicación dependa por completo de una API externa. El administrador siempre debe poder crear o corregir datos manualmente.

## Fuente principal

Usar MLB Stats API como fuente de calendario y resultados.

Ejemplo de calendario por fecha:

```text
GET https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=YYYY-MM-DD
```

Campos a extraer:

```text
gamePk
 gameDate
teams.away.team.name
teams.home.team.name
status.abstractGameState
status.detailedState
```

## Sincronización de juegos

1. Consultar el calendario para una fecha.
2. Transformar cada juego a la estructura de la tabla `games`.
3. Insertar o actualizar mediante `mlb_game_id`.
4. No sobrescribir un resultado marcado como manual sin confirmación explícita del admin.
5. Guardar la fuente como `mlb_api` o `manual`.

## Sincronización de resultados

Para cada juego pendiente, consultar el schedule o el endpoint de feed en vivo.

Solo marcar como `final` si la fuente oficial indica finalizado. Al guardar un resultado final:

1. Actualizar score local, score visitante y estado.
2. Recalcular `daily_records` de todos los usuarios que tengan picks en ese juego.
3. Actualizar la tabla pública automáticamente mediante vista SQL.

## Días y horarios

- Días permitidos: domingo, lunes, miércoles y viernes.
- `gameDate` se recibe en UTC.
- Guardar UTC en la base de datos.
- En la interfaz, mostrar hora en `America/Santiago` o en la zona horaria elegida por el producto.
- La comparación de bloqueo debe usar instantes absolutos: `now() < start_time`.

No usar únicamente `new Date().toDateString()` para reglas críticas, porque puede producir errores por zona horaria.

## Estados de interfaz

- Día no permitido: "Hoy no hay jornada de pronósticos".
- Día permitido sin juegos: "No hay juegos disponibles para esta jornada".
- Juego disponible: botones para elegir visitante o local.
- Juego bloqueado: mostrar hora de inicio y deshabilitar edición.
- API no disponible: mostrar un error amable; el admin puede gestionar juegos manualmente.

## Manejo de casos especiales

- Juego diferido, suspendido o cancelado: no contar victoria ni derrota hasta una decisión administrativa.
- Juego empatado o sin resultado definitivo: no contar hasta que exista resultado final.
- Doble cartelera: cada `gamePk` es un juego independiente.
- Juego importado repetido: usar `upsert` por `mlb_game_id`.

## Seguridad

La sincronización automática debe ocurrir desde una función de servidor programada o mediante una acción explícita del admin. Evitar confiar en el navegador de un usuario para escribir resultados globales.

## Pruebas

- Fecha pasada con resultados finalizados.
- Fecha futura con juegos programados.
- Día sin juegos.
- Doble cartelera.
- Juego diferido.
- Caída o respuesta inválida de API.
- Carga manual equivalente cuando la API no responde.
