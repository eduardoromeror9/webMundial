// Datos del torneo - Ahora como constante con nombres más descriptivos
const TOURNAMENT_DATA = [
  {pos: 0, players: "Eduardo",   j: 350, g: 204, p: 146, dif: 0, pct: 0, titulos: 3},
  {pos: 0, players: "Christian", j: 350, g: 202, p: 148, dif: 0, pct: 0, titulos: 0},
  {pos: 0, players: "Erycherd",  j: 350, g: 190, p: 160, dif: 0, pct: 0, titulos: 0},
  {pos: 0, players: "Kleydi",    j: 350, g: 192, p: 158, dif: 0, pct: 0, titulos: 0},
  {pos: 0, players: "Daniel",    j: 350, g: 188, p: 162, dif: 0, pct: 0, titulos: 0}
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

console.table(TOURNAMENT_DATA)