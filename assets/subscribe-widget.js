(() => {
  const ENDPOINT = 'https://wesrdkorcqheijqkcqfv.supabase.co/functions/v1/morning-edition-subscribe';

  const css = `
    .subscribe-button{border:1px solid var(--rule);background:transparent;color:var(--ink);padding:8px 12px;cursor:pointer;text-transform:uppercase;letter-spacing:.06em;font-size:.72rem;font-weight:700}
    .subscribe-button:hover{border-color:var(--ink)}
    .subscribe-backdrop{position:fixed;inset:0;background:rgba(27,23,19,.56);opacity:0;pointer-events:none;transition:opacity .18s;z-index:60}
    .subscribe-backdrop.open{opacity:1;pointer-events:auto}
    .subscribe-modal{position:fixed;inset:0;display:none;z-index:61;align-items:center;justify-content:center;padding:20px}
    .subscribe-modal.open{display:flex}
    .subscribe-card{width:min(520px,100%);background:#fbfaf6;border:1px solid #d6cfc2;box-shadow:0 22px 70px rgba(0,0,0,.28);padding:28px}
    .subscribe-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:16px}
    .subscribe-head h2{font-family:var(--display);font-size:2rem;line-height:1.05;margin:0}
    .subscribe-close{border:0;background:transparent;font-size:1.6rem;line-height:1;cursor:pointer;color:var(--muted);padding:0}
    .subscribe-card p{margin:0 0 18px;color:#4b453e;line-height:1.6}
    .subscribe-card label.email-label{display:block;font-size:.75rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:7px;color:var(--muted)}
    .subscribe-card input[type=email]{width:100%;border:1px solid var(--rule);background:#fffdf8;color:var(--ink);font:inherit;font-size:1rem;padding:12px 13px;outline:none}
    .subscribe-card input[type=email]:focus{border-color:var(--ink)}
    .subscribe-consent{display:flex;align-items:flex-start;gap:10px;margin:15px 0 18px;font-size:.88rem;line-height:1.45;color:#4b453e}
    .subscribe-consent input{margin-top:.2em;flex:none}
    .subscribe-submit{border:0;background:var(--ink);color:var(--paper);padding:11px 15px;cursor:pointer;text-transform:uppercase;letter-spacing:.07em;font-size:.76rem;font-weight:800}
    .subscribe-submit:disabled{opacity:.55;cursor:wait}
    .subscribe-message{min-height:1.4em;margin-top:13px!important;font-size:.87rem!important;color:var(--muted)!important}
    .subscribe-message.error{color:var(--accent)!important}
    .subscribe-hp{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;overflow:hidden!important}
    @media(max-width:540px){.subscribe-card{padding:24px 20px}.subscribe-head h2{font-size:1.8rem}footer{align-items:center}.subscribe-button{padding:8px 10px}}
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const footer = document.querySelector('footer');
  if (!footer) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'subscribe-button';
  button.textContent = 'Subscribe';
  footer.appendChild(button);

  const backdrop = document.createElement('div');
  backdrop.className = 'subscribe-backdrop';
  backdrop.id = 'subscribeBackdrop';

  const modal = document.createElement('section');
  modal.className = 'subscribe-modal';
  modal.id = 'subscribeModal';
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-modal','true');
  modal.setAttribute('aria-hidden','true');
  modal.setAttribute('aria-label','Subscribe to Morning Edition');
  modal.innerHTML = `
    <div class="subscribe-card">
      <div class="subscribe-head">
        <h2>Get Morning Edition by email</h2>
        <button type="button" class="subscribe-close" aria-label="Close subscription form">×</button>
      </div>
      <p>A new Morning Edition is published each morning. Subscribe to receive the edition by email.</p>
      <form id="subscribeForm" novalidate>
        <label class="email-label" for="subscribeEmail">Email address</label>
        <input id="subscribeEmail" name="email" type="email" autocomplete="email" inputmode="email" required placeholder="you@example.com">
        <div class="subscribe-hp" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
        <label class="subscribe-consent"><input id="subscribeConsent" name="consent" type="checkbox" required><span>I give permission to receive Morning Edition emails at this address. I understand I can unsubscribe at any time.</span></label>
        <button class="subscribe-submit" type="submit">Subscribe</button>
        <p id="subscribeMessage" class="subscribe-message" role="status" aria-live="polite"></p>
      </form>
    </div>`;

  document.body.append(backdrop, modal);

  const close = () => {
    modal.classList.remove('open');
    backdrop.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('reader-open');
  };
  const open = () => {
    modal.classList.add('open');
    backdrop.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('reader-open');
    setTimeout(() => modal.querySelector('#subscribeEmail')?.focus(), 0);
  };

  button.addEventListener('click', open);
  backdrop.addEventListener('click', close);
  modal.querySelector('.subscribe-close').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });

  const form = modal.querySelector('#subscribeForm');
  const submit = modal.querySelector('.subscribe-submit');
  const message = modal.querySelector('#subscribeMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.classList.remove('error');
    message.textContent = '';
    const email = form.email.value.trim();
    const consent = form.consent.checked;
    if (!email || !form.email.checkValidity()) {
      message.textContent = 'Enter a valid email address.';
      message.classList.add('error');
      form.email.focus();
      return;
    }
    if (!consent) {
      message.textContent = 'Please confirm that you agree to receive Morning Edition emails.';
      message.classList.add('error');
      form.consent.focus();
      return;
    }

    submit.disabled = true;
    submit.textContent = 'Subscribing…';
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, consent, website: form.website.value || '' })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Subscription failed.');
      message.textContent = data.message || 'You’re subscribed to Morning Edition.';
      form.reset();
      submit.textContent = 'Subscribed';
      setTimeout(() => { submit.textContent = 'Subscribe'; submit.disabled = false; }, 1800);
    } catch (err) {
      message.textContent = err?.message || 'Could not subscribe right now. Please try again.';
      message.classList.add('error');
      submit.textContent = 'Subscribe';
      submit.disabled = false;
    }
  });
})();
