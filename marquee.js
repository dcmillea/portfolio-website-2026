// marquee.js — scrollLeft marquee (no overlap, no drift)
document.addEventListener("DOMContentLoaded", () => {
  const marquee = document.getElementById("techMarquee");
  const set = document.getElementById("techMarqueeSet");
  const clone = document.getElementById("techMarqueeClone");

  if (!marquee || !set || !clone) return;

  // Clone the set exactly once
  clone.innerHTML = set.innerHTML;

  let rafId = null;
  let last = performance.now();

  // speed in pixels per second (tweak)
  const pxPerSec = 70;

  function step(now) {
    const dt = now - last;
    last = now;

    marquee.scrollLeft += (pxPerSec * dt) / 1000;

    // Width of one set (the wrap point)
    const wrapWidth = set.scrollWidth;

    // When we’ve scrolled past the first set, wrap back by exactly that width
    if (marquee.scrollLeft >= wrapWidth) {
      marquee.scrollLeft -= wrapWidth;
    }

    rafId = requestAnimationFrame(step);
  }

  // Start once layout/fonts are stable
  const ready = document.fonts?.ready ? document.fonts.ready : Promise.resolve();
  ready.then(() => {
    marquee.scrollLeft = 0;
    last = performance.now();
    rafId = requestAnimationFrame(step);
  });

  // Pause on hover (premium feel)
  marquee.addEventListener("mouseenter", () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  });

  marquee.addEventListener("mouseleave", () => {
    if (!rafId) {
      last = performance.now();
      rafId = requestAnimationFrame(step);
    }
  });

  // Re-sync on resize (prevents odd wrap after viewport changes)
  window.addEventListener("resize", () => {
    marquee.scrollLeft = marquee.scrollLeft % set.scrollWidth;
  });

  // Reduced motion: stop animation
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    if (rafId) cancelAnimationFrame(rafId);
  }
});
