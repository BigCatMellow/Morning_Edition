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


function renderFixture(edition) {
  const nodes = new Map();
  const node = id => {
    if (!nodes.has(id)) nodes.set(id, {
      textContent: '', innerHTML: '',
      addEventListener() {}, focus() {},
      classList: {add() {}, remove() {}, contains() {return false;}},
      setAttribute() {}
    });
    return nodes.get(id);
  };
  const document = {
    getElementById: node, querySelectorAll() {return [];},
    addEventListener() {}, body: {classList: {add() {}, remove() {}}}
  };
  const context = {
    document, URL, Date, Intl,
    window: {MorningEditionFeatures:features, location:{href:'https://example.org/'}, scrollTo() {}},
    fetch: async path => ({ok:true,json:async () => path.includes('latest.json') ? edition : {readers:{}}}),
    alert() {}
  };
  vm.runInNewContext(inline[1], context);
  return new Promise(resolve => setImmediate(() => resolve(node('content').innerHTML)));
}

(async () => {
  const story = {headline:'A report', summary:'A clear story.', source:'A source', url:'https://example.org/story'};
  const edition = {
    date:'2026-11-03', title:'Morning Edition', lead_story:story,
    sections: [
      {id:'front-page', title:'Front Page', items:[{...story,url:'https://example.org/front'}]},
      {id:'ideas',title:'Ideas',items:[{...story,url:'https://example.org/ideas'}]}
    ],
    daily_wonder: example,
    reflection,
    worth_your_time:[{...story,url:'https://example.org/long'}]
  };
  const rendered = await renderFixture(edition);
  const positions = ['id="front-page"','id="daily-wonder"','id="ideas"','id="reflection"','id="long-reads"'].map(x => rendered.indexOf(x));
  assert.ok(positions.every(x => x >= 0), 'every editorial section must render');
  assert.deepEqual(positions,[...positions].sort((a,b)=>a-b),'features must appear inside reading rhythm');
  const old = {...edition};
  delete old.daily_wonder;
  delete old.reflection;
  const preview = await renderFixture({...edition,preview:true,preview_note:'Preview fixture; no email sent.'});
  assert.ok(preview.includes('Design preview · Not a new publication'));
  assert.ok(preview.includes('Preview fixture; no email sent.'));
  assert.equal((preview.match(/id="front-page"/g)||[]).length,1,'Front Page navigation anchor must not be duplicated');
  assert.equal((preview.match(/id="lead-story"/g)||[]).length,1,'Lead story anchor must be unique');
  const legacy = await renderFixture(old);
  assert.ok(!legacy.includes('id="daily-wonder"'));
  assert.ok(!legacy.includes('id="reflection"'));
  assert.ok(legacy.includes('id="ideas"'));
  console.log('Sample and legacy edition rendering checks passed.');
})().catch(error => {console.error(error);process.exitCode=1;});
