const localTheme = localStorage.getItem('theme');
const toggle = document.getElementById('app-theme');

if (localTheme) {
    document.body.setAttribute('data-theme', localTheme);
    toggle.textContent = localTheme === 'light' ? '🌙' : '☀️';
} else {
    document.body.setAttribute('data-theme', 'dark');
    toggle.textContent = '☀️';
}

toggle.addEventListener('click', () => {
  const body = document.body;
  const isDark = body.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';

  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  toggle.textContent = isDark ? '🌙' : '☀️';
});


