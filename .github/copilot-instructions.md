# Copilot Instructions — Telegram Bot Presentation

Brief: This is a single-file, self-contained HTML presentation. All code (HTML/CSS/JS) resides in `index.htm`. No build process—open `index.htm` in a browser for development and testing.

Key knowledge:
- Project: Single-file slideshow—slides are in `index.htm` (13 `<section class="slide" data-slide-id="X">` elements).
- Themes: Dark/light implemented via CSS variables and inline styles; theme switching handled by JS and persisted in `localStorage`.
- Navigation: `currentSlideIndex` in JS + `updateSlideView()` toggles `.hidden` on slides; supports keyboard and button controls.
- Inline styles: Many slides/cards have inline `background-color`/`color` and `data-*` attributes for dark theme colors—update these when changing themes.

Example files and locations:
- Main file: [index.htm](index.htm)
- Styles: [styles.css](styles.css)
- Scripts: [script.js](script.js)
- Short description: [README.md](README.md)

Typical tasks for AI agents (specific to this repo):
- Add a slide: Copy an existing `<section class="slide ...">`, increment `data-slide-id`, update slide counter in navigation (e.g., "X/13").
- Update theme/colors: Edit CSS variables in `:root` and add/update `data-bg-dark` / `data-color-dark` on elements with inline styles.
- Fix JS navigator: Focus on `updateSlideView()` and state save/restore via `localStorage`.

Conventions and notes for code generation:
- No server/build scripts—they don't exist.
- When changing visual styles, update both CSS variables and corresponding `data-*` attributes on inline-styled elements.
- For theme-switching changes, test in browser and update `localStorage` state (so page reload shows changes).

Testing and validation:
- Open [index.htm](index.htm) in browser (use devtools for responsive checks: 1024px/768px/480px).
- Verify: Navigation (arrows/buttons), theme toggle, state persistence (page refresh), card/code block appearance.

Additional patterns:
- Responsive design: CSS media queries adjust layouts for mobile; slides use flexbox with `.row`, `.col`, `.center` classes.
- Theme toggle: `toggleTheme()` function switches body class and overrides inline styles; initializes `data-*` attributes on load.
