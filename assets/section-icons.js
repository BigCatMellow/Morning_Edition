(() => {
  const ICONS = {
    'World': 'assets/section-icons/world.svg',
    'Science': 'assets/section-icons/science.svg',
    'Society & Human Behavior': 'assets/section-icons/happy.svg',
    'History & Culture': 'assets/section-icons/philosophy.svg',
    'Ideas': 'assets/section-icons/lightbulb.svg',
    'Outside the Bubble': 'assets/section-icons/box.svg',
    'Small Things Worth Knowing': 'assets/section-icons/bookmark.svg',
    'Worth Your Time': 'assets/section-icons/clock.svg'
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

  function applyIcons(root = document) {
    root.querySelectorAll('.section-head h2, .worth h2').forEach(h2 => {
      if (h2.querySelector('.me-section-icon')) return;
      const title = h2.textContent.trim();
      const src = ICONS[title];
      if (!src) return;
      const img = document.createElement('img');
      img.className = 'me-section-icon';
      img.src = src;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      h2.prepend(img);
    });
  }

  const content = document.getElementById('content');
  applyIcons();
  if (content) {
    new MutationObserver(() => applyIcons(content)).observe(content, {childList:true, subtree:true});
  }
})();