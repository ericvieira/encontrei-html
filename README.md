# Encontrei HTML

A modern, accessible HTML/CSS/JavaScript website with Figma design integration via Model Context Protocol (MCP).

## Quick Start

### Prerequisites
- Web browser (Chrome, Firefox, Safari, or Edge)
- Text editor or IDE
- Local web server (optional for development)

### Project Setup

1. **Clone or initialize the project structure:**
   ```bash
   # The recommended structure is documented in CLAUDE.md
   ```

2. **Set up the basic file structure:**
   ```
   mkdir -p css components js assets/{images,svg,icons,fonts,videos} docs
   ```

3. **Create initial files:**
   - `index.html` - Main entry point
   - `css/reset.css` - CSS reset
   - `css/tokens.css` - Design tokens
   - `css/main.css` - Main stylesheet

### Development

#### Local Development Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have npx)
npx serve

# Or use any local server of your choice
```

Then open http://localhost:8000 in your browser.

### Figma Integration

This project uses the Figma MCP server for design-to-code workflow. See [CLAUDE.md](./CLAUDE.md) for detailed integration guidelines.

#### Available MCP Tools
- `get_design_context` - Get component code from Figma
- `get_screenshot` - Export design screenshots
- `get_metadata` - Get structure overview
- `get_variable_defs` - Extract design tokens
- `add_code_connect_map` - Map components to code

### Design System

All design system rules and conventions are documented in [CLAUDE.md](./CLAUDE.md), including:
- Design tokens (colors, typography, spacing)
- Component architecture
- Styling approach (BEM methodology)
- Asset management
- Icon system
- Responsive design breakpoints

### Code Standards

- **HTML:** Semantic HTML5 with ARIA attributes
- **CSS:** BEM naming convention, mobile-first responsive design
- **JavaScript:** Modern ES6+ features
- **Accessibility:** WCAG AA compliance minimum
- **Language:** Portuguese (Brazil) for content, English for code

### Project Structure

```
encontrei_html/
├── index.html
├── css/
│   ├── reset.css
│   ├── tokens.css
│   ├── utilities.css
│   └── main.css
├── components/
│   └── [component-name]/
│       ├── [component-name].html
│       ├── [component-name].css
│       └── [component-name].js
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── docs/
└── README.md
```

### Contributing

1. Follow the design system rules in CLAUDE.md
2. Use BEM naming convention for CSS classes
3. Ensure all components are accessible
4. Test on multiple browsers and devices
5. Optimize assets before committing

### License

[Your License Here]

---

For detailed design system documentation, see [CLAUDE.md](./CLAUDE.md).
