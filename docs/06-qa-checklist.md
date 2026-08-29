# MLB Picks — Checklist de QA

## Registro y acceso

- [ ] Un correo nuevo puede crear una cuenta.
- [ ] El perfil se crea en estado `pending`.
- [ ] El usuario pendiente ve un mensaje claro y no llega al dashboard.
- [ ] El admin puede aprobar un usuario.
- [ ] El usuario aprobado puede iniciar sesión y acceder al dashboard.
- [ ] El usuario rechazado no puede acceder al dashboard.
- [ ] El cierre de sesión funciona.
- [ ] Un correo duplicado muestra un error entendible.

## Seguridad

- [ ] Un visitante puede leer solo la tabla pública y juegos permitidos.
- [ ] Un usuario no puede leer picks ni historial de otro usuario.
- [ ] Un usuario no puede crear picks para otro usuario.
- [ ] Un usuario no puede cambiar su rol, estado ni apodo administrativamente.
- [ ] Un usuario normal no puede ejecutar acciones de admin desde consola o peticiones directas.
- [ ] Ninguna clave `service_role` aparece en archivos publicados.

## Juegos y picks

- [ ] En lunes, miércoles, viernes y domingo se muestran los juegos de la fecha actual.
- [ ] En un día no permitido se explica que no hay jornada.
- [ ] Un usuario puede elegir como máximo tres juegos.
- [ ] El cuarto pick es rechazado por interfaz y por base de datos.
- [ ] Un usuario puede modificar un pick antes de la hora de inicio.
- [ ] No se puede crear ni modificar un pick después del inicio.
- [ ] El horario se interpreta correctamente para Santiago de Chile.
- [ ] Un juego diferido o cancelado no altera el récord por error.

## Resultados y ranking

- [ ] Un pick correcto suma una victoria.
- [ ] Un pick incorrecto suma una derrota.
- [ ] Picks de juegos no finalizados no afectan el récord.
- [ ] Un día perfecto requiere tres picks finalizados y tres aciertos.
- [ ] La tabla ordena por porcentaje, días perfectos y victorias.
- [ ] La tabla pública no muestra correo, teléfono ni picks.
- [ ] Corregir un resultado recalcula la fecha y el ranking correctamente.

## Administración

- [ ] Llegan notificaciones de registros nuevos al admin.
- [ ] La lista de pendientes muestra información correcta.
- [ ] Aprobar y rechazar persiste tras recargar.
- [ ] Editar apodo se refleja en la tabla pública.
- [ ] Picks del día coincide con datos guardados.
- [ ] Crear o editar un juego manual funciona.
- [ ] Cargar resultado manual funciona.

## Interfaz y calidad

- [ ] Funciona en 375 px de ancho y en escritorio.
- [ ] Todos los controles importantes se pueden usar con teclado.
- [ ] Botones e inputs tienen etiquetas legibles.
- [ ] Hay estados de carga, vacío y error.
- [ ] No hay errores en consola.
- [ ] La tabla carga en un tiempo razonable con datos de prueba.

## Prueba de aceptación final

Crear tres usuarios aprobados y una jornada con tres juegos finalizados. Guardar picks variados, incluyendo al menos un 3-3. Verificar manualmente récord, porcentaje, días perfectos, orden de tabla, historial privado y visibilidad pública.
