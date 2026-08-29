# MLB Picks — Guía de frontend

## Objetivo

Evolucionar el proyecto existente sin reescribirlo innecesariamente. Mantener HTML, CSS y JavaScript modular, y añadir Supabase de forma gradual.

## Estructura objetivo

```text
webMundial/
├── index.html
├── tabla.html
├── registro.html
├── login.html
├── dashboard.html
├── historial.html
├── admin.html
├── css/
│   └── style.css
├── js/
│   ├── supabase-client.js
│   ├── auth.js
│   ├── route-guards.js
│   ├── games-service.js
│   ├── picks-service.js
│   ├── leaderboard-service.js
│   ├── admin-service.js
│   └── ui.js
├── img/
└── docs/
```

No eliminar los archivos existentes sin antes comprender qué función cumplen. Hacer cambios en ramas Git pequeñas y comprobables.

## Páginas

### index.html

Landing pública con explicación breve, enlace a registro, enlace a login y enlace a tabla.

### tabla.html

Página pública. Muestra posición, apodo, récord, porcentaje y opcionalmente días perfectos. Nunca mostrar correo, teléfono ni picks.

### registro.html

Formulario de correo, contraseña, confirmación de contraseña y apodo inicial. Al finalizar, mostrar que la cuenta está pendiente de aprobación.

### login.html

Inicio de sesión por correo y contraseña. Tras autenticar, consultar el perfil y dirigir al usuario según su estado.

### dashboard.html

Solo para usuario aprobado. Muestra los juegos del día, picks guardados, límite restante y récord personal resumido.

### historial.html

Solo para usuario aprobado. Muestra únicamente su historial diario y sus picks.

### admin.html

Solo para admin. Reúne solicitudes, usuarios, picks, ranking, juegos y resultados.

## Módulos JavaScript

### supabase-client.js

Crear y exportar un único cliente Supabase. Usar URL y anon key públicas configuradas para el frontend. Nunca incluir `service_role`.

### auth.js

Registro, login, logout, usuario actual y lectura de perfil.

### route-guards.js

Funciones reutilizables para exigir sesión, perfil aprobado o rol admin. La protección visual no reemplaza RLS.

### games-service.js

Lectura de juegos, sincronización mediante endpoint seguro y helpers de hora/estado.

### picks-service.js

Lectura y guardado de picks del usuario mediante RPC o endpoint que aplique reglas.

### leaderboard-service.js

Lectura de la vista pública de clasificación.

### admin-service.js

Operaciones administrativas mediante funciones autorizadas: aprobar, rechazar, editar apodo, importar juegos, editar resultado y recalcular.

## Reglas de UX

- Diseñar móvil primero; botones táctiles de al menos 44 × 44 px.
- Mostrar un solo llamado principal por pantalla.
- Antes de iniciar un juego, permitir elegir o editar pick con claridad.
- Después del inicio, mostrar el pick bloqueado, no ocultarlo.
- Para formularios, mostrar errores junto al campo correspondiente.
- Usar estados de carga, vacío y error.
- Confirmar operaciones administrativas destructivas o relevantes.
- Mantener la tabla legible en móvil: permitir scroll horizontal si es necesario.

## Seguridad en cliente

- La anon key de Supabase puede estar en frontend; es normal.
- La seguridad debe venir de RLS y funciones de servidor.
- No ocultar una página como única protección de admin.
- No confiar en validaciones de JavaScript para límite de picks, horario o roles.

## Definición de terminado por pantalla

Una pantalla se considera terminada solo si:

- Funciona con datos reales o datos de prueba definidos.
- Maneja carga, vacío y error.
- Funciona con teclado y en móvil.
- No produce errores en consola.
- Respeta permisos de usuario.
