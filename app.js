// Datos del torneo
const tournamentData = [
  {Pos:0, Players: "Eduardo",   J: 159, G: 99,  P: 60,  Dif: 0, PCT: 0, Titulos: 3 },
  {Pos:0, Players: "Christian", J: 159, G: 92,  P: 67,  Dif: 0, PCT: 0, Titulos: 0 },
  {Pos:0, Players: "Daniel",    J: 159, G: 87,  P: 72,  Dif: 0, PCT: 0, Titulos: 0 },
  {Pos:0, Players: "Erycherd",  J: 159, G: 89,  P: 70,  Dif: 0, PCT: 0, Titulos: 0 },
  {Pos:0, Players: "Kleydi",    J: 159, G: 88,  P: 71,  Dif: 0, PCT: 0, Titulos: 0 },
];

// Procesar datos
function processData() {
  // Ordenar por juegos ganados y luego alfabéticamente
  tournamentData.sort((a, b) => {
    if (b.G !== a.G) return b.G - a.G;
    return a.Players.localeCompare(b.Players);
  });

  // Asignar posición, diferencia y porcentaje
  tournamentData.forEach((element, index) => {
    element.Pos = index + 1;
    element.Dif = Math.abs(element.G - tournamentData[0].G);
    element.PCT = Math.round((element.G / element.J) * 1000);
  });
}

// Renderizar tabla
function renderTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  tournamentData.forEach((player, index) => {
    const row = document.createElement("tr");
    const isLeader = index === 0;

    if (isLeader) {
      row.className = "leader-row";
    }

    row.innerHTML = `
      <td class="position">${player.Pos}</td>
      <td class="player-name ${isLeader ? "leader-name" : ""}">${player.Players}</td>
      <td>${player.J}</td>
      <td class="wins">${player.G}</td>
      <td class="losses">${player.P}</td>
      <td>${player.Dif}</td>
      <td class="percentage">${player.PCT}</td>
      <td class="titles">${player.Titulos}</td> `;
    tableBody.appendChild(row);
  });
}

// Animación de entrada para las filas
function animateRows() {
  const rows = document.querySelectorAll("#tableBody tr");
  rows.forEach((row, index) => {
    row.style.opacity = "0";
    row.style.transform = "translateX(-30px)";
    setTimeout(() => {
      row.style.transition = "all 0.5s ease";
      row.style.opacity = "1";
      row.style.transform = "translateX(0)";
    }, index * 150);
  });
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  processData();
  renderTable();
  setTimeout(animateRows, 500);
});

// pelotas flotantes adicionales
function createFloatingBalls() {
  const container = document.querySelector(".floating-balls");
  const balls = ["⚾", "🔥"];

  for (let i = 0; i < 8; i++) {
    const ball = document.createElement("div");
    ball.className = "ball";
    ball.textContent = balls[Math.floor(Math.random() * balls.length)];
    ball.style.left = Math.random() * 100 + "%";
    ball.style.top = Math.random() * 100 + "%";
    ball.style.animationDelay = Math.random() * 6 + "s";
    ball.style.animationDuration = 4 + Math.random() * 4 + "s";
    container.appendChild(ball);
  }
}

createFloatingBalls();