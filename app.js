/* ══════════════════════════════════════
   LA NEGRA BOUTIQUE — app.js
   ══════════════════════════════════════ */

const products = [
  { ref: "PA173-002",  name: "Panty de la fortuna tipo boxer",                      type: "boxer",      sizes: ["TM"],       img: "product01.jpg",  new: false },
  { ref: "MJ100-066",  name: "Hipster confeccionada en algodón acanalado",           type: "hipster",    sizes: ["TS"],        img: "product02.jpg",  new: false },
  { ref: "EM263-001",  name: "Panty hipster confeccionado en encaje",                type: "hipster",    sizes: ["TS"],        img: "product03.jpg",  new: false },
  { ref: "EM107-029",  name: "Panty hipster fabricado en encaje delicado",           type: "hipster",    sizes: ["TM","TXL"],  img: "product04.jpg",  new: false },
  { ref: "MJ149-069B", name: "Panty tipo brasilera invisible en microfibra",         type: "brasilera",  sizes: ["TM"],        img: "product05.jpg",  new: false },
  { ref: "943P",       name: "Panty moldeador premium",                              type: "moldeador",  sizes: ["TL","TXL"],  img: "product06.jpg",  new: false },
  { ref: "MJ149-070B", name: "Brasilera invisible confeccionada en microfibra",      type: "brasilera",  sizes: ["TS"],        img: "product07.jpg",  new: false },
  { ref: "PL08-046",   name: "Brasilera confeccionada en encaje",                    type: "brasilera",  sizes: ["TS"],        img: "product09.jpg",  new: false },
  { ref: "T142",       name: "Hipster confeccionado en algodón para adolescentes",   type: "hipster",    sizes: ["TS"],        img: "product10.jpg",  new: false },
  { ref: "EM107-030",  name: "Panty hipster fabricado en microfibra satinada",       type: "hipster",    sizes: ["TM"],        img: "product12.jpg",  new: false },
  { ref: "MJ149-078",  name: "Panty tipo tanga elaborado en microfibra satinada",    type: "tanga",      sizes: ["TM"],        img: "product13.jpg",  new: false },
  { ref: "943P",       name: "Panty moldeador premium rosado",                       type: "moldeador",  sizes: ["TL"],        img: "product14.png",  new: false },
  { ref: "EM107-031",  name: "Hipster fabricado en microfibra con efecto satinado",  type: "hipster",    sizes: ["TL", "TM", "TXL"],        img: "product15.png",  new: false },
  { ref: "A346",       name: "Brasilera con ajuste comodo confeccionado en algodón", type: "hipster",    sizes: ["TS"],        img: "product16.png",  new: false },
];

function renderCards(list) {
  const catalog = document.getElementById('catalog');
  catalog.innerHTML = '';

  list.forEach((p, i) => {
    const sizeBadges = p.sizes.map(s => `<span class="card-size">${s}</span>`).join('');
    const newBadge   = p.new ? `<span class="tag new">Nuevo</span>` : '';
    const imgContent = `<img src="${p.img}" alt="${p.name}" class="card-photo" loading="lazy">`;

    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.type = p.type;
    card.style.animationDelay = (i * 0.05) + 's';

    card.innerHTML = `
      <div class="card-img">
        ${imgContent}
        <div class="card-tags">${newBadge}</div>
        <button class="card-wish" title="Agregar a favoritos">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5
                     C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08
                     C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5
                     c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"/>
          </svg>
        </button>
        <div class="card-overlay">
          <span class="card-overlay-text">Ver detalle →</span>
        </div>
      </div>
      <div class="card-body">
        <div class="card-ref">${p.ref}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-meta">${sizeBadges}</div>
      </div>
    `;

    catalog.appendChild(card);
  });
}

function filter(type, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filtered = type === 'all' ? products : products.filter(p => p.type === type);
  renderCards(filtered);
}

renderCards(products);

/* ══════════════════════════════════════
   PARTÍCULAS DORADAS — HERO
   ══════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['#c9a244', '#b8882a', '#7ec8ba', '#4aab96'];
  const COUNT  = 38;

  function spawn(init) {
    const side = Math.random() < 0.5;
    const x = side
      ? Math.random() * canvas.width * 0.28
      : canvas.width * 0.72 + Math.random() * canvas.width * 0.28;
    return {
      x,
      y:            init ? Math.random() * canvas.height : canvas.height + 10,
      r:            Math.random() * 1.2 + 0.2,
      speed:        Math.random() * 0.3 + 0.1,
      drift:        (Math.random() - 0.5) * 0.2,
      alpha:        Math.random() * 0.28 + 0.06,
      color:        COLORS[Math.floor(Math.random() * COLORS.length)],
      twinkle:      Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.008
    };
  }

  const particles = Array.from({ length: COUNT }, () => spawn(true));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y       -= p.speed;
      p.x       += p.drift;
      p.twinkle += p.twinkleSpeed;
      const a = p.alpha * (0.7 + 0.3 * Math.sin(p.twinkle));
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
      grd.addColorStop(0,   p.color + 'cc');
      grd.addColorStop(0.5, p.color + '44');
      grd.addColorStop(1,   p.color + '00');
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.globalAlpha = a * 1.2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      if (p.y < -10 || p.x < -20 || p.x > canvas.width + 20) {
        Object.assign(p, spawn(false));
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  draw();
})();