# Bader Alqahtani Personal Website

## Overview

This repository contains my personal website, built with HTML, CSS, and JavaScript. The site introduces who I am, highlights selected project ideas, displays recent public GitHub work, and provides a simple contact message preview experience.

The goal is to keep the website useful beyond a single course submission. It is designed as a long-term portfolio space that I can continue improving as I build more projects and gain more experience.

---

## Live Links

- Live site: ``
- GitHub profile: `https://github.com/BaderQQ`


---

## Main Features

### Personal Introduction
- Clear hero section with a professional profile image
- Short introduction about my interests and current direction
- Light/dark mode toggle with saved preference
- Optional personalized welcome name saved in the browser

### Projects
- Searchable and filterable project cards
- Category and focus filters
- Sorting by newest, oldest, or alphabetical order
- Project detail dialog with each project's idea and focus area

### Start Here Guide
- A small visitor guide that suggests where to begin based on the visitor's goal and interest area
- Useful for recruiters, collaborators, students, or general visitors

### GitHub Activity
- Fetches recent public repositories from the GitHub API
- Displays repository name, description, language, stars, and update date
- Includes graceful fallback messaging if GitHub data cannot be loaded

### Contact Preview
- Validates name, email, subject, message, and confirmation checkbox
- Saves unfinished drafts locally in the browser
- Creates a clean message preview before the visitor copies or sends it elsewhere

---

## Project Structure

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
└── .gitignore
```

---

## Run Locally

1. Clone the repository:

```bash
git clone https://github.com/BaderQQ/202274680-BaderAlqahtani-assignment4.git
```

2. Open the project folder:

```bash
cd 202274680-BaderAlqahtani-assignment4
```

3. Open `index.html` in a browser.

No installation, build process, or external package manager is required.

---



## Documentation

- `docs/technical-documentation.md` explains the structure and implementation.
- `docs/ai-usage-report.md` describes how AI tools supported development and how the suggestions were reviewed.

---

## Future Improvements

- Add a real contact backend or form service.
- Add a custom domain.
- Replace concept images with more project screenshots over time.
- Add a blog or learning notes section.
- Expand accessibility and performance audits as the site grows.
