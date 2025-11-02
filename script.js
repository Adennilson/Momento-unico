const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const actions = document.getElementById('actions');
const timerBox = document.getElementById('timerBox');
const yearsEl = document.getElementById('years');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const resetBtn = document.getElementById('resetBtn');
const STORAGE_KEY = 'acceptedAt_v2';
let interval = null;

function pad(n) { return String(n).padStart(2, '0'); }

function updateTimer(startDate) {
  const now = new Date();
  const start = new Date(startDate);

  let years = now.getFullYear() - start.getFullYear();
  if (now.getMonth() < start.getMonth() || (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())) {
    years--;
  }

  const anniversary = new Date(start);
  anniversary.setFullYear(start.getFullYear() + years);

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

function startTimer(startDate) {
  timerBox.style.display = 'block';
  if (interval) clearInterval(interval);
  updateTimer(startDate);
  interval = setInterval(() => updateTimer(startDate), 1000);
}

yesBtn.addEventListener('click', () => {
  const now = new Date();
  localStorage.setItem(STORAGE_KEY, now.toISOString());
  actions.style.display = 'none';
  startTimer(now);
});

noBtn.addEventListener('click', () => {
  alert('Tudo bem ❤️ O importante é que você saiba o quanto é especial pra mim.');
});

resetBtn.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
});

(function init() {
  const accepted = localStorage.getItem(STORAGE_KEY);
  if (accepted) {
    actions.style.display = 'none';
    startTimer(accepted);
  }
})();
