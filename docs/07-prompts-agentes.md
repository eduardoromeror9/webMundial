# MLB Picks — Prompts recomendados para agentes

## Instrucción base

Usar esta instrucción al inicio de cada sesión importante:

```text
Trabaja sobre el proyecto existente webMundial. No reescribas ni elimines archivos sin revisar primero su contenido y explicar el impacto. Lee los documentos relevantes dentro de docs/. Implementa cambios pequeños, verificables y compatibles con HTML, CSS y JavaScript sin framework, salvo que propongas una alternativa con justificación clara.

Para reglas críticas de seguridad, permisos, máximo de picks, bloqueo por hora, cálculos y resultados, usa Supabase con RLS, funciones SQL o RPC. No dependas solamente de validaciones de frontend. No expongas service_role keys ni secretos. Al terminar, enumera archivos modificados, migraciones creadas, cómo probar y riesgos pendientes.
```

## Prompt 1 — Auditoría del proyecto actual

```text
Lee docs/01-product-vision.md, docs/mlb-picks-architecture.md y el proyecto actual completo. Audita index.html, app.js, css/, js/ e img/ antes de cambiar código.

Entrega:
1. Árbol real de archivos y responsabilidad de cada uno.
2. Qué se puede reutilizar tal como está.
3. Qué debe refactorizarse o reemplazarse.
4. Riesgos técnicos y dependencias actuales.
5. Plan de migración incremental en tareas pequeñas.

No escribas funcionalidades aún. No supongas contenido de archivos que no hayas leído.
```

## Prompt 2 — Base de datos segura

```text
Lee docs/01-product-vision.md, docs/mlb-picks-architecture.md y docs/02-database-schema.md.

Diseña e implementa migraciones SQL de Supabase para profiles, games, picks y daily_records. Crea índices, constraints, triggers o funciones RPC necesarios para garantizar estas reglas en backend:
- Solo perfiles approved pueden guardar picks.
- Máximo tres picks por usuario y jornada.
- Un usuario no puede repetir un juego.
- Un pick no se crea ni modifica desde la hora de inicio.
- selected_team debe corresponder a local o visitante.
- Días perfectos son exactamente tres picks finalizados y tres victorias.

Habilita RLS y crea políticas mínimas seguras. Crea una vista public_leaderboard que no exponga datos privados. No uses una comparación circular insegura de profiles dentro de sus propias políticas.

Entrega archivos SQL versionados, instrucciones para aplicarlos y consultas de prueba.
```

## Prompt 3 — Autenticación y aprobación

```text
Lee docs/01-product-vision.md, docs/02-database-schema.md y docs/04-frontend-guide.md. Integra Supabase Auth con correo y contraseña en el proyecto existente.

Implementa registro, login, logout y guards de ruta. Al registrarse, crear o garantizar la creación de un profile con status pending. Un usuario pending o rejected no puede acceder al dashboard; un approved sí. Implementa una página o mensaje claro para cada estado.

No modifiques el diseño actual más de lo necesario. No pongas secretos en frontend. Enumera archivos modificados y pasos manuales de configuración en Supabase.
```

## Prompt 4 — Juegos y picks

```text
Lee docs/01-product-vision.md, docs/03-api-integration.md y docs/04-frontend-guide.md.

En el dashboard del usuario aprobado, implementa la vista de juegos del día y selección de picks. Mostrar juegos únicamente lunes, miércoles, viernes y domingo. Permitir elegir ganador local o visitante, con máximo tres picks. Cargar picks existentes y permitir editarlos antes del inicio.

La interfaz debe dar feedback de disponibilidad, picks guardados, límite alcanzado y juegos bloqueados. Usar una RPC o función segura para persistir el pick y aplicar reglas críticas en backend. Manejar API sin datos, día no permitido y fallos de red.

No implementar resultados ni panel admin en esta tarea.
```

## Prompt 5 — Tabla e historial

```text
Lee docs/01-product-vision.md, docs/02-database-schema.md y docs/04-frontend-guide.md.

Implementa una tabla pública usando solamente la vista public_leaderboard. Mostrar posición, apodo, récord, porcentaje y días perfectos si se decide mostrarlo. Orden: porcentaje, días perfectos, victorias y apodo.

Implementa además el historial privado del usuario autenticado, agrupado por fecha, con picks, resultados y récord diario. Asegura que un usuario solo puede consultar su propio historial, incluso mediante llamadas directas a Supabase.

Incluye estados de carga, vacío y error. Prueba con datos finalizados y no finalizados.
```

## Prompt 6 — Panel admin

```text
Lee docs/01-product-vision.md, docs/02-database-schema.md y docs/05-admin-panel.md.

Implementa admin.html como una vista protegida para role admin. Debe tener secciones para: pendientes, aprobados, picks del día, ranking y juegos/resultados.

Implementa operaciones seguras para aprobar/rechazar usuarios, editar apodos, crear o editar juegos, cargar/corregir resultados y recalcular la jornada afectada. Las operaciones de administración deben ejecutarse mediante RPC o Edge Functions autorizadas; nunca con service_role desde el navegador.

Pedir confirmación antes de cambiar resultados o rechazar usuarios. Entrega plan de pruebas manuales.
```

## Prompt 7 — Integración y respaldo MLB

```text
Lee docs/03-api-integration.md y revisa el código actual de integración. Implementa una sincronización confiable de calendario y resultados MLB hacia la tabla games.

Conservar siempre la posibilidad de carga manual del admin. No sobrescribir automáticamente una corrección manual. Manejar dobles carteleras, juegos diferidos, cancelados y resultados no finalizados. Guardar fechas en UTC y mostrar hora local de Santiago en interfaz.

Propón cómo ejecutar la sincronización de forma segura y económica: acción del admin, función programada u otra alternativa. Implementa solo la alternativa aprobada por la documentación y explica configuración necesaria.
```

## Prompt 8 — QA final

```text
Lee docs/06-qa-checklist.md y ejecuta una revisión completa del proyecto. Prueba cada caso posible con datos de prueba. Prioriza seguridad RLS, máximo tres picks, bloqueo por hora, cálculo de récord, días perfectos y accesos admin.

Entrega un informe con: casos aprobados, fallas encontradas, pasos de reproducción, severidad, archivos implicados y corrección propuesta. No hagas cambios no solicitados durante esta auditoría.
```

## Prompt 9 — Corrección de bug

```text
Investiga este problema sin reescribir partes no relacionadas: [DESCRIBIR BUG].

Primero reproduce el error y revisa los documentos de docs/ que correspondan. Después identifica causa raíz, propone el cambio mínimo y aplícalo. Incluye prueba de regresión y confirma que no afecta las reglas de picks, permisos ni ranking.
```
