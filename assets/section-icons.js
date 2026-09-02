(() => {
  const RAW = 'https://raw.githubusercontent.com/BigCatMellow/Morning_Edition/main/assets/section-icons/';
  const ICONS = {
    'Front Page': RAW + 'MEicon2.svg',
    'World': RAW + 'world.svg',
    'Science': RAW + 'science.svg',
    'Society & Human Behavior': RAW + 'happy.svg',
    'History & Culture': RAW + 'philosophy.svg',
    'Ideas': RAW + 'lightbulb.svg',
    'In Case You Missed It': RAW + 'clock.svg',
    'Outside the Bubble': RAW + 'box.svg',
    'Small Things Worth Knowing': RAW + 'bookmark.svg',
    'One Thing to Think About': RAW + 'lightbulb.svg',
    'Worth Your Time': RAW + 'clock.svg'
  };

  const style = document.createElement('style');
  style.textContent = `
    .section-head h2,.worth h2{display:flex;align-items:center;gap:11px}
    .me-section-icon{display:block;width:43px;height:43px;flex:0 0 43px;object-fit:contain}
    .worth .me-section-icon{width:48px;height:48px;flex-basis:48px}
    @media(max-width:540px){
      .section-head h2,.worth h2{gap:9px}
      .me-section-icon{width:36px;height:36px;flex-basis:36px}
      .worth .me-section-icon{width:40px;height:40px;flex-basis:40px}
    }
  `;
  document.head.appendChild(style);

  const pending = new Map();
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const img = entry.target;
      const src = pending.get(img);
      if (src) {
        img.src = src;
        pending.delete(img);
      }
      observer.unobserve(img);
    }
  }, {rootMargin:'240px 0px'}) : null;

  function queueImage(img, src){
    img.alt = '';
    img.setAttribute('aria-hidden','true');
    img.decoding = 'async';
    if (observer) {
      pending.set(img, src);
      observer.observe(img);
    } else {
      img.src = src;
    }
  }

  function applyIcons(root = document) {
    root.querySelectorAll('.section-head h2, .worth h2').forEach(h2 => {
      if (h2.querySelector('.me-section-icon')) return;
      const title = h2.textContent.trim();
      const src = ICONS[title];
      if (!src) return;
      const img = document.createElement('img');
      img.className = 'me-section-icon';
      queueImage(img, src);
      h2.prepend(img);
    });
  }

  const content = document.getElementById('content');
  applyIcons();
  if (content) {
    new MutationObserver(() => applyIcons(content)).observe(content, {childList:true, subtree:true});
  }
})();