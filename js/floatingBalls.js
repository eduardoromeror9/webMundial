export function createFloatingBalls() {
  try {
    if (window.innerWidth < 768) return;
    const container = document.querySelector(".floating-balls");
    if (!container) return;
    // Limpiar pelotas existentes antes de crear nuevas
    container.querySelectorAll('.ball').forEach(ball => ball.remove());
    const balls = ["⚾", "🔥"];
    // Limitar el número de pelotas para performance
    const ballCount = Math.min(6, Math.floor(window.innerWidth / 220));
    const createBall = (i) => {
      const ball = document.createElement("div");
      ball.className = "ball";
      ball.textContent = balls[Math.floor(Math.random() * balls.length)];
      ball.style.left = Math.random() * 100 + "%";
      ball.style.top = Math.random() * 100 + "%";
      ball.style.animationDelay = Math.random() * 6 + "s";
      ball.style.animationDuration = 4 + Math.random() * 4 + "s";
      ball.style.willChange = "transform";
      ball.style.transform = "translateZ(0)";
      container.appendChild(ball);
    };
    for (let i = 0; i < ballCount; i++) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => createBall(i));
      } else {
        requestAnimationFrame(() => createBall(i));
      }
    }
  } catch (error) {
    console.error('Error creando pelotas flotantes:', error);
  }
}

export function handleResize() {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    const container = document.querySelector(".floating-balls");
    if (container) {
      container.querySelectorAll('.ball').forEach(ball => ball.remove());
      createFloatingBalls();
    }
  }, 250);
} 