# 🌍 Mundial de Pronósticos 2025  [Visita la Web!!](https://mundialdepronosticos.netlify.app/)

Una aplicación web moderna para mostrar estadísticas y posiciones de un torneo de pronósticos deportivos.

## 📋 Descripción

Esta aplicación permite visualizar de manera interactiva y atractiva las estadísticas de los participantes en el "Mundial de Pronósticos 2025". Incluye una tabla dinámica con filtros, ordenamiento, y efectos visuales modernos.

## ✨ Características

- 📊 **Tabla de estadísticas** con datos en tiempo real
- 🔍 **Filtros y búsqueda** de jugadores
- 📱 **Diseño responsive** para todos los dispositivos
- 🎨 **Interfaz moderna** con animaciones suaves
- ♿ **Accesibilidad** completa (ARIA, navegación por teclado)
- ⚡ **Performance optimizado** con lazy loading
- 📈 **Gráficos estadísticos** interactivos
- 💾 **Exportación** de datos (CSV, PDF)
- 🌙 **Modo oscuro/claro**
- 📊 **Analytics** integrados

## 🚀 Instalación

1. **Clona el repositorio:**
```bash
git clone https://github.com/tu-usuario/mundial-pronosticos-2025.git
cd mundial-pronosticos-2025
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Ejecuta el servidor de desarrollo:**
```bash
npm run dev
```

4. **Abre tu navegador en:**
```
http://localhost:3000
```

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Estilos:** CSS Variables, Flexbox, Grid
- **Gráficos:** Chart.js
- **Build Tool:** Vite
- **Linting:** ESLint + Prettier
- **Testing:** Jest + Cypress
- **Deploy:** Netlify/Vercel

## 📁 Estructura del Proyecto

```
mundial-pronosticos-2025/
├── src/
│   ├── js/
│   │   ├── app.js          # Lógica principal
│   │   ├── charts.js       # Gráficos estadísticos
│   │   ├── filters.js      # Filtros y búsqueda
│   │   └── utils.js        # Utilidades
│   ├── css/
│   │   ├── style.css       # Estilos principales
│   │   ├── components.css  # Componentes
│   │   └── themes.css      # Temas (claro/oscuro)
│   ├── assets/
│   │   └── images/
│   └── index.html
├── tests/
├── docs/
└── package.json
```

## 🎯 Funcionalidades Principales

### Tabla de Estadísticas
- Posición actual de cada jugador
- Juegos jugados, ganados y perdidos
- Diferencia con el líder
- Porcentaje de victorias
- Número de títulos

### Filtros y Búsqueda
- Búsqueda por nombre de jugador
- Filtro por rango de posiciones
- Filtro por porcentaje de victorias
- Ordenamiento por cualquier columna

### Gráficos Interactivos
- Gráfico de barras de victorias
- Gráfico circular de distribución
- Evolución temporal de posiciones

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run test         # Ejecutar tests
npm run test:e2e     # Tests end-to-end
npm run lint         # Linting del código
npm run format       # Formatear código
```

## 📊 API de Datos

La aplicación utiliza datos estáticos por ahora, pero está preparada para integrar con APIs:

```javascript
// Ejemplo de estructura de datos
const playerData = {
  id: 1,
  name: "Eduardo",
  games: 178,
  wins: 111,
  losses: 67,
  titles: 3,
  position: 1
};
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Eduardo Romero**
- 📧 Email: eduardoromeror9@gmail.com
- 🌐 Website: [edu.com](mundialdepronosticos.netlify.app)
- 📱 WhatsApp: [+56 9 3290 2445](https://wa.me/56932902445)
- 📷 Instagram: [@eduardoromeror9](https://www.instagram.com/eduardoromeror9/)
- 🐦 Twitter: [@eduardoR9](https://x.com/eduardoR9)

## 🙏 Agradecimientos

- A todos los participantes del torneo
- A la comunidad de desarrolladores web
- A los creadores de las librerías utilizadas

## 📈 Roadmap

- [ ] Backend API con Node.js
- [ ] Base de datos PostgreSQL
- [ ] Sistema de autenticación
- [ ] Notificaciones push
- [ ] App móvil nativa
- [ ] Integración con APIs deportivas
- [ ] Sistema de predicciones en tiempo real

---

⭐ **¡No olvides darle una estrella al proyecto si te gustó!**
