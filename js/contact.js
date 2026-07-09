/* ============================================
   CITY FESTIVAL — Contact JS (contact.js)
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  function activateMap() {
    // const placeholder = document.getElementById("map-placeholder");

    // const map = document.getElementById("google-map");
    // if (map) {
    //   map.style.display = "block";
    // }
    // if (placeholder) placeholder.style.display = "none";
    const placeholder = document.getElementById("map-container");
    placeholder.innerHTML = "";
    placeholder.innerHTML = `<iframe
              id="google-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2465.23675207075!2d10.91764902613622!3d45.503051803837565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4781e3704ee39e41%3A0x267f1c0283b5a51b!2sPiazza%20San%20Rocco%2C%2037029%20Pedemonte%20VR!5e0!3m2!1sit!2sit!4v1773612053929!5m2!1sit!2sit"
              width="100%"
              height="100%"
              style="border: 0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Mappa Antica Sagra di San Rocco"
            ></iframe>`;
  }

  // Load map immediately if consent was already given on a previous visit
  if (window.CookieConsent && window.CookieConsent.accepted) {
    activateMap();
  }

  // Load map the moment the user accepts in the banner
  document.addEventListener("cookieConsentAccepted", activateMap);

  function deactivateMap() {
    // const placeholder = document.getElementById("map-placeholder");

    // const map = document.getElementById("google-map");
    // if (map) {
    //   map.style.display = "none";
    // }
    // if (placeholder) placeholder.style.display = "block";
    const placeholder = document.getElementById("map-container");
    placeholder.innerHTML = "";
    placeholder.innerHTML = `<div class="map-placeholder map-placeholder--inline">
              <span class="map-placeholder__pin">📍</span>
              <p class="map-placeholder__text">Piazza San Rocco — Pedemonte</p>
              <p class="map-placeholder__sub">
                Per la mappa interattiva devi accettare i cookie in basso a
                sinistra
              </p>
              <a
                href="https://maps.app.goo.gl/TVq2CXMiTBKjQYqGA"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary map-placeholder__directions"
              >
                🗺️ Apri su Google Maps
              </a>
            </div>`;
  }

  document.addEventListener("cookieConsentRejected", deactivateMap);
});
