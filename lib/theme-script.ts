// Theme initialization — runs before React hydration to prevent flash
export const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    var theme = stored || preferred;
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {}
})();
`;
