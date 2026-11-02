const fs = require('node:fs');
const assert = require('node:assert/strict');

const css = fs.readFileSync('assets/editorial-color-system.css','utf8');
const html = fs.readFileSync('index.html','utf8');
const design = fs.readFileSync('DESIGN_SYSTEM.md','utf8');

const palette = {
  paper:'#f7f3e9', ink:'#222823', muted:'#545c55', rust:'#853e36',
  teal:'#205b57', ochre:'#86601e', rustWash:'#f6ebe4',
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
