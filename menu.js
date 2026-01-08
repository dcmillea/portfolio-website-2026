// menu.js

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("menuButton");
  const menu = document.getElementById("mobileMenu");

  if (!button || !menu) return;

  function closeMenu() {
    button.setAttribute("aria-expanded", "false");
    button.classList.remove("is-open");
    menu.hidden = true;
  }

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));
    button.classList.toggle("is-open", !isOpen);
    menu.hidden = isOpen;
  });

  // Close when clicking a link
  menu.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
});
