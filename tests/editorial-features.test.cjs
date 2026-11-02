const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const code = fs.readFileSync('assets/editorial-features.js', 'utf8');
const context = {window: {}};
vm.runInNewContext(code, context);
const features = context.window.MorningEditionFeatures;
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const safe = value => /^https?:\/\//.test(value || '') ? value : '';
const example = {
  title:'A <new> perspective', caption:'Remarkable & real', image_url:'https://example.org/photo.jpg',
  source_url:'https://example.org/photograph', alt:'A plume rising over Earth',
  credit:'NASA', rights:'Public domain', rights_url:'https://example.org/rights'
};
assert.equal(features.renderWonder(null, esc, safe), '');
let out = features.renderWonder(example, esc, safe);
assert.ok(out.includes('id="daily-wonder"'));
assert.ok(out.includes('A &lt;new&gt; perspective'));
assert.ok(out.includes('<img loading="lazy"'));
assert.ok(out.includes('https://example.org/rights'));
assert.ok(!out.includes('A <new>'));
assert.equal(features.renderWonder({...example, image_url:'javascript:alert(1)'}, esc, safe), '');
const reflection = {passage:'What matters & why?',author:'A thinker',work:'A letter',translator:'T. Person',context:'A context.',question:'What now?',source_url:'https://example.org/text'};
out = features.renderReflection(reflection, esc, safe);
assert.ok(out.includes('id="reflection"'));
assert.ok(out.includes('What matters &amp; why?'));
assert.ok(out.includes('translated by T. Person'));
assert.equal(features.renderReflection({...reflection, source_url:'data:text/html,x'},esc,safe),'');
assert.ok(features.renderRoute({sections:[{id:'front-page'},{id:'ideas'}], daily_wonder:example, reflection, worth_your_time:[{}]},esc).includes('#reflection'));
assert.ok(!features.renderRoute({sections:[],worth_your_time:[]},esc).includes('#long-reads'));
const page = fs.readFileSync('index.html','utf8');
const inline = page.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(inline);
new vm.Script(inline[1]); // Syntax-check the real page renderer.
assert.ok(page.includes('extras.renderWonder(edition.daily_wonder'));
assert.ok(page.includes('extras.renderReflection(edition.reflection'));
console.log('Editorial feature and inline script checks passed.');
