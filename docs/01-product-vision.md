# MLB Picks — Visión del producto

## Propósito

Crear una aplicación web de pronósticos de juegos de MLB. Cualquier persona podrá solicitar una cuenta, pero solo podrá participar después de la aprobación manual del administrador.

En cada jornada permitida, el usuario podrá elegir como máximo tres equipos ganadores. La aplicación registrará los resultados y mostrará una tabla pública de posiciones.

## Reglas del MVP

- Días de juego: lunes, miércoles, viernes y domingo.
- La aplicación muestra únicamente los juegos de la fecha actual.
- Cada usuario aprobado puede seleccionar hasta tres equipos por jornada.
- Cada pick consiste solamente en elegir al ganador del juego.
- Un pick puede crearse o modificarse mientras el partido no haya comenzado.
- Al comenzar el partido, ese pick queda bloqueado.
- Los picks de cada usuario son privados.
- La tabla de posiciones es pública.

## Puntuación

- Un pick correcto cuenta como una victoria.
- Un pick incorrecto cuenta como una derrota.
- El récord se muestra como victorias-derrotas; por ejemplo, 12-8.
- El porcentaje se calcula como: victorias / (victorias + derrotas) × 100.
- Un día perfecto ocurre cuando el usuario realizó exactamente tres picks y acertó los tres: 3-3.
- En caso de empate, gana la posición superior el usuario con más días perfectos.

## Roles

### Visitante

- Puede consultar la tabla pública.
- Puede abrir las pantallas de registro e inicio de sesión.
- No puede ver picks ni datos personales de otros usuarios.

### Usuario pendiente

- Se registró correctamente.
- Aún no puede usar el dashboard ni guardar picks.
- Ve un mensaje que informa que su solicitud está en revisión.

### Usuario aprobado

- Puede iniciar sesión.
- Puede consultar los juegos del día y guardar sus propios picks.
- Puede editar sus picks antes del inicio de cada juego.
- Puede ver su récord, porcentaje e historial personal.

### Administrador

- Puede aprobar o rechazar solicitudes.
- Puede cambiar el apodo público de cualquier usuario.
- Puede revisar los picks del día de todos los usuarios.
- Puede cargar, editar o corregir juegos y resultados manualmente.
- Puede consultar el ranking y el historial de usuarios.

## Alcance del MVP

### Incluye

- Registro e inicio de sesión con correo y contraseña.
- Estado de aprobación: pendiente, aprobado o rechazado.
- Aviso por correo al administrador al llegar un registro nuevo.
- Importación o consulta de juegos de MLB para la fecha actual.
- Gestión de hasta tres picks por usuario y jornada.
- Tabla pública con apodo, récord y porcentaje.
- Historial privado por usuario, agrupado por fecha.
- Panel de administración con usuarios, picks, ranking y resultados.
- Carga y corrección manual de resultados.

### Fuera del MVP

- Inicio de sesión mediante SMS o teléfono. El número puede guardarse como dato opcional más adelante.
- Apuestas con dinero, cuotas, depósitos o retiros.
- Notificaciones push.
- Estadísticas avanzadas, exportación CSV y gamificación adicional.

## Criterios de éxito

- Un usuario nuevo puede registrarse y quedar pendiente de aprobación.
- El administrador puede aprobarlo desde un panel protegido.
- Un usuario aprobado puede guardar hasta tres picks válidos en un día permitido.
- Ningún usuario puede consultar ni editar picks de otros usuarios.
- La tabla pública refleja correctamente los resultados finalizados.
- El administrador puede operar la aplicación si la API externa falla.

## Glosario

- **Pick:** selección de un equipo ganador para un juego.
- **Jornada:** fecha de juego permitida por las reglas.
- **Récord:** relación acumulada de victorias y derrotas.
- **Día perfecto:** jornada con tres picks y tres aciertos.
- **Juego finalizado:** juego cuyo resultado oficial ya está disponible.
