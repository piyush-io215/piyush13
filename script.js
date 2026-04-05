/* =============================================================
   script.js  —  Navbar Animations & Interactions
   =============================================================
   Features:
   1. Scroll-shadow — nav darkens + gets red glow when scrolled
   2. Active link highlight — updates as user scrolls between sections
   3. Smooth underline on active / hover link
   4. Hamburger toggle with animated X for mobile menus
   5. Auto-close mobile menu on nav-link click
   6. Shrink nav height slightly on scroll (subtle)
   ============================================================= */
 
(function () {
  "use strict";
 
  /* ── DOM refs ─────────────────────────────────────────── */
  const navbar     = document.getElementById("navbar");
  const navLinks   = document.getElementById("navLinks");
  const hamburger  = document.getElementById("hamburger");
  const links      = document.querySelectorAll(".nav-link");
  const sections   = document.querySelectorAll("section[id]");
 
  /* ── 1. Scroll-shadow + shrink ───────────────────────── */
  function onScroll() {
    const scrolled = window.scrollY > 50;
 
    navbar.classList.toggle("scrolled", scrolled);
 
    // Slightly shrink nav height when scrolled
    navbar.style.setProperty(
      "--nav-h",
      scrolled ? "52px" : "65px"
    );
 
    /* Active section highlight */
    highlightActiveLink();
  }
 
  window.addEventListener("scroll", onScroll, { passive: true });
 
  /* ── 2. Active link highlight on scroll ─────────────── */
  function highlightActiveLink() {
    let currentId = "";
 
    sections.forEach((section) => {
      const sectionTop    = section.offsetTop - 80;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentId = section.id;
      }
    });
 
    links.forEach((link) => {
      const href = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", href === currentId);
    });
  }
 
  /* ── 3. Click → smooth scroll + active class snap ───── */
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Remove active from all, add to clicked
      links.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
 
      // Close mobile menu
      closeMobileMenu();
    });
  });
 
  /* ── 4 & 5. Hamburger toggle ─────────────────────────── */
  hamburger.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
 
    // Stagger each mobile link's entrance
    if (isOpen) {
      const items = navLinks.querySelectorAll("li");
      items.forEach((item, i) => {
        item.style.opacity   = "0";
        item.style.transform = "translateX(-12px)";
        item.style.transition = `opacity 0.3s ease ${i * 0.07}s,
                                  transform 0.3s ease ${i * 0.07}s`;
        // Force reflow
        void item.offsetWidth;
        item.style.opacity   = "1";
        item.style.transform = "translateX(0)";
      });
    }
  });
 
  function closeMobileMenu() {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }
 
  /* Close menu when clicking outside nav */
  document.addEventListener("click", function (e) {
    if (!navbar.contains(e.target)) {
      closeMobileMenu();
    }
  });
 
  /* ── 6. Hover ripple effect on desktop nav links ─────── */
  links.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.letterSpacing = "0.5px";
      this.style.transition    = "letter-spacing 0.2s ease, color 0.3s ease";
    });
 
    link.addEventListener("mouseleave", function () {
      this.style.letterSpacing = "0.3px";
    });
  });
 
  /* ── Init ─────────────────────────────────────────────── */
  onScroll(); // Run once on load to set correct state
})();