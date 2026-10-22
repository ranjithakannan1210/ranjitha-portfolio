
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Light/dark theme toggle
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
    }

    updateThemeButton();

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");

      const theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";

      try {
        localStorage.setItem("portfolio-theme", theme);
      } catch (error) {
        // Theme still works if browser storage is unavailable.
      }

      updateThemeButton();
    });
  }

  function updateThemeButton() {
    if (!themeToggle) return;

    const isLight = document.body.classList.contains("light-theme");
    themeToggle.textContent = isLight ? "☾" : "☀";
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
  }

  // Typing animation
  const typingText = document.getElementById("typing-text");

  if (typingText) {
    const words = [
      "Web Developer",
      "Computer Science Student",
      "Creative Problem Solver"
    ];

    let wordIndex = 0;
    let characterIndex = words[0].length;
    let deleting = true;

    function typeWords() {
      const currentWord = words[wordIndex];

      if (deleting) {
        characterIndex--;
      } else {
        characterIndex++;
      }

      typingText.textContent = currentWord.substring(
        0,
        Math.max(0, characterIndex)
      );

      let delay = deleting ? 45 : 85;

      if (characterIndex <= 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
      } else if (characterIndex >= words[wordIndex].length && !deleting) {
        deleting = true;
        delay = 1400;
      }

      window.setTimeout(typeWords, delay);
    }

    window.setTimeout(typeWords, 1500);
  }

  // Project filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      projectCards.forEach((card) => {
        const matches =
          filter === "all" || card.dataset.category === filter;

        card.hidden = !matches;
      });
    });
  });

  // Copy email address
  const copyEmailButton = document.getElementById("copy-email");
  const copyStatus = document.getElementById("copy-status");

  if (copyEmailButton && copyStatus) {
    copyEmailButton.addEventListener("click", async () => {
      const email = copyEmailButton.dataset.email;

      try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = "Email copied!";
      } catch (error) {
        copyStatus.textContent =
          "Copy unavailable. Please copy the email manually.";
      }
    });
  }

  // Highlight navigation link for the current section
  const sections = document.querySelectorAll("main section[id]");
  const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navigationLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                `#${entry.target.id}`
              );
            });
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
