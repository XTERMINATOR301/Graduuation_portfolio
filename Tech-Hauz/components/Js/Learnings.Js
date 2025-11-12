/* Interactivity: navigation toggle, smooth scroll, filtering, form validation, progress bars, dark mode */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project');
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  const themeToggle = document.getElementById('themeToggle');

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        mainNav.classList.remove('open'); // close mobile menu
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Project filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projects.forEach(p => {
        const tech = p.dataset.tech || '';
        if (filter === 'all' || tech.includes(filter)) {
          p.style.display = '';
          p.classList.remove('hidden');
        } else {
          p.style.display = 'none';
          p.classList.add('hidden');
        }
      });
    });
  });

  // Progress bars: read data-percent and animate
  document.querySelectorAll('.progress').forEach(el => {
    const percent = parseInt(el.dataset.percent || '0', 10);
    const fill = el.querySelector('.progress-fill');
    if (fill) {
      // animate after small delay
      setTimeout(() => (fill.style.width = percent + '%'), 200);
    }
  });

  // Form validation & success message
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        alert('Please complete all fields.');
        return;
      }
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Show success (no backend)
      successMessage.hidden = false;
      contactForm.reset();
      setTimeout(() => (successMessage.hidden = true), 4000);
    });
  }

  // Dark mode toggle with localStorage
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  const applyTheme = (theme) => {
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');

    // show word indicating current mode (beginner-friendly)
    if (themeToggle) {
      // display current mode clearly: "🌙 Dark Mode" or "☀️ Light Mode"
      themeToggle.textContent = theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode';
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Dark mode active' : 'Light mode active');
      themeToggle.title = theme === 'dark' ? 'Dark mode active' : 'Light mode active';
    }

    localStorage.setItem('theme', theme);
  };

  if (stored) applyTheme(stored);
  else {
    // prefer dark if user OS prefers dark
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  }
});