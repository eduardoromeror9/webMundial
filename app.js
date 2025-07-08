// Datos del torneo - Ahora como constante con nombres más descriptivos
const TOURNAMENT_DATA = [
<<<<<<< Updated upstream
  {pos: 0, players: "Eduardo",   j: 172, g: 106, p: 66, dif: 0, pct: 0, titulos: 3},
  {pos: 0, players: "Christian", j: 172, g: 97, p: 75, dif: 0, pct: 0, titulos: 0},
  {pos: 0, players: "Daniel",    j: 172, g: 93, p: 79, dif: 0, pct: 0, titulos: 0},
  {pos: 0, players: "Erycherd",  j: 172, g: 99, p: 73, dif: 0, pct: 0, titulos: 0},
  {pos: 0, players: "Kleydi",    j: 172, g: 95, p: 77, dif: 0, pct: 0, titulos: 0}
=======
  {pos: 0, players: "Eduardo",   j: 178, g: 111,p: 67, dif: 0, pct: 0, titulos: 3},
  {pos: 0, players: "Erycherd",  j: 178, g: 105,p: 73, dif: 0, pct: 0, titulos: 0},
  {pos: 0, players: "Christian", j: 178, g: 100, p: 78, dif: 0, pct: 0, titulos: 0},
  {pos: 0, players: "Kleydi",    j: 178, g: 99, p: 79, dif: 0, pct: 0, titulos: 0},
  {pos: 0, players: "Daniel",    j: 172, g: 93, p: 79, dif: 0, pct: 0, titulos: 0}
>>>>>>> Stashed changes
];

// Función para sanitizar HTML y prevenir inyección de código
function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Procesar datos con manejo de errores
function processData() {
  try {
    // Validar que los datos existen
    if (!TOURNAMENT_DATA || TOURNAMENT_DATA.length === 0) {
      throw new Error('No hay datos del torneo disponibles');
    }

    // Crear una copia para no mutar el original
    const dataToProcess = [...TOURNAMENT_DATA];

    // Ordenar por juegos ganados y luego alfabéticamente
    dataToProcess.sort((a, b) => {
      if (b.g !== a.g) return b.g - a.g;
      return a.players.localeCompare(b.players);
    });

    // Asignar posición, diferencia y porcentaje
    dataToProcess.forEach((element, index) => {
      element.pos = index + 1;
      element.dif = Math.abs(element.g - dataToProcess[0].g);
      element.pct = Math.round((element.g / element.j) * 1000);
    });

    return dataToProcess;
  } catch (error) {
    console.error('Error procesando datos:', error);
    return [];
  }
}

// Renderizar tabla con mejoras de seguridad y performance
function renderTable() {
  try {
    const tableBody = document.getElementById("tableBody");
    if (!tableBody) {
      throw new Error("Elemento tableBody no encontrado");
    }

    // Limpiar contenido previo
    tableBody.innerHTML = "";

    // Procesar datos
    const processedData = processData();
    
    if (processedData.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="8">No hay datos disponibles</td></tr>';
      return;
    }

    // Crear fragmento para mejor performance
    const fragment = document.createDocumentFragment();

    processedData.forEach((player, index) => {
      const row = document.createElement("tr");
      const isLeader = index === 0;

      if (isLeader) {
        row.className = "leader-row";
      }

      // Usar sanitización para prevenir XSS
      row.innerHTML = `
        <td class="position">${player.pos}</td>
        <td class="player-name ${isLeader ? "leader-name" : ""}">${sanitizeHTML(player.players)}</td>
        <td>${player.j}</td>
        <td class="wins">${player.g}</td>
        <td class="losses">${player.p}</td>
        <td>${player.dif}</td>
        <td class="percentage">${player.pct}</td>
        <td class="titles">${player.titulos}</td>
      `;

      fragment.appendChild(row);
    });

    tableBody.appendChild(fragment);
    
    // Mostrar mensaje de éxito en consola para debug
    console.log('Tabla renderizada correctamente');
    
  } catch (error) {
    console.error('Error al renderizar tabla:', error);
    
    // Mostrar mensaje de error al usuario
    const tableBody = document.getElementById("tableBody");
    if (tableBody) {
      tableBody.innerHTML = '<tr><td colspan="8">Error al cargar los datos</td></tr>';
    }
  }
}

// Animación de entrada para las filas con mejor performance
function animateRows() {
  try {
    const rows = document.querySelectorAll("#tableBody tr");
    
    if (rows.length === 0) return;

    rows.forEach((row, index) => {
      row.style.opacity = "0";
      row.style.transform = "translateX(-30px)";
      
      // Usar requestAnimationFrame para mejor performance
      requestAnimationFrame(() => {
        setTimeout(() => {
          row.style.transition = "all 0.5s ease";
          row.style.opacity = "1";
          row.style.transform = "translateX(0)";
        }, index * 150);
      });
    });
  } catch (error) {
    console.error('Error en animación de filas:', error);
  }
}

// Crear pelotas flotantes con optimización para móvil
function createFloatingBalls() {
  try {
    // No crear pelotas en dispositivos móviles para mejor performance
    if (window.innerWidth < 768) return;

    const container = document.querySelector(".floating-balls");
    if (!container) return;

    const balls = ["⚾", "🔥"];
    const ballCount = Math.min(8, Math.floor(window.innerWidth / 200)); // Adaptar a pantalla

    // Usar requestAnimationFrame para mejor performance
    requestAnimationFrame(() => {
      for (let i = 0; i < ballCount; i++) {
        const ball = document.createElement("div");
        ball.className = "ball";
        ball.textContent = balls[Math.floor(Math.random() * balls.length)];
        ball.style.left = Math.random() * 100 + "%";
        ball.style.top = Math.random() * 100 + "%";
        ball.style.animationDelay = Math.random() * 6 + "s";
        ball.style.animationDuration = 4 + Math.random() * 4 + "s";
        
        // Optimización para hardware acceleration
        ball.style.willChange = "transform";
        ball.style.transform = "translateZ(0)";
        
        container.appendChild(ball);
      }
    });
  } catch (error) {
    console.error('Error creando pelotas flotantes:', error);
  }
}

// Función para manejar redimensionamiento de ventana
function handleResize() {
  // Debounce para evitar múltiples llamadas
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    // Recrear pelotas si es necesario
    const container = document.querySelector(".floating-balls");
    if (container) {
      const existingBalls = container.querySelectorAll('.ball:not([style*="left: 10%"])');
      existingBalls.forEach(ball => ball.remove());
      createFloatingBalls();
    }
  }, 250);
}

// Función de inicialización mejorada
function initializeApp() {
  try {
    console.log('Inicializando aplicación...');
    
    // Procesar y renderizar datos
    renderTable();
    
    // Crear elementos visuales
    createFloatingBalls();
    
    // Animar después de un pequeño delay
    setTimeout(animateRows, 500);
    
    // Agregar event listeners
    window.addEventListener('resize', handleResize);
    
    console.log('Aplicación inicializada correctamente');
    
  } catch (error) {
    console.error('Error inicializando aplicación:', error);
  }
}

// Event listener mejorado con mejor compatibilidad
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Función para actualizar datos (para futuras mejoras)
function updateTournamentData(newData) {
  try {
    if (!Array.isArray(newData)) {
      throw new Error('Los datos deben ser un array');
    }
    
    // Validar estructura de datos
    const isValidData = newData.every(player => 
      player.hasOwnProperty('players') && 
      player.hasOwnProperty('j') && 
      player.hasOwnProperty('g') && 
      player.hasOwnProperty('p')
    );
    
    if (!isValidData) {
      throw new Error('Estructura de datos inválida');
    }
    
    // Actualizar datos (si fuera necesario en el futuro)
    console.log('Datos actualizados correctamente');
    renderTable();
    
  } catch (error) {
    console.error('Error actualizando datos:', error);
  }
}

// Exportar funciones para uso en otros scripts (si es necesario)
window.TournamentApp = {
  renderTable,
  updateTournamentData,
  processData
};