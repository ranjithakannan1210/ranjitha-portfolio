const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const themeToggle = document.getElementById("theme-toggle");

// Feature 1: Mobile navigation menu
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close menu when a navigation link is clicked
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
}

// Feature 2: Light and dark theme toggle
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const darkMode = document.body.classList.toggle("dark");

    themeToggle.textContent = darkMode ? "☀" : "☾";
    themeToggle.setAttribute(
      "aria-label",
      darkMode ? "Switch to light theme" : "Switch to dark theme"
    );
  });
}

// Feature 3: Filter project cards
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const selected = item === button;

      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    projectCards.forEach((card) => {
      const category = card.dataset.category;

      card.hidden =
        selectedFilter !== "all" &&
        category !== selectedFilter;
    });
  });
});

// Feature 4: Open profile photo in a larger view
const profilePhoto = document.querySelector(".portrait img");

if (profilePhoto) {
  profilePhoto.style.cursor = "zoom-in";
  profilePhoto.setAttribute("tabindex", "0");
  profilePhoto.setAttribute("role", "button");
  profilePhoto.setAttribute("aria-label", "Open profile photo");

  function openProfilePhoto() {
    // Prevent opening multiple popups
    if (document.querySelector(".photo-overlay")) return;

    const overlay = document.createElement("div");
    overlay.className = "photo-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Enlarged profile photo");

    const enlargedPhoto = document.createElement("img");
    enlargedPhoto.src = profilePhoto.src;
    enlargedPhoto.alt = profilePhoto.alt;

    const closeButton = document.createElement("button");
    closeButton.className = "photo-close";
    closeButton.type = "button";
    closeButton.textContent = "✕";
    closeButton.setAttribute("aria-label", "Close enlarged photo");

    overlay.append(enlargedPhoto, closeButton);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    function closePhoto() {
      overlay.remove();
      document.body.style.overflow = "";
      profilePhoto.focus();
      document.removeEventListener("keydown", handleEscape);
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        closePhoto();
      }
    }

    closeButton.addEventListener("click", closePhoto);

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closePhoto();
      }
    });

    document.addEventListener("keydown", handleEscape);
    closeButton.focus();
  }

  profilePhoto.addEventListener("click", openProfilePhoto);

  profilePhoto.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProfilePhoto();
    }
  });
}

// Feature 5: Automatically update footer year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Feature 6: Close mobile menu using Escape
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    nav &&
    menuToggle &&
    nav.classList.contains("open")
  ) {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
    menuToggle.focus();
  }
});