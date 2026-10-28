# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Rama Prashanth (ramaprashanth.com). Static single-page site built with vanilla HTML, CSS, and JavaScript. Hosted on GitHub Pages with custom domain.

## Development

No build process required. Open `index.html` directly in a browser or use any local server:

```bash
# Using Python
python -m http.server 8000

# Using Node
npx serve .
```

## Architecture

**Single-page structure:**
- `index.html` - Complete portfolio content with semantic HTML sections (hero, about, experience, skills, projects, publications, education, certifications, contact)
- `assets/css/style.css` - All styles with CSS custom properties (design tokens at `:root`)
- `assets/js/main.js` - Vanilla JS for interactions (scroll reveal, nav highlighting, pagination, count-up animations)

**Key CSS patterns:**
- Design tokens defined in `:root` (colors, fonts, spacing, radii)
- `.reveal` / `.revealed` classes for scroll-triggered fade-in animations
- `.section-alt` for alternating background sections
- `.tag` / `.tag-accent` for skill/tech tags
- Responsive breakpoints at 480px, 640px, 768px, 900px, 1024px

**Key JS patterns:**
- IntersectionObserver for scroll reveal and active nav highlighting
- Projects grid uses client-side pagination (6 per page)
- Stat numbers animate with count-up effect on scroll into view
- Mobile menu toggles `.open` class on nav list

## Deployment

Push to `master` branch triggers GitHub Pages deployment. Custom domain configured via `CNAME` file.
