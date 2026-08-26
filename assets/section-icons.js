(() => {
  const INK = '#29292d';
  const PAPER = '#f7f1e8';
  const SAND = '#ddc69f';
  const ORANGE = '#df6837';

  const svg = (body, viewBox = '0 0 100 100') => `
    <svg viewBox="${viewBox}" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      ${body}
    </svg>`;

  const ICONS = {
    'World': svg(`
      <circle cx="50" cy="50" r="45" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
      <path d="M30 22c6-5 13-8 21-9l-2 7-8 4-3 7-8 3-5-5 5-7Zm31-6 12 7 7 9-5 3-6-2-5 5-7-1-3-6 5-4 2-11ZM20 43l9 2 5 6-2 8 8 8 1 9-6 2-8-8-5-11-4-9 2-7Zm35 4 9-5 10 3 7 8-3 7-8 3-4 10-8 7-7-5 2-8-5-6 1-8 6-6Z" fill="${INK}"/>
    `),

    'Science': svg(`
      <g fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
        <path d="M34 12h32M42 14v28L24 78c-2 4 1 8 6 8h40c5 0 8-4 6-8L58 42V14"/>
      </g>
      <circle cx="42" cy="65" r="7" fill="${ORANGE}"/>
      <circle cx="59" cy="73" r="5" fill="${ORANGE}"/>
      <circle cx="57" cy="56" r="4" fill="${ORANGE}"/>
      <path d="M64 49c7-7 17-6 22 0 5 7 2 16-6 20" fill="none" stroke="${SAND}" stroke-width="7" stroke-linecap="round"/>
      <path d="M72 43v8M84 51l-7 4M82 66l-8-3M69 75l-3-7" fill="none" stroke="${SAND}" stroke-width="5" stroke-linecap="round"/>
    `),

    'Society & Human Behavior': svg(`
      <circle cx="47" cy="52" r="34" fill="${PAPER}"/>
      <path d="M28 48c3-7 10-7 14 0M53 48c3-7 10-7 14 0" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <path d="M31 61c5 15 27 17 34 0Z" fill="${INK}"/>
      <path d="M73 17l4-10M83 24l9-7M87 36l11-1" stroke="${ORANGE}" stroke-width="6" stroke-linecap="round"/>
    `),

    'History & Culture': svg(`
      <rect x="20" y="13" width="60" height="8" rx="2" fill="${SAND}"/>
      <rect x="23" y="79" width="54" height="8" rx="2" fill="${INK}"/>
      <rect x="27" y="72" width="46" height="7" rx="2" fill="${INK}"/>
      <path d="M29 26c0-4 3-7 7-7h28c4 0 7 3 7 7v2H29v-2Z" fill="${INK}"/>
      <path d="M31 30c6 0 9 4 9 10v29h-8V43c0-5-2-8-6-9l5-4Zm18 0h8v39h-8V30Zm20 0 5 4c-4 1-6 4-6 9v26h-8V40c0-6 3-10 9-10Z" fill="${INK}"/>
      <path d="M32 33c3 0 6 3 6 6s-3 6-6 6M68 33c-3 0-6 3-6 6s3 6 6 6" fill="none" stroke="${PAPER}" stroke-width="3"/>
    `),

    'Ideas': svg(`
      <path d="M50 12c-19 0-31 14-31 31 0 12 6 19 14 27 4 4 5 8 5 12h24c0-4 1-8 5-12 8-8 14-15 14-27 0-17-12-31-31-31Z" fill="${ORANGE}"/>
      <path d="M40 81h20M41 88h18M45 94h10" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <path d="M42 68V45c0-4 6-4 6 0v23M58 68V45c0-4-6-4-6 0v23" fill="none" stroke="${PAPER}" stroke-width="4" stroke-linecap="round"/>
      <path d="M50 4V0M20 14l-6-6M80 14l6-6M8 42H0M92 42h8" stroke="${SAND}" stroke-width="5" stroke-linecap="round"/>
    `),

    'Outside the Bubble': svg(`
      <rect x="14" y="18" width="72" height="67" rx="3" fill="${PAPER}" stroke="${SAND}" stroke-width="3"/>
      <rect x="11" y="12" width="78" height="16" rx="3" fill="${INK}"/>
      <rect x="34" y="48" width="34" height="21" rx="3" fill="none" stroke="${INK}" stroke-width="5"/>
      <path d="M43 56h16M43 62h12" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    `),

    'Small Things Worth Knowing': svg(`
      <circle cx="50" cy="50" r="43" fill="${SAND}" opacity=".72"/>
      <path d="M34 22h32c3 0 5 2 5 5v52L50 65 29 79V27c0-3 2-5 5-5Z" fill="${INK}"/>
    `),

    'Worth Your Time': svg(`
      <circle cx="50" cy="50" r="43" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
      <path d="M50 13v8M50 79v8M13 50h8M79 50h8" stroke="${SAND}" stroke-width="5" stroke-linecap="round"/>
      <path d="M50 50 66 37M50 50 38 39" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="50" cy="50" r="6" fill="${ORANGE}"/>
    `),
  };

  const style = document.createElement('style');
  style.textContent = `
    .section-head h2,.worth h2{display:flex;align-items:center;gap:11px}
    .me-section-icon{display:inline-flex;align-items:center;justify-content:center;width:43px;height:43px;flex:0 0 43px;line-height:0}
    .me-section-icon svg{display:block;width:100%;height:100%;overflow:visible}
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
      const icon = ICONS[title];
      if (!icon) return;
      const span = document.createElement('span');
      span.className = 'me-section-icon';
      span.setAttribute('aria-hidden', 'true');
      span.innerHTML = icon;
      h2.prepend(span);
    });
  }

  const content = document.getElementById('content');
  applyIcons();
  if (content) {
    new MutationObserver(() => applyIcons(content)).observe(content, {childList:true, subtree:true});
  }
})();
