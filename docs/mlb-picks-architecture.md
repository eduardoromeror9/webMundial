# MLB Picks — Arquitectura del MVP

## Decisión técnica

Mantener el frontend actual en HTML, CSS y JavaScript. No es necesario reescribirlo en un framework para el MVP.

- Frontend y hosting: Netlify.
- Backend: Supabase.
- Base de datos: Postgres administrado por Supabase.
- Autenticación: Supabase Auth con correo y contraseña.
- Automatización segura: Supabase Edge Functions o Netlify Functions.
- Datos deportivos: MLB Stats API, con respaldo de carga manual desde el panel admin.

## Principios de arquitectura

- Separar interfaz, reglas de negocio, acceso a datos e integración MLB.
- Las reglas importantes se deben validar en la base de datos, no solo en el navegador.
- Cada usuario solo puede acceder a sus propios picks e historial.
- Las claves sensibles no deben estar en archivos JavaScript publicados.
- La API de MLB nunca debe ser el único mecanismo para cargar juegos o resultados.

## Componentes

### Frontend público

- Landing.
- Registro e inicio de sesión.
- Tabla de posiciones pública.

### Frontend autenticado

- Dashboard con juegos del día y picks personales.
- Historial personal.
- Perfil y cierre de sesión.

### Frontend de administración

Una sola página protegida con secciones o pestañas:

- Solicitudes pendientes.
- Usuarios aprobados.
- Picks del día.
- Ranking.
- Juegos y resultados.

### Backend de datos

- Tablas de perfiles, juegos, picks y resultados diarios.
- Vistas o funciones SQL para la tabla de posiciones.
- Políticas Row Level Security para restringir el acceso.
- Funciones administrativas para tareas privilegiadas.

### Servicios automatizados

- Sincronización de calendario MLB.
- Sincronización de resultados finalizados.
- Notificación de nuevo registro al administrador.
- Recalculo de registros cuando un resultado cambie.

## Estructura sugerida del repositorio

```text
webMundial/
├── index.html
├── app.js
├── css/
├── js/
│   ├── supabase-client.js
│   ├── auth.js
│   ├── games-service.js
│   ├── picks-service.js
│   ├── leaderboard-service.js
│   ├── admin-service.js
│   └── ui.js
├── img/
├── docs/
└── supabase/
    ├── migrations/
    └── functions/
```

## Flujo principal

1. El visitante se registra con correo y contraseña.
2. Un trigger crea su perfil con estado `pending`.
3. Una función notifica al administrador.
4. El administrador aprueba o rechaza la solicitud.
5. Solo un perfil `approved` puede guardar picks.
6. El dashboard consulta los juegos del día permitido.
7. El usuario elige hasta tres ganadores; cada pick se bloquea al comenzar el juego.
8. Al finalizar los juegos, se registran resultados oficiales o manuales.
9. Una función recalcula el registro diario y la tabla general.

## Orden de desempate

1. Porcentaje de aciertos, de mayor a menor.
2. Cantidad de días perfectos, de mayor a menor.
3. Número de victorias, de mayor a menor.
4. Apodo en orden alfabético, solo para estabilidad visual.

## Seguridad

- Usar UUID de Supabase Auth como identificador de perfil.
- Habilitar RLS en toda tabla expuesta por la API.
- La tabla pública debe ser una vista limitada; no debe exponer correo ni teléfono.
- Aplicar la regla de máximo tres picks y el bloqueo por inicio en funciones SQL o RPC.
- Mantener `service_role`, claves de correo y secretos solo en variables de entorno de funciones.

## Riesgos y respuesta

- API MLB caída: el admin puede crear juegos y resultados manualmente.
- Resultado corregido: recalcular la jornada afectada y el ranking.
- Usuario intenta modificar un pick tarde: la base de datos debe rechazar la operación.
- Proyecto gratuito inactivo: documentar cómo reactivar Supabase y revisar sus límites vigentes.
