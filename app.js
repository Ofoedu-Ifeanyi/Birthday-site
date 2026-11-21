// --- 1. GRAB THE ELEMENTS ---
const timerEl = document.getElementById("timer");
const barFillEl = document.getElementById("bar-fill");

// The dates are 22 Nov 1999 and 22 Nov 2026 (UTC+1)
const BIRTHDAY = new Date("2026-11-22T00:00:00+01:00").getTime();
const START = new Date("2000-11-22T00:00:00+01:00").getTime();


// --- 3. THE FADE HELPER ---
function showScreen(showId, hideId1, hideId2) {
  const showEl = document.getElementById(showId);
  showEl.style.opacity = "1";
  showEl.style.pointerEvents = "auto";

  const hideEl1 = document.getElementById(hideId1);
  hideEl1.style.opacity = "0";
  hideEl1.style.pointerEvents = "none";

  const hideEl2 = document.getElementById(hideId2);
  hideEl2.style.opacity = "0";
  hideEl2.style.pointerEvents = "none";
}


function update() {
  const now = Date.now();
  const endOfBirthday = BIRTHDAY + 86400000;

  if(now < BIRTHDAY){
    // clculating the milliseconds left
    const remainingMs = BIRTHDAY - now;
    const totalSeconds = Math.floor(remainingMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    timerEl .textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    const percent = ((now - START) / (BIRTHDAY - START)) * 100;
    barFillEl.style.width = `${percent}%`;
    
    showScreen("countdown-screen", "reflection-screen", "closed-screen");
  }
  else if (now >= BIRTHDAY && now < endOfBirthday){
     showScreen("reflection-screen", "countdown-screen", "closed-screen");
  }
  else{
     showScreen("closed-screen", "countdown-screen", "reflection-screen");
  }
}
update();
setInterval(update, 1000);