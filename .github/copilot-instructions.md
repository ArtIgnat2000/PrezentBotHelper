# Copilot Instructions — Telegram Bot Presentation

Brief: This is a single-file, self-contained HTML presentation about a Telegram bot project. All code (HTML/CSS/JS) resides in `index.htm`. No build process or dependencies—open `index.htm` directly in a browser for development and testing.

## Architecture

**Single-file slideshow** with 18 slides in `index.htm`:
- Each slide: `<section class="slide col center" data-slide-id="X">` with inline `background-color`/`color`
- Navigation state managed by `currentSlideIndex` in `script.js`
- Visibility controlled via `.hidden` class toggle in `updateSlideView()`

**Theme system** (dark/light):
- CSS variables in `:root` (e.g., `--color-bg-base`, `--color-text-primary`) for both `body.theme-dark` and `body.theme-light`
- Inline styles on slides/cards require manual override in `toggleTheme()` function
- Critical: `data-bg-dark` and `data-color-dark` attributes store original dark values for theme restoration
- Initialized by `initThemeData()` IIFE on page load—captures original colors before any theme changes
- Theme and slide position persisted in `localStorage` and restored on page load

**Navigation**:
- Buttons (`prevBtn`/`nextBtn`) and keyboard (ArrowLeft/ArrowRight/Space) both call `prevSlide()`/`nextSlide()`
- Each slide has a `.slide-counter` div showing "X/15" (manually updated)
- `#currentSlide` and `#totalSlides` spans in `.nav-controls` reflect state

## Key Files

- [index.htm](index.htm) — All HTML structure, 18 slides with inline styles, QR codes in slides 1 & 18
- [styles.css](styles.css) — CSS variables, responsive breakpoints (@media 1024px/768px/480px), utility classes
- [script.js](script.js) — Theme toggle logic, slide navigation, localStorage persistence, DOM event handlers
- [images/](images/) — QR codes, logos, bot interface screenshots (bot_main_page.png, bot_help.png, bot_schedule.png, bot_vlabs.png, Bot_schedule_Holyday.png, Bot_schedule_meal.png, Bot_schedule_Add.png)

## Common Tasks

**Add a new slide**:
1. Copy existing `<section class="slide ...">` block from `index.htm`
2. Increment `data-slide-id` attribute (e.g., `data-slide-id="19"`)
3. Update all `.slide-counter` divs throughout file (change "X/18" to "X/19")
4. Update `#totalSlides` span in `.nav-controls` at bottom

**Change theme colors**:
1. Edit CSS variables in `styles.css` `:root` for both `.theme-dark` and `.theme-light`
2. Find inline-styled elements in `index.htm` (search `style="background-color:` or `style="color:`)
3. Add or update `data-bg-dark`/`data-color-dark` attributes to preserve dark theme values
4. Update `toggleTheme()` in `script.js` to apply overrides for new elements (see card/QR container selectors)

**Modify slide content**:
- Cards use pattern: `<div style="background-color: #1e293b; ...">` with icon emoji + heading + description
- Keep inline styles consistent with existing slides for theme switching to work
- Icons are emoji divs: `<div style="font-size: 3rem;">🚀</div>`

## Critical Patterns

**Theme restoration flow**:
1. `initThemeData()` runs on load → stores `data-bg-dark`/`data-color-dark` for all slides/cards/containers
2. `toggleTheme()` → switches `.theme-dark`/`.theme-light` on `<body>` + manually overrides inline styles
3. DOMContentLoaded → reads `localStorage.getItem('theme')` + applies saved theme + restores slide position

**Inline style selectors** in theme toggle (examples from `script.js`):
- Cards: `[style*="background-color: #1e293b"]` (dark) or `[style*="background-color: #f1f5f9"]` (light)
- QR containers: `[style*="border-radius: 12px"]` + has `img[alt*="QR"]` child
- Slide backgrounds: `.slide` elements with `style*="background-color: #0f172a"` or `#020617`

**Responsive breakpoints** (from `styles.css`):
- Desktop: 1024px+ (default, full padding: 4rem)
- Tablet: ≤1024px (padding: 2rem, reduced font sizes)
- Mobile: ≤768px (compact cards, font-size reductions, line-height adjustments)
- Extra small: ≤480px (aggressive compaction, padding: 0.25rem, smallest fonts)

## Testing Checklist

Open `index.htm` in browser:
- [ ] Navigate with arrow keys (Left/Right/Space) and on-screen buttons
- [ ] Toggle theme (☀️/🌙 button) — verify all slides/cards/code blocks change colors
- [ ] Refresh page — theme preference and slide position should persist
- [ ] Test responsive layouts: Resize to 1024px, 768px, 480px — check card padding/font sizes
- [ ] Check QR code container borders/backgrounds in both themes

## No Build Process

- Pure HTML/CSS/JS — no npm, webpack, or bundler
- No external dependencies (all code inline or in 3 local files)
- Development: Edit files → refresh browser
- Deployment: Copy `index.htm`, `styles.css`, `script.js`, `images/` to any static host
