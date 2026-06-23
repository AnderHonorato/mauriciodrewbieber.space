/* ======================================================
   Mauricio Drew Bieber — Link site v5
   Criado por Anderson Honorato
   ====================================================== */

const APP = {
  whatsapp: "5511950818317",
  instagram: "https://www.instagram.com/lil_drew_jaxon?igsh=MTAxaGxsZXdnMjhvYg%3D%3D&utm_source=qr",
  x: "https://x.com/mauriciodg122?s=11",
  privacy: "https://privacy.com.br/@Garotinho43"
};

const PREVIEWS = [
  {
    title: "Quer ver mais? 😈",
    text: "Para ver o tamanho do meu conteúdo privado, clica no botão abaixo. Garanto que você vai pirar com o que eu faço entre quatro paredes.",
    normal: "assets/capas/1.jpg",
    normalFallback: "assets/capas/1.svg",
    adult: "assets/previas/1.1.jpg",
    adultFallback: "assets/previas/1.1.svg"
  },
  {
    title: "Conteúdo Amador",
    text: "Olhou, babou e ficou duro, né? 🔥 Vem garantir esse pack completo comigo nos meios abaixo e me assiste peladinho, sem censura.",
    normal: "assets/capas/2.jpg",
    normalFallback: "assets/capas/2.svg",
    adult: "assets/previas/1.2.jpg",
    adultFallback: "assets/previas/1.2.svg"
  },
  {
    title: "Vem ver gozando 💦",
    text: "Uma prévia deliciosa e explícita para te deixar com tesão. O vídeo completo enchendo a tela de leite tá no pack VIP! 🥛😈",
    normal: "assets/capas/3.jpg",
    normalFallback: "assets/capas/3.svg",
    adult: "assets/previas/1.3.jpg",
    adultFallback: "assets/previas/1.3.svg"
  },
  {
    title: "Magrin Pauzudo 🔥",
    text: "Para os ativos, passivos e versáteis que gostam de safadeza pesada. Rolê totalmente explícito, com dotado e fetiche. Vem no privado! 👅🍑",
    normal: "assets/capas/4.jpg",
    normalFallback: "assets/capas/4.svg",
    adult: "assets/previas/1.4.jpg",
    adultFallback: "assets/previas/1.4.svg"
  }
];

const WA_MESSAGES = [
  {
    title: "Drew IA 😈",
    text: "Quer ver o pack do bofe mais dotado, safado e pedido do momento? 🍆 Chama aqui que eu te libero o link do proibidão agora!"
  },
  {
    title: "Spoiler quente 😈🌶️",
    text: "Tem muito mais putaria me assistindo dar e tomar no sigilo. Quer saber qual pack vai satisfazer seu fetiche hoje? 🤤🍑"
  },
  {
    title: "Só no privado 🤫🔞",
    text: "As f@didas mais brutas e os vídeos mais pesados eu não deixo na vitrine. Vem de Zap e garante o seu pack sem censura! 🔥💦"
  },
  {
    title: "Clima de curiosidade 😈👀",
    text: "Olhou para essa raba e imaginou o estrago, né? 🍑 Eu já deixei a mensagem no gatilho para você vir me macetar no chat."
  },
  {
    title: "Drew chama 📞👅",
    text: "Quer ver leite voando, cara de safado e putaria real, sem enrolação? Toca aqui e fala direto com o criador no sigilo absoluto! 🤫🍆"
  },

    {
    title: "Gostou do site? 👩‍💻",
    text: "Contate o desenvolvedor no link do rodapé e peça já o seu também."
  }
];

const THEMES = ["white", "offwhite", "gray", "black"];
let modalIndex = 0;
let waClosedThisSession = false;
let waMessageIndex = 0;
let waAutoHideTimer = null;
let waRepeatTimer = null;

const storage = {
  allowed() {
    return localStorage.getItem("mdb_cookie_consent") === "accepted";
  },
  get(key) {
    if (this.allowed()) return localStorage.getItem(key);
    return sessionStorage.getItem(key);
  },
  set(key, value) {
    if (this.allowed()) localStorage.setItem(key, value);
    else sessionStorage.setItem(key, value);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setupCookies();
  setupTheme();
  setupHeaderBehavior();
  setupCoverSlider();
  renderPreviewCards();
  setupPreviewCarousel();
  setupModal();
  setupShareModal();
  setupWhatsAssistant();
  document.getElementById("year").textContent = new Date().getFullYear();
});

function setupCookies() {
  const banner = document.getElementById("cookieBanner");
  const accept = document.getElementById("cookieAccept");
  const reject = document.getElementById("cookieReject");
  const status = localStorage.getItem("mdb_cookie_consent") || sessionStorage.getItem("mdb_cookie_consent");

  if (!status) banner.classList.add("is-visible");

  accept.addEventListener("click", () => {
    localStorage.setItem("mdb_cookie_consent", "accepted");
    banner.classList.remove("is-visible");
    showToast("Preferências salvas!");
  });

  reject.addEventListener("click", () => {
    sessionStorage.setItem("mdb_cookie_consent", "rejected");
    banner.classList.remove("is-visible");
    showToast("Cookies recusados");
  });
}

function setupTheme() {
  const saved = storage.get("mdb_theme") || "black";
  setTheme(saved);

  document.getElementById("themeButton").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "white";
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    setTheme(next);
    storage.set("mdb_theme", next);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const text = {
    white: "tema branco",
    offwhite: "tema off white",
    gray: "tema cinza escuro",
    black: "tema preto"
  }[theme] || "tema";
  document.getElementById("themeButton").textContent = text;
}

function setupHeaderBehavior() {
  const header = document.getElementById("siteHeader");
  const rail = document.getElementById("sideRail");
  let lastY = window.scrollY;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const goingDown = y > lastY;

    if (goingDown && y > 170) {
      header.classList.add("is-hidden");
      rail.classList.add("is-visible");
    } else {
      header.classList.remove("is-hidden");
      if (y < 140) rail.classList.remove("is-visible");
    }

    lastY = y;
  }, { passive: true });
}

function setupCoverSlider() {
  const slides = [...document.querySelectorAll(".cover-img")];
  const dotsWrap = document.getElementById("coverDots");
  const prev = document.getElementById("coverPrev");
  const next = document.getElementById("coverNext");
  let current = 0;
  let timer = null;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "cover-dot" + (index === 0 ? " active" : "");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para capa ${index + 1}`);
    dot.addEventListener("click", () => {
      goTo(index);
      restart();
    });
    dotsWrap.appendChild(dot);
  });

  const dots = [...dotsWrap.querySelectorAll(".cover-dot")];

  function goTo(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5200);
  }

  prev.addEventListener("click", () => { goTo(current - 1); restart(); });
  next.addEventListener("click", () => { goTo(current + 1); restart(); });

  restart();
}

function renderPreviewCards() {
  const scroller = document.getElementById("previewScroller");

  scroller.innerHTML = PREVIEWS.map((item, index) => `
    <article class="preview-card" data-index="${index}">
      <button class="preview-media" type="button" data-open-modal="${index}" aria-label="Abrir ${escapeHtml(item.title)}">
        <img src="${item.normal}" onerror="this.src='${item.normalFallback}'" alt="${escapeHtml(item.title)}" />
        <span class="preview-label">Conteúdo adulto</span>
      </button>

      <div class="preview-body">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>

        <div class="preview-actions">
          <a href="${whatsLink(item.title)}" target="_blank" rel="noopener">Saber mais</a>
          <button type="button" data-preview-modal="${index}">Prévia</button>
        </div>
      </div>
    </article>
  `).join("");

  scroller.querySelectorAll("[data-open-modal]").forEach(button => {
    button.addEventListener("click", () => openModal(Number(button.dataset.openModal)));
  });

  scroller.querySelectorAll("[data-preview-modal]").forEach(button => {
    button.addEventListener("click", () => openModal(Number(button.dataset.previewModal)));
  });
}

function setupPreviewCarousel() {
  const scroller = document.getElementById("previewScroller");
  const left = document.getElementById("previewLeft");
  const right = document.getElementById("previewRight");

  function getScrollAmount() {
    const card = scroller.querySelector(".preview-card");
    if (!card) return scroller.clientWidth;
    const gap = parseFloat(getComputedStyle(scroller).gap || "10");
    return (card.getBoundingClientRect().width + gap) * 2;
  }

  left.addEventListener("click", () => scroller.scrollBy({ left: -getScrollAmount(), behavior: "smooth" }));
  right.addEventListener("click", () => scroller.scrollBy({ left: getScrollAmount(), behavior: "smooth" }));
}

function setupModal() {
  const modal = document.getElementById("photoModal");
  const unlock = document.getElementById("unlockAdult");

  document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });

  unlock.addEventListener("click", () => {
    modal.classList.add("is-unlocked");
  });

  document.getElementById("modalShare").addEventListener("click", () => {
    document.getElementById("shareUrlInput").value = window.location.href;
    document.getElementById("shareModal").classList.add("is-open");
    document.getElementById("shareModal").setAttribute("aria-hidden", "false");
  });
}

function openModal(index) {
  modalIndex = index;
  const item = PREVIEWS[index];
  const modal = document.getElementById("photoModal");
  const image = document.getElementById("modalImage");

  image.src = item.adult;
  image.onerror = () => { image.src = item.adultFallback; };
  image.alt = item.title;

  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalText").textContent = item.text;
  document.getElementById("modalWhats").href = whatsLink(item.title);

  modal.classList.remove("is-unlocked");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("photoModal");
  modal.classList.remove("is-open", "is-unlocked");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function setupShareModal() {
  const modal = document.getElementById("shareModal");
  const input = document.getElementById("shareUrlInput");
  const copyBtn = document.getElementById("shareCopyBtn");
  const grid = document.getElementById("shareLinksGrid");

  const socialLinks = [
    { label: "Privacy", url: APP.privacy },
    { label: "Instagram", url: APP.instagram },
    { label: "X / Twitter", url: APP.x },
    { label: "WhatsApp", url: `https://wa.me/${APP.whatsapp}` }
  ];

  grid.innerHTML = socialLinks.map(link => `
    <a href="${link.url}" target="_blank" rel="noopener">${link.label}</a>
  `).join("");

  document.getElementById("sharePage").addEventListener("click", () => {
    input.value = window.location.href;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });

  document.querySelectorAll("[data-close-share]").forEach(el => {
    el.addEventListener("click", () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    });
  });

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copiado! ✓");
    } catch (_) {
      input.select();
      showToast("Selecione e copie o link acima");
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  });
}

function setupWhatsAssistant() {
  const assistant = document.getElementById("waAssistant");
  const close = document.getElementById("waClose");
  const title = document.getElementById("waTitle");
  const text = document.getElementById("waText");
  const link = document.getElementById("waBubbleLink");

  close.addEventListener("click", () => {
    waClosedThisSession = true;
    hideWhatsAssistant();
    clearTimeout(waAutoHideTimer);
    clearTimeout(waRepeatTimer);
  });

  function showNextMessage() {
    if (waClosedThisSession) return;

    const msg = WA_MESSAGES[waMessageIndex % WA_MESSAGES.length];
    title.textContent = msg.title;
    text.textContent = msg.text;
    link.href = whatsLink(msg.title);

    assistant.classList.add("is-visible");
    waMessageIndex += 1;

    clearTimeout(waAutoHideTimer);
    waAutoHideTimer = setTimeout(() => {
      hideWhatsAssistant();
      clearTimeout(waRepeatTimer);
      waRepeatTimer = setTimeout(showNextMessage, 5 * 60 * 1000);
    }, 60 * 1000);
  }

  setTimeout(showNextMessage, 10 * 1000);
}

function hideWhatsAssistant() {
  document.getElementById("waAssistant").classList.remove("is-visible");
}

function whatsLink(context) {
  const msg = `Oi Mauricio, quero saber mais sobre ${context} e os packs de conteúdo.`;
  return `https://wa.me/${APP.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function showToast(message) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 2600);
}
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}
