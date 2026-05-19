const controls = document.querySelectorAll('[data-token]');
const root = document.documentElement;

controls.forEach(control => {
  control.addEventListener('input', event => {
    const token = event.target.dataset.token;
    const unit = event.target.dataset.unit || '';
    root.style.setProperty(token, event.target.value + unit);
  });
});

const modeToggle = document.getElementById('modeToggle');

let darkMode = true;

const darkTheme = {
  '--color-primary': '#7c3aed',
  '--color-secondary': '#14b8a6',
  '--color-background': '#0f172a',
  '--color-surface': 'rgba(17,24,39,0.7)',
  '--color-text': '#f8fafc'
};

const lightTheme = {
  '--color-primary': '#6d28d9',
  '--color-secondary': '#0f766e',
  '--color-background': '#f8fafc',
  '--color-surface': 'rgba(255,255,255,0.7)',
  '--color-text': '#0f172a'
};

modeToggle.addEventListener('click', () => {
  darkMode = !darkMode;

  const activeTheme = darkMode ? darkTheme : lightTheme;

  Object.entries(activeTheme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });

  document.body.style.background = darkMode
    ? 'radial-gradient(circle at top, #1e293b, #020617)'
    : 'radial-gradient(circle at top, #dbeafe, #f8fafc)';

  modeToggle.innerHTML = darkMode
    ? '🌙 Dark Mode'
    : '☀️ Light Mode';
});

const randomThemeBtn = document.getElementById('randomTheme');

function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
}

randomThemeBtn.addEventListener('click', () => {
  root.style.setProperty('--color-primary', randomColor());
  root.style.setProperty('--color-secondary', randomColor());
});

const resetThemeBtn = document.getElementById('resetTheme');

resetThemeBtn.addEventListener('click', () => {
  location.reload();
});

const copyThemeBtn = document.getElementById('copyTheme');

copyThemeBtn.addEventListener('click', async () => {
  const styles = getComputedStyle(root);

  const cssVars = `
:root {
  --color-primary: ${styles.getPropertyValue('--color-primary')};
  --color-secondary: ${styles.getPropertyValue('--color-secondary')};
  --color-background: ${styles.getPropertyValue('--color-background')};
  --color-surface: ${styles.getPropertyValue('--color-surface')};
  --color-text: ${styles.getPropertyValue('--color-text')};
}
`;

  await navigator.clipboard.writeText(cssVars);

  copyThemeBtn.textContent = 'Copied!';

  setTimeout(() => {
    copyThemeBtn.textContent = 'Copy CSS Variables';
  }, 2000);
});

const shadowRange = document.getElementById('shadowRange');

shadowRange.addEventListener('input', e => {
  const value = e.target.value;

  root.style.setProperty(
    '--shadow',
    `0 20px ${value}px rgba(0,0,0,0.35)`
  );
});