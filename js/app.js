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

  // ── 当前页 aria-current + 下拉父组高亮 ──
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const dayMatch = path.match(/^day-0[1-3]\.html$/);
  const trackMatch = path.match(/^track-0[1-6]\.html$/);

  document.querySelectorAll('.primary-nav a[data-nav]').forEach((a) => {
    const key = a.getAttribute('data-nav');
    let current = false;
    if (key === 'home' && (path === '' || path === 'index.html')) current = true;
    if (key === 'intro' && dayMatch) current = true;
    if (trackMatch && key === trackMatch[0].replace('.html', '')) current = true;
    if (key && `${key}.html` === path) current = true;
    if (current) {
      a.setAttribute('aria-current', 'page');
      a.closest('.nav-group')?.classList.add('has-current');
    } else {
      a.removeAttribute('aria-current');
    }
  });

  // ── 顶栏下拉：点击展开，再点/Esc/点外部关闭 ──
  const groups = Array.from(document.querySelectorAll('.nav-group'));
  function closeGroups(except) {
    groups.forEach((g) => {
      if (g === except) return;
      g.classList.remove('is-open');
      g.querySelector('.nav-group-btn')?.setAttribute('aria-expanded', 'false');
    });
  }
  groups.forEach((g) => {
    const btn = g.querySelector('.nav-group-btn');
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !g.classList.contains('is-open');
      closeGroups(g);
      g.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', () => closeGroups());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGroups();
  });

  // ── 目录页标题过滤 ──
  const tocInput = document.querySelector('[data-toc-filter]');
  if (tocInput) {
    const rows = Array.from(document.querySelectorAll('.toc-table tbody tr'));
    tocInput.addEventListener('input', () => {
      const q = tocInput.value.trim().toLowerCase();
      rows.forEach((tr) => {
        tr.hidden = q ? !tr.textContent.toLowerCase().includes(q) : false;
      });
    });
  }
})();
