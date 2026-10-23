/* ============================================================
   0. LUCIDE ICONS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
});

/* ============================================================
   1. CURSOR CUSTOMIZADO
   ============================================================ */
const cursor = document.querySelector('.cursor');
if (window.matchMedia('(pointer:fine)').matches && cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  const growEls = 'a, button, .fruta, .foto, .sticker-center, .basket-center, .stat, .socials a';
  document.querySelectorAll(growEls).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });
}

/* ============================================================
   2. NAV — fundo ao rolar
   ============================================================ */
const nav = document.getElementById('nav');
const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ============================================================
   3. MENU MOBILE
   ============================================================ */
const menuBtn    = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileMenu.setAttribute('aria-hidden', !open);
    document.body.classList.toggle('no-scroll', open);

    menuBtn.innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`;
    if (window.lucide) lucide.createIcons();
  });

  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', false);
    menuBtn.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('no-scroll');
    menuBtn.innerHTML = `<i data-lucide="menu"></i>`;
    if (window.lucide) lucide.createIcons();
  }));
}

/* ============================================================
   4. PARALLAX DAS FRUTAS NO HERO
   ============================================================ */
const parallaxEls = document.querySelectorAll('[data-parallax]');
if (window.matchMedia('(pointer:fine)').matches && parallaxEls.length) {
  let raf = null;
  document.addEventListener('mousemove', e => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      parallaxEls.forEach(el => {
        const d = parseFloat(el.dataset.parallax) || 10;
        el.style.transform = `translate(${x * d}px, ${y * d}px)`;
      });
      raf = null;
    });
  });
}

/* ============================================================
   5. REVEAL ON SCROLL
   ============================================================ */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ============================================================
   6. CONFETES DE FRUTA 🍉🍓🍊
   ============================================================ */
const FRUIT_EMOJIS = ['🍉','🍊','🍓','🍋','🍇','🥝','🍍','🍎','🍌','🥭','🍑','🫐'];

function burstFruits(x, y, count = 14) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    el.textContent = FRUIT_EMOJIS[Math.floor(Math.random() * FRUIT_EMOJIS.length)];
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const dist  = 70 + Math.random() * 140;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;
    const rot   = (Math.random() - 0.5) * 720;
    const dur   = 900 + Math.random() * 700;

    el.animate(
      [
        { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', opacity: 1 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0.3) rotate(${rot}deg)`, opacity: 0 }
      ],
      { duration: dur, easing: 'cubic-bezier(.2,.8,.3,1)' }
    );
    setTimeout(() => el.remove(), dur + 100);
  }
}

document.querySelectorAll('.fruta').forEach(card => {
  card.addEventListener('click', () => {
    const rect = card.getBoundingClientRect();
    burstFruits(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
  });
});

const stickerCenter = document.getElementById('stickerCenter');
if (stickerCenter) {
  stickerCenter.addEventListener('click', () => {
    const rect = stickerCenter.getBoundingClientRect();
    burstFruits(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
    stickerCenter.animate(
      [
        { transform: 'scale(1) rotate(0deg)' },
        { transform: 'scale(1.3) rotate(360deg)' },
        { transform: 'scale(1) rotate(360deg)' }
      ],
      { duration: 700, easing: 'cubic-bezier(.34,1.56,.64,1)' }
    );
  });
}

document.querySelectorAll('.foto').forEach(foto => {
  foto.addEventListener('click', e => {
    burstFruits(e.clientX, e.clientY, 10);
  });
});

/* ============================================================
   7. SELO CENTRAL ROTATIVO
   ============================================================ */
const stickerFruits = ['🍉','🍊','🍓','🍋','🍇','🥝','🍍'];
let stickerIdx = 0;
if (stickerCenter) {
  setInterval(() => {
    stickerIdx = (stickerIdx + 1) % stickerFruits.length;
    stickerCenter.textContent = stickerFruits[stickerIdx];
  }, 3200);
}

/* ============================================================
   8. FORM → WHATSAPP
   ============================================================ */
const WA_NUMBER = '5511999999999';
const form = document.getElementById('form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.nome.value.trim() || !form.msg.value.trim()) {
      (!form.nome.value.trim() ? form.nome : form.msg).focus();
      return;
    }
    const texto = `Olá, Cortefruts! Meu nome é ${form.nome.value}.` +
                  (form.evento.value ? ` Quero: ${form.evento.value}.` : '') +
                  ` ${form.msg.value}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(texto)}`, '_blank');
  });
}

/* ============================================================
   9. BOLHA DO WHATSAPP
   ============================================================ */
const waBubble = document.getElementById('waBubble');
if (waBubble) {
  setTimeout(() => waBubble.classList.add('show'), 3500);
  setTimeout(() => waBubble.classList.remove('show'), 11000);
}

/* ============================================================
   10. ANO NO FOOTER
   ============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();