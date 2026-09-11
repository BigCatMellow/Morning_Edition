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
    .reader-frame{overflow:hidden}
    .reader-top{z-index:10!important;background:#fbfaf6!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
    .reader-triangulation-note{margin:7px 0 16px!important;padding:11px 13px;border-left:3px solid var(--accent-2);background:#f3efe7;color:#514a41!important;font-size:.9rem!important;line-height:1.55!important}
    .reader-supporting-sources li:first-child{padding-bottom:10px;border-bottom:1px solid #ddd5c8}
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

  function isPhilosophyReader(root) {
    const meta = root.querySelector('.reader-meta');
    if (!meta) return false;
    const text = meta.textContent.toLowerCase();
    return /(philosoph|ethics|moral psychology|political thought|political theory|social theory|intellectual history|book review|essay)/.test(text);
  }

  function enhanceSourceTriangulation(root = document) {
    const reader = root.querySelector ? root.querySelector('#readerContent') : null;
    if (!reader || !reader.children.length) return;
    const list = reader.querySelector('.reader-supporting-sources');
    if (!list || list.dataset.meTriangulation === '1') return;

    const heading = list.previousElementSibling;
    if (heading && heading.tagName === 'H2') heading.textContent = 'Source triangulation';

    const sourceBox = reader.querySelector('.reader-source-box');
    const sourceName = sourceBox && sourceBox.querySelector('strong') ? sourceBox.querySelector('strong').textContent.trim() : '';
    const sourceLink = sourceBox ? sourceBox.querySelector('a[href]') : null;
    if (sourceName && sourceLink) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = sourceLink.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = sourceName;
      const role = document.createElement('span');
      role.className = 'reader-source-role';
      role.textContent = 'Primary displayed article';
      li.append(a, role);
      list.prepend(li);
    }

    [...list.children].forEach((li, index) => {
      if (index === 0 && sourceName && sourceLink) return;
      if (li.querySelector('.reader-source-role')) return;
      const role = document.createElement('span');
      role.className = 'reader-source-role';
      role.textContent = 'Supporting verification / context';
      li.appendChild(role);
    });

    const note = document.createElement('p');
    note.className = 'reader-triangulation-note';
    note.textContent = 'Morning Edition compared the displayed article with additional reporting or primary evidence. Source roles are shown so you can see how the account was checked.';
    list.before(note);
    list.dataset.meTriangulation = '1';
  }

  function adaptReaderLabels(root = document) {
    const reader = root.querySelector ? root.querySelector('#readerContent') : null;
    if (!reader || !reader.children.length || !isPhilosophyReader(reader)) return;

    const replacements = {
      'The story': 'The question & argument',
      'Background': 'Intellectual background',
      'The bigger picture': 'Where it sits in the debate',
      'Key points': 'Argument map',
      'What this could mean': 'What follows if it is right',
      'What remains uncertain': 'Strongest objections & limits',
      'What to watch next': 'Questions to carry forward',
      'Connections': 'Connections & comparisons',
      'Sources used for context': 'Further reading & sources'
    };

    reader.querySelectorAll('h2').forEach(h2 => {
      const replacement = replacements[h2.textContent.trim()];
      if (replacement) h2.textContent = replacement;
    });

    const assessment = reader.querySelector('.reader-assessment-label');
    if (assessment) assessment.textContent = 'Why this argument is worth your time';

    const modalLabel = document.querySelector('.reader-label');
    if (modalLabel) modalLabel.textContent = 'Morning Edition · Ideas Deep Read';
  }

  function resetReaderLabel() {
    const modalLabel = document.querySelector('.reader-label');
    if (modalLabel) modalLabel.textContent = 'Morning Edition Deep Read';
  }

  // JSON does not permit literal line breaks inside quoted strings. A single
  // accidental return used to make the entire reader pack fail, which removed
  // every Continue Reading button. This fallback repairs only those raw control
  // characters while leaving otherwise valid JSON untouched.
  function escapeRawControlCharsInStrings(text) {
    let out = '', inString = false, escaped = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (!inString) {
        out += ch;
        if (ch === '"') inString = true;
        continue;
      }
      if (escaped) {
        out += ch;
        escaped = false;
      } else if (ch === '\\') {
        out += ch;
        escaped = true;
      } else if (ch === '"') {
        out += ch;
        inString = false;
      } else if (ch === '\n') {
        out += '\\n';
      } else if (ch === '\r') {
        if (text[i + 1] === '\n') i++;
        out += '\\n';
      } else if (ch === '\t') {
        out += '\\t';
      } else {
        out += ch;
      }
    }
    return out;
  }

  async function loadJsonTolerant(path) {
    const res = await fetch(`${path}?v=${Date.now()}`, {cache:'no-store'});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (firstError) {
      return JSON.parse(escapeRawControlCharsInStrings(text));
    }
  }

  let readerRecoveryInFlight = false;
  let readerRecoveryDoneFor = '';

  async function recoverMissingReaderButtons() {
    if (readerRecoveryInFlight) return;
    if (document.querySelector('.reader-button')) return;

    const status = document.getElementById('status');
    const match = status && status.textContent.match(/\b(\d{4}-\d{2}-\d{2})\b/);
    const date = match ? match[1] : '';
    if (!date || readerRecoveryDoneFor === date) return;
    if (typeof applyReaderPack !== 'function' || typeof render !== 'function') return;

    readerRecoveryInFlight = true;
    try {
      const [edition, pack] = await Promise.all([
        loadJsonTolerant(`data/archive/${date}.json`),
        loadJsonTolerant(`data/readers/${date}.json`)
      ]);
      if (!pack || !pack.readers || !Object.keys(pack.readers).length) return;
      applyReaderPack(edition, pack);
      const hasReader = [edition.lead_story, ...(edition.sections || []).flatMap(s => s.items || []), ...(edition.worth_your_time || [])]
        .some(story => story && story.reader);
      if (!hasReader) return;
      readerRecoveryDoneFor = date;
      render(edition);
    } catch (error) {
      console.warn('Morning Edition reader recovery failed', error);
    } finally {
      readerRecoveryInFlight = false;
    }
  }

  const content = document.getElementById('content');
  const readerContent = document.getElementById('readerContent');
  applyIcons();
  if (content) {
    let recoveryTimer = null;
    new MutationObserver(() => {
      applyIcons(content);
      clearTimeout(recoveryTimer);
      recoveryTimer = setTimeout(recoverMissingReaderButtons, 80);
    }).observe(content, {childList:true, subtree:true});
    setTimeout(recoverMissingReaderButtons, 250);
  }
  if (readerContent) {
    // Only observe replacement of the reader's top-level contents. Watching the
    // full subtree caused our own heading relabels to retrigger this observer.
    new MutationObserver(() => {
      resetReaderLabel();
      enhanceSourceTriangulation(document);
      adaptReaderLabels(document);
    }).observe(readerContent, {childList:true});
  }
})();