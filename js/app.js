(() => {
  const shell = document.querySelector('.shell');
  const toggle = document.getElementById('railToggle');
  const navToggle = document.getElementById('navToggle');
  const scrim = document.getElementById('railScrim');
  const themeBtn = document.getElementById('themeBtn');
  const root = document.documentElement;

  function setCollapsed(collapsed) {
    if (!shell) return;
    shell.classList.toggle('is-collapsed', collapsed);
    try { localStorage.setItem('atlas-rail-collapsed', collapsed ? '1' : '0'); } catch (_) {}
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(!collapsed));
      toggle.textContent = collapsed ? '»' : '«';
      toggle.setAttribute('aria-label', collapsed ? '展开侧栏' : '收起侧栏');
      toggle.setAttribute('title', collapsed ? '展开侧栏' : '收起侧栏');
    }
  }

  function setRailOpen(open) {
    if (!shell) return;
    shell.classList.toggle('rail-open', open);
    if (navToggle) navToggle.setAttribute('aria-expanded', String(open));
    if (scrim) scrim.hidden = !open;
  }

  try {
    const saved = localStorage.getItem('atlas-rail-collapsed');
    if (saved === '1' && window.matchMedia('(min-width: 901px)').matches) setCollapsed(true);
  } catch (_) {}

  toggle?.addEventListener('click', () => {
    setCollapsed(!shell.classList.contains('is-collapsed'));
  });

  navToggle?.addEventListener('click', () => {
    setRailOpen(!shell.classList.contains('rail-open'));
  });
  scrim?.addEventListener('click', () => setRailOpen(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setRailOpen(false);
  });

  // 高亮当前页
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.rail-item').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // 主题：对齐 ALE theme.js（.dark class + theme-transitioning ≤300ms）
  function applyTheme(theme, animate) {
    if (animate) {
      root.classList.add('theme-transitioning');
      setTimeout(() => root.classList.remove('theme-transitioning'), 300);
    }
    root.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('theme', theme);
      localStorage.setItem('atlas-theme', theme);
    } catch (_) {}
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '☀' : '🌙';
      themeBtn.setAttribute('aria-label', theme === 'dark' ? '切换到浅色主题' : '切换到深色主题');
      themeBtn.setAttribute('title', theme === 'dark' ? '浅色' : '深色');
    }
  }
  let theme = 'light';
  try {
    theme = localStorage.getItem('theme')
      || localStorage.getItem('atlas-theme')
      || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (_) {}
  applyTheme(theme, false);
  themeBtn?.addEventListener('click', () => {
    applyTheme(root.classList.contains('dark') ? 'light' : 'dark', true);
  });
})();
