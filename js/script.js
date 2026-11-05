/* =========================================
   DUCES CONSULTANCY SERVICES
   Main Website JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  const menuToggle = document.querySelector(
    ".menu-toggle, .nav-toggle, #menuToggle, [data-menu-toggle]"
  );

  const navMenu = document.querySelector(
    ".nav-menu, #navMenu, [data-nav-menu]"
  );

  const dropdowns = document.querySelectorAll(".dropdown");

  function closeDropdowns(except = null) {
    dropdowns.forEach(function (dropdown) {
      if (dropdown !== except) {
        dropdown.classList.remove("open");
        const trigger = dropdown.querySelector(":scope > a");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove("is-open");

    if (menuToggle) {
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    closeDropdowns();
  }

  // MOBILE MAIN MENU
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("is-open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // BUSINESS SETUP AND OTHER DROPDOWNS
  dropdowns.forEach(function (dropdown) {
    const trigger = dropdown.querySelector(":scope > a");
    const submenu = dropdown.querySelector(":scope > .dropdown-menu");

    if (!trigger || !submenu) return;

    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", function (event) {
      if (window.innerWidth <= 900) {
        if (!dropdown.classList.contains("open")) {
          event.preventDefault();
          closeDropdowns(dropdown);
          dropdown.classList.add("open");
          trigger.setAttribute("aria-expanded", "true");
        }
        // If already open, the parent link works normally.
      }
    });

    trigger.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        closeDropdowns(dropdown);
        dropdown.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");

        const firstLink = submenu.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });
  });

  // CLOSE MENU AFTER SELECTING A LINK
  document.querySelectorAll(".nav-menu a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (link.parentElement.classList.contains("dropdown")) return;

      if (window.innerWidth <= 900) {
        closeMobileMenu();
      } else {
        closeDropdowns();
      }
    });
  });

  // CLOSE WHEN CLICKING OUTSIDE NAVIGATION
  document.addEventListener("click", function (event) {
    const insideNavigation =
      event.target.closest(".site-header") ||
      event.target.closest(".nav-container");

    if (!insideNavigation) {
      closeMobileMenu();
    }
  });

  // ESCAPE KEY
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMobileMenu();
      if (menuToggle) menuToggle.focus();
    }
  });

  // COPYRIGHT YEAR
  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  // SMOOTH PAGE ANCHORS
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

});
