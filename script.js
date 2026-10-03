const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const header = document.getElementById("navbar");
const mobile = window.matchMedia("(max-width: 900px)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
function setMenu(open, restoreFocus = false) {
  navLinks.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  if (restoreFocus) navToggle.focus();
}
navToggle.addEventListener("click", () =>
  setMenu(navToggle.getAttribute("aria-expanded") !== "true"),
);
navLinks.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;
  setMenu(false);
  if (mobile.matches && link.hash) {
    const target = document.querySelector(link.hash);
    target?.setAttribute("tabindex", "-1");
    target?.focus({ preventScroll: true });
  }
});
document.addEventListener("click", (event) => {
  if (
    !header.contains(event.target) &&
    navToggle.getAttribute("aria-expanded") === "true"
  )
    setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (navToggle.getAttribute("aria-expanded") !== "true" || !mobile.matches)
    return;
  if (event.key === "Escape") setMenu(false, true);
  if (event.key === "Tab") {
    const controls = [navToggle, ...navLinks.querySelectorAll("a")];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
mobile.addEventListener("change", () => setMenu(false));
// Track the section beneath the sticky header, including deep links.
const links = [...navLinks.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];
let scrollQueued = false;
function updateNavigation() {
  const current = sections
    .filter(
      (section) =>
        section.getBoundingClientRect().top <= header.offsetHeight + 100,
    )
    .at(-1);
  links.forEach((link) => {
    if (current && link.hash === `#${current.id}`)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  header.classList.toggle("scrolled", window.scrollY > 10);
  scrollQueued = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateNavigation);
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateNavigation, { passive: true });
updateNavigation();
// Content stays visible without JavaScript and throughout scroll reveals.
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => observer.observe(element));
}
