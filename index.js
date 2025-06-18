 <script>
    // Predefined countdowns
    const countdowns = [
      { label: 'Christmas', date: new Date('2025-12-25T00:00:00') },
      { label: 'New Year', date: new Date('2026-01-01T00:00:00') },
      { label: 'Next Weekend', get date() {
          const now = new Date();
          const day = now.getDay();
          // 6 = Saturday; 0 = Sunday
          const daysUntilSaturday = (6 - day + 7) % 7 || 7;
          const nextSaturday = new Date(now);
          nextSaturday.setDate(now.getDate() + daysUntilSaturday);
          nextSaturday.setHours(0, 0, 0, 0);
          return nextSaturday;
        }
      },
      { label: 'End of Workday', get date() {
          const now = new Date();
          const end = new Date(now);
          end.setHours(17, 0, 0, 0); // Set your end of workday hour here
          if (now > end) {
            end.setDate(end.getDate() + 1);
          }
          return end;
        }
      }
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
        const targetDate = typeof cd.date === 'function' ? cd.date() : cd.date;
        const { years, months, days, hours, minutes, seconds } = getTimeRemaining(targetDate);
        const div = document.createElement('div');
        div.className = 'countdown';
        div.innerHTML = `<span class="label">${cd.label}:</span> 
          ${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s
          <button onclick="removeCountdown(${idx})">Remove</button>`;
        container.appendChild(div);
      });
    }

    function removeCountdown(idx) {
      countdowns.splice(idx, 1);
      renderCountdowns();
    }

    // Add custom countdown
    document.getElementById('addCountdownForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const label = document.getElementById('customLabel').value;
      const date = new Date(document.getElementById('customDate').value);
      if (date > new Date()) {
        countdowns.push({ label, date });
        renderCountdowns();
        this.reset();
      } else {
        alert('Please select a future date/time!');
      }
    });

    // Update countdown every second
    setInterval(renderCountdowns, 1000);
    renderCountdowns();

    // Expose removeCountdown globally
    window.removeCountdown = removeCountdown;

const funColors = [
  "#FFD700", // Gold
  "#FF69B4", // Hot Pink
  "#40E0D0", // Turquoise
  "#98FB98", // Pale Green
  "#FFA500", // Orange
  "#00BFFF", // Deep Sky Blue
  "#FF6347", // Tomato
  "#BA55D3", // Medium Orchid
  "#F08080", // Light Coral
  "#7FFFD4"  // Aquamarine
];
function renderCountdowns() {
  const container = document.getElementById('countdowns');
  container.innerHTML = '';
  countdowns.forEach((cd, idx) => {
    const targetDate = typeof cd.date === 'function' ? cd.date() : cd.date;
    const { years, months, days, hours, minutes, seconds } = getTimeRemaining(targetDate);
    const div = document.createElement('div');
    div.className = 'countdown';
    div.style.backgroundColor = funColors[idx % funColors.length]; // Assign color
    div.innerHTML = <span class="label">${cd.label}:</span>        ${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s       <button onclick="removeCountdown(${idx})">Remove</button>;
    container.appendChild(div);
  });
}

  </script>
