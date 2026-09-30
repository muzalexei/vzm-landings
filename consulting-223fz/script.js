"use strict";
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("navigation");
function closeMenu() {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
});
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target))
    closeMenu();
});
const cards = [...document.querySelectorAll(".service-card")];
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-filter]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    cards.forEach((card) => {
      card.hidden =
        button.dataset.filter !== "all" &&
        !card.dataset.audience.split(" ").includes(button.dataset.filter);
    });
    document.getElementById("filter-status").textContent =
      `Показано услуг: ${cards.filter((card) => !card.hidden).length}`;
  });
});
document.getElementById("year").textContent = new Date().getFullYear();
const params = new URLSearchParams(window.location.search);
const utm = Object.fromEntries(
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].map(
    (key) => [key, params.get(key) || ""],
  ),
);
window.dataLayer = window.dataLayer || [];
function track(goal, data = {}) {
  if (typeof window.ym === "function")
    window.ym(108398747, "reachGoal", goal, data);
  window.dataLayer.push({ event: goal, ...data, ...utm });
}
document.querySelectorAll("[data-cta]").forEach((button) =>
  button.addEventListener("click", () =>
    track("cta_click", {
      text: button.textContent.trim(),
      href: button.getAttribute("href"),
    }),
  ),
);
document
  .getElementById("contactLink")
  .addEventListener("click", () => track("telegram_open", { utm }));
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          track("section_view", { section: entry.target.id });
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.25 },
  );
  ["services", "about", "cases", "faq", "contact"].forEach((id) =>
    observer.observe(document.getElementById(id)),
  );
}
const recordedDepths = new Set();
window.addEventListener(
  "scroll",
  () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    [50, 75, 90].forEach((depth) => {
      if (percent >= depth && !recordedDepths.has(depth)) {
        recordedDepths.add(depth);
        track(`scroll_${depth}`, { percent: depth });
      }
    });
  },
  { passive: true },
);
window.addEventListener("load", () =>
  track("landing_view", { page: "consulting-223fz", utm }),
);
