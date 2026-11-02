/* Optional editorial features. Legacy archives render without them. */
(function(global){
  'use strict';
  function renderWonder(value, esc, safeUrl){
    if(!value || typeof value!=='object')return '';
    const image=safeUrl(value.image_url),original=safeUrl(value.source_url);
    if(!image || !original || !value.title || !value.caption || !value.credit || !value.alt)return '';
    const rights=String(value.rights||'').trim();
    const credit=[value.credit,rights].filter(Boolean).map(esc).join(' · ');
    const imageHtml='<a href="'+esc(original)+'" target="_blank" rel="noopener noreferrer" aria-label="View original image and attribution"><img loading="lazy" decoding="async" src="'+esc(image)+'" alt="'+esc(value.alt)+'"></a>';
    return '<section class="daily-wonder" id="daily-wonder" aria-labelledby="wonder-heading">'+
      '<div class="feature-kicker">The Daily Wonder · A visual discovery</div>'+
      '<figure class="wonder-photo">'+imageHtml+'<figcaption>'+credit+'</figcaption></figure>'+
      '<div class="wonder-text"><h2 id="wonder-heading">'+esc(value.title)+'</h2><div class="wonder-copy"><p>'+esc(value.caption)+'</p>'+
      '<a href="'+esc(original)+'" target="_blank" rel="noopener noreferrer">Explore the original photograph or artwork →</a></div></div></section>';
  }
  function renderReflection(value, esc, safeUrl){
    if(!value || typeof value!=='object' || !value.passage || !value.author)return '';
    const original=safeUrl(value.source_url);
    if(!original)return '';
    const attribution=[value.author,value.work].filter(Boolean).map(esc).join(' · ');
    return '<section class="reflection-feature" id="reflection" aria-labelledby="reflection-heading">'+
      '<div class="feature-kicker" id="reflection-heading">Something to Sit With · A daily reflection</div>'+
      '<div class="reflection-content"><blockquote>“'+esc(value.passage)+'”</blockquote>'+
      '<p class="reflection-credit">— '+attribution+'</p>'+
      (value.context?'<p class="reflection-context">'+esc(value.context)+'</p>':'')+
      (value.question?'<p class="reflection-question"><strong>A question to carry</strong>'+esc(value.question)+'</p>':'')+
      '<p class="reflection-source"><a href="'+esc(original)+'" target="_blank" rel="noopener noreferrer">Read the original source →</a></p></div></section>';
  }
  function renderRoute(edition,esc){
    const ids=new Set((edition.sections||[]).map(s=>s.id));
    const parts=['<span class="route-label">Today’s paper</span>','<a href="#front-page">Know</a>'];
    if(edition.daily_wonder && ids.has('front-page'))parts.push('<a href="#daily-wonder">Discover</a>');
    if(ids.has('ideas'))parts.push('<a href="#ideas">Understand</a>');
    if(edition.reflection && ids.has('ideas'))parts.push('<a href="#reflection">Reflect</a>');
    parts.push('<a href="#long-reads">Read deeper</a>');
    return '<nav class="edition-route" aria-label="Sections of this edition">'+parts.join('')+'</nav>';
  }
  global.MorningEditionFeatures=Object.freeze({renderWonder,renderReflection,renderRoute});
})(window);
