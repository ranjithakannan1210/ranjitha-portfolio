// Ranjitha K | Portfolio scripts
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (!themeBtn) return;
    var isDark = theme === "dark";
    themeBtn.firstElementChild.textContent = isDark ? "☀" : "☾";
    themeBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark ? "#0b0d1f" : "#f5f6ff");
  }

  applyTheme(root.getAttribute("data-theme") || "dark");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menu-toggle");
  var nav = document.getElementById("nav");

  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      setMenu(!nav.classList.contains("open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  /* ---------- Highlight the nav link for the section in view ---------- */
  // Only "#section" links are tracked; the Contact link is a mailto: link
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"))
    .filter(function (l) { return l.getAttribute("href").charAt(0) === "#"; });

  var sections = links
    .map(function (l) { return document.querySelector(l.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) {
          var active = l.getAttribute("href") === "#" + entry.target.id;
          l.classList.toggle("active", active);
          if (active) l.setAttribute("aria-current", "true");
          else l.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Project filters ---------- */
  var filterButtons = document.querySelectorAll(".filter");
  var projects = document.querySelectorAll(".project");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");

      filterButtons.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", String(on));
      });

      projects.forEach(function (p) {
        var show = filter === "all" || p.getAttribute("data-category") === filter;
        p.hidden = !show;
      });
    });
  });

  /* ---------- Profile photo fallback (hero + about) ---------- */
  document.querySelectorAll(".profile-photo").forEach(function (photo) {
    var showFallback = function () { photo.parentElement.classList.add("no-photo"); };
    photo.addEventListener("error", showFallback);
    if (photo.complete && photo.naturalWidth === 0) showFallback();
  });

  /* ---------- Scroll reveal ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    root.classList.add("js");
    var revealEls = document.querySelectorAll(".section");
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { el.classList.add("reveal"); revealObs.observe(el); });
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById("copy-email");
  var copyStatus = document.getElementById("copy-status");

  if (copyBtn && copyStatus) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email");

      function done(ok) {
        copyStatus.textContent = ok ? "Email copied" : "Copy failed. Select the address and copy it manually.";
        setTimeout(function () { copyStatus.textContent = ""; }, 2500);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  }

  /* The hero code card is plain HTML, so no typing script is needed. */
})();