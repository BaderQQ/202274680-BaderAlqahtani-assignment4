const GITHUB_USERNAME = "BaderQQ";

const STORAGE_KEYS = {
  theme: "bader-site-theme",
  visitorName: "bader-site-visitor-name",
  showProjects: "bader-site-show-projects",
  contactDraft: "bader-site-contact-draft"
};

const projects = [
  {
    title: "Campus Route Planner",
    description:
      "A campus-focused planning idea for viewing classes, finding buildings, and organizing walking routes between important locations.",
    category: "web",
    focus: "systems",
    date: "2026-02-11",
    image: "assets/images/campus-route.svg",
    tags: ["Campus", "Planning", "Maps", "Student Life"],
    idea:
      "Students often move between buildings quickly, so the idea is to make campus planning easier by combining schedules, locations, and routes in one experience.",
    focusText:
      "I focused on the user flow, clear visual structure, and how route information could be organized in a way that feels fast and practical."
  },
  {
    title: "Event Booking Platform",
    description:
      "A clean event browsing and booking concept with simple navigation, clear event cards, and a smooth reservation flow.",
    category: "web",
    focus: "ux",
    date: "2026-02-08",
    image: "assets/images/event-booking.svg",
    tags: ["Events", "Booking", "UX", "Interface"],
    idea:
      "The goal is to make event discovery and reservation feel simple, especially when users need to compare events and make a decision quickly.",
    focusText:
      "I focused on layout clarity, form flow, visual hierarchy, and keeping the interaction easy to follow from browsing to reservation."
  },
  {
    title: "Study Habit Tracker",
    description:
      "A productivity tool concept for tracking study sessions, goals, and progress in a simple dashboard-style interface.",
    category: "productivity",
    focus: "productivity",
    date: "2025-11-15",
    image: "assets/images/study-tracker.svg",
    tags: ["Study", "Goals", "Progress", "Dashboard"],
    idea:
      "Consistent study habits are easier to build when progress is visible, so this project focuses on turning small sessions into clear feedback.",
    focusText:
      "I focused on readable progress cards, simple status information, and a layout that could grow into a more complete productivity tool."
  },
  {
    title: "Learning Notes Companion",
    description:
      "A lightweight learning tool concept that turns long notes into clearer review points and organized study summaries.",
    category: "learning",
    focus: "learning",
    date: "2025-10-04",
    image: "assets/images/learning-notes.svg",
    tags: ["Notes", "Learning", "Review", "Writing"],
    idea:
      "Long notes can be difficult to review, so this concept supports better learning by helping turn information into shorter, easier-to-read points.",
    focusText:
      "I focused on clean reading sections, concise output, and a workflow that could support students when preparing for review or revision."
  }
];

const dom = {
  menuToggle: document.getElementById("menuToggle"),
  primaryNav: document.getElementById("primaryNav"),
  scrollProgress: document.getElementById("scrollProgress"),
  year: document.getElementById("year"),
  welcomeBtn: document.getElementById("welcomeBtn"),
  visitorName: document.getElementById("visitorName"),
  themeBtn: document.getElementById("themeBtn"),
  themeStatus: document.getElementById("themeStatus"),
  visitTimer: document.getElementById("visitTimer"),
  localClock: document.getElementById("localClock"),
  projectsGrid: document.getElementById("projectsGrid"),
  projectControls: document.getElementById("projectControls"),
  projectSearch: document.getElementById("projectSearch"),
  categoryFilter: document.getElementById("categoryFilter"),
  interestFilter: document.getElementById("interestFilter"),
  sortProjects: document.getElementById("sortProjects"),
  projectHint: document.getElementById("projectHint"),
  toggleProjectsBtn: document.getElementById("toggleProjectsBtn"),
  emptyState: document.getElementById("emptyState"),
  visitorGoal: document.getElementById("visitorGoal"),
  interestArea: document.getElementById("interestArea"),
  recommendBtn: document.getElementById("recommendBtn"),
  recommendationBox: document.getElementById("recommendationBox"),
  refreshReposBtn: document.getElementById("refreshReposBtn"),
  repoGrid: document.getElementById("repoGrid"),
  repoMessage: document.getElementById("repoMessage"),
  repoCount: document.getElementById("repoCount"),
  repoStatus: document.getElementById("repoStatus"),
  contactForm: document.getElementById("contactForm"),
  clearDraftBtn: document.getElementById("clearDraftBtn"),
  formMsg: document.getElementById("formMsg"),
  messagePreview: document.getElementById("messagePreview"),
  nameInput: document.getElementById("name"),
  emailInput: document.getElementById("email"),
  subjectInput: document.getElementById("subject"),
  messageInput: document.getElementById("message"),
  agreeInput: document.getElementById("agree"),
  nameError: document.getElementById("nameError"),
  emailError: document.getElementById("emailError"),
  subjectError: document.getElementById("subjectError"),
  messageError: document.getElementById("messageError"),
  agreeError: document.getElementById("agreeError"),
  backToTop: document.getElementById("backToTop"),
  projectDialog: document.getElementById("projectDialog"),
  closeDialog: document.getElementById("closeDialog"),
  dialogImage: document.getElementById("dialogImage"),
  dialogCategory: document.getElementById("dialogCategory"),
  dialogTitle: document.getElementById("dialogTitle"),
  dialogDescription: document.getElementById("dialogDescription"),
  dialogTags: document.getElementById("dialogTags"),
  dialogChallenge: document.getElementById("dialogChallenge"),
  dialogSolution: document.getElementById("dialogSolution")
};

let lastFocusedElement = null;

initializeApp();

function initializeApp() {
  dom.year.textContent = new Date().getFullYear();
  applySavedTheme();
  applySavedVisitorName();
  renderProjects();
  applySavedProjectVisibility();
  loadContactDraft();
  attachEventListeners();
  startVisitTimer();
  startLocalClock();
  setupRevealAnimation();
  updateScrollUI();
  fetchGitHubRepos();
}

function attachEventListeners() {
  dom.menuToggle.addEventListener("click", toggleMobileMenu);
  dom.primaryNav.addEventListener("click", closeMobileMenuOnLink);
  dom.welcomeBtn.addEventListener("click", saveVisitorName);
  dom.themeBtn.addEventListener("click", toggleTheme);
  dom.projectSearch.addEventListener("input", renderProjects);
  dom.categoryFilter.addEventListener("change", renderProjects);
  dom.interestFilter.addEventListener("change", renderProjects);
  dom.sortProjects.addEventListener("change", renderProjects);
  dom.toggleProjectsBtn.addEventListener("click", toggleProjectSection);
  dom.recommendBtn.addEventListener("click", generateRecommendation);
  dom.refreshReposBtn.addEventListener("click", fetchGitHubRepos);
  dom.contactForm.addEventListener("input", saveContactDraft);
  dom.contactForm.addEventListener("submit", handleFormSubmit);
  dom.clearDraftBtn.addEventListener("click", clearContactDraft);
  dom.projectsGrid.addEventListener("click", handleProjectCardClick);
  dom.closeDialog.addEventListener("click", closeProjectDialog);
  dom.projectDialog.addEventListener("click", handleDialogBackdropClick);
  dom.projectDialog.addEventListener("cancel", closeProjectDialog);
  dom.backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  document.addEventListener("keydown", handleKeyboardShortcuts);
}

function toggleMobileMenu() {
  const isOpen = dom.primaryNav.classList.toggle("open");
  dom.menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeMobileMenuOnLink(event) {
  if (event.target.tagName !== "A") return;
  dom.primaryNav.classList.remove("open");
  dom.menuToggle.setAttribute("aria-expanded", "false");
}

function getStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn("Local storage read failed:", error);
    return null;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("Local storage write failed:", error);
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Local storage remove failed:", error);
  }
}

function applySavedTheme() {
  const savedTheme = getStorage(STORAGE_KEYS.theme);
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
  updateThemeUI();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  setStorage(STORAGE_KEYS.theme, document.body.classList.contains("dark") ? "dark" : "light");
  updateThemeUI();
}

function updateThemeUI() {
  const isDark = document.body.classList.contains("dark");
  dom.themeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
  dom.themeStatus.textContent = isDark ? "Dark" : "Light";
}

function applySavedVisitorName() {
  const savedName = getStorage(STORAGE_KEYS.visitorName);
  if (savedName) {
    dom.visitorName.textContent = savedName;
  }
}

function saveVisitorName() {
  const currentName = getStorage(STORAGE_KEYS.visitorName) || "";
  const enteredName = window.prompt("What name should I show on the welcome message?", currentName);

  if (enteredName === null) return;

  const trimmedName = enteredName.trim();
  if (trimmedName.length < 2) {
    window.alert("Please enter at least 2 characters.");
    return;
  }

  setStorage(STORAGE_KEYS.visitorName, trimmedName);
  dom.visitorName.textContent = trimmedName;
}

function startVisitTimer() {
  const startTime = Date.now();
  updateTimerDisplay(0);

  setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    updateTimerDisplay(elapsedSeconds);
  }, 1000);
}

function updateTimerDisplay(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  dom.visitTimer.textContent = `${minutes}:${seconds}`;
}

function startLocalClock() {
  updateLocalClock();
  setInterval(updateLocalClock, 1000 * 30);
}

function updateLocalClock() {
  dom.localClock.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderProjects() {
  const query = dom.projectSearch.value.trim().toLowerCase();
  const selectedCategory = dom.categoryFilter.value;
  const selectedFocus = dom.interestFilter.value;
  const sortValue = dom.sortProjects.value;

  let filteredProjects = projects.filter((project) => {
    const searchableText = [
      project.title,
      project.description,
      project.category,
      project.focus,
      ...project.tags
    ]
      .join(" ")
      .toLowerCase();

    const matchesText = searchableText.includes(query);
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesFocus = selectedFocus === "all" || project.focus === selectedFocus;

    return matchesText && matchesCategory && matchesFocus;
  });

  filteredProjects = sortProjectData(filteredProjects, sortValue);
  updateProjectHint(filteredProjects.length, selectedCategory, selectedFocus);
  drawProjectCards(filteredProjects);
}

function sortProjectData(projectList, sortValue) {
  return [...projectList].sort((a, b) => {
    if (sortValue === "name") return a.title.localeCompare(b.title);
    if (sortValue === "oldest") return new Date(a.date) - new Date(b.date);
    return new Date(b.date) - new Date(a.date);
  });
}

function updateProjectHint(count, category, focus) {
  const parts = [];

  if (category !== "all") {
    parts.push(`${formatCategory(category)} projects`);
  }

  if (focus !== "all") {
    parts.push(`${formatFocus(focus)} focus`);
  }

  if (!parts.length) {
    dom.projectHint.textContent = `Showing ${count} selected project${count === 1 ? "" : "s"}.`;
    return;
  }

  dom.projectHint.textContent = `Showing ${count} result${count === 1 ? "" : "s"} for ${parts.join(" and ")}.`;
}

function drawProjectCards(projectList) {
  dom.projectsGrid.innerHTML = "";
  dom.emptyState.hidden = projectList.length !== 0;

  projectList.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "card project-card";
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title} preview" width="640" height="360" loading="lazy" />
      <div class="card-body">
        <div class="badges">
          <span class="badge">${formatCategory(project.category)}</span>
          <span class="badge">${formatFocus(project.focus)}</span>
          <span class="badge">${formatDate(project.date)}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <button class="btn btn-ghost btn-small" type="button" data-project-index="${projects.indexOf(project)}">View Details</button>
      </div>
    `;

    card.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
    dom.projectsGrid.appendChild(card);
  });
}

function toggleProjectSection() {
  const isHidden = dom.projectsGrid.classList.toggle("hidden-section");
  dom.projectControls.classList.toggle("hidden-section", isHidden);
  dom.projectHint.classList.toggle("hidden-section", isHidden);
  dom.emptyState.classList.toggle("hidden-section", isHidden);
  dom.toggleProjectsBtn.textContent = isHidden ? "Show Projects" : "Hide Projects";
  setStorage(STORAGE_KEYS.showProjects, String(!isHidden));
}

function applySavedProjectVisibility() {
  const savedValue = getStorage(STORAGE_KEYS.showProjects);
  if (savedValue !== "false") return;

  dom.projectsGrid.classList.add("hidden-section");
  dom.projectControls.classList.add("hidden-section");
  dom.projectHint.classList.add("hidden-section");
  dom.emptyState.classList.add("hidden-section");
  dom.toggleProjectsBtn.textContent = "Show Projects";
}

function handleProjectCardClick(event) {
  const button = event.target.closest("[data-project-index]");
  if (!button) return;

  const project = projects[Number(button.dataset.projectIndex)];
  if (project) {
    openProjectDialog(project, button);
  }
}

function openProjectDialog(project, triggerElement) {
  lastFocusedElement = triggerElement;
  dom.dialogImage.src = project.image;
  dom.dialogImage.alt = `${project.title} preview`;
  dom.dialogCategory.textContent = `${formatCategory(project.category)} - ${formatFocus(project.focus)}`;
  dom.dialogTitle.textContent = project.title;
  dom.dialogDescription.textContent = project.description;
  dom.dialogChallenge.textContent = project.idea;
  dom.dialogSolution.textContent = project.focusText;
  dom.dialogTags.innerHTML = project.tags.map((tag) => `<span class="badge">${tag}</span>`).join("");

  if (typeof dom.projectDialog.showModal === "function") {
    dom.projectDialog.showModal();
  } else {
    dom.projectDialog.setAttribute("open", "");
  }
}

function closeProjectDialog(event) {
  if (event) event.preventDefault();

  if (dom.projectDialog.open) {
    dom.projectDialog.close();
  } else {
    dom.projectDialog.removeAttribute("open");
  }

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function handleDialogBackdropClick(event) {
  const dialogDimensions = dom.projectDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom;

  if (clickedOutside) {
    closeProjectDialog(event);
  }
}

function generateRecommendation() {
  const goal = dom.visitorGoal.value;
  const interest = dom.interestArea.value;

  const goalText = {
    projects: "start with the Projects section",
    collaboration: "review the Event Booking Platform and Campus Route Planner",
    learning: "read the About section and explore the Learning Notes Companion",
    overview: "begin with the hero section, then jump to GitHub for recent work"
  }[goal];

  const interestText = {
    frontend: "For frontend and user experience, focus on the project cards, filtering, and contact preview flow.",
    logic: "For logic and problem solving, try the project filters, recommendation guide, and saved preferences.",
    github: "For recent public work, open the GitHub section and refresh the repository list.",
    productivity: "For productivity ideas, review the Study Habit Tracker and Learning Notes Companion."
  }[interest];

  dom.recommendationBox.innerHTML = `
    <strong>Suggested path:</strong> ${goalText}.<br />
    ${interestText}
  `;
}

async function fetchGitHubRepos() {
  dom.repoGrid.innerHTML = "";
  dom.repoMessage.textContent = "Loading recent repositories...";
  dom.repoStatus.textContent = "Loading";
  dom.refreshReposBtn.disabled = true;

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);

    if (!response.ok) {
      throw new Error(`GitHub request failed with status ${response.status}`);
    }

    const repos = await response.json();
    const filteredRepos = repos.filter((repo) => !repo.fork).slice(0, 6);

    dom.repoCount.textContent = String(filteredRepos.length);
    dom.repoStatus.textContent = "Available";
    dom.repoMessage.textContent = filteredRepos.length
      ? "Showing recent public repositories from GitHub."
      : "No public repositories were found for this profile yet.";

    filteredRepos.forEach((repo) => {
      const article = document.createElement("article");
      article.className = "card repo-card";
      article.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
        <p>${repo.description || "No description available yet."}</p>
        <div class="badges">
          <span class="badge">Stars: ${repo.stargazers_count}</span>
          <span class="badge">${repo.language || "Language N/A"}</span>
          <span class="badge">Updated ${formatDate(repo.updated_at)}</span>
        </div>
      `;
      dom.repoGrid.appendChild(article);
    });
  } catch (error) {
    dom.repoCount.textContent = "--";
    dom.repoStatus.textContent = "Unavailable";
    dom.repoMessage.textContent = "I could not load GitHub repositories at this moment. You can still visit the profile link above.";
    console.error("GitHub API error:", error);
  } finally {
    dom.refreshReposBtn.disabled = false;
  }
}

function saveContactDraft() {
  const draft = {
    name: dom.nameInput.value,
    email: dom.emailInput.value,
    subject: dom.subjectInput.value,
    message: dom.messageInput.value,
    agree: dom.agreeInput.checked
  };

  setStorage(STORAGE_KEYS.contactDraft, JSON.stringify(draft));
}

function loadContactDraft() {
  const savedDraft = getStorage(STORAGE_KEYS.contactDraft);
  if (!savedDraft) return;

  try {
    const draft = JSON.parse(savedDraft);
    dom.nameInput.value = draft.name || "";
    dom.emailInput.value = draft.email || "";
    dom.subjectInput.value = draft.subject || "";
    dom.messageInput.value = draft.message || "";
    dom.agreeInput.checked = Boolean(draft.agree);
  } catch (error) {
    removeStorage(STORAGE_KEYS.contactDraft);
    console.warn("Saved draft could not be loaded:", error);
  }
}

function clearContactDraft() {
  dom.contactForm.reset();
  clearFormErrors();
  removeStorage(STORAGE_KEYS.contactDraft);
  dom.messagePreview.hidden = true;
  dom.messagePreview.innerHTML = "";
  dom.formMsg.textContent = "Draft cleared.";
  dom.formMsg.className = "form-message success";
}

function handleFormSubmit(event) {
  event.preventDefault();
  clearFormErrors();
  dom.formMsg.textContent = "";
  dom.formMsg.className = "form-message";

  const name = dom.nameInput.value.trim();
  const email = dom.emailInput.value.trim();
  const subject = dom.subjectInput.value.trim();
  const message = dom.messageInput.value.trim();
  const agreed = dom.agreeInput.checked;

  let isValid = true;

  if (!name) {
    dom.nameError.textContent = "Please enter your name.";
    isValid = false;
  } else if (!isValidName(name)) {
    dom.nameError.textContent = "Use a valid name with at least 2 characters.";
    isValid = false;
  }

  if (!email) {
    dom.emailError.textContent = "Please enter your email address.";
    isValid = false;
  } else if (!isValidEmail(email)) {
    dom.emailError.textContent = "Please enter a valid email format.";
    isValid = false;
  }

  if (!subject) {
    dom.subjectError.textContent = "Please enter a subject.";
    isValid = false;
  } else if (subject.length < 3) {
    dom.subjectError.textContent = "Subject should be at least 3 characters long.";
    isValid = false;
  }

  if (!message) {
    dom.messageError.textContent = "Please enter your message.";
    isValid = false;
  } else if (message.length < 20 || countWords(message) < 4) {
    dom.messageError.textContent = "Message should be at least 20 characters and 4 words.";
    isValid = false;
  }

  if (!agreed) {
    dom.agreeError.textContent = "Please confirm the information before creating the preview.";
    isValid = false;
  }

  if (!isValid) {
    dom.formMsg.textContent = "Please review the highlighted fields and try again.";
    dom.formMsg.classList.add("error");
    dom.messagePreview.hidden = true;
    return;
  }

  dom.formMsg.textContent = "Your message preview is ready below.";
  dom.formMsg.classList.add("success");
  renderMessagePreview(name, email, subject, message);
}

function renderMessagePreview(name, email, subject, message) {
  dom.messagePreview.hidden = false;
  dom.messagePreview.innerHTML = `
    <h3>Message Preview</h3>
    <p><strong>From:</strong> ${escapeHTML(name)} (${escapeHTML(email)})</p>
    <p><strong>Subject:</strong> ${escapeHTML(subject)}</p>
    <p>${escapeHTML(message).replace(/\n/g, "<br />")}</p>
  `;
}

function clearFormErrors() {
  dom.nameError.textContent = "";
  dom.emailError.textContent = "";
  dom.subjectError.textContent = "";
  dom.messageError.textContent = "";
  dom.agreeError.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidName(name) {
  return /^[\p{L}\s'-]{2,}$/u.test(name);
}

function countWords(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function setupRevealAnimation() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  dom.scrollProgress.style.width = `${progress}%`;
  dom.backToTop.classList.toggle("visible", scrollTop > 600);
}

function handleKeyboardShortcuts(event) {
  const activeElement = document.activeElement;
  const isTyping = activeElement && ["INPUT", "TEXTAREA", "SELECT"].includes(activeElement.tagName);

  if (event.key === "Escape" && dom.primaryNav.classList.contains("open")) {
    dom.primaryNav.classList.remove("open");
    dom.menuToggle.setAttribute("aria-expanded", "false");
  }

  if (event.key.toLowerCase() === "t" && !isTyping) {
    toggleTheme();
  }
}

function formatCategory(value) {
  const labels = {
    web: "Web App",
    productivity: "Productivity",
    learning: "Learning"
  };
  return labels[value] || capitalize(value);
}

function formatFocus(value) {
  const labels = {
    ux: "User Experience",
    systems: "Data and Logic",
    productivity: "Productivity",
    learning: "Learning Support"
  };
  return labels[value] || capitalize(value);
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHTML(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
