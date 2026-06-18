export type Theme = "light" | "dark";

const THEME_KEY = "passkey-lookup-theme";

export const SUN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
export const MOON_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

export function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

export function isDarkActive(): boolean {
  const stored = getStoredTheme();
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

export function applyStoredThemeOnLoad(): void {
  const stored = getStoredTheme();
  if (stored) {
    document.documentElement.setAttribute("data-theme", stored);
  }
}

export function initThemeToggle(button: HTMLButtonElement, onChange: () => void): void {
  function render(): void {
    const dark = isDarkActive();
    button.innerHTML = dark ? SUN_ICON : MOON_ICON;
    button.setAttribute("aria-pressed", String(dark));
  }

  button.addEventListener("click", () => {
    applyTheme(isDarkActive() ? "light" : "dark");
    render();
    onChange();
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    render();
    onChange();
  });

  render();
}
