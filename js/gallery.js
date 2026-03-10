/* ============================================
   CITY FESTIVAL — Gallery JS (gallery.js)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const items      = [...document.querySelectorAll('.masonry-item')];
  const filterBtns = [...document.querySelectorAll('.filter-btn')];
  const countEl    = document.getElementById('gallery-count');
  const emptyEl    = document.querySelector('.gallery-empty');

  // ── FILTERING ──────────────────────────────
  function applyFilter(category) {
    let visible = 0;

    items.forEach(item => {
      const match = category === 'all' || item.dataset.category === category;
      item.classList.toggle('hidden', !match);
      if (match) visible++;
    });

    if (countEl) countEl.textContent = visible;
    emptyEl && emptyEl.classList.toggle('visible', visible === 0);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  // ── LIGHTBOX ───────────────────────────────
  const lightbox     = document.getElementById('lightbox');
  const lbImg        = document.getElementById('lb-img');
  const lbPlaceholder= document.getElementById('lb-placeholder');
  const lbTitle      = document.getElementById('lb-title');
  const lbSub        = document.getElementById('lb-sub');
  const lbCounter    = document.getElementById('lb-counter');
  const lbClose      = document.getElementById('lb-close');
  const lbPrev       = document.getElementById('lb-prev');
  const lbNext       = document.getElementById('lb-next');

  let currentIndex = 0;

  function visibleItems() {
    return items.filter(i => !i.classList.contains('hidden'));
  }

  function openLightbox(index) {
    const visible = visibleItems();
    if (!visible[index]) return;

    currentIndex = index;
    const item = visible[index];
    const src   = item.dataset.src;
    const title = item.dataset.title || '';
    const sub   = item.dataset.sub   || '';

    // Show image or placeholder
    if (src) {
      lbImg.src = src;
      lbImg.style.display = 'block';
      lbPlaceholder.style.display = 'none';
    } else {
      lbImg.style.display = 'none';
      lbPlaceholder.textContent = item.dataset.emoji || '📷';
      lbPlaceholder.style.display = 'flex';
    }

    lbTitle.textContent   = title;
    lbSub.textContent     = sub;
    lbCounter.textContent = `${index + 1} / ${visible.length}`;

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    const visible = visibleItems();
    const next = (currentIndex + dir + visible.length) % visible.length;
    openLightbox(next);
  }

  // Open on item click
  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      const visible = visibleItems();
      const visibleIndex = visible.indexOf(item);
      if (visibleIndex !== -1) openLightbox(visibleIndex);
    });
  });

  // Controls
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => navigate(-1));
  lbNext.addEventListener('click', () => navigate(1));

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowRight')  navigate(1);
    if (e.key === 'ArrowLeft')   navigate(-1);
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  });

});
