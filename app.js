// Datos del torneo - Ahora como constante con nombres más descriptivos
const TOURNAMENT_DATA = [
  {pos: 0, players: "Eduardo",   j: 213, g: 129, p: 84, dif: 0, pct: 0, titulos: 3},
  {pos: 0, players: "Erycherd",  j: 213, g: 116, p: 97, dif: 0, pct: 0, titulos: 0},
  {pos: 0, players: "Christian", j: 213, g: 119, p: 94, dif: 0, pct: 0, titulos: 0},
  {pos: 0, players: "Kleydi",    j: 213, g: 117, p: 96, dif: 0, pct: 0, titulos: 0},
  {pos: 0, players: "Daniel",    j: 207, g: 110, p: 97, dif: 0, pct: 0, titulos: 0}
];

// Inicialización principal usando módulos separados
async function initializeApp() {
  try {
    const table = await import('./js/table.js');
    const balls = await import('./js/floatingBalls.js');

    console.log('Inicializando aplicación...');
    table.renderTable(TOURNAMENT_DATA);
    balls.createFloatingBalls();
    setTimeout(table.animateRows, 500);
    window.addEventListener('resize', balls.handleResize);
    console.log('Aplicación inicializada correctamente');
  } catch (error) {
    console.error('Error inicializando aplicación:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Exportar datos y funciones para uso futuro
window.TOURNAMENT_DATA = TOURNAMENT_DATA;

// console.table(TOURNAMENT_DATA)