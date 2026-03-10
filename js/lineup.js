/* ============================================
   CITY FESTIVAL — Lineup JS (lineup.js)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const tabs   = document.querySelectorAll('.day-tab');
  const panels = document.querySelectorAll('.schedule__panel');

  function activateTab(tab) {
    const target = tab.dataset.day;

    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');

    panels.forEach(panel => {
      panel.classList.remove('active');
      panel.setAttribute('hidden', '');
    });

    const activePanel = document.getElementById(`day-${target}`);
    if (activePanel) {
      activePanel.classList.add('active');
      activePanel.removeAttribute('hidden');
    }
  }

  // Click
  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
  });

  // Keyboard: arrow keys
  tabs.forEach(tab => {
    tab.addEventListener('keydown', (e) => {
      const tabArray = [...tabs];
      const i = tabArray.indexOf(tab);

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        activateTab(tabArray[(i + 1) % tabArray.length]);
        tabArray[(i + 1) % tabArray.length].focus();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        activateTab(tabArray[(i - 1 + tabArray.length) % tabArray.length]);
        tabArray[(i - 1 + tabArray.length) % tabArray.length].focus();
      }
    });
  });

});
