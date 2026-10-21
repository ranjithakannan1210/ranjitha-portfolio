
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const themeToggle = document.getElementById("theme-toggle");

// Feature 1: Mobile navigation menu
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu and update the active navigation link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";

    document.querySelectorAll(".nav-link").forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});

// Feature 2: Light and dark theme toggle
themeToggle.addEventListener("click", () => {
  const darkMode = document.body.classList.toggle("dark");

  themeToggle.textContent = darkMode ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    darkMode ? "Switch to light theme" : "Switch to dark theme"
  );
});

// Feature 3: Filter project cards
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    // Highlight the selected filter
    filterButtons.forEach((item) => {
      const selected = item === button;

      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    // Show or hide projects
    projectCards.forEach((card) => {
      const category = card.dataset.category;

      card.hidden =
        selectedFilter !== "all" &&
        category !== selectedFilter;
    });
  });
});

// Update the footer year automatically
document.getElementById("year").textContent =
  new Date().getFullYear();

// Allow keyboard users to close the mobile menu with Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    nav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
    menuToggle.focus();
  }
});
