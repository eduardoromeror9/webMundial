// Función para sanitizar HTML y prevenir inyección de código
export function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Procesar datos con manejo de errores
export function processData(TOURNAMENT_DATA) {
  try {
    if (!TOURNAMENT_DATA || TOURNAMENT_DATA.length === 0) {
      throw new Error('No hay datos del torneo disponibles');
    }
    const dataToProcess = [...TOURNAMENT_DATA];
    dataToProcess.sort((a, b) => {
      if (b.g !== a.g) return b.g - a.g;
      return a.players.localeCompare(b.players);
    });
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