/* ============================================
   CITY FESTIVAL — Cookie Consent Banner
   cookie-consent.js
   ============================================
   Stores consent in localStorage under key:
     cityfest_cookie_consent = "accepted" | "rejected"

   Exposes window.CookieConsent for use by
   other scripts (e.g. to conditionally load
   the Google Maps iframe).
   ============================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "anticasagrasanrocco_cookie_consent";
  const BANNER_ID = "cookie-banner";
  const PREFS_ID = "cookie-prefs-btn";

  /* ── Read stored preference ── */
  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  /* ── Write preference ── */
  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {}
  }

  /* ── Remove banner from DOM ── */
  function removeBanner() {
    const banner = document.getElementById(BANNER_ID);
    if (banner) {
      banner.classList.remove("cookie-banner--visible");
      injectPrefsButton();
      // Remove after transition ends
      banner.addEventListener("transitionend", () => banner.remove(), {
        once: true,
      });
    }
  }

  /* ── Accept handler ── */
  function acceptCookies() {
    setConsent("accepted");
    removeBanner();
    window.CookieConsent.accepted = true;
    document.dispatchEvent(new Event("cookieConsentAccepted"));
  }

  /* ── Reject handler ── */
  function rejectCookies() {
    setConsent("rejected");
    removeBanner();
    window.CookieConsent.accepted = false;
    document.dispatchEvent(new Event("cookieConsentRejected"));
  }

  /* ── Inject banner HTML ── */
  function injectBanner() {
    const banner = document.createElement("div");
    banner.id = BANNER_ID;
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-modal", "false");
    banner.setAttribute("aria-label", "Preferenze cookie");
    banner.innerHTML = `
      <div class="cookie-banner__inner">
        <div class="cookie-banner__icon">🍪</div>
        <div class="cookie-banner__text">
          <p class="cookie-banner__title">Utilizziamo i cookie</p>
          <p class="cookie-banner__desc">
            Questo sito usa <strong>Google Maps</strong> nella pagina Contatti,
            che può impostare cookie di terze parti sul tuo dispositivo.
            Nessun cookie di profilazione o analisi è presente.
            <a href="javascript:void(0)"
              class="open-policy"
              data-policy="cookie">Cookie Policy</a> ·
            <a href="javascript:void(0)"
              class="open-policy"
              data-policy="privacy">Privacy Policy</a>
          </p>
        </div>
        <div class="cookie-banner__actions">
          <button id="cookie-reject" class="cookie-banner__btn cookie-banner__btn--secondary">
            Solo necessari
          </button>
          <button id="cookie-accept" class="cookie-banner__btn cookie-banner__btn--primary">
            Accetta
          </button>
        </div>
        <button class="cookie-banner__close" id="cookie-close" aria-label="Chiudi senza scegliere">✕</button>
      </div>
    `;
    document.body.appendChild(banner);

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() =>
        banner.classList.add("cookie-banner--visible"),
      );
    });

    document
      .getElementById("cookie-accept")
      .addEventListener("click", acceptCookies);
    document
      .getElementById("cookie-reject")
      .addEventListener("click", rejectCookies);
    // Close without choosing = same as reject for safety
    document
      .getElementById("cookie-close")
      .addEventListener("click", rejectCookies);

    // Keyboard trap: Tab cycles only inside the banner
    const focusable = banner.querySelectorAll("button, a[href]");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    banner.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === "Escape") rejectCookies();
    });

    // Focus first button after a short delay
    setTimeout(() => first && first.focus(), 400);
  }

  /* ── Inject "Gestisci preferenze" button ──
     Adds a small floating button at the bottom-left
     so users can reopen the banner at any time.
     Only injected if consent has already been given.     */
  function injectPrefsButton() {
    if (document.getElementById(PREFS_ID)) return;
    const btn = document.createElement("button");
    btn.id = PREFS_ID;
    btn.className = "cookie-prefs-btn";
    btn.setAttribute("aria-label", "Gestisci preferenze cookie");
    btn.textContent = "🍪";
    btn.addEventListener("click", () => {
      // Remove stored preference and re-show banner
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      btn.remove();
      injectBanner();
    });
    document.body.appendChild(btn);
  }

  /* ── Public API ── */
  window.CookieConsent = {
    accepted: getConsent() === "accepted",
    getConsent,
    acceptCookies,
    rejectCookies,
  };

  /* ── Init ── */
  function init() {
    const stored = getConsent();

    if (!stored) {
      // No choice yet — show the banner
      injectBanner();
    } else {
      // Choice was already made — show the small prefs button
      injectPrefsButton();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
