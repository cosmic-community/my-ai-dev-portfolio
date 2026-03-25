# My AI Dev Portfolio

![App Preview](https://imgix.cosmicjs.com/1f9135f0-27ff-11f1-a9b4-1bd048ffba97-autopilot-photo-1551288049-bebda4e38f71-1774411212436.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A cyberpunk-themed AI developer portfolio powered by [Cosmic](https://www.cosmicjs.com) CMS and built with Next.js 16. Features neon-glow effects, holographic cards, animated backgrounds, and a futuristic dark aesthetic — perfect for showcasing an AI developer's projects, skills, and work experience.

## Features

- 🤖 **Dynamic Project Showcase** — Display projects with screenshots, tech stacks, and live/source URLs
- ⚡ **Skills Matrix** — Categorized skills with animated neon proficiency bars
- 💼 **Work Experience Timeline** — Cyberpunk-styled vertical timeline with company details
- 🎆 **Cyberpunk Design System** — Neon glows, scanlines, glitch effects, and holographic cards
- 📱 **Fully Responsive** — Mobile-first design that looks stunning on all devices
- 🚀 **Server-Side Rendering** — Lightning-fast page loads with Next.js 16 App Router
- 🔗 **Cosmic CMS Integration** — All content managed dynamically through Cosmic

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69c35d701224888d2fa48583&clone_repository=69c35ec4c3cad27e1b2e55b8)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a developer portfolio with projects (including screenshots, tech stack, and live URLs), skills, and work experience. User instructions: An AI developer. Style is cyberpunk."

### Code Generation Prompt

> "Build a Next.js application for a creative portfolio called 'My AI Dev Portfolio'. The content is managed in Cosmic CMS with the following object types: projects, skills, work-experience. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: An AI developer. Style is cyberpunk."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) & [Orbitron](https://fonts.google.com/specimen/Orbitron) — Cyberpunk typography

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the portfolio content model

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-ai-dev-portfolio
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables — create a `.env.local` file:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Projects
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: projects } = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Skills by Category
```typescript
const { objects: skills } = await cosmic.objects
  .find({ type: 'skills' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This portfolio uses three Cosmic object types:

| Object Type | Description | Key Metafields |
|-------------|-------------|----------------|
| **Projects** | Portfolio projects | description, screenshots, tech_stack, live_url, source_code_url, featured |
| **Skills** | Technical skills | category, proficiency |
| **Work Experience** | Employment history | company, role, start_date, end_date, description, company_logo |

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables in the Netlify dashboard
5. Deploy!

<!-- README_END -->