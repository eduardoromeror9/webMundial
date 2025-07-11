import { sanitizeHTML, processData } from './utils.js';

export function renderTable(TOURNAMENT_DATA) {
  try {
    const tableBody = document.getElementById("tableBody");
    if (!tableBody) {
      throw new Error("Elemento tableBody no encontrado");
    }
    // Solo limpiar si hay contenido previo
    if (tableBody.children.length > 0) tableBody.innerHTML = "";
    const processedData = processData(TOURNAMENT_DATA);
    if (processedData.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="8">No hay datos disponibles</td></tr>';
      return;
    }
    const fragment = document.createDocumentFragment();
    processedData.forEach((player, index) => {
      const row = document.createElement("tr");
      const isLeader = index === 0;
      if (isLeader) {
        row.className = "leader-row";
      }
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
    console.log('Tabla renderizada correctamente');
  } catch (error) {
    console.error('Error al renderizar tabla:', error);
    const tableBody = document.getElementById("tableBody");
    if (tableBody) {
      tableBody.innerHTML = '<tr><td colspan="8">Error al cargar los datos</td></tr>';
    }
  }
}

export function animateRows() {
  try {
    const rows = document.querySelectorAll("#tableBody tr");
    if (rows.length === 0) return;
    // Usar requestIdleCallback si está disponible para animar cuando el navegador esté libre
    const animateRow = (row, index) => {
      row.style.opacity = "0";
      row.style.transform = "translateX(-30px)";
      const doAnimate = () => {
        setTimeout(() => {
          row.style.transition = "all 0.5s cubic-bezier(0.4,0,0.2,1)";
          row.style.opacity = "1";
          row.style.transform = "translateX(0)";
        }, index * 100);
      };
      if ('requestIdleCallback' in window) {
        requestIdleCallback(doAnimate);
      } else {
        requestAnimationFrame(doAnimate);
      }
    };
    rows.forEach(animateRow);
  } catch (error) {
    console.error('Error en animación de filas:', error);
  }
} 