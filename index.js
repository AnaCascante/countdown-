const funColors = [
  "#FFD700", "#FF69B4", "#40E0D0", "#98FB98", "#FFA500",
  "#00BFFF", "#FF6347", "#BA55D3", "#F08080", "#7FFFD4"
];
// Start with some predefined countdowns, or leave empty if you only want custom
const countdowns = [
  { label: 'Christmas', date: new Date('2025-12-25T00:00:00') },
  { label: 'New Year', date: new Date('2026-01-01T00:00:00') }
];
function getTimeRemaining(target) {
  const now = new Date();
  let diff = target - now;
  if (diff < 0) diff = 0;
  let seconds = Math.floor((diff / 1000) % 60);
  let minutes = Math.floor((diff / 1000 / 60) % 60);
  let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  let days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30);
  let months = Math.floor((diff / (1000 * 60 * 60 * 24 * 30)) % 12);
  let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  return { years, months, days, hours, minutes, seconds, total: diff };
}
function renderCountdowns() {
  const container = document.getElementById('countdowns');
  container.innerHTML = '';
  countdowns.forEach((cd, idx) => {
    const targetDate = cd.date;
    const { years, months, days, hours, minutes, seconds } = getTimeRemaining(targetDate);
    const div = document.createElement('div');
    div.className = 'countdown';
    div.style.backgroundColor = funColors[idx % funColors.length];
    div.innerHTML = <span class="label">${cd.label}:</span>        ${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s       <button onclick="removeCountdown(${idx})">Remove</button>;
    container.appendChild(div);
  });
}
window.removeCountdown = function(idx) {
  countdowns.splice(idx, 1);
  renderCountdowns();
}
document.getElementById('addCountdownForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const label = document.getElementById('customLabel').value.trim();
  const dateValue = document.getElementById('customDate').value;
  if (!dateValue) {
    alert('Please enter a date/time!');
    return;
  }
  const date = new Date(dateValue);
  if (date > new Date()) {
    countdowns.push({ label, date });
    renderCountdowns();
    this.reset();
  } else {
    alert('Please select a future date/time!');
  }
});
setInterval(renderCountdowns, 1000);
renderCountdowns();
