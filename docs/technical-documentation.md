# Technical Documentation

## 1. Project Overview

This project is a personal website for Bader Alqahtani. It is built as a static frontend application using:

- **HTML** for semantic page structure
- **CSS** for responsive layout, visual design, transitions, and theme styling
- **JavaScript** for interactivity, filtering, state management, validation, dialogs, and API integration

The website is designed to be practical for long-term personal use. It presents a profile introduction, selected projects, a visitor guide, recent GitHub work, and a contact message preview.

---

## 2. Folder Structure

```text
202274680-BaderAlqahtani-assignment4/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── presentation/
│   ├── slides.pdf
│   └── demo-video.mp4
└── .gitignore
```

---

## 3. Main Website Sections

### Hero
The hero introduces Bader, includes a professional image, and shows lightweight interactive details such as theme state, visit time, local time, and number of featured projects.

### About
The about section explains interests, learning direction, and the types of software projects Bader enjoys building.

### Projects
The projects section displays selected work in dynamic cards. Visitors can search, filter by category, filter by focus area, sort results, hide or show the section, and open a detail dialog for each project.

### Start Here
The start guide recommends a useful place to begin based on the visitor's goal and interest area.

### GitHub
The GitHub section fetches recent public repositories from Bader's GitHub account and displays key repository information.

### Contact
The contact section validates visitor input and generates a message preview. It also saves unfinished drafts locally so the user does not lose progress on refresh.

---

## 4. JavaScript Architecture

The JavaScript file is organized around focused functions:

- `initializeApp()` starts the page logic.
- `attachEventListeners()` connects buttons, forms, filters, and navigation controls.
- `renderProjects()` filters, sorts, and displays project cards.
- `openProjectDialog()` and `closeProjectDialog()` manage project detail views.
- `generateRecommendation()` creates a visitor guide suggestion.
- `fetchGitHubRepos()` loads public GitHub repository data.
- `handleFormSubmit()` validates the contact form and renders a message preview.
- Helper functions handle formatting, storage, validation, and escaping user input.

The code uses small reusable functions so future updates can be made without rewriting the whole file.

---

## 5. State Management

The site uses `localStorage` for simple browser-based persistence:

- saved light/dark theme
- saved visitor name
- saved project section visibility
- saved contact draft

This keeps the experience consistent across page reloads without needing a backend.

---

## 6. GitHub API Integration

The GitHub section calls:

```text
https://api.github.com/users/BaderQQ/repos?sort=updated&per_page=6
```

The response is filtered to avoid forked repositories, then rendered into cards showing:

- repository name
- description
- star count
- primary language
- last updated date

If the API request fails, the page displays a helpful message instead of leaving the section empty.

---

## 7. Contact Form Validation

The contact form checks:

- name is present and has a valid format
- email matches a normal email pattern
- subject has at least 3 characters
- message has at least 20 characters and 4 words
- confirmation checkbox is selected

When all checks pass, the site creates a safe message preview using escaped text to avoid injecting raw HTML.

---

## 8. CSS Strategy

The CSS uses:

- custom properties for theme colors
- reusable card, button, grid, and badge styles
- responsive media queries
- accessible focus styles
- reveal animations with an IntersectionObserver fallback
- light and dark theme variables

The styling keeps the site clean, readable, and suitable for desktop, tablet, and mobile screens.

---

## 9. Accessibility and UX Details

The website includes:

- semantic landmarks such as `header`, `main`, `section`, and `footer`
- a skip link for keyboard navigation
- visible focus states
- `aria-live` regions for status updates
- descriptive form labels and error messages
- a dialog for project details
- responsive navigation for smaller screens

---

## 10. Limitations and Future Improvements

Current limitations:

- The contact form creates a preview but does not send messages to a backend.
- GitHub data may be unavailable if the API is rate-limited or the user is offline.
- Project content is stored in JavaScript rather than a database or content management system.

Planned improvements:

- Add a real form service or backend endpoint.
- Add a custom domain and analytics.
- Add a blog or learning notes section.
- Run formal accessibility and performance audits before major updates.
