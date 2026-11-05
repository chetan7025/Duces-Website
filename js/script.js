
/* =========================================
   DUCES CONSULTANCY SERVICES
   Main Website JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  // MOBILE NAVIGATION
  const menuToggle = document.querySelector(
    ".menu-toggle, .nav-toggle, #menuToggle, [data-menu-toggle]"
  );

  const navMenu = document.querySelector(
    ".nav-menu, #navMenu, [data-nav-menu]"
  );

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.classList.toggle("active", isOpen);
    });
  }

  // MOBILE DROPDOWN MENUS
  document.querySelectorAll(".dropdown > a").forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (window.innerWidth <= 900) {
        const parent = link.parentElement;
        const submenu = parent.querySelector(".dropdown-menu");

        if (submenu) {
          event.preventDefault();

          document.querySelectorAll(".dropdown.open").forEach(function (item) {
            if (item !== parent) {
              item.classList.remove("open");
            }
          });

          parent.classList.toggle("open");
        }
      }
    });
  });

  // CLOSE MOBILE MENU AFTER NAVIGATION
  document.querySelectorAll(".nav-menu a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (
        window.innerWidth <= 900 &&
        !link.parentElement.classList.contains("dropdown")
      ) {
        navMenu?.classList.remove("is-open");
        menuToggle?.classList.remove("active");
        menuToggle?.setAttribute("aria-expanded", "false");
      }
    });
  });

  // AUTOMATIC COPYRIGHT YEAR
  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  // SMOOTH SCROLL FOR PAGE ANCHORS
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
