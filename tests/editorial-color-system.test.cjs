const fs = require('node:fs');
const assert = require('node:assert/strict');

const css = fs.readFileSync('assets/editorial-color-system.css','utf8');
const html = fs.readFileSync('index.html','utf8');
const design = fs.readFileSync('DESIGN_SYSTEM.md','utf8');

const palette = {
  paper:'#f7f3e9', ink:'#222823', muted:'#545c55', rust:'#853e36',
  teal:'#205b57', ochre:'#7a541a', rustWash:'#f6ebe4',
  tealWash:'#e5eee8', ochreWash:'#f5edd8'
};
function srgb(x) {x = parseInt(x,16)/255; return x<=.04045? x/12.92 : Math.pow((x+.055)/1.055,2.4);}
function lum(s) {
  const [r,g,b] = s.slice(1).match(/.{2}/g).map(srgb);
  return r*.2126+g*.7152+b*.0722;
}
function contrast(a,b) {
  const x=lum(a),y=lum(b);
  return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
for(const fg of ['ink','muted','rust','teal','ochre']) {
  for(const bg of ['paper','rustWash','tealWash','ochreWash']) {
    const ratio=contrast(palette[fg],palette[bg]);
    assert.ok(ratio>=4.5, fg+' against '+bg+' must be 4.5:1; actual '+ratio.toFixed(2));
  }
}
for(const value of Object.values(palette)) {
  assert.ok(css.includes(value), 'Central stylesheet must define '+value);
}
const zones={
  canvas:'#dae4e0', cover:'#efdfd3', front:'#f4e5db', catchup:'#e9dfcc',
  discover:'#dce9e4', human:'#e0e7ea', ideas:'#f0e5c8',
  reflect:'#dee7ec', wonder:'#264744', sheet:'#fffdf7',
  newsHead:'#e7d2c6', catchHead:'#e0cfb3',
  discoverHead:'#cde0d7', humanHead:'#cad9df', ideasHead:'#e6d4a3'
};
for(const [name,color] of Object.entries(zones)) {
  assert.ok(css.includes(color),'Missing large-area color token '+name);
}
for(const bg of ['canvas','cover','front','catchup','discover','human','ideas','reflect','sheet']) {
  for(const fg of ['ink','muted']) {
    assert.ok(contrast(palette[fg],zones[bg])>=4.5,fg+' on '+bg+' must pass text contrast');
  }
}
for(const [fg,bg] of [
  ['rust','newsHead'],['rust','catchHead'],['teal','discoverHead'],
  ['teal','humanHead'],['ochre','ideasHead']
]) {
  assert.ok(contrast(palette[fg],zones[bg])>=4.5,fg+' on '+bg+' must pass label contrast');
}
for(const light of ['#f7f3e9','#d6e4dc','#e8cb91','#f1d49a']) {
  assert.ok(contrast(light,zones.wonder)>=4.5,'Gallery must preserve readable text');
}
assert.ok(css.includes('body{background:var(--me-canvas)}'),'Outer canvas must not be ivory');
assert.ok(css.includes('main.shell{'),'Main paper needs its own surface');
assert.ok(css.includes('background:var(--me-sheet)'),'The reading sheet needs a distinct color');
assert.ok(css.includes('background:var(--me-zone)'),'Section color must cover its reading region');
assert.ok(css.includes('background:var(--me-wonder)'),'The Daily Wonder must have an identifiable gallery surface');
assert.ok(css.includes('background:var(--me-reflect)'),'Reflection must have its own reading surface');
assert.ok(css.includes('width:100%'),'Mobile needs edge-to-edge newspaper layout');
assert.ok(css.includes('.section--front-page'));
assert.ok(css.includes('.section--ideas'));
assert.ok(css.includes('.section--at-human-scale'));
assert.ok(css.includes('.daily-wonder'));
assert.ok(css.includes('.reflection-feature'));
assert.ok(css.includes('@media(max-width:560px)'));
const link='<link rel="stylesheet" href="assets/editorial-color-system.css">';
assert.ok(html.includes(link), 'Site must load color stylesheet');
assert.ok(html.lastIndexOf(link)>html.lastIndexOf('</style>'), 'The color system must override old inline rules');
assert.ok(html.indexOf('assets/editorial-features.css')<html.lastIndexOf(link), 'Features CSS must load first');
assert.ok(design.includes('Playskool') && design.includes('not children'), 'Keep design intent documented');
assert.ok(!css.includes('linear-gradient('), 'Avoid decorative gradients');
assert.ok(!css.includes('border-radius:50%'), 'Avoid colorful pills');
console.log('Editorial color tokens, contrast, load order, and simple section hierarchy passed.');
