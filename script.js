/* ======================================================
   Mauricio Drew Bieber — Link site v5
   Criado por Anderson Honorato
   ====================================================== */

const APP = Object.freeze({
  whatsapp: document.body.dataset.whatsapp,
  instagram: document.body.dataset.instagram,
  x: document.body.dataset.x,
  privacy: document.body.dataset.privacy
});

const AUTO_DELAY_MIN = 5 * 60 * 1000;
const AUTO_DELAY_MAX = 10 * 60 * 1000;
const USER_COMMENTS_KEY = "mdb_user_comments_v1";

const PREVIEWS = [
  {
    title: "Quer ver mais? 😈",
    text: "Para ver o tamanho do meu conteúdo privado, clica no botão abaixo. Garanto que você vai pirar com o que eu faço entre quatro paredes.",
    normal: "assets/capas/1.jpg", normalFallback: "assets/capas/1.svg",
    adult: "assets/previas/1.1.jpg", adultFallback: "assets/previas/1.1.svg"
  },
  {
    title: "Conteúdo Amador",
    text: "Olhou, babou e ficou duro, né? 🔥 Vem garantir esse pack completo comigo nos meios abaixo e me assiste peladinho, sem censura.",
    normal: "assets/capas/2.jpg", normalFallback: "assets/capas/2.svg",
    adult: "assets/previas/1.2.jpg", adultFallback: "assets/previas/1.2.svg"
  },
  {
    title: "Vem ver gozando 💦",
    text: "Uma prévia deliciosa e explícita para te deixar com tesão. O vídeo completo enchendo a tela de leite tá no pack VIP! 🥛😈",
    normal: "assets/capas/3.jpg", normalFallback: "assets/capas/3.svg",
    adult: "assets/previas/1.3.jpg", adultFallback: "assets/previas/1.3.svg"
  },
  {
    title: "Magrin Pauzudo 🔥",
    text: "Para os ativos, passivos e versáteis que gostam de safadeza pesada. Rolê totalmente explícito, com dotado e fetiche. Vem no privado! 👅🍑",
    normal: "assets/capas/4.jpg", normalFallback: "assets/capas/4.svg",
    adult: "assets/previas/1.5.png", adultFallback: "assets/previas/1.4.svg"
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

// ═══ NOMES ALEATÓRIOS ═══
const RANDOM_NAMES = [
  { name: "Lucas M.", initial: "L", avClass: "av-lucas" },
  { name: "Rafael", initial: "R", avClass: "av-rafael" },
  { name: "Thiago P.", initial: "T", avClass: "av-thiago" },
  { name: "Pedro H.", initial: "P", avClass: "av-pedro" },
  { name: "gabriel_santos", initial: "G", avClass: "av-gabriel" },
  { name: "André Costa", initial: "A", avClass: "av-andre" },
  { name: "bruno.rx", initial: "B", avClass: "av-bruno" },
  { name: "Diego", initial: "D", avClass: "av-diego" },
  { name: "Felipe M.", initial: "F", avClass: "av-felipe" },
  { name: "henrique_99", initial: "H", avClass: "av-henrique" },
  { name: "Igor Nunes", initial: "I", avClass: "av-gabriel" },
  { name: "caio_ferraz", initial: "C", avClass: "av-andre" },
  { name: "Marcos", initial: "M", avClass: "av-bruno" },
  { name: "Eduardo J.", initial: "E", avClass: "av-diego" },
  { name: "roberto_f", initial: "R", avClass: "av-felipe" },
  { name: "Wesley G.", initial: "W", avClass: "av-henrique" },
  { name: "Alex T.", initial: "A", avClass: "av-gabriel" },
  { name: "Fernando", initial: "F", avClass: "av-andre" },
  { name: "leo_martins", initial: "L", avClass: "av-bruno" },
  { name: "vitor_hugo", initial: "V", avClass: "av-diego" },
  { name: "Ricardo", initial: "R", avClass: "av-felipe" },
  { name: "sergio.l", initial: "S", avClass: "av-henrique" },
  { name: "Matheus R.", initial: "M", avClass: "av-gabriel" },
  { name: "daniel_b", initial: "D", avClass: "av-andre" },
  { name: "Carlos", initial: "C", avClass: "av-bruno" },
  { name: "juliano_p", initial: "J", avClass: "av-diego" },
  { name: "Renato F.", initial: "R", avClass: "av-felipe" },
  { name: "wagner_x", initial: "W", avClass: "av-henrique" }
];

function randomName(seed) {
  const idx = (seed * 7 + 3) % RANDOM_NAMES.length;
  return RANDOM_NAMES[idx];
}

// ═══ DEPOIMENTOS INICIAIS ═══
const t0 = randomName(1), t1 = randomName(2), t2 = randomName(3), t3 = randomName(4);

const TESTIMONIALS = [
  { id: "testimonial-1", name: t0.name, avatarClass: t0.avClass, avatarInitial: t0.initial, photo: "", stars: 5, time: "há 2 dias",
    body: "Mano, que conteúdo insano! Comprei o pack completo e recebi na hora. O Mauricio é muito gente boa e o material é de primeira. 🔥",
    likes: 24, comments: 8,
    reply: "Valeu demais! Fico feliz que curtiu o pack. Tamo junto pra mais! 🤝" },
  { id: "testimonial-2", name: t1.name, avatarClass: t1.avClass, avatarInitial: t1.initial, photo: "", stars: 5, time: "há 5 dias",
    body: "Já comprei 3 packs diferentes e todos entregaram muito! Conteúdo variado, bem filmado e o Mauricio manda super bem. 👅",
    likes: 18, comments: 5,
    reply: "Você é fiel hein! Obrigado pela confiança, logo mais tem novidade saindo... 👀" },
  { id: "testimonial-3", name: t2.name, avatarClass: t2.avClass, avatarInitial: t2.initial, photo: "", stars: 5, time: "há 1 semana",
    body: "Sem palavras pro tanto de conteúdo gostoso. O magrinho é pauzudo mesmo e entrega tudo que promete. Nota mil! 🍑",
    likes: 31, comments: 12,
    reply: "Hahaha fico lisonjeado! O sigilo e a qualidade são prioridade aqui. Volte sempre! 😈" },
  { id: "testimonial-4", name: t3.name, avatarClass: t3.avClass, avatarInitial: t3.initial, photo: "", stars: 5, time: "há 2 semanas",
    body: "Comprei o pack VIP e me arrependi... de não ter comprado antes! Conteúdo exclusivo, bem produzido. 💦",
    likes: 15, comments: 4,
    reply: "Quase me assustou no começo kkkk. Que bom que gostou! O próximo já tá no forno... 🔥" }
];

// ═══ COMENTÁRIOS ═══
const COMMENTS_DATA = (() => {
  const texts = [
    "Concordo com tudo! Comprei também e foi a melhor decisão. 🔥",
    "Esse pack é surreal de bom, melhor conteúdo que já vi.",
    "Mauricio é brabo demais! Já quero o próximo lançamento.",
    "O sigilo e a qualidade são impecáveis. Nota 10! 👏",
    "Comprei e não me arrependo. Entrega rápida e material top.",
    "Já virei fã. Conteúdo de primeira, sem comparação. 🍆",
    "Cada pack é melhor que o anterior, o cara não decepciona nunca.",
    "Muito bom! Só queria mais fotos no pack básico, mas vale cada centavo.",
    "Atendimento nota mil, o Mauricio respondeu todas as minhas dúvidas antes da compra.",
    "Comprei o pack VIP e superou todas as expectativas. Recomendo de olhos fechados! 🤤",
    "Conteúdo bom, entrega rápida. Só achei que teria mais vídeos, mas no geral tá ótimo.",
    "O magrinho é diferenciado demais! Manda muito bem em tudo que faz. 👑",
    "Já sou cliente há meses e nunca me decepcionei. Qualidade sempre!",
    "Gostei bastante, só achei que demorou um pouco pra receber, mas o conteúdo é ótimo."
  ];
  const times = ["há 2 horas","há 6 horas","há 1 dia","há 2 dias","há 4 dias","há 1 semana","há 2 semanas","há 3 semanas","há 1 mês","há 1 mês","há 2 meses","há 2 meses","há 3 meses","há 3 meses"];
  const stars = [5,5,5,5,5,5,5,4,4,4,5];
  return texts.map((text, i) => {
    const r = randomName(i + 10);
    return { name: r.name, initial: r.initial, avClass: r.avClass, stars: stars[i % stars.length], time: times[i % times.length], likes: Math.floor(Math.random() * 12) + 2, text };
  });
})();

function updateSectionScore() {
  const grid = document.getElementById("testimonialsGrid");
  const scoreEl = document.getElementById("sectionScore");
  if (!scoreEl || !grid) return;
  const cards = grid.querySelectorAll(".testimonial-card");
  if (!cards.length) return;
  let total = 0;
  cards.forEach(c => { const s = c.querySelector(".stars"); if (s) total += (s.textContent.match(/★/g) || []).length; });
  scoreEl.textContent = `★ ${(total / cards.length).toFixed(1)}`;
}

// ═══ NOTIFICAÇÕES FLUTUANTES ═══
const PACK_NAMES = ["Pack VIP", "Pack Completo", "Pack Fotos", "Pack Vídeos", "Pack Premium", "Pack Proibidão", "Pack Exclusivo"];
const NOTIFY_TYPES = ["purchase", "purchase", "fan", "fan", "comment", "like"];
let purchaseNotifyTimer = null;
let notificationsDisabled = localStorage.getItem("mdb_notify_off") === "1";

function startPurchaseNotifications() {
  if (notificationsDisabled || purchaseNotifyTimer) return;
  schedulePurchaseNotification();
}

function schedulePurchaseNotification() {
  if (notificationsDisabled) return;
  clearTimeout(purchaseNotifyTimer);
  purchaseNotifyTimer = setTimeout(() => {
    purchaseNotifyTimer = null;
    spawnPurchaseNotify();
  }, randomAutoDelay());
}

function stopPurchaseNotifications() {
  clearTimeout(purchaseNotifyTimer);
  purchaseNotifyTimer = null;
  notificationsDisabled = true;
  localStorage.setItem("mdb_notify_off", "1");
  document.getElementById("purchaseToasts").innerHTML = "";
}

function spawnPurchaseNotify() {
  const container = document.getElementById("purchaseToasts");
  if (!container || notificationsDisabled) return;
  if (document.hidden || hasActiveInterruption()) {
    schedulePurchaseNotification();
    return;
  }

  const nameData = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
  const type = NOTIFY_TYPES[Math.floor(Math.random() * NOTIFY_TYPES.length)];
  const mins = Math.floor(Math.random() * 4) + 1;

  let icon, text;
  switch (type) {
    case "purchase":
      icon = "●"; text = `Comprou ${PACK_NAMES[Math.floor(Math.random() * PACK_NAMES.length)]} · há ${mins} min`;
      break;
    case "fan":
      icon = "♥"; text = `Começou a seguir · há ${mins} min`;
      break;
    case "comment":
      icon = "◈"; text = `Comentou em uma publicação · há ${mins} min`;
      break;
    case "like":
      icon = "♦"; text = `Curtiu uma foto · há ${mins} min`;
      break;
    default:
      icon = "▸"; text = `Interagiu · há ${mins} min`;
  }

  const el = document.createElement("div");
  el.className = "purchase-notify";
  el.innerHTML = `
    <div class="pn-avatar ${nameData.avClass}">${nameData.initial}</div>
    <div class="pn-info">
      <strong>${nameData.name}</strong>
      <span>${icon} ${text}</span>
    </div>
  `;

  el.addEventListener("click", () => {
    showConfirm("Quer desativar as notificações?", () => {
      stopPurchaseNotifications();
      showToast("Notificações desativadas");
    });
  });

  container.appendChild(el);
  setTimeout(() => {
    if (el.parentNode) el.remove();
    schedulePurchaseNotification();
  }, 7600);
}

// ═══ RENDER DEPOIMENTOS ═══
function renderTestimonials() {
  const grid = document.getElementById("testimonialsGrid");
  if (!grid) return;

  const userComments = loadUserComments();
  grid.innerHTML = TESTIMONIALS.map(t => {
    const localCount = (userComments[t.id] || []).length;
    return `
    <article class="testimonial-card" data-testimonial-id="${t.id}">
      <div class="testimonial-header">
        <div class="testimonial-avatar ${t.avatarClass}">
          <span class="avatar-fallback">${escapeHtml(t.avatarInitial)}</span>
        </div>
        <div>
          <strong>${escapeHtml(t.name)}</strong>
          <div class="stars">${"★".repeat(t.stars)}</div>
        </div>
        <span class="testimonial-time">${escapeHtml(t.time)}</span>
      </div>
      <p class="testimonial-body">${escapeHtml(t.body)}</p>
      <div class="testimonial-actions">
        <button class="like-btn" type="button">♥ <span>${t.likes}</span></button>
        <button class="comment-btn" type="button" data-testimonial-id="${t.id}">◈ <span class="comment-count">${t.comments + localCount}</span> comentários</button>
      </div>
      <div class="testimonial-reply">
        <div class="reply-avatar">D</div>
        <div>
          <strong>Mauricio Drew</strong>
          <p>${escapeHtml(t.reply)}</p>
        </div>
      </div>
    </article>
  `;
  }).join("");

  grid.querySelectorAll(".like-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const span = btn.querySelector("span");
      if (btn.classList.contains("liked")) { btn.classList.remove("liked"); span.textContent = Number(span.textContent) - 1; }
      else { btn.classList.add("liked"); span.textContent = Number(span.textContent) + 1; }
    });
  });
  grid.querySelectorAll(".comment-btn").forEach(btn => {
    btn.addEventListener("click", () => openCommentsModal(btn.dataset.testimonialId));
  });

  updateSectionScore();
}

function loadUserComments() {
  try {
    const parsed = JSON.parse(storage.get(USER_COMMENTS_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_) {
    return {};
  }
}

function saveUserComments(comments) {
  storage.set(USER_COMMENTS_KEY, JSON.stringify(comments));
}

function createCommentElement(comment) {
  const item = document.createElement("div");
  item.className = "comment-item";

  const avatar = document.createElement("div");
  avatar.className = `comment-avatar ${comment.avClass || "av-user"}`;
  avatar.textContent = comment.initial || "?";

  const content = document.createElement("div");
  const header = document.createElement("div");
  header.className = "comment-item-header";
  const name = document.createElement("strong");
  name.textContent = comment.name;
  const stars = document.createElement("span");
  stars.className = "stars";
  stars.textContent = "★".repeat(comment.stars || 5);
  header.append(name, stars);

  const message = document.createElement("p");
  message.textContent = comment.text;

  const footer = document.createElement("div");
  footer.className = "comment-item-footer";
  const time = document.createElement("span");
  time.className = "comment-time";
  time.textContent = comment.time || "agora";
  const like = document.createElement("button");
  like.className = "comment-like";
  like.type = "button";
  const likeCount = document.createElement("span");
  likeCount.textContent = Number(comment.likes) || 0;
  like.append("♥ ", likeCount);
  like.addEventListener("click", () => {
    const liked = like.classList.toggle("liked");
    likeCount.textContent = Number(likeCount.textContent) + (liked ? 1 : -1);
  });
  footer.append(time, like);
  content.append(header, message, footer);
  item.append(avatar, content);
  return item;
}

let activeTestimonialId = null;

function openCommentsModal(testimonialId) {
  const testimonial = TESTIMONIALS.find(item => item.id === testimonialId);
  if (!testimonial) return;
  activeTestimonialId = testimonial.id;
  const list = document.getElementById("commentsList");
  const modal = document.getElementById("commentsModal");
  const original = document.getElementById("commentsOriginal");
  const score = document.getElementById("commentsScore");
  const count = document.getElementById("commentsCount");
  if (!modal) return;

  const allStars = COMMENTS_DATA.map(c => c.stars);
  const avg = (allStars.reduce((a, b) => a + b, 0) / allStars.length).toFixed(1);
  score.textContent = `★ ${avg} · ${COMMENTS_DATA.length} avaliações`;

  original.innerHTML = `
    <div class="testimonial-header">
      <div class="testimonial-avatar ${testimonial.avatarClass}">
        <span class="avatar-fallback">${escapeHtml(testimonial.avatarInitial)}</span>
      </div>
      <div><strong>${escapeHtml(testimonial.name)}</strong><div class="stars">${"★".repeat(testimonial.stars || 5)}</div></div>
      <span class="testimonial-time">${escapeHtml(testimonial.time)}</span>
    </div>
    <p class="testimonial-body">${escapeHtml(testimonial.body)}</p>
    <div class="testimonial-actions"><span style="font-size:.65rem;color:var(--muted);">♥ ${testimonial.likes || 0} curtidas</span></div>
  `;

  const testimonialIndex = TESTIMONIALS.findIndex(item => item.id === testimonial.id);
  const baseComments = Array.from({ length: testimonial.comments }, (_, offset) => COMMENTS_DATA[(testimonialIndex * 3 + offset) % COMMENTS_DATA.length]);
  const localComments = loadUserComments()[testimonial.id] || [];
  const comments = [...localComments, ...baseComments];
  count.textContent = `${comments.length} comentários`;
  list.replaceChildren(...comments.map(createCommentElement));
  setModalState(modal, true);
}

function setupCommentsModal() {
  const modal = document.getElementById("commentsModal");
  if (!modal) return;
  document.querySelectorAll("[data-close-comments]").forEach(el => el.addEventListener("click", () => setModalState(modal, false)));
  const submit = document.getElementById("commentSubmit");
  if (submit) submit.addEventListener("click", () => {
    const name = document.getElementById("commentName").value.trim();
    const text = document.getElementById("commentText").value.trim();
    if (!name || !text) { showToast("Preencha nome e comentário"); return; }
    if (!activeTestimonialId) { showToast("Abra um depoimento antes de comentar"); return; }
    const comments = loadUserComments();
    const ownComments = comments[activeTestimonialId] || [];
    ownComments.unshift({
      name,
      text,
      initial: name.charAt(0).toUpperCase(),
      avClass: "av-user",
      stars: 5,
      time: "agora",
      likes: 0
    });
    comments[activeTestimonialId] = ownComments.slice(0, 20);
    saveUserComments(comments);
    document.getElementById("commentName").value = "";
    document.getElementById("commentText").value = "";
    renderTestimonials();
    openCommentsModal(activeTestimonialId);
    showToast("Comentário salvo neste dispositivo!");
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) setModalState(modal, false);
  });
}

// ═══ FAQ ═══
const FAQ_DATA = [
  { q: "Como funciona a entrega dos packs?", a: "Assim que o pagamento é confirmado, o link de acesso é enviado diretamente no seu WhatsApp ou e-mail. A entrega é instantânea — você recebe na hora, sem espera." },
  { q: "É seguro comprar? Meus dados ficam protegidos?", a: "Total sigilo. Seus dados pessoais e de pagamento nunca são compartilhados. Toda a comunicação é privada e o conteúdo é enviado de forma discreta." },
  { q: "Tem reembolso se eu não gostar?", a: "Como é conteúdo digital de acesso imediato, não oferecemos reembolso. Mas garantimos a qualidade — se houver qualquer problema técnico, resolvemos na hora." },
  { q: "Quais formas de pagamento aceita?", a: "PIX, transferência bancária e outras formas. Chama no WhatsApp que a gente combina a melhor opção pra você." },
  { q: "O conteúdo é atualizado com frequência?", a: "Sim! Novos packs e atualizações saem regularmente. Quem já comprou sempre recebe as novidades com prioridade." },
  { q: "Posso pedir conteúdo personalizado?", a: "Claro! Faz seu pedido no privado que a gente conversa. Conteúdo personalizado tem valor diferenciado, mas entrego do jeito que você quiser." }
];

function setupDevModal() {
  const modal = document.getElementById("hubModal");
  if (!modal) return;

  function openDev(e) { e.preventDefault(); setModalState(modal, true); }
  document.getElementById("devLink").addEventListener("click", openDev);

  document.querySelectorAll("[data-close-hub]").forEach(el => el.addEventListener("click", () => setModalState(modal, false)));

  document.getElementById("devCopyContact").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText("https://andersonhonorato.github.io/meu-portfolio/index.html"); showToast("Contato copiado!"); } catch (_) { showToast("Erro ao copiar"); }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) setModalState(modal, false);
  });
}

function setupFaqModal() {
  const modal = document.getElementById("faqModal");
  const list = document.getElementById("faqList");
  if (!modal || !list) return;

  list.innerHTML = FAQ_DATA.map(item => `
    <div class="faq-item"><button class="faq-q" type="button">${item.q}</button><div class="faq-a">${item.a}</div></div>
  `).join("");
  list.querySelectorAll(".faq-q").forEach(btn => btn.addEventListener("click", () => btn.parentElement.classList.toggle("is-open")));

  document.getElementById("faqLink").addEventListener("click", e => { e.preventDefault(); setModalState(modal, true); });
  document.querySelectorAll("[data-close-faq]").forEach(el => el.addEventListener("click", () => setModalState(modal, false)));
  document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("is-open")) setModalState(modal, false); });
}

function setupTermsModal() {
  const modal = document.getElementById("termsModal");
  if (!modal) return;
  document.getElementById("termsLink").addEventListener("click", e => { e.preventDefault(); setModalState(modal, true); });
  document.querySelectorAll("[data-close-terms]").forEach(el => el.addEventListener("click", () => setModalState(modal, false)));
  document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("is-open")) setModalState(modal, false); });
}

// ═══ CONTADORES DA CAPA ═══
function initCoverCounters() {
  const stats = document.getElementById("coverStats");
  if (!stats) return;

  let fans = Number(localStorage.getItem("mdb_fans")) || 2147;
  let online = Number(localStorage.getItem("mdb_online")) || 42 + Math.floor(Math.random() * 25);
  updateCoverStats(stats, fans, online);

  setInterval(() => {
    fans += 1;
    localStorage.setItem("mdb_fans", fans);
    updateCoverStats(stats, fans, online);
  }, 45000);

  setInterval(() => {
    online += Math.floor(Math.random() * 7) - 3;
    if (online < 20) online = 20 + Math.floor(Math.random() * 15);
    if (online > 90) online = 70 + Math.floor(Math.random() * 15);
    localStorage.setItem("mdb_online", online);
    updateCoverStats(stats, fans, online);
  }, 20000);
}

function updateCoverStats(el, fans, online) {
  el.innerHTML = `♥ ${fans.toLocaleString("pt-BR")}+ fãs · <span class="cdot"></span> ${online} online`;
}

// ═══ DEV MODAL ═══
// ═══ DOM READY ═══
document.addEventListener("DOMContentLoaded", () => {
  setupConfiguredLinks();
  setupCookies();
  setupTheme();
  setupHeaderBehavior();
  setupCoverSlider();
  renderPreviewCards();
  setupPreviewCarousel();
  setupModal();
  setupShareModal();
  setupDevModal();
  setupFaqModal();
  setupTermsModal();
  setupCommentsModal();
  setupWhatsAssistant();
  renderTestimonials();
  initCoverCounters();
  startPurchaseNotifications();
  document.getElementById("year").textContent = new Date().getFullYear();
});

// ═══ COOKIES ═══
function setupCookies() {
  const banner = document.getElementById("cookieBanner");
  if (!banner) return;
  const accept = document.getElementById("cookieAccept");
  const reject = document.getElementById("cookieReject");
  const status = localStorage.getItem("mdb_cookie_consent") || sessionStorage.getItem("mdb_cookie_consent");
  if (!status) banner.classList.add("is-visible");
  accept.addEventListener("click", () => { localStorage.setItem("mdb_cookie_consent", "accepted"); banner.classList.remove("is-visible"); showToast("Preferências salvas!"); });
  reject.addEventListener("click", () => { sessionStorage.setItem("mdb_cookie_consent", "rejected"); banner.classList.remove("is-visible"); showToast("Cookies recusados"); });
}

// ═══ TEMA ═══
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
  document.getElementById("themeButton").textContent = { white: "tema branco", offwhite: "tema off white", gray: "tema cinza escuro", black: "tema preto" }[theme] || "tema";
}

// ═══ HEADER ═══
function setupHeaderBehavior() {
  const header = document.getElementById("siteHeader");
  const rail = document.getElementById("sideRail");
  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y > lastY && y > 170) { header.classList.add("is-hidden"); rail.classList.add("is-visible"); }
    else { header.classList.remove("is-hidden"); if (y < 140) rail.classList.remove("is-visible"); }
    lastY = y;
    updateActiveRail();
  }, { passive: true });
}

function updateActiveRail() {
  const sections = ["links", "packs", "previas", "depoimentos"];
  const rail = document.getElementById("sideRail");
  if (!rail || !rail.classList.contains("is-visible")) return;

  let active = "";
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * .5 && rect.bottom >= 0) active = id;
    }
  });

  rail.querySelectorAll(".rail-btn").forEach(btn => {
    btn.classList.toggle("is-active", btn.getAttribute("href") === `#${active}`);
  });
}

// ═══ COVER SLIDER ═══
function setupCoverSlider() {
  const slides = [...document.querySelectorAll(".cover-img")];
  const dotsWrap = document.getElementById("coverDots");
  const prev = document.getElementById("coverPrev");
  const next = document.getElementById("coverNext");
  if (!slides.length) return;
  let current = 0, timer = null;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "cover-dot" + (index === 0 ? " active" : "");
    dot.type = "button"; dot.setAttribute("aria-label", `Ir para capa ${index + 1}`);
    dot.addEventListener("click", () => { goTo(index); restart(); });
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.querySelectorAll(".cover-dot")];

  function goTo(index) { slides[current].classList.remove("active"); dots[current].classList.remove("active"); current = (index + slides.length) % slides.length; slides[current].classList.add("active"); dots[current].classList.add("active"); }
  function restart() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 8000); }
  prev.addEventListener("click", () => { goTo(current - 1); restart(); });
  next.addEventListener("click", () => { goTo(current + 1); restart(); });
  restart();
}

// ═══ PREVIEW CARDS ═══
function renderPreviewCards() {
  const scroller = document.getElementById("previewScroller");
  if (!scroller) return;
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
    </article>`).join("");
  scroller.querySelectorAll("[data-open-modal]").forEach(b => b.addEventListener("click", () => openModal(Number(b.dataset.openModal))));
  scroller.querySelectorAll("[data-preview-modal]").forEach(b => b.addEventListener("click", () => openModal(Number(b.dataset.previewModal))));
}

function setupPreviewCarousel() {
  const scroller = document.getElementById("previewScroller");
  if (!scroller) return;
  const left = document.getElementById("previewLeft"), right = document.getElementById("previewRight");
  const getAmount = () => { const card = scroller.querySelector(".preview-card"); if (!card) return scroller.clientWidth; return (card.getBoundingClientRect().width + (parseFloat(getComputedStyle(scroller).gap) || 10)) * 2; };
  left.addEventListener("click", () => scroller.scrollBy({ left: -getAmount(), behavior: "smooth" }));
  right.addEventListener("click", () => scroller.scrollBy({ left: getAmount(), behavior: "smooth" }));
}

// ═══ PHOTO MODAL ═══
function setupModal() {
  const modal = document.getElementById("photoModal");
  if (!modal) return;
  document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      const pm = document.getElementById("photoModal"), sm = document.getElementById("shareModal");
      if (pm.classList.contains("is-open")) closeModal();
      if (sm.classList.contains("is-open")) setModalState(sm, false);
    }
  });
  document.getElementById("unlockAdult").addEventListener("click", () => modal.classList.add("is-unlocked"));
  document.getElementById("photoModalPrev").addEventListener("click", () => openModal((modalIndex - 1 + PREVIEWS.length) % PREVIEWS.length));
  document.getElementById("photoModalNext").addEventListener("click", () => openModal((modalIndex + 1) % PREVIEWS.length));
  document.getElementById("modalShare").addEventListener("click", () => {
    document.getElementById("shareUrlInput").value = window.location.href;
    const sm = document.getElementById("shareModal"); setModalState(sm, true);
  });
}

function openModal(index) {
  modalIndex = index;
  const item = PREVIEWS[index];
  const modal = document.getElementById("photoModal");
  const image = document.getElementById("modalImage");
  image.src = item.adult; image.onerror = () => { image.src = item.adultFallback; }; image.alt = item.title;
  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalText").textContent = item.text;
  document.getElementById("modalWhats").href = whatsLink(item.title);
  modal.classList.remove("is-unlocked");
  setModalState(modal, true);
}

function closeModal() {
  const modal = document.getElementById("photoModal");
  modal.classList.remove("is-unlocked");
  setModalState(modal, false);
}

// ═══ SHARE MODAL ═══
function setupShareModal() {
  const modal = document.getElementById("shareModal");
  if (!modal) return;
  const input = document.getElementById("shareUrlInput");
  const grid = document.getElementById("shareLinksGrid");
  const socialLinks = [
    { label: "Privacy", url: APP.privacy }, { label: "Instagram", url: APP.instagram },
    { label: "X / Twitter", url: APP.x }, { label: "WhatsApp", url: `https://wa.me/${APP.whatsapp}` }
  ];
  grid.innerHTML = socialLinks.map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join("");
  document.getElementById("sharePage").addEventListener("click", () => {
    input.value = window.location.href; setModalState(modal, true);
  });
  document.querySelectorAll("[data-close-share]").forEach(el => el.addEventListener("click", () => setModalState(modal, false)));
  document.getElementById("shareCopyBtn").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(window.location.href); showToast("Link copiado! ✓"); } catch (_) { input.select(); showToast("Selecione e copie o link acima"); }
  });
}

// ═══ WHATSAPP ASSISTANT ═══
function setupWhatsAssistant() {
  const assistant = document.getElementById("waAssistant");
  const close = document.getElementById("waClose");
  const body = document.getElementById("waChatBody");
  const options = document.getElementById("waOptions");
  const input = document.getElementById("waInput");
  const send = document.getElementById("waSend");
  const status = document.getElementById("waStatus");

  const STORAGE_KEY = "mdb_chat";
  let chatOpen = false;
  let chatHistory = [];

  function now() { const d = new Date(); return d.getHours().toString().padStart(2,"0") + ":" + d.getMinutes().toString().padStart(2,"0"); }

  function saveChat() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory.slice(-40))); } catch (_) {} }

  function loadChat() { try { const raw = localStorage.getItem(STORAGE_KEY); chatHistory = raw ? JSON.parse(raw) : []; } catch (_) { chatHistory = []; } }

  function setMessageContent(element, text, time, showCursor = false) {
    element.replaceChildren(document.createTextNode(text));
    const meta = document.createElement("span");
    meta.className = showCursor ? "cursor" : "time";
    meta.textContent = showCursor ? "|" : time;
    element.appendChild(meta);
  }

  function createChatCard(title, sub, link, time) {
    const card = document.createElement("div");
    card.className = "wa-msg card";
    const heading = document.createElement("strong");
    heading.textContent = title;
    const description = document.createElement("small");
    description.textContent = sub;
    const timestamp = document.createElement("span");
    timestamp.className = "time";
    timestamp.textContent = time;
    card.append(heading, description, timestamp);
    if (link && link.startsWith("http")) card.addEventListener("click", () => window.open(link, "_blank", "noopener"));
    return card;
  }

  function renderHistory() {
    body.replaceChildren();
    chatHistory.forEach(m => {
      if (m.type === "msg") {
        const div = document.createElement("div");
        div.className = "wa-msg " + (m.cls || "ia");
        setMessageContent(div, m.text || "", m.time || "");
        body.appendChild(div);
      } else if (m.type === "card") {
        body.appendChild(createChatCard(m.title || "", m.sub || "", m.link || "", m.time || ""));
      }
    });
    body.scrollTop = body.scrollHeight;
  }

  function appendBubble(text, cls, time, persist = true) {
    const div = document.createElement("div");
    div.className = "wa-msg " + cls;
    if (cls === "ia") {
      setMessageContent(div, "", "", true);
      body.appendChild(div); body.scrollTop = body.scrollHeight;
      let j = 0;
      function type() {
        if (j < text.length) {
          const isTyping = j < text.length - 1;
          setMessageContent(div, text.slice(0, j + 1), time || now(), isTyping);
          body.scrollTop = body.scrollHeight; j++;
          const char = text[j - 1] || "";
          const delay = ".!?".includes(char) ? 150 + Math.random() * 120 : (char === "," ? 80 + Math.random() * 50 : 15 + Math.random() * 18);
          setTimeout(type, delay);
        } else {
          if (persist) { chatHistory.push({ type: "msg", text, cls, time: time || now() }); saveChat(); }
        }
      }
      type();
    } else {
      setMessageContent(div, text, time || now());
      body.appendChild(div); body.scrollTop = body.scrollHeight;
      if (persist) { chatHistory.push({ type: "msg", text, cls, time: time || now() }); saveChat(); }
    }
  }

  function appendCard(title, sub, link, time, persist = true) {
    const div = createChatCard(title, sub, link, time || now());
    body.appendChild(div); body.scrollTop = body.scrollHeight;
    if (persist) { chatHistory.push({ type: "card", title, sub, link, time: time || now() }); saveChat(); }
  }

  function showTyping(cb) {
    const el = document.createElement("div");
    el.className = "wa-typing";
    el.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(el); body.scrollTop = body.scrollHeight;
    status.textContent = "digitando..."; status.className = "typing-status";
    const delay = Math.random() > .55 ? 1500 + Math.random() * 1500 : 400 + Math.random() * 500;
    setTimeout(() => { el.remove(); status.textContent = "Online"; status.className = ""; if (cb) cb(); }, delay);
  }

  function renderOptions() {
    const pool = IA_OPTIONS_POOLS[Math.floor(Math.random() * IA_OPTIONS_POOLS.length)];
    options.replaceChildren(...pool.map(label => {
      const l = label.toLowerCase();
      const key = l.includes("pack") ? "packs" : l.includes("valor") || l.includes("custa") ? "valores" : l.includes("conteudo") || l.includes("foto") ? "conteudo" : l.includes("programa") || l.includes("encontro") ? "gp" : l.includes("privacidade") || l.includes("comprar") ? "privacidade" : l.includes("criou") || l.includes("site") ? "dev" : l.includes("falar") || l.includes("mauricio") ? "falar" : "previas";
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.wa = key;
      button.textContent = label;
      return button;
    }));
    options.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => { appendBubble(btn.textContent, "user"); handleTopic(btn.dataset.wa); btn.classList.add("used"); });
    });
  }

  function handleTopic(key) {
    showTyping(() => {
      if (key === "falar") {
        appendBubble(IA_TOPICS.falar, "ia");
        setTimeout(() => appendCard("Falar com Mauricio", "Clique para abrir o WhatsApp", `https://wa.me/${APP.whatsapp}?text=Oi%20Mauricio%2C%20vim%20do%20seu%20site!`, now()), 500);
      } else if (key === "dev") {
        appendBubble(IA_TOPICS.dev, "ia");
        setTimeout(() => appendCard("Anderson Honorato", "Desenvolvedor · Clique para ver portfólio", "https://andersonhonorato.github.io/meu-portfolio/index.html", now()), 500);
      } else {
        appendBubble(IA_TOPICS[key] || IA_TOPICS.ajuda, "ia");
      }
    });
  }

  function handleText(msg) {
    const l = msg.toLowerCase();
    if (l.includes("pack") || l.includes("foto") || l.includes("video")) handleTopic("packs");
    else if (l.includes("valor") || l.includes("preco") || l.includes("custa") || l.includes("quanto")) handleTopic("valores");
    else if (l.includes("previa") || l.includes("amostra")) handleTopic("previas");
    else if (l.includes("mauricio") || l.includes("whatsapp") || l.includes("contato") || l.includes("encaminha") || l.includes("chamar")) handleTopic("falar");
    else if (l.includes("conteudo") || l.includes("+18") || l.includes("adulto")) handleTopic("conteudo");
    else if (l.includes("programa") || l.includes("encontro") || l.includes("transa") || l.includes("sexo")) handleTopic("gp");
    else if (l.includes("privacidade") || l.includes("seguro") || l.includes("sigilo") || l.includes("dados")) handleTopic("privacidade");
    else if (l.includes("quem criou") || l.includes("desenvolvedor") || l.includes("anderson") || l.includes("honorato") || l.includes("programou") || l.includes("criador do site")) handleTopic("dev");
    else if (l.includes("oi") || l.includes("ola") || l.includes("eae") || l.includes("boa")) handleTopic("saudacao");
    else showTyping(() => appendBubble(IA_TOPICS.ajuda, "ia"));
  }

  /* Auto messages - balloon only when closed */
  function scheduleNextAutoMessage() {
    clearTimeout(waRepeatTimer);
    waRepeatTimer = setTimeout(() => {
      waRepeatTimer = null;
      showNextAutoMessage();
    }, randomAutoDelay());
  }

  function showNextAutoMessage() {
    if (document.hidden || chatOpen || hasActiveInterruption()) {
      scheduleNextAutoMessage();
      return;
    }
    const msg = WA_MESSAGES[waMessageIndex % WA_MESSAGES.length];
    body.replaceChildren();
    const div = document.createElement("div");
    div.className = "wa-msg auto";
    setMessageContent(div, msg.text, now());
    body.appendChild(div);
    options.replaceChildren();
    const inputWrap = document.querySelector(".wa-chat-input");
    const floatWrap = document.querySelector(".wa-chat-float");
    if (inputWrap) inputWrap.style.display = "none";
    if (floatWrap) floatWrap.style.display = "none";
    assistant.classList.add("is-visible");
    waMessageIndex++;
    waAutoHideTimer = setTimeout(() => {
      assistant.classList.remove("is-visible");
      scheduleNextAutoMessage();
    }, 12000);
  }

  /* Interactive */
  document.querySelectorAll("[data-chat-trigger]").forEach(trigger => {
    trigger.addEventListener("click", e => {
      e.preventDefault();
      chatOpen = true;
      assistant.classList.remove("is-visible");
      clearTimeout(waAutoHideTimer); clearTimeout(waRepeatTimer);
      setTimeout(() => {
        body.replaceChildren();
        assistant.classList.add("is-visible");
        document.querySelector(".wa-chat-input").style.display = "flex";
        document.querySelector(".wa-chat-float").style.display = "";
        loadChat();
        chatHistory.length ? renderHistory() : appendBubble("Olá! Sou a Drew IA, assistente do Mauricio. Como posso ajudar?", "ia");
        renderOptions();
      }, 200);
    });
  });

  close.addEventListener("click", () => {
    chatOpen = false;
    assistant.classList.remove("is-visible");
    scheduleNextAutoMessage();
  });

  send.addEventListener("click", () => {
    const msg = input.value.trim(); if (!msg) return;
    appendBubble(msg, "user"); input.value = ""; handleText(msg);
  });

  input.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); send.click(); } });

  scheduleNextAutoMessage();
}

const IA_TOPICS = {
  packs: "Temos Pack Fotos, Pack Vídeos, Pack Completo e Pack VIP. Todos com conteúdo exclusivo, entrega imediata e total sigilo. Quer detalhes de algum?",
  valores: "Os valores variam conforme o pack. O Mauricio prefere conversar direto pra entender o que você busca e passar o melhor valor. Posso encaminhar?",
  previas: "Aqui no site tem prévias na seção 'Um gostinho do que te espera'. Mas o conteúdo completo dos packs é muito mais! Quer que eu te mostre?",
  falar: "Perfeito! Vou gerar o contato direto com o Mauricio pra você.",
  ajuda: "Posso falar sobre: packs, valores, prévias, conteúdo +18, encontros, privacidade, ou te encaminhar direto pro Mauricio. O que prefere?",
  privacidade: "Toda comunicação é 100% sigilosa. Seus dados nunca são compartilhados. O pagamento é discreto e a entrega é instantânea. Pode ficar tranquilo!",
  conteudo: "O Mauricio produz conteúdo adulto variado: fotos sensuais, vídeos explícitos, bastidores e muito mais. Cada pack tem um tema diferente e exclusivo.",
  gp: "O Mauricio também faz programas. Para saber disponibilidade, valores e local, fale direto com ele. Quer que eu encaminhe?",
  encontro: "Para combinar encontros o Mauricio prefere conversar pessoalmente no WhatsApp. Posso te encaminhar agora mesmo.",
  dev: "Este site foi criado por Anderson Honorato, desenvolvedor full stack. Quer um site igual?",
  saudacao: "Olá! Sou a Drew IA, assistente virtual do Mauricio. Como posso ajudar você hoje?",
};

const IA_OPTIONS_POOLS = [
  ["Ver packs", "Valores", "Prévias", "Falar c/ Mauricio"],
  ["Packs disponíveis", "Quanto custa?", "Conteúdo +18", "Encontros"],
  ["Fotos e vídeos", "Programas", "Privacidade", "Falar agora"],
  ["Pack VIP", "Valores", "Como comprar?", "Quem criou o site?"],
];

// ═══ UTILITÁRIOS ═══
function setupConfiguredLinks() {
  document.querySelectorAll("[data-channel]").forEach(link => {
    const channel = link.dataset.channel;
    if (channel === "whatsapp") {
      link.href = whatsappUrl(link.dataset.message || "");
    } else if (APP[channel]) {
      link.href = APP[channel];
    }
  });
}

function whatsappUrl(message = "") {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${APP.whatsapp}${query}`;
}

function randomAutoDelay() {
  return Math.floor(AUTO_DELAY_MIN + Math.random() * (AUTO_DELAY_MAX - AUTO_DELAY_MIN + 1));
}

function hasActiveInterruption() {
  return Boolean(
    document.querySelector(".purchase-notify") ||
    document.querySelector(".wa-assistant.is-visible") ||
    document.querySelector(".modal.is-open") ||
    document.querySelector(".cookie-banner.is-visible")
  );
}

function setModalState(modal, isOpen) {
  if (!modal) return;
  modal.classList.toggle("is-open", isOpen);
  modal.setAttribute("aria-hidden", String(!isOpen));
  document.body.style.overflow = document.querySelector(".modal.is-open") ? "hidden" : "";
}

function whatsLink(context) {
  return whatsappUrl(`Oi Mauricio, quero saber mais sobre ${context} e os packs de conteúdo.`);
}

function showConfirm(text, onYes) {
  const modal = document.getElementById("confirmModal");
  document.getElementById("confirmText").textContent = text;
  setModalState(modal, true);

  function close() { setModalState(modal, false); }

  document.getElementById("confirmYes").onclick = () => { close(); onYes(); };
  document.getElementById("confirmNo").onclick = close;
  document.querySelector("[data-close-confirm]").onclick = close;
}

function showToast(message) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast"; toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 2600);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}
