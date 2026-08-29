# MLB Picks — Roadmap del MVP

## Fase 0 — Auditoría y preparación

Objetivo: conservar lo útil del frontend actual y preparar una base segura.

- Revisar `index.html`, `app.js`, `css/` y `js/`.
- Crear una rama Git de respaldo antes de cambios importantes.
- Crear un proyecto Supabase.
- Configurar variables locales y variables de entorno de Netlify.
- Crear migraciones SQL versionadas.
- Crear datos de prueba: un admin, tres usuarios, juegos y picks finalizados.

**Salida:** frontend existente entendido y proyecto Supabase operativo.

## Fase 1 — Base de datos y seguridad

Objetivo: disponer de un modelo de datos correcto antes de diseñar pantallas nuevas.

- Crear tablas `profiles`, `games`, `picks` y `daily_records`.
- Crear vistas SQL para tabla pública y ranking administrativo.
- Habilitar RLS.
- Definir rol admin mediante claim o tabla de roles; no depender solo de una validación visual en JavaScript.
- Implementar funciones RPC para guardar picks y recalcular resultados.

**Salida:** las reglas críticas se cumplen aunque alguien modifique el frontend.

## Fase 2 — Registro, login y aprobación

Objetivo: permitir acceso solo a usuarios autorizados.

- Crear registro con email y contraseña.
- Crear automáticamente un perfil en estado `pending`.
- Crear login y cierre de sesión.
- Mostrar pantallas específicas para estados pendiente y rechazado.
- Crear panel de solicitudes pendientes.
- Configurar aviso al administrador por cada nuevo registro.

**Salida:** usuario aprobado puede llegar al dashboard; usuario no aprobado no.

## Fase 3 — Juegos y picks

Objetivo: construir el núcleo del juego.

- Consultar o sincronizar el calendario MLB.
- Mostrar únicamente la fecha actual y solo los días permitidos.
- Permitir elegir un ganador por juego.
- Limitar a tres picks por usuario y jornada.
- Permitir editar picks mientras el juego no ha iniciado.
- Mostrar estado claro: disponible, guardado o bloqueado.
- Permitir al admin crear y editar juegos manualmente.

**Salida:** un usuario puede jugar una jornada completa bajo las reglas definidas.

## Fase 4 — Resultados y clasificación

Objetivo: convertir picks en resultados verificables.

- Sincronizar resultados finalizados desde MLB.
- Permitir corrección manual por admin.
- Recalcular récord diario, porcentaje, días perfectos y ranking.
- Publicar una tabla pública que no requiera login.
- Crear historial privado agrupado por fecha para cada usuario.

**Salida:** ranking e historial coinciden con cálculos manuales de prueba.

## Fase 5 — Panel admin y calidad

Objetivo: centralizar la operación y validar el MVP.

- Completar las pestañas: pendientes, aprobados, picks del día, ranking y resultados.
- Permitir editar apodos.
- Añadir mensajes de éxito, error y estados vacíos.
- Probar seguridad RLS con cuentas distintas.
- Probar en móvil y escritorio.
- Pasar el checklist de QA.
- Desplegar una versión de prueba en Netlify.

**Salida:** MVP listo para un grupo pequeño de usuarios reales.

## Fase posterior al MVP

- Registro o login con teléfono mediante proveedor SMS.
- Correos de aprobación y recordatorios de jornada.
- Estadísticas avanzadas y rachas.
- Exportación CSV.
- Mejoras visuales y modo oscuro.

## Orden recomendado de trabajo

1. Fase 0.
2. Fase 1.
3. Fase 2.
4. Fase 3.
5. Fase 4.
6. Fase 5.

No implementar una función de interfaz antes de tener la regla equivalente en la base de datos cuando esa función afecte permisos, límites o resultados.
