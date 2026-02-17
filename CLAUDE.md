# Design System Rules - Encontrei HTML

This document provides guidelines for integrating Figma designs into the codebase using the Model Context Protocol (MCP).

## Project Overview

**Project Type:** HTML/CSS/JavaScript static website
**Design Integration:** Figma via MCP
**Last Updated:** 2026-02-17

---

## 1. Design Token Definitions

### Location
- Design tokens should be defined in `/css/tokens.css` using CSS custom properties
- Tokens should mirror Figma variables when available

### Structure
```css
:root {
  /* Colors - Semantic */
  --color-primary: #your-primary-color;
  --color-secondary: #your-secondary-color;
  --color-accent: #your-accent-color;

  /* Colors - Neutral */
  --color-background: #ffffff;
  --color-surface: #f5f5f5;
  --color-text-primary: #212121;
  --color-text-secondary: #757575;
  --color-border: #e0e0e0;

  /* Typography */
  --font-family-primary: 'Inter', system-ui, sans-serif;
  --font-family-secondary: 'Roboto', sans-serif;

  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Spacing Scale (8px base) */
  --space-0: 0;
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */

  /* Border Radius */
  --radius-sm: 0.25rem;  /* 4px */
  --radius-md: 0.5rem;   /* 8px */
  --radius-lg: 0.75rem;  /* 12px */
  --radius-xl: 1rem;     /* 16px */
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;

  /* Z-index Scale */
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-overlay: 1200;
  --z-modal: 1300;
  --z-tooltip: 1400;
}
```

### Token Transformation
- Extract tokens from Figma variables using `mcp__figma-remote-mcp__get_variable_defs`
- Map Figma variable names to CSS custom property names
- Use semantic naming for colors (e.g., `--color-primary` instead of `--color-blue-500`)

---

## 2. Component Library

### Location
- Components should be organized in `/components/`
- Each component should have its own folder with HTML, CSS, and JS files

### Structure
```
/components/
  /button/
    button.html          # Component markup template
    button.css           # Component-specific styles
    button.js            # Component behavior (if needed)
    README.md            # Component documentation
  /card/
  /navigation/
  /form/
```

### Component Architecture
- **Modular Components:** Each component is self-contained
- **BEM Naming Convention:** Use Block-Element-Modifier methodology
  - Block: `.button`
  - Element: `.button__icon`
  - Modifier: `.button--primary`
- **Template Pattern:** Components use semantic HTML with ARIA attributes

### Example Component (Button)
```html
<!-- button.html -->
<button class="button button--primary" type="button">
  <span class="button__text">Click me</span>
</button>
```

```css
/* button.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
}

.button--primary {
  background-color: var(--color-primary);
  color: white;
}

.button--primary:hover {
  opacity: 0.9;
}
```

---

## 3. Frameworks & Libraries

### UI Framework
- **Vanilla HTML/CSS/JavaScript** - No framework dependencies
- Progressive enhancement approach
- Modern JavaScript (ES6+) for interactivity

### Styling
- **CSS Custom Properties** for theming and tokens
- **BEM** naming convention for class names
- **CSS Grid & Flexbox** for layouts
- No CSS preprocessors (use native CSS features)

### Build System
- **Optional:** Simple build tools for production
  - HTML minification
  - CSS minification and autoprefixer
  - JavaScript bundling (if needed)
- Development: Live server with hot reload

### Browser Support
- Modern evergreen browsers (last 2 versions)
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 4. Asset Management

### Location
```
/assets/
  /images/          # Raster images (JPEG, PNG, WebP)
  /svg/             # SVG graphics and illustrations
  /icons/           # Icon set (separate from SVG)
  /fonts/           # Custom web fonts
  /videos/          # Video files
```

### File Naming
- Use kebab-case: `hero-image.jpg`, `product-photo.png`
- Include size variants: `logo-small.svg`, `logo-large.svg`
- Use descriptive names, not generic ones

### Optimization
- **Images:**
  - Use WebP format with JPEG/PNG fallbacks
  - Provide 1x and 2x versions for retina displays
  - Lazy load images below the fold
  - Compress images (target: <200KB for photos)
- **SVG:**
  - Optimize with SVGO
  - Remove unnecessary metadata
  - Inline small SVGs (<2KB) for critical assets
- **Fonts:**
  - Use WOFF2 format primarily
  - Subset fonts to include only needed characters
  - Use `font-display: swap` for loading

### Usage in HTML
```html
<!-- Responsive images -->
<picture>
  <source srcset="assets/images/hero.webp" type="image/webp">
  <img src="assets/images/hero.jpg" alt="Hero image" loading="lazy">
</picture>

<!-- Inline SVG for icons -->
<svg class="icon icon--search" aria-hidden="true">
  <use href="assets/icons/sprite.svg#search"></use>
</svg>
```

---

## 5. Icon System

### Location
- Icons stored in `/assets/icons/`
- Use SVG sprite sheet: `/assets/icons/sprite.svg`

### Icon Workflow
1. **Export from Figma:** Use `mcp__figma-remote-mcp__get_screenshot` or design context
2. **Optimize:** Run through SVGO
3. **Add to sprite:** Combine into single sprite.svg file
4. **Reference:** Use `<use>` element with hash reference

### Naming Convention
- Use kebab-case: `arrow-right`, `user-profile`, `close-x`
- Group by category: `icon-social-facebook`, `icon-ui-menu`

### Implementation
```html
<!-- Icon sprite (sprite.svg) -->
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="search" viewBox="0 0 24 24">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
  </symbol>
  <symbol id="menu" viewBox="0 0 24 24">
    <path d="M4 6h16M4 12h16M4 18h16"/>
  </symbol>
</svg>

<!-- Using icons -->
<svg class="icon icon--search" width="24" height="24" aria-label="Search">
  <use href="/assets/icons/sprite.svg#search"></use>
</svg>
```

### CSS for Icons
```css
.icon {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon--sm { width: 1rem; height: 1rem; }
.icon--lg { width: 2rem; height: 2rem; }
```

---

## 6. Styling Approach

### CSS Methodology
- **BEM (Block Element Modifier)** for component naming
- **Utility Classes** for common patterns (but use sparingly)
- **Component-Scoped Styles** in separate CSS files

### File Structure
```
/css/
  reset.css           # CSS reset/normalize
  tokens.css          # Design tokens (CSS custom properties)
  utilities.css       # Utility classes
  layout.css          # Grid system and layout helpers
  typography.css      # Typography styles
  /components/        # Component-specific styles
    button.css
    card.css
    navigation.css
```

### Global Styles
```css
/* reset.css */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* typography.css */
body {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
  background-color: var(--color-background);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-4);
}
```

### Responsive Design
- **Mobile-First Approach:** Base styles for mobile, enhance for larger screens
- **Breakpoints:**
  ```css
  /* Mobile: 0-640px (base styles) */
  /* Tablet: 641-1024px */
  @media (min-width: 40.0625em) { /* 641px */ }

  /* Desktop: 1025px+ */
  @media (min-width: 64.0625em) { /* 1025px */ }

  /* Large Desktop: 1440px+ */
  @media (min-width: 90em) { /* 1440px */ }
  ```

### Utility Classes (Use Sparingly)
```css
/* utilities.css */
.sr-only { /* Screen reader only */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}
```

---

## 7. Project Structure

### Recommended Structure
```
encontrei_html/
├── index.html              # Main entry point
├── about.html              # Additional pages
├── contact.html
│
├── css/
│   ├── reset.css
│   ├── tokens.css
│   ├── utilities.css
│   ├── layout.css
│   ├── typography.css
│   └── main.css           # Imports all CSS
│
├── components/
│   ├── button/
│   │   ├── button.html
│   │   ├── button.css
│   │   └── button.js
│   ├── card/
│   └── navigation/
│
├── js/
│   ├── main.js            # Main JavaScript entry
│   └── modules/
│       ├── navigation.js
│       └── form-validation.js
│
├── assets/
│   ├── images/
│   ├── svg/
│   ├── icons/
│   │   └── sprite.svg
│   ├── fonts/
│   └── videos/
│
├── docs/
│   └── design-system.md   # Design system documentation
│
└── README.md
```

### HTML Page Template
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page description">
  <title>Page Title - Encontrei</title>

  <!-- Preload critical assets -->
  <link rel="preload" href="/css/main.css" as="style">
  <link rel="preload" href="/assets/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

  <!-- Stylesheets -->
  <link rel="stylesheet" href="/css/main.css">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
</head>
<body>
  <!-- Main content -->
  <main>
    <!-- Page content here -->
  </main>

  <!-- Scripts -->
  <script src="/js/main.js" defer></script>
</body>
</html>
```

---

## 8. Figma Integration Workflow

### Step 1: Extract Design Context
```bash
# Get design metadata for a Figma node
# Use mcp__figma-remote-mcp__get_metadata to see structure
# Use mcp__figma-remote-mcp__get_design_context for full details
```

### Step 2: Extract Variables/Tokens
```bash
# Get Figma variables and map to CSS custom properties
# Use mcp__figma-remote-mcp__get_variable_defs
```

### Step 3: Generate Component Code
1. Use `mcp__figma-remote-mcp__get_design_context` to get initial code
2. Refactor to match project conventions (BEM, tokens, structure)
3. Place in appropriate component folder
4. Extract common tokens to `tokens.css`

### Step 4: Extract Assets
1. Use `mcp__figma-remote-mcp__get_screenshot` for images
2. Optimize assets (compress, format conversion)
3. Place in `/assets/` with proper naming

### Design-to-Code Checklist
- [ ] Extract and map design tokens (colors, typography, spacing)
- [ ] Create component structure following BEM
- [ ] Use CSS custom properties for all values
- [ ] Ensure semantic HTML with proper ARIA labels
- [ ] Implement responsive behavior (mobile-first)
- [ ] Optimize and add assets
- [ ] Add hover/focus states
- [ ] Test accessibility (keyboard navigation, screen readers)
- [ ] Cross-browser testing

---

## 9. Best Practices

### Accessibility
- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, etc.)
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Maintain color contrast ratios (WCAG AA minimum)
- Provide alt text for images
- Test with screen readers

### Performance
- Minimize HTTP requests
- Lazy load images below the fold
- Use appropriate image formats (WebP with fallbacks)
- Minify CSS and JavaScript for production
- Use CSS containment for complex components
- Avoid layout shifts (CLS)

### Code Quality
- Write semantic, accessible HTML
- Keep CSS specificity low (avoid `!important`)
- Use modern CSS features (Grid, Flexbox, Custom Properties)
- Write modular, reusable components
- Comment complex logic
- Follow consistent naming conventions

### Version Control
- Commit components separately
- Use meaningful commit messages
- Keep design assets in version control
- Document breaking changes

---

## 10. Code Connect Integration

### Mapping Figma to Code
When using Code Connect to map Figma components to code:

1. **Component Mapping:** Link Figma components to their HTML/CSS equivalents
2. **Props Mapping:** Map Figma variants to CSS modifier classes
3. **Label:** Use "Markdown" or "Javascript" as the label for Code Connect

### Example Code Connect Mapping
```javascript
// For a Button component
{
  nodeId: "123:456",
  componentName: "Button",
  source: "/components/button/button.html",
  label: "Markdown"
}
```

---

## Additional Notes

- **Language:** Primary language is Portuguese (Brazil) - `pt-BR`
- **Units:** Use `rem` for fonts and spacing, `px` for borders
- **Comments:** Write comments in English for code, Portuguese for user-facing content
- **Testing:** Test on actual devices, not just browser DevTools
- **Documentation:** Keep this document updated as the design system evolves

---

Last updated: 2026-02-17
