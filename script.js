// Seleciona os elementos
const yearsEl = document.getElementById('years');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const timerBox = document.getElementById('timerBox');
const actions = document.getElementById('actions');

// 🔹 Define a data de início fixa (3 de novembro de 2025 às 16h)
const startDate = new Date('2025-11-03T16:00:00');

// Função para formatar números
function pad(n) { return String(n).padStart(2, '0'); }

// Calcula o tempo decorrido
function updateTimer() {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();

  // Ajuste caso ainda não tenha completado o aniversário no ano atual
  if (
    now.getMonth() < startDate.getMonth() ||
    (now.getMonth() === startDate.getMonth() && now.getDate() < startDate.getDate())
  ) {
    years--;
  }

  const anniversary = new Date(startDate);
  anniversary.setFullYear(startDate.getFullYear() + years);

  let diff = now - anniversary;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  diff -= days * 24 * 60 * 60 * 1000;
  const hours = Math.floor(diff / (60 * 60 * 1000));
  diff -= hours * 60 * 60 * 1000;
  const minutes = Math.floor(diff / (60 * 1000));
  diff -= minutes * 60 * 1000;
  const seconds = Math.floor(diff / 1000);

  yearsEl.textContent = years;
  daysEl.textContent = days;
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

// Inicia o contador
function startTimer() {
  timerBox.style.display = 'block';
  actions.style.display = 'none'; // Esconde os botões (opcional)
  updateTimer();
  setInterval(updateTimer, 1000);
}

// Inicia automaticamente ao carregar a página
window.onload = startTimer;
