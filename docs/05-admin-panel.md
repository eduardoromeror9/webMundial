# MLB Picks — Panel de administración

## Objetivo

Dar al administrador una única área protegida para gestionar la operación diaria sin tener que editar archivos manualmente.

## Acceso

- Ruta sugerida: `admin.html`.
- Exigir sesión autenticada y `role = admin`.
- Revalidar permisos en la base de datos o función RPC para cada operación sensible.

## Secciones

### Solicitudes pendientes

Mostrar perfiles con estado `pending`.

Columnas:

- Apodo solicitado.
- Correo.
- Fecha de solicitud.
- Acciones: aprobar y rechazar.

Al aprobar, el usuario puede acceder a su dashboard. Al rechazar, no puede guardar picks.

### Usuarios aprobados

Columnas:

- Apodo público.
- Correo.
- Fecha de aprobación.
- Récord.
- Porcentaje.
- Días perfectos.

Acciones:

- Editar apodo.
- Consultar historial.
- Cambiar estado si fuera necesario.

### Picks del día

Mostrar todos los picks de la fecha seleccionada.

Columnas:

- Apodo.
- Juego.
- Equipo elegido.
- Hora de creación o actualización.
- Estado del juego.

Filtros:

- Fecha.
- Usuario.
- Juego.

### Ranking

Mostrar el mismo ranking público con columnas administrativas adicionales si son útiles. El orden debe ser porcentaje, días perfectos y victorias.

### Juegos y resultados

Permitir:

- Importar o sincronizar juegos de MLB.
- Crear un juego manual.
- Editar equipos, hora y estado.
- Cargar o corregir marcadores.
- Marcar juego finalizado, diferido o cancelado.
- Recalcular los registros afectados.

## Acciones y confirmaciones

Pedir confirmación antes de:

- Rechazar un usuario.
- Cambiar manualmente un resultado final.
- Eliminar un juego o pick.
- Ejecutar recálculo masivo.

Después de cada acción, mostrar resultado claro y actualizar la sección afectada.

## Notificación de registro

Cuando se cree un perfil pendiente:

1. Crear un evento o webhook.
2. Llamar una Edge Function.
3. Enviar correo al administrador con apodo, correo, fecha y enlace al panel.

No enviar secretos ni información innecesaria por correo.

## Reglas de resultados

- Al guardar un resultado final, recalcular únicamente la fecha afectada cuando sea posible.
- Si se edita un resultado existente, recalcular de nuevo para evitar datos inconsistentes.
- Juegos diferidos o cancelados no cuentan hasta que el administrador decida cómo tratarlos.

## Definición de terminado

- Admin no autorizado no puede leer ni ejecutar operaciones.
- Aprobar, rechazar y editar apodo funcionan con persistencia.
- Los picks del día son correctos y filtrables.
- Una corrección manual actualiza historial y ranking.
- La interfaz funciona en móvil y escritorio.
