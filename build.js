const fs = require('fs');

// 1. Read original index.html from downloads to extract CATS database
const downloadsIndex = 'C:\\Users\\HP\\Downloads\\logos-main\\logos-main\\index.html';
const indexContent = fs.readFileSync(downloadsIndex, 'utf-8');
const catsMatch = indexContent.match(/const CATS\s*=\s*(\[[\s\S]*?\]);/);
if (!catsMatch) { console.error("Could not find CATS array!"); process.exit(1); }

let CATS = JSON.parse(catsMatch[1]);
console.log(`Original categories: ${CATS.length}`);

// 2. Add extra category with 310 generated logos
const extraItems = [];
for (let i = 1; i <= 310; i++) extraItems.push(`wm-logo-${i}`);

const idx = CATS.findIndex(c => c.key === 'extra');
if (idx !== -1) CATS[idx].items = extraItems;
else CATS.push({ key: 'extra', name: 'wondermayank Tech Graphics', icon: 'sparkles', items: extraItems });

// Move extra to front
const extraCat = CATS.find(c => c.key === 'extra');
CATS = [extraCat, ...CATS.filter(c => c.key !== 'extra')];
console.log(`Total categories: ${CATS.length}, extra logos: ${extraItems.length}`);

const catsJson = JSON.stringify(CATS);

// 3. Inject into each template and write final output
const jobs = [
  { tpl: 'index_template.html',      out: 'index.html' },
  { tpl: 'svg_viewer_template.html',  out: 'svg_viewer.html' },
  { tpl: 'svg_maker_template.html',   out: 'svg_maker.html' },
];

for (const { tpl, out } of jobs) {
  if (!fs.existsSync(tpl)) { console.error(`SKIP: ${tpl} not found`); continue; }
  let html = fs.readFileSync(tpl, 'utf-8');
  html = html.replace(/\/\*\s*CATS_PLACEHOLDER\s*\*\//g, catsJson);
  fs.writeFileSync(out, html, 'utf-8');
  console.log(`✓ ${tpl} → ${out}  (${(html.length / 1024).toFixed(0)} KB)`);
  fs.unlinkSync(tpl);
  console.log(`  cleaned up ${tpl}`);
}

// 4. Remove leftover scripts
['revamp_project.js', 'inject_data.js'].forEach(f => {
  if (fs.existsSync(f)) { fs.unlinkSync(f); console.log(`  cleaned up ${f}`); }
});

console.log('\nDone! All 3 pages built successfully.');
