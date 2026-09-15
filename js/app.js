(() => {
  const root = document.documentElement;
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  // ── 主题：对齐 ALE theme.js（svg 日月 + localStorage key=theme） ──
  function applyTheme(theme, animate) {
    if (animate) {
      root.classList.add('theme-transitioning');
      setTimeout(() => root.classList.remove('theme-transitioning'), 300);
    }
    root.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('theme', theme); } catch (_) {}
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const moon = btn.querySelector('.icon-moon');
      const sun = btn.querySelector('.icon-sun');
      if (moon) moon.style.display = theme === 'dark' ? 'none' : 'block';
      if (sun) sun.style.display = theme === 'dark' ? 'block' : 'none';
      btn.setAttribute('aria-label', theme === 'dark' ? '切换到浅色主题' : '切换到深色主题');
      btn.setAttribute('title', theme === 'dark' ? '浅色主题' : '深色主题');
    });
  }

  let theme = 'light';
  try {
    theme = localStorage.getItem('theme')
      || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (_) {}
  applyTheme(theme, false);

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyTheme(root.classList.contains('dark') ? 'light' : 'dark', true);
    });
  });

  // ── 移动端主导航抽屉 ──
  function setNavOpen(open) {
    if (!primaryNav) return;
    primaryNav.classList.toggle('is-open', open);
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
    }
    const scrim = document.getElementById('navScrim');
    if (scrim) scrim.hidden = !open;
  }

  navToggle?.addEventListener('click', () => {
    setNavOpen(!primaryNav.classList.contains('is-open'));
  });
  document.getElementById('navScrim')?.addEventListener('click', () => setNavOpen(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNavOpen(false);
  });
  // 点导航项后收起
  primaryNav?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 900px)').matches) setNavOpen(false);
    });
  });

  // ── 当前页 aria-current（双线索：紫底 + 底条） ──
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const dayMatch = path.match(/^day-0[1-3]\.html$/);
  const trackMatch = path.match(/^track-0[1-6]\.html$/);

  document.querySelectorAll('.primary-nav a[data-nav]').forEach((a) => {
    const key = a.getAttribute('data-nav');
    let current = false;
    if (key === 'home' && (path === '' || path === 'index.html')) current = true;
    if (key === 'intro' && dayMatch) current = true;
    if (key === trackMatch?.[0]?.replace('.html', '') && trackMatch) current = true;
    if (key === 'map' && (path === '' || path === 'index.html') && location.hash === '#capability-map') {
      // 首页锚点不高亮顶栏，避免与「首页」冲突
    }
    if (current) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
})();
