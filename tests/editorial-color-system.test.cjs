const fs = require('node:fs');
const assert = require('node:assert/strict');
const css = fs.readFileSync('assets/editorial-color-system.css','utf8');
const html = fs.readFileSync('index.html','utf8');
const design = fs.readFileSync('DESIGN_SYSTEM.md','utf8');

const palette = {
  ink:'#222823', muted:'#545c55', rust:'#853e36',
  teal:'#205b57', ochre:'#7a541a', sheet:'#fdfbf6',
  canvas:'#e9e9e3', head:'#f4f1ea', preview:'#f0f1eb',
  why:'#f1eee8', photo:'#eeeee8', reflection:'#eff1ed'
};
function srgb(x) {
  x=parseInt(x,16)/255;
  return x<=.04045?x/12.92:Math.pow((x+.055)/1.055,2.4);
}
function lum(hex) {
  const [r,g,b]=hex.slice(1).match(/.{2}/g).map(srgb);
  return r*.2126+g*.7152+b*.0722;
}
function contrast(a,b) {
  const x=lum(a),y=lum(b);
  return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
for(const [name,value] of Object.entries(palette)) {
  assert.ok(css.includes(value),'Color not defined: '+name);
}
for(const fg of ['ink','muted']) {
  for(const bg of ['sheet','canvas','head','preview','why','photo','reflection']) {
    const ratio=contrast(palette[fg],palette[bg]);
    assert.ok(ratio>=4.5,fg+' on '+bg+' contrast is '+ratio.toFixed(2));
  }
}
for(const accent of ['rust','teal','ochre']) {
  assert.ok(contrast(palette[accent],palette.sheet)>=4.5,accent+' on warm paper lacks contrast');
}
assert.ok(contrast(palette.ink,palette.sheet)>=7,'Lead headline must be high contrast');

// Fail if the discarded whole-page category washes return.
assert.ok(css.includes('body{background:var(--me-canvas)}'),'Use a neutral outer canvas');
assert.ok(css.includes('background:var(--me-sheet)'),'Preserve warm paper as the reading surface');
assert.ok(/\.topbar\s*\{[^}]*background:#efede6/.test(css),'Chrome must remain visually quiet');
assert.ok(/\.lede\s*\{[^}]*background:var\(--me-sheet\)/.test(css),'Lead should not have a large accent fill');
assert.ok(/\.source-card\s*\{[^}]*background:transparent/.test(css),'Source box should not compete with headline');
assert.ok(/\.news-section\s*\{[^}]*background:transparent/.test(css),'Ordinary sections must be neutral');
assert.ok(!css.includes('--me-zone'),'Do not restore per-category section color fields');
assert.ok(!css.includes('background:var(--me-front)'),'No large blush front-page fill');
assert.ok(!css.includes('background:var(--me-discover)'),'No large teal discovery fill');
assert.ok(/\.daily-wonder\s*\{[^}]*background:var\(--me-wonder-surface\)/.test(css),'Visual feature should not be a dark block');
assert.ok(/\.wonder-photo a\s*\{[^}]*background:var\(--me-photomat\)/.test(css),'Keep a neutral image mat');
assert.ok(/\.reflection-feature\s*\{[^}]*background:var\(--me-reflection-surface\)/.test(css),'Reflection should be subtle');
assert.ok(/\.preview-notice\s*\{[^}]*background:#f0f1eb/.test(css),'Preview note should be low-emphasis');
assert.ok(/\.worth\s*\{[^}]*background:var\(--ink\)/.test(css),'Retain one dark editorial anchor');
assert.ok(css.includes('@media(max-width:560px)'),'Keep narrow viewport layout');
const link='<link rel="stylesheet" href="assets/editorial-color-system.css">';
assert.ok(html.includes(link),'Load final color stylesheet');
assert.ok(html.lastIndexOf(link)>html.lastIndexOf('</style>'),'Final stylesheet must override inline CSS');
assert.ok(html.indexOf('assets/editorial-features.css')<html.lastIndexOf(link));
assert.ok(design.includes('Playskool')&&design.includes('not children'));
assert.ok(design.includes('equally loud landmarks'),'Document hierarchy failure mode');
assert.ok(!css.includes('linear-gradient('),'Avoid decorative gradients');
console.log('Color contrast, quiet hierarchy, visual emphasis and mobile CSS checks passed.');
