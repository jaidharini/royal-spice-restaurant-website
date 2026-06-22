const body = document.body;
const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const themeToggle = document.querySelector(".theme-toggle");
const revealEls = document.querySelectorAll(".reveal");

const savedTheme = localStorage.getItem("royal-spice-theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("royal-spice-theme", body.classList.contains("dark") ? "dark" : "light");
  });
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".nav-menu a, .brand, .hero-actions a, .special-copy a, .reserve-btn").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const updateNavbar = () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 24);
};

updateNavbar();
window.addEventListener("scroll", updateNavbar, { passive: true });

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

revealEls.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 6, 4) * 70}ms`;
  observer.observe(el);
});
