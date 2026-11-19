# Nōta — Learning Platform

A learning platform designed in Figma and built from scratch with React, Vite and React Router.

**Live demo:** [https://nota-self-kappa.vercel.app](https://nota-self-kappa.vercel.app)

![Nōta Catalog](https://nota-self-kappa.vercel.app/og-image.png)

## Features

- 6 screens: Catalog, Course Detail, Lesson Player, My Progress, Quiz, Profile
- Course filtering by category and search
- Interactive video player with lesson progress tracking
- Quiz with scoring, feedback and retry — available for 3 courses
- Progress tracking with localStorage persistence and completion certificates
- Dark mode with OS preference detection and manual toggle
- 404 catch-all page
- Fade-in animations on page and card elements
- Accessible: `aria-label` on overlays, `aria-pressed` on filters, `aria-checked` on toggles
- Open Graph & Twitter Card meta tags for social sharing
- Fully responsive layout

## Screenshots

| Catalog | Course Detail | Lesson Player |
|---------|---------------|---------------|
| ![Catalog](docs/catalog.png) | ![Course Detail](docs/course-detail.png) | ![Lesson Player](docs/lesson-player.png) |

| My Progress | Quiz | Profile |
|-------------|------|---------|
| ![Progress](docs/progress.png) | ![Quiz](docs/quiz.png) | ![Profile](docs/profile.png) |

> To add screenshots: take them at 1280×800 and save as PNGs inside a `docs/` folder.

## Tech stack

- **React 19** with React Router v7
- **Vite** for build and dev server
- **Lucide React** for icons
- **Plain CSS** with custom properties (light & dark tokens)

## Design

Designed in Figma with a custom design system: 12 color tokens (light + dark), 8 text styles (Inter + JetBrains Mono) and 8 reusable components.

**Figma:** [View design file](https://www.figma.com/design/oXkjtFsBa6dmEC16EesOJI)
**Behance:** [View case study](https://www.behance.net/gallery/258732865)

## Getting started

```bash
git clone https://github.com/PCostaaa/nota.git
cd nota
npm install
npm run dev
```

## Author

Pedro Costa — [Behance](https://www.behance.net/pedrocosta262) · [LinkedIn](https://www.linkedin.com/in/pedroabcosta/) · [GitHub](https://github.com/PCostaaa)
