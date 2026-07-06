(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Shipment tracker: fill + active stop on scroll ---------- */
  var trackerFill = document.getElementById("trackerFill");
  var stops = Array.prototype.slice.call(document.querySelectorAll(".stop"));
  var sections = stops
    .map(function (stop) {
      var id = stop.getAttribute("data-target");
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  function updateTracker() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (trackerFill) {
      trackerFill.style.width = Math.min(100, Math.max(0, progress)) + "%";
    }

    var activeIndex = 0;
    var markerLine = window.innerHeight * 0.35;

    sections.forEach(function (section, i) {
      var rect = section.getBoundingClientRect();
      if (rect.top <= markerLine) {
        activeIndex = i;
      }
    });

    stops.forEach(function (stop, i) {
      stop.classList.toggle("active", i === activeIndex);
    });
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateTracker();
        ticking = false;
      });
      ticking = true;
    }
  });

  window.addEventListener("resize", updateTracker);
  updateTracker();

  /* ---------- Contact form (no backend wired up yet) ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var existing = form.querySelector(".form-status");
      if (existing) existing.remove();

      var status = document.createElement("p");
      status.className = "form-status";
      status.style.fontFamily = "var(--font-mono)";
      status.style.fontSize = "0.78rem";
      status.style.color = "var(--amber)";
      status.style.marginTop = "1rem";
      status.textContent =
        "This form isn't connected to a service yet — hook it up to Formspree, Netlify Forms, or a mailto: fallback to start receiving messages.";

      form.appendChild(status);
    });
  }
})();
