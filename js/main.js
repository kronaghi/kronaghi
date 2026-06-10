/* Twilight Workshop — shared behavior for all pages.
   Every module checks for its own elements, so this single file
   is safe to include on any page. */

// ── Scroll reveal ──
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}

// ── Typed headline (home) ──
const typedEl = document.getElementById('typed');
if (typedEl) {
  const phrases = ['System Developer', 'Software Architect', 'AI Enthusiast', 'Educator & Mentor'];
  let pi = 0, ci = 0, deleting = false;
  function type() {
    const word = phrases[pi];
    if (!deleting) {
      typedEl.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      typedEl.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 300); return; }
    }
    setTimeout(type, deleting ? 45 : 90);
  }
  setTimeout(type, 900);
}

// ── Animated counter (home stats) ──
const counterEl = document.getElementById('counter-apps');
if (counterEl) {
  const statObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      let startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        const p = Math.min((ts - startTime) / 1800, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        counterEl.innerHTML = Math.round(ease * 250) + '<sup>+</sup>';
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      statObs.disconnect();
    }
  }, { threshold: 0.5 });
  statObs.observe(counterEl);
}

// ── Cursor-tracking radial glow (cards with .glow-card) ──
document.querySelectorAll('.glow-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
  });
});

// ── Contact details unlock (contact page) ──
const unlockBtn = document.getElementById('unlockSubmit');
if (unlockBtn) {
  const userInput = document.getElementById('unlockUser');
  const passInput = document.getElementById('unlockPass');
  const errorMsg  = document.getElementById('unlockError');
  const formBox   = document.getElementById('unlockForm');
  const resultBox = document.getElementById('unlockResult');

  function checkCredentials() {
    if (userInput.value.trim() === 'kambiz' && passInput.value === 'Python') {
      formBox.style.display = 'none';
      resultBox.style.display = 'block';
    } else {
      errorMsg.style.display = 'block';
      passInput.value = '';
      passInput.focus();
    }
  }
  unlockBtn.addEventListener('click', checkCredentials);
  passInput.addEventListener('keydown', e => { if (e.key === 'Enter') checkCredentials(); });
  userInput.addEventListener('keydown', e => { if (e.key === 'Enter') passInput.focus(); });
}
