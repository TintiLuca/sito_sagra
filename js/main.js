/* ============================================
   CITY FESTIVAL — Main JS
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ── Navbar: scroll effect ──
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

  // ── Navbar: hamburger toggle ──
  const hamburger = document.querySelector(".navbar__hamburger");
  const mobileMenu = document.querySelector(".navbar__mobile");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      }
    });

    // Close on nav link click
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      });
    });
  }

  // ── Active nav link ──
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document
    .querySelectorAll(".navbar__links a, .navbar__mobile a")
    .forEach((link) => {
      const href = link.getAttribute("href");
      if (
        href === currentPage ||
        (currentPage === "" && href === "index.html")
      ) {
        link.classList.add("active");
      }
    });

  // ── Fade-up animation on scroll ──
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll("[data-animate]")
    .forEach((el) => observer.observe(el));

  // ── Gallery strip: mouse wheel + drag horizontal scroll ──
  const galleryTrack = document.querySelector(".gallery-strip__track");
  if (galleryTrack) {
    // Vertical wheel scroll moves the strip horizontally
    galleryTrack.addEventListener(
      "wheel",
      (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          galleryTrack.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      },
      { passive: false },
    );

    // Click-and-drag scroll for mouse users
    let isDragging = false;
    let dragStartX = 0;
    let scrollStart = 0;

    galleryTrack.addEventListener("mousedown", (e) => {
      isDragging = true;
      dragStartX = e.pageX;
      scrollStart = galleryTrack.scrollLeft;
      e.preventDefault(); // stops the browser's native image-drag ghost
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    galleryTrack.addEventListener("mouseleave", () => {
      isDragging = false;
    });

    galleryTrack.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      galleryTrack.scrollLeft = scrollStart - (e.pageX - dragStartX);
    });
  }

  const policies = {
    cookie: `
              <div class="modal-content">
               
                <div class="container">
                  <!-- Article -->
                  <article class="policy-article">
                    <h1>Cookie policy</h1>
                    <div class="policy-box">
                      <p>
                        <strong>In sintesi:</strong> questo sito non usa cookie
                        di profilazione, analisi o marketing. L'unico cookie di
                        terze parti proviene da Google Maps nella pagina
                        Contatti, ed è attivato solo dopo il tuo consenso
                        tramite il banner che appare alla prima visita.
                      </p>
                    </div>

                    <!-- 1 -->
                    <section id="cosa-sono" class="policy-section">
                      <span class="policy-section__num">Art. 1</span>
                      <h2>Cosa sono i cookie</h2>
                      <p>
                        I cookie sono piccoli file di testo che i siti web
                        salvano sul tuo dispositivo (computer, smartphone,
                        tablet) quando li visiti. Vengono utilizzati per far
                        funzionare i siti in modo efficiente, memorizzare le tue
                        preferenze o raccogliere informazioni statistiche.
                      </p>
                      <p>
                        I cookie non possono accedere ad altri dati presenti sul
                        tuo dispositivo e non possono trasmettere virus o
                        malware.
                      </p>
                    </section>

                    <!-- 2 -->
                    <section id="tipi" class="policy-section">
                      <span class="policy-section__num">Art. 2</span>
                      <h2>Tipi di cookie</h2>
                      <p>
                        I cookie si distinguono in base a chi li imposta e alla
                        loro funzione:
                      </p>
                      <ul>
                        <li>
                          <strong>Cookie tecnici</strong> — necessari per il
                          funzionamento del sito. Non richiedono consenso.
                        </li>
                        <li>
                          <strong>Cookie di preferenza</strong> — memorizzano le
                          scelte dell'utente (es. lingua). Non richiedono
                          consenso se strettamente necessari.
                        </li>
                        <li>
                          <strong>Cookie statistici/analitici</strong> —
                          raccolgono dati aggregati sull'utilizzo del sito.
                          Richiedono consenso se provengono da terze parti.
                        </li>
                        <li>
                          <strong>Cookie di profilazione e marketing</strong>
                          — tracciano il comportamento dell'utente per mostrare
                          pubblicità mirata. Richiedono sempre il consenso.
                        </li>
                        <li>
                          <strong>Cookie di terze parti</strong> — impostati da
                          servizi esterni integrati nel sito (es. mappe, video,
                          social). Richiedono consenso.
                        </li>
                      </ul>
                    </section>

                    <!-- 3 -->
                    <section id="cookie-usati" class="policy-section">
                      <span class="policy-section__num">Art. 3</span>
                      <h2>Cookie utilizzati su questo sito</h2>
                      <p>Questo sito utilizza esclusivamente:</p>
                      <ul>
                        <li>
                          <strong>Cookie tecnici di sessione</strong> — generati
                          dal browser per la normale navigazione. Non vengono
                          salvati in modo permanente e si cancellano alla
                          chiusura del browser. Non richiedono consenso.
                        </li>
                        <li>
                          <strong>Cookie di terze parti di Google Maps</strong>
                          — attivi solo nella pagina Contatti e solo dopo il tuo
                          consenso (vedi art. 4).
                        </li>
                      </ul>
                      <p>
                        <strong>Non sono presenti</strong> su questo sito cookie
                        di Google Analytics, Facebook Pixel, cookie
                        pubblicitari, widget di social network o altri strumenti
                        di tracciamento.
                      </p>
                    </section>

                    <!-- 4 -->
                    <section id="google-maps" class="policy-section">
                      <span class="policy-section__num">Art. 4</span>
                      <h2>Google Maps</h2>
                      <p>
                        Nella pagina <a href="contact.html">Contatti</a> è
                        presente una mappa interattiva fornita da
                        <strong>Google Maps</strong> (Google LLC, 1600
                        Amphitheatre Parkway, Mountain View, CA 94043, USA).
                      </p>
                      <p>
                        Quando visualizzi la mappa, Google può impostare i
                        seguenti cookie sul tuo dispositivo:
                      </p>

                      <table class="policy-table">
                        <tr>
                          <td>Nome</td>
                          <td>Fornitore</td>
                        </tr>
                        <tr>
                          <td>NID</td>
                          <td>
                            Google — memorizza le preferenze e le informazioni
                            dell'utente
                          </td>
                        </tr>
                        <tr>
                          <td>1P_JAR</td>
                          <td>
                            Google — raccoglie statistiche sui siti e misura le
                            conversioni
                          </td>
                        </tr>
                        <tr>
                          <td>CONSENT</td>
                          <td>
                            Google — memorizza lo stato del consenso dell'utente
                          </td>
                        </tr>
                      </table>

                      <p>
                        Questi cookie possono comportare il trasferimento di
                        dati verso gli Stati Uniti. Google aderisce al Data
                        Privacy Framework UE-USA. Per maggiori informazioni
                        consulta la
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          >Privacy Policy di Google</a
                        >
                        e la
                        <a
                          href="https://policies.google.com/technologies/cookies"
                          target="_blank"
                          rel="noopener noreferrer"
                          >Cookie Policy di Google</a
                        >.
                      </p>
                      <p>
                        La durata dei cookie di Google varia: alcuni scadono al
                        termine della sessione, altri hanno una durata fino a 2
                        anni.
                      </p>
                    </section>

                    <!-- 5 -->
                    <section id="consenso" class="policy-section">
                      <span class="policy-section__num">Art. 5</span>
                      <h2>Consenso e gestione delle preferenze</h2>
                      <p>
                        Alla prima visita al sito, un banner ti informa
                        dell'utilizzo dei cookie e ti chiede il consenso per
                        l'attivazione di quelli di terze parti (Google Maps).
                        Puoi scegliere di:
                      </p>
                      <ul>
                        <li>
                          <strong>Accettare tutti i cookie</strong> — la mappa
                          Google Maps sarà attiva nella pagina Contatti
                        </li>
                        <li>
                          <strong>Rifiutare i cookie di terze parti</strong>
                          — la mappa non verrà caricata; al suo posto troverai
                          un link che apre Google Maps in una nuova scheda,
                          senza impostare cookie sul tuo dispositivo
                        </li>
                      </ul>
                      <p>
                        Puoi modificare le tue preferenze in qualsiasi momento
                        cliccando sul link "Gestisci preferenze cookie" presente
                        nel footer del sito.
                      </p>
                      <p>
                        Il consenso prestato è registrato localmente nel tuo
                        browser tramite un cookie tecnico
                        (<code>anticasagrasanrocco_cookie_consent</code>) e non viene
                        trasmesso a server esterni.
                      </p>
                    </section>

                    <!-- 6 -->
                    <section id="disabilitare" class="policy-section">
                      <span class="policy-section__num">Art. 6</span>
                      <h2>Come disabilitare i cookie dal browser</h2>
                      <p>
                        Oltre al pannello di gestione del sito, puoi controllare
                        e cancellare i cookie direttamente dalle impostazioni
                        del tuo browser. Di seguito i link alle istruzioni per i
                        principali browser:
                      </p>
                      <ul>
                        <li>
                          <a
                            href="https://support.google.com/chrome/answer/95647"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Google Chrome</a
                          >
                        </li>
                        <li>
                          <a
                            href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Mozilla Firefox</a
                          >
                        </li>
                        <li>
                          <a
                            href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Apple Safari</a
                          >
                        </li>
                        <li>
                          <a
                            href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Microsoft Edge</a
                          >
                        </li>
                      </ul>
                      <p>
                        Tieni presente che disabilitare tutti i cookie potrebbe
                        compromettere la navigazione su altri siti web.
                      </p>
                    </section>

                    <!-- 7 -->
                    <section id="modifiche-cookie" class="policy-section">
                      <span class="policy-section__num">Art. 7</span>
                      <h2>Modifiche alla presente Cookie Policy</h2>
                      <p>
                        Il Titolare si riserva il diritto di aggiornare questa
                        Cookie Policy in qualsiasi momento, ad esempio in caso
                        di modifiche ai servizi utilizzati o per adeguarsi a
                        nuove normative. Le modifiche saranno pubblicate su
                        questa pagina con l'aggiornamento della data.
                      </p>
                    </section>

                    <!-- 8 -->
                    <section id="contatti-cookie" class="policy-section">
                      <span class="policy-section__num">Art. 8</span>
                      <h2>Contatti</h2>
                      <p>
                        Per qualsiasi domanda relativa all'utilizzo dei cookie
                        su questo sito, puoi contattare il Titolare del
                        trattamento:
                      </p>
                      <table class="policy-table">
                        <tr>
                          <td>Email</td>
                          <td>
                            <a href="mailto:parrocchia1822@gmail.com"
                              >parrocchia1822@gmail.com</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td>Titolare</td>
                          <td>Parrocchia San Rocco Pedemonte, Verona</td>
                        </tr>
                      </table>
                      <p>
                        Per informazioni più ampie sul trattamento dei dati
                        personali, consulta la nostra
                        <a href="javascript:void(0)"
              class="open-policy"
              data-policy="privacy">Privacy Policy</a>.
                      </p>
                    </section>
                  </article>
                </div>
              </div>
              <span class="close-btn">&times;</span>`,

    privacy: `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <div class="container">
         <div class="policy-layout">

          <!-- Article -->
          <article class="policy-article">
                      <h1>Privacy policy</h1>

          <div class="policy-box">
            <p>
              <strong>In sintesi:</strong> questo sito è una vetrina informativa per la Sagra di Pedemonte. Non raccogliamo dati personali tramite form o registrazioni. Sul sito sono pubblicate immagini e fotografie delle edizioni precedenti della Sagra a scopo documentativo. L'unico servizio esterno attivo è Google Maps, che può impostare propri cookie quando lo utilizzi. Leggi i dettagli qui sotto.
            </p>
          </div>

          <!-- 1 -->
          <section id="titolare" class="policy-section">
            <span class="policy-section__num">Art. 1</span>
            <h2>Titolare del trattamento</h2>
            <p>Il Titolare del trattamento dei dati personali raccolti attraverso questo sito web è:</p>
            <table class="policy-table">
              <tr>
                <td>Nome</td>
                <td>Parrocchia San Rocco Pedemonte</td>
              </tr>
              <tr>
                <td>Comune / Diocesi</td>
                <td>Verona (VR)</td>
              </tr>
              <tr>
                <td>Email</td>
                <td><a href="mailto:parrocchia1822@gmail.com">parrocchia1822@gmail.com</a></td>
              </tr>
            </table>
            <p>Il sito web è gestito tecnicamente da un collaboratore volontario per conto della Parrocchia.</p>
          </section>

          <!-- 2 -->
          <section id="dati-raccolti" class="policy-section">
            <span class="policy-section__num">Art. 2</span>
            <h2>Dati raccolti</h2>
            <p>Questo sito web è esclusivamente informativo. Non è presente alcun modulo di contatto, area riservata o sistema di registrazione. Di conseguenza, non vengono raccolti dati anagrafici o di contatto degli utenti. <strong>Tuttavia, il sito tratta dati personali di natura multimediale</strong>, nello specifico fotografie e immagini relative alle edizioni precedenti della Sagra di Pedemonte, pubblicate a scopo storico e promozionale dell'evento.</p>
            <p>I soli dati tecnici che possono essere trattati sono quelli normalmente generati dai server web (log del server) che includono, in forma anonima o pseudonima, l'indirizzo IP del visitatore, il tipo di browser, il sistema operativo e le pagine visitate. Questi dati sono conservati temporaneamente dal provider di hosting per finalità di sicurezza e non vengono utilizzati per identificare gli utenti.</p>
          </section>

          <!-- 3 -->
          <section id="finalita" class="policy-section">
            <span class="policy-section__num">Art. 3</span>
            <h2>Finalità del trattamento</h2>
            <p>I dati tecnici di navigazione sono trattati esclusivamente per:</p>
            <ul>
              <li>Garantire il corretto funzionamento del sito web</li>
              <li>Assicurare la sicurezza informatica e prevenire attività fraudolente</li>
              <li>Adempiere a eventuali obblighi di legge</li>
              <li>Documentare, promuovere e raccontare la storia della Sagra di Pedemonte attraverso materiale fotografico delle edizioni passate.</li>
            </ul>
            <p>Non viene effettuata alcuna profilazione degli utenti, né vengono utilizzati i dati per finalità di marketing o pubblicità.</p>
          </section>

          <!-- 4 -->
          <section id="base-giuridica" class="policy-section">
            <span class="policy-section__num">Art. 4</span>
            <h2>Base giuridica del trattamento</h2>
            <p>Il trattamento dei dati tecnici di navigazione si basa sul <strong>legittimo interesse</strong> del Titolare (art. 6, par. 1, lett. f del GDPR) a mantenere la sicurezza e il corretto funzionamento del sito web.</p>
            <p>Per i cookie di terze parti (Google Maps), la base giuridica è il <strong>consenso dell'utente</strong> (art. 6, par. 1, lett. a del GDPR), che viene raccolto tramite il banner cookie prima che il servizio venga attivato.</p>
          </section>

          <!-- 5 -->
          <section id="terze-parti" class="policy-section">
            <span class="policy-section__num">Art. 5</span>
            <h2>Servizi di terze parti</h2>
            <p>Questo sito utilizza il seguente servizio esterno che può raccogliere dati e impostare cookie sul dispositivo dell'utente:</p>

            <div class="policy-box">
              <p><strong>Google Maps</strong> — fornito da Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.</p>
              <p style="margin-top:8px;">Google Maps viene utilizzato per mostrare la posizione del festival nella pagina Contatti. Quando la mappa viene caricata, Google può raccogliere dati sull'indirizzo IP, le interazioni con la mappa e altre informazioni tecniche. Tali dati vengono trattati da Google secondo la propria <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. Google potrebbe trasferire i dati verso paesi terzi (inclusi gli Stati Uniti) sulla base delle clausole contrattuali standard approvate dalla Commissione Europea.</p>
            </div>

            <p>Non sono presenti su questo sito strumenti di analisi statistica (Google Analytics o simili), pixel di tracciamento, widget di social media o sistemi di pubblicità.</p>
          </section>

          <!-- 6 -->
          <section id="conservazione" class="policy-section">
            <span class="policy-section__num">Art. 6</span>
            <h2>Conservazione dei dati</h2>
            <p>I log tecnici del server vengono conservati per il periodo strettamente necessario alle finalità di sicurezza, generalmente non superiore a <strong>30 giorni</strong>, salvo obblighi di conservazione previsti dalla legge.</p>
            <p>Per i dati trattati da Google tramite Google Maps, si rimanda alle politiche di conservazione di Google disponibili alla pagina <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.</p>
          </section>

          <!-- 6-bis Fotografie -->
          <section id="fotografie" class="policy-section">
            <span class="policy-section__num">Art. 6-bis</span>
            <h2>Pubblicazione di materiale fotografico</h2>
            <p>Le immagini e le fotografie pubblicate sul sito web provengono dalle passate edizioni della Sagra di Pedemonte, un evento svoltosi in luogo pubblico e di carattere manifesto. Tali immagini sono pubblicate esclusivamente a scopo documentativo, informativo e di promozione della Sagra, nel rispetto del diritto d'autore (Legge 633/1941) e del GDPR.</p>
            <p>Nessuna immagine viene utilizzata per ledere il decoro o la dignità dei soggetti ritratti. Nei casi in cui siano presenti minori in primo piano o soggetti facilmente identificabili non appartenenti allo staff, il Titolare applica, laddove possibile, tecniche di sfocatura (blurring) o seleziona scatti panoramici/di folla.</p>
            <div class="policy-box">
              <p><strong>Diritto di rimozione (Opt-out):</strong> Se ti riconosci in una delle fotografie presenti sul sito e non desideri che la tua immagine (o quella di un minore di cui eserciti la responsabilità genitoriale) sia visibile online, puoi richiederne la rimozione immediata o l'oscuramento in qualsiasi momento scrivendo a <a href="mailto:parrocchia1822@gmail.com">parrocchia1822@gmail.com</a>. Provvederemo alla rimozione nel minor tempo possibile.</p>
            </div>
          </section>

          <!-- 7 -->
          <section id="diritti" class="policy-section">
            <span class="policy-section__num">Art. 7</span>
            <h2>I tuoi diritti</h2>
            <p>In qualità di interessato, hai il diritto di:</p>
            <ul>
              <li><strong>Accesso</strong> — ottenere conferma che sia in corso un trattamento di dati che ti riguardano e richiederne copia (art. 15 GDPR)</li>
              <li><strong>Rettifica</strong> — richiedere la correzione di dati inesatti (art. 16 GDPR)</li>
              <li><strong>Cancellazione</strong> — richiedere la cancellazione dei tuoi dati ("diritto all'oblio", art. 17 GDPR)</li>
              <li><strong>Limitazione</strong> — richiedere la limitazione del trattamento (art. 18 GDPR)</li>
              <li><strong>Opposizione</strong> — opporti al trattamento basato su legittimo interesse (art. 21 GDPR)</li>
              <li><strong>Portabilità</strong> — ricevere i tuoi dati in formato strutturato, laddove applicabile (art. 20 GDPR)</li>
              <li><strong>Revoca del consenso</strong> — revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento effettuato prima della revoca</li>
            </ul>
            <p>Per esercitare i tuoi diritti, puoi scrivere a <a href="mailto:parrocchia1822@gmail.com">parrocchia1822@gmail.com</a>. Risponderemo entro 30 giorni dalla ricezione della richiesta.</p>
            <p>Hai inoltre il diritto di proporre reclamo al <strong>Garante per la protezione dei dati personali</strong> (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>).</p>
          </section>

          <!-- 8 -->
          <section id="cookie" class="policy-section">
            <span class="policy-section__num">Art. 8</span>
            <h2>Cookie</h2>
            <p>Per informazioni dettagliate sui cookie utilizzati da questo sito, consulta la nostra <a href="javascript:void(0)"
              class="open-policy"
              data-policy="cookie">Cookie Policy</a>.</p>
          </section>

          <!-- 9 -->
          <section id="modifiche" class="policy-section">
            <span class="policy-section__num">Art. 9</span>
            <h2>Modifiche alla presente informativa</h2>
            <p>Il Titolare si riserva il diritto di modificare questa Privacy Policy in qualsiasi momento, ad esempio in seguito a variazioni normative o all'introduzione di nuovi servizi sul sito. Le modifiche saranno pubblicate su questa pagina con aggiornamento della data in cima al documento.</p>
            <p>Si consiglia di consultare periodicamente questa pagina.</p>
          </section>

          <!-- 10 -->
          <section id="contatti-privacy" class="policy-section">
            <span class="policy-section__num">Art. 10</span>
            <h2>Contatti</h2>
            <p>Per qualsiasi domanda relativa al trattamento dei tuoi dati personali o per esercitare i diritti di cui all'art. 7, puoi contattare il Titolare del trattamento:</p>
            <table class="policy-table">
              <tr>
                <td>Email</td>
                <td><a href="mailto:parrocchia1822@gmail.com">parrocchia1822@gmail.com</a></td>
              </tr>
              <tr>
                <td>Titolare</td>
                <td>Parrocchia San Rocco Pedemonte, Verona</td>
              </tr>
            </table>
          </section>

        </article>
      </div>
    </div>
  </div>
  <span class="close-btn">&times;</span>`,
  };

  document.addEventListener("click", function (event) {
    // 1. We look for our specific trigger classes
    const trigger =
      event.target.closest(".open-policy") ||
      event.target.closest(".policy-trigger");
    const closeBtn = event.target.closest(".close-btn");
    const modal = document.getElementById("PCModal");

    // 2. ONLY if a policy trigger was clicked
    if (trigger) {
      event.preventDefault(); // Only stops these specific links
      const policyType = trigger.getAttribute("data-policy");
      openModal(policyType);
      return; // Stop running the rest of this function
    }

    // 3. ONLY if the close button or background was clicked
    if (closeBtn || event.target === modal) {
      modal.style.display = "none";
      modal.innerHTML = "";
      return;
    }

    // If the user clicked anything else (a menu, a button, etc.)
    // the function reaches the end and does ABSOLUTELY NOTHING.
  });

  function openModal(type) {
    const modal = document.getElementById("PCModal");

    // 1. Inject the specific content
    modal.innerHTML = policies[type];

    // 2. Show the modal
    modal.style.display = "flex";

    // 3. Reset scroll position to top
    const content = modal.querySelector(".modal-content");
    if (content) content.scrollTop = 0;
  }

  /*const modal = document.getElementById("PCModal");
  const cookie_btn = document.getElementById("openCookie");
  const span = document.getElementsByClassName("close-btn")[0];

  // Apre la modale al click
  cookie_btn.onclick = function () {
    modal.style.display = "flex";
  };

  const privacy_btn = document.getElementById("openPrivacy");
  privacy_btn.onclick = function () {
    openPrivacy();
  };
  // Apre la modale al click
  function openPrivacy() {
    modal.style.display = "flex";
  }

  modal.onclick = function (event) {
    // Check if the user clicked the 'X' button
    // We use .closest() or .classList.contains() to identify the element
    if (event.target.classList.contains("close-btn")) {
      closeModal();
    }

    // Check if the user clicked the gray backdrop (outside the white box)
    if (event.target == modal) {
      closeModal();
    }
  };

  // Create a reusable function to clean up
  function closeModal() {
    modal.style.display = "none";
    modal.innerHTML = ""; // Clears the content
  }*/
});
