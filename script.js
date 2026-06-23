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
  { name: t0.name, avatarClass: t0.avClass, avatarInitial: t0.initial, photo: "", stars: 5, time: "há 2 dias",
    body: "Mano, que conteúdo insano! Comprei o pack completo e recebi na hora. O Mauricio é muito gente boa e o material é de primeira. 🔥",
    likes: 24, comments: 8,
    reply: "Valeu demais! Fico feliz que curtiu o pack. Tamo junto pra mais! 🤝" },
  { name: t1.name, avatarClass: t1.avClass, avatarInitial: t1.initial, photo: "", stars: 5, time: "há 5 dias",
    body: "Já comprei 3 packs diferentes e todos entregaram muito! Conteúdo variado, bem filmado e o Mauricio manda super bem. 👅",
    likes: 18, comments: 5,
    reply: "Você é fiel hein! Obrigado pela confiança, logo mais tem novidade saindo... 👀" },
  { name: t2.name, avatarClass: t2.avClass, avatarInitial: t2.initial, photo: "", stars: 5, time: "há 1 semana",
    body: "Sem palavras pro tanto de conteúdo gostoso. O magrinho é pauzudo mesmo e entrega tudo que promete. Nota mil! 🍑",
    likes: 31, comments: 12,
    reply: "Hahaha fico lisonjeado! O sigilo e a qualidade são prioridade aqui. Volte sempre! 😈" },
  { name: t3.name, avatarClass: t3.avClass, avatarInitial: t3.initial, photo: "", stars: 5, time: "há 2 semanas",
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

// ═══ SPAWN DE DEPOIMENTOS ═══
const TESTIMONIAL_MESSAGES = [
  "Mano, que conteúdo insano! Comprei o pack completo e recebi na hora. O Mauricio é muito gente boa e o material é de primeira. 🔥",
  "Já comprei 3 packs diferentes e todos entregaram muito! Conteúdo variado, bem filmado. 👅",
  "Sem palavras pro tanto de conteúdo gostoso. O magrinho é pauzudo mesmo. Nota mil! 🍑",
  "Comprei o pack VIP e me arrependi... de não ter comprado antes! 💦",
  "Acabei de receber o pack e já tô impressionado. Qualidade absurda! 🤤",
  "Mauricio não decepciona nunca. Cada pack é melhor que o outro. 🔥👑",
  "Conteúdo incrível, atendimento rápido e sigilo total. Já quero o próximo! 🍆",
  "Melhor pack que já adquiri até hoje. O magrinho manda bem demais. 😈",
  "Fiquei surpreso com a qualidade. Bem produzido, entrega rápida. ✨",
  "Sigo o Mauricio há meses e cada pack supera o anterior. 🌟",
  "Nunca vi conteúdo tão bem feito. Parabéns, Mauricio! Já sou fã. 💛",
  "Comprei, recebi na hora e fiquei maluco. Vale cada centavo. 🔥🍑"
];
let usedMessages = new Set();
let usedNames = new Set();
let testimonialSpawnTimer = null;
let recentBuyers = [];

function getRandomUnusedMessage() {
  const available = TESTIMONIAL_MESSAGES.filter((_, i) => !usedMessages.has(i));
  if (!available.length) { usedMessages.clear(); return TESTIMONIAL_MESSAGES[Math.floor(Math.random() * TESTIMONIAL_MESSAGES.length)]; }
  const idx = TESTIMONIAL_MESSAGES.indexOf(available[Math.floor(Math.random() * available.length)]);
  usedMessages.add(idx);
  return TESTIMONIAL_MESSAGES[idx];
}

function getRandomUnusedName() {
  const available = RANDOM_NAMES.filter(n => !usedNames.has(n.name));
  if (!available.length) { usedNames.clear(); return RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]; }
  const pick = available[Math.floor(Math.random() * available.length)];
  usedNames.add(pick.name);
  return pick;
}

function spawnTestimonial() {
  const grid = document.getElementById("testimonialsGrid");
  if (!grid) return;

  let nameData;
  if (recentBuyers.length && Math.random() > .4) {
    nameData = recentBuyers.shift();
  } else {
    nameData = getRandomUnusedName();
  }
  const msg = getRandomUnusedMessage();
  const stars = Math.random() > .25 ? 5 : 4;

  const card = document.createElement("article");
  card.className = "testimonial-card is-new";
  card.innerHTML = `
    <div class="testimonial-header">
      <div class="testimonial-avatar ${nameData.avClass}">
        <span class="avatar-fallback">${nameData.initial}</span>
      </div>
      <div>
        <strong>${nameData.name}</strong>
        <div class="stars">${"★".repeat(stars)}</div>
      </div>
      <span class="testimonial-time">agora mesmo</span>
    </div>
    <p class="testimonial-body">${msg}</p>
  `;
  grid.insertBefore(card, grid.firstChild);
  setTimeout(() => card.classList.remove("is-new"), 500);
  const cards = grid.querySelectorAll(".testimonial-card");
  if (cards.length > 6) cards[cards.length - 1].remove();
  updateSectionScore();
}

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

function startTestimonialSpawner() {
  if (testimonialSpawnTimer) return;
  testimonialSpawnTimer = setInterval(spawnTestimonial, 65000);
}

// ═══ NOTIFICAÇÕES FLUTUANTES ═══
const PACK_NAMES = ["Pack VIP", "Pack Completo", "Pack Fotos", "Pack Vídeos", "Pack Premium", "Pack Proibidão", "Pack Exclusivo"];
const NOTIFY_TYPES = ["purchase", "purchase", "fan", "fan", "comment", "like"];
let purchaseNotifyTimer = null;
let notificationsDisabled = localStorage.getItem("mdb_notify_off") === "1";

function startPurchaseNotifications() {
  if (notificationsDisabled || purchaseNotifyTimer) return;
  spawnPurchaseNotify();
  purchaseNotifyTimer = setInterval(spawnPurchaseNotify, 28000);
}

function stopPurchaseNotifications() {
  clearInterval(purchaseNotifyTimer);
  purchaseNotifyTimer = null;
  notificationsDisabled = true;
  localStorage.setItem("mdb_notify_off", "1");
  document.getElementById("purchaseToasts").innerHTML = "";
}

function spawnPurchaseNotify() {
  const container = document.getElementById("purchaseToasts");
  if (!container) return;

  const nameData = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
  const type = NOTIFY_TYPES[Math.floor(Math.random() * NOTIFY_TYPES.length)];
  const mins = Math.floor(Math.random() * 4) + 1;

  let icon, text;
  switch (type) {
    case "purchase":
      icon = "●"; text = `Comprou ${PACK_NAMES[Math.floor(Math.random() * PACK_NAMES.length)]} · há ${mins} min`;
      if (recentBuyers.length < 10) recentBuyers.push(nameData);
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
  setTimeout(() => { if (el.parentNode) el.remove(); }, 7600);

  const all = container.querySelectorAll(".purchase-notify");
  if (all.length > 3) all[0].remove();
}

// ═══ RENDER DEPOIMENTOS ═══
function renderTestimonials() {
  const grid = document.getElementById("testimonialsGrid");
  if (!grid) return;

  TESTIMONIALS.forEach(t => {
    usedMessages.add(TESTIMONIAL_MESSAGES.indexOf(t.body));
    usedNames.add(t.name);
  });

  grid.innerHTML = TESTIMONIALS.map((t, index) => `
    <article class="testimonial-card">
      <div class="testimonial-header">
        <div class="testimonial-avatar ${t.avatarClass}">
          <span class="avatar-fallback">${t.avatarInitial}</span>
        </div>
        <div>
          <strong>${t.name}</strong>
          <div class="stars">${"★".repeat(t.stars)}</div>
        </div>
        <span class="testimonial-time">${t.time}</span>
      </div>
      <p class="testimonial-body">${t.body}</p>
      <div class="testimonial-actions">
        <button class="like-btn" type="button">♥ <span>${t.likes}</span></button>
        <button class="comment-btn" type="button">◈ ${t.comments} comentários</button>
      </div>
      <div class="testimonial-reply">
        <div class="reply-avatar">D</div>
        <div>
          <strong>Mauricio Drew</strong>
          <p>${t.reply}</p>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".like-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const span = btn.querySelector("span");
      if (btn.classList.contains("liked")) { btn.classList.remove("liked"); span.textContent = Number(span.textContent) - 1; }
      else { btn.classList.add("liked"); span.textContent = Number(span.textContent) + 1; }
    });
  });
  grid.querySelectorAll(".comment-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".testimonial-card");
      const allCards = [...grid.querySelectorAll(".testimonial-card")];
      openCommentsModal(allCards.indexOf(card), card);
    });
  });

  updateSectionScore();
  initCoverCounters();
  startTestimonialSpawner();
}

function extractTestimonialFromCard(card) {
  if (!card) return null;
  const name = card.querySelector(".testimonial-header strong")?.textContent || "";
  const avatar = card.querySelector(".testimonial-avatar");
  const avClass = avatar ? [...avatar.classList].find(c => c.startsWith("av-")) || "" : "";
  const initial = card.querySelector(".avatar-fallback")?.textContent || name[0];
  const body = card.querySelector(".testimonial-body")?.textContent || "";
  const time = card.querySelector(".testimonial-time")?.textContent || "";
  const starsCount = (card.querySelector(".stars")?.textContent.match(/★/g) || []).length;
  const likesText = card.querySelector(".like-btn span")?.textContent || "0";
  return { name, avatarClass: avClass, avatarInitial: initial, photo: "", stars: starsCount || 5, time, body, likes: Number(likesText), comments: 0 };
}

function openCommentsModal(index, card) {
  const testimonial = TESTIMONIALS[index] || extractTestimonialFromCard(card);
  if (!testimonial) return;
  const list = document.getElementById("commentsList");
  const modal = document.getElementById("commentsModal");
  const original = document.getElementById("commentsOriginal");
  const score = document.getElementById("commentsScore");
  const count = document.getElementById("commentsCount");
  if (!modal) return;

  const allStars = COMMENTS_DATA.map(c => c.stars);
  const avg = (allStars.reduce((a, b) => a + b, 0) / allStars.length).toFixed(1);
  score.innerHTML = `★ ${avg} · 14 avaliações`;

  original.innerHTML = `
    <div class="testimonial-header">
      <div class="testimonial-avatar ${testimonial.avatarClass}">
        <span class="avatar-fallback">${testimonial.avatarInitial}</span>
      </div>
      <div><strong>${testimonial.name}</strong><div class="stars">${"★".repeat(testimonial.stars || 5)}</div></div>
      <span class="testimonial-time">${testimonial.time}</span>
    </div>
    <p class="testimonial-body">${testimonial.body}</p>
    <div class="testimonial-actions"><span style="font-size:.65rem;color:var(--muted);">♥ ${testimonial.likes || 0} curtidas</span></div>
  `;

  const shuffled = [...COMMENTS_DATA].sort(() => Math.random() - .5).slice(0, 7 + Math.floor(Math.random() * 6));
  count.textContent = `${shuffled.length} comentários`;

  list.innerHTML = shuffled.map(c => `
    <div class="comment-item">
      <div class="comment-avatar ${c.avClass}">${c.initial}</div>
      <div>
        <div class="comment-item-header"><strong>${c.name}</strong><span class="stars">${"★".repeat(c.stars)}</span></div>
        <p>${c.text}</p>
        <div class="comment-item-footer">
          <span class="comment-time">${c.time}</span>
          <button class="comment-like" type="button">♥ <span>${c.likes}</span></button>
        </div>
      </div>
    </div>
  `).join("");

  list.querySelectorAll(".comment-like").forEach(btn => {
    btn.addEventListener("click", () => {
      const span = btn.querySelector("span");
      if (btn.classList.contains("liked")) { btn.classList.remove("liked"); span.textContent = Number(span.textContent) - 1; }
      else { btn.classList.add("liked"); span.textContent = Number(span.textContent) + 1; }
    });
  });

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function setupCommentsModal() {
  const modal = document.getElementById("commentsModal");
  if (!modal) return;
  document.querySelectorAll("[data-close-comments]").forEach(el => el.addEventListener("click", () => {
    modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = "";
  }));
  const submit = document.getElementById("commentSubmit");
  if (submit) submit.addEventListener("click", () => {
    const name = document.getElementById("commentName").value.trim();
    const text = document.getElementById("commentText").value.trim();
    if (!name || !text) { showToast("Preencha nome e comentário"); return; }
    document.getElementById("commentName").value = "";
    document.getElementById("commentText").value = "";
    showToast("Agradecemos pelo seu comentario!");
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
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

  function openDev(e) { e.preventDefault(); modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  document.querySelector(".brand").addEventListener("click", openDev);
  document.getElementById("devLink").addEventListener("click", openDev);

  document.querySelectorAll("[data-close-hub]").forEach(el => el.addEventListener("click", () => {
    modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = "";
  }));

  document.getElementById("devCopyContact").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText("https://andersonhonorato.github.io/meu-portfolio/index.html"); showToast("Contato copiado!"); } catch (_) { showToast("Erro ao copiar"); }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
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

  document.getElementById("faqLink").addEventListener("click", e => { e.preventDefault(); modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; });
  document.querySelectorAll("[data-close-faq]").forEach(el => el.addEventListener("click", () => { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }));
  document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("is-open")) { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; } });
}

function setupTermsModal() {
  const modal = document.getElementById("termsModal");
  if (!modal) return;
  document.getElementById("termsLink").addEventListener("click", e => { e.preventDefault(); modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; });
  document.querySelectorAll("[data-close-terms]").forEach(el => el.addEventListener("click", () => { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }));
  document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("is-open")) { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; } });
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

// ═══ PACKS MODAL ═══
const PACKS_INFO = [
  { icon: "✦", title: "Privacy oficial", summary: "Conteúdo exclusivo para assinantes do Privacy.",
    extended: "No meu Privacy você encontra o conteúdo mais completo e sem censura. Fotos e vídeos que eu não posto em nenhum outro lugar, tudo com qualidade e atualizado com frequência. Assinando, você tem acesso imediato a todo o acervo — uma experiência completa e exclusiva, feita para quem quer ver tudo sem limites.",
    link: APP.privacy, linkLabel: "Acessar Privacy" },
  { icon: "♡", title: "Veja uma prévia", summary: "Clique nos cards abaixo para ver prévias dos meus conteúdos.",
    extended: "Abaixo na seção 'Um gostinho do que te espera' você confere fotos e prévias selecionadas. Mas isso é só a ponta do iceberg — o conteúdo completo vai muito além. Os packs são recheados de material inédito, feito com cuidado e muito tesão. Cada prévia é um convite para algo maior.",
    link: "#previas", linkLabel: "Ver prévias" },
  { icon: "↗", title: "Fale comigo", summary: "Clique no botão de contato para combinar valores e outras informações.",
    extended: "Quer saber valores, combinar packs personalizados ou tirar dúvidas? Me chama no WhatsApp que a gente conversa sem compromisso. Eu mesmo respondo e explico todos os detalhes. Pagamento fácil, entrega rápida e total sigilo. Tudo no privado, do jeito que você prefere.",
    link: `https://wa.me/${APP.whatsapp}?text=Oi%20Mauricio%2C%20quero%20saber%20mais%20sobre%20os%20packs`, linkLabel: "Chamar no WhatsApp" }
];
let packsIndex = 0;

function setupPacksModal() {
  const modal = document.getElementById("packsModal");
  if (!modal) return;
  document.querySelectorAll(".mini-grid article").forEach((article, index) => article.addEventListener("click", () => openPacksModal(index)));
  document.getElementById("packsPrev").addEventListener("click", () => { packsIndex = (packsIndex - 1 + PACKS_INFO.length) % PACKS_INFO.length; updatePacksContent(packsIndex); });
  document.getElementById("packsNext").addEventListener("click", () => { packsIndex = (packsIndex + 1) % PACKS_INFO.length; updatePacksContent(packsIndex); });
  document.querySelectorAll("[data-close-packs]").forEach(el => el.addEventListener("click", () => { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }));
  document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("is-open")) { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; } });
}

function openPacksModal(index) { packsIndex = index; updatePacksContent(index); const m = document.getElementById("packsModal"); m.classList.add("is-open"); m.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }

function updatePacksContent(index) {
  const item = PACKS_INFO[index];
  document.getElementById("packsIcon").textContent = item.icon;
  document.getElementById("packsTitle").textContent = item.title;
  document.getElementById("packsText").textContent = item.summary;
  document.getElementById("packsExtended").innerHTML = `<p>${item.extended}</p><a href="${item.link}" target="_blank" rel="noopener" style="display:inline-flex;margin-top:12px;padding:8px 18px;border-radius:999px;background:var(--ink);color:var(--bg);font-size:.72rem;font-weight:900;">${item.linkLabel}</a>`;
  document.getElementById("packsCounter").textContent = `${index + 1} / ${PACKS_INFO.length}`;
}

// ═══ DEV MODAL ═══
// ═══ DOM READY ═══
document.addEventListener("DOMContentLoaded", () => {
  setupCookies();
  setupTheme();
  setupHeaderBehavior();
  setupCoverSlider();
  renderPreviewCards();
  setupPreviewCarousel();
  setupModal();
  setupShareModal();
  setupPacksModal();
  setupDevModal();
  setupFaqModal();
  setupTermsModal();
  setupCommentsModal();
  setupWhatsAssistant();
  renderTestimonials();
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
      if (sm.classList.contains("is-open")) { sm.classList.remove("is-open"); sm.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
    }
  });
  document.getElementById("unlockAdult").addEventListener("click", () => modal.classList.add("is-unlocked"));
  document.getElementById("photoModalPrev").addEventListener("click", () => openModal((modalIndex - 1 + PREVIEWS.length) % PREVIEWS.length));
  document.getElementById("photoModalNext").addEventListener("click", () => openModal((modalIndex + 1) % PREVIEWS.length));
  document.getElementById("modalShare").addEventListener("click", () => {
    document.getElementById("shareUrlInput").value = window.location.href;
    const sm = document.getElementById("shareModal"); sm.classList.add("is-open"); sm.setAttribute("aria-hidden", "false");
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
  modal.classList.remove("is-unlocked"); modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("photoModal");
  modal.classList.remove("is-open", "is-unlocked"); modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
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
    input.value = window.location.href; modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
  });
  document.querySelectorAll("[data-close-share]").forEach(el => el.addEventListener("click", () => { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }));
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

  function renderHistory() {
    body.innerHTML = "";
    chatHistory.forEach(m => {
      if (m.type === "msg") {
        const div = document.createElement("div");
        div.className = "wa-msg " + (m.cls || "ia");
        div.innerHTML = (m.text || "") + `<span class="time">${m.time || ""}</span>`;
        body.appendChild(div);
      } else if (m.type === "card") {
        const div = document.createElement("div");
        div.className = "wa-msg card";
        div.innerHTML = `<strong>${m.title}</strong><small>${m.sub}</small><span class="time">${m.time || ""}</span>`;
        if (m.link) div.addEventListener("click", () => { if (m.link.startsWith("http")) window.open(m.link, "_blank"); });
        body.appendChild(div);
      }
    });
    body.scrollTop = body.scrollHeight;
  }

  function appendBubble(text, cls, time, persist = true) {
    const div = document.createElement("div");
    div.className = "wa-msg " + cls;
    if (cls === "ia") {
      div.innerHTML = `<span class="cursor">|</span>`;
      body.appendChild(div); body.scrollTop = body.scrollHeight;
      let j = 0;
      function type() {
        if (j < text.length) {
          div.innerHTML = text.slice(0, j + 1) + (j < text.length - 1 ? "<span class='cursor'>|</span>" : `<span class="time">${time || now()}</span>`);
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
      div.innerHTML = text + `<span class="time">${time || now()}</span>`;
      body.appendChild(div); body.scrollTop = body.scrollHeight;
      if (persist) { chatHistory.push({ type: "msg", text, cls, time: time || now() }); saveChat(); }
    }
  }

  function appendCard(title, sub, link, time, persist = true) {
    const div = document.createElement("div");
    div.className = "wa-msg card";
    div.innerHTML = `<strong>${title}</strong><small>${sub}</small><span class="time">${time || now()}</span>`;
    if (link) div.addEventListener("click", () => { if (link.startsWith("http")) window.open(link, "_blank"); });
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
    options.innerHTML = pool.map(label => {
      const l = label.toLowerCase();
      const key = l.includes("pack") ? "packs" : l.includes("valor") || l.includes("custa") ? "valores" : l.includes("conteudo") || l.includes("foto") ? "conteudo" : l.includes("programa") || l.includes("encontro") ? "gp" : l.includes("privacidade") || l.includes("comprar") ? "privacidade" : l.includes("criou") || l.includes("site") ? "dev" : l.includes("falar") || l.includes("mauricio") ? "falar" : "previas";
      return `<button data-wa="${key}">${label}</button>`;
    }).join("");
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
  function showNextAutoMessage() {
    if (chatOpen || assistant.classList.contains("is-visible")) return;
    const msg = WA_MESSAGES[waMessageIndex % WA_MESSAGES.length];
    body.innerHTML = "";
    const div = document.createElement("div");
    div.className = "wa-msg auto";
    div.innerHTML = msg.text + `<span class="time">${now()}</span>`;
    body.appendChild(div);
    options.innerHTML = "";
    const inputWrap = document.querySelector(".wa-chat-input");
    const floatWrap = document.querySelector(".wa-chat-float");
    if (inputWrap) inputWrap.style.display = "none";
    if (floatWrap) floatWrap.style.display = "none";
    assistant.classList.add("is-visible");
    waMessageIndex++;
    waAutoHideTimer = setTimeout(() => { assistant.classList.remove("is-visible"); waRepeatTimer = setTimeout(showNextAutoMessage, 3 * 60 * 1000); }, 12000);
  }

  /* Interactive */
  document.querySelector(".whatsapp-float").addEventListener("click", e => {
    e.preventDefault();
    chatOpen = true;
    assistant.classList.remove("is-visible");
    clearTimeout(waAutoHideTimer); clearTimeout(waRepeatTimer);
    setTimeout(() => {
      body.innerHTML = "";
      assistant.classList.add("is-visible");
      document.querySelector(".wa-chat-input").style.display = "flex";
      document.querySelector(".wa-chat-float").style.display = "";
      loadChat();
      chatHistory.length ? renderHistory() : appendBubble("Olá! Sou a Drew IA, assistente do Mauricio. Como posso ajudar?", "ia");
      renderOptions();
    }, 200);
  });

  close.addEventListener("click", () => { chatOpen = false; assistant.classList.remove("is-visible"); waRepeatTimer = setTimeout(showNextAutoMessage, 2 * 60 * 1000); });

  send.addEventListener("click", () => {
    const msg = input.value.trim(); if (!msg) return;
    appendBubble(msg, "user"); input.value = ""; handleText(msg);
  });

  input.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); send.click(); } });

  setTimeout(showNextAutoMessage, 10000);
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
function whatsLink(context) {
  return `https://wa.me/${APP.whatsapp}?text=${encodeURIComponent(`Oi Mauricio, quero saber mais sobre ${context} e os packs de conteúdo.`)}`;
}

function showConfirm(text, onYes) {
  const modal = document.getElementById("confirmModal");
  document.getElementById("confirmText").textContent = text;
  modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false");

  function close() { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); }

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
