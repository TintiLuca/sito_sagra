/* ============================================
   CITY FESTIVAL — Menu JS (menu.js)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Highlight active section in the sticky nav as user scrolls ──
  const sections = document.querySelectorAll('.menu-section[id]');
  const navLinks = document.querySelectorAll('.menu-nav__link');

  function onScroll() {
    // Offset: navbar (72px) + sticky menu-nav (~65px) + a little breathing room
    const scrollY = window.scrollY + 72 + 65 + 32;

    let currentId = null;

    sections.forEach(section => {
      if (section.offsetTop <= scrollY) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ── Smooth scroll offset for sticky navbars ──
  // Native scroll-margin-top handles this via CSS (defined in menu.css)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72 + 65 + 16; // navbar + menu-nav + gap
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
