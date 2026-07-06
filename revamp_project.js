const fs = require('fs');
const path = require('path');

// 1. Read existing index.html to extract the CATS database
const indexContent = fs.readFileSync('index.html', 'utf-8');
const catsMatch = indexContent.match(/const CATS\s*=\s*(\[[\s\S]*?\]);/);
if (!catsMatch) {
  console.error("Error: Could not find CATS array in index.html!");
  process.exit(1);
}

let CATS = JSON.parse(catsMatch[1]);
console.log(`Original categories: ${CATS.length}`);

// 2. Append our new "extra" category containing the 310 generated SVG logo names
const extraItems = [];
for (let i = 1; i <= 310; i++) {
  extraItems.push(`wm-logo-${i}`);
}

// Check if category 'extra' already exists, if so overwrite its items, otherwise push new category
const existingExtraIndex = CATS.findIndex(c => c.key === 'extra');
if (existingExtraIndex !== -1) {
  CATS[existingExtraIndex].items = extraItems;
} else {
  CATS.push({
    key: 'extra',
    name: 'wondermayank Tech Graphics',
    icon: 'sparkles',
    items: extraItems
  });
}
console.log(`Updated categories: ${CATS.length}. Total logos in 'extra': ${extraItems.length}`);

// Sort categories so our custom one is highlighted or near the top, or keep order. Let's keep it near the top!
// Move 'extra' to be the first category or keep it at the end? Let's put it as the first category so it's instantly visible to the user!
const extraCat = CATS.find(c => c.key === 'extra');
CATS = [extraCat, ...CATS.filter(c => c.key !== 'extra')];

// Serialize the database to string for injection
const catsJson = JSON.stringify(CATS);

// 3. Write wondermayank.svg logo into logos/wondermayank.svg and assets/favicon.svg
const wmSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="wm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#573AFC" />
      <stop offset="100%" stop-color="#9A7AFB" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="22" fill="url(#wm-grad)" />
  <path d="M25,65 L37.5,35 L50,65 L62.5,35 L75,65" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

fs.mkdirSync('logos', { recursive: true });
fs.mkdirSync('assets', { recursive: true });
fs.writeFileSync(path.join('logos', 'wondermayank.svg'), wmSvg, 'utf-8');
fs.writeFileSync(path.join('assets', 'favicon.svg'), wmSvg, 'utf-8');
console.log("Wrote logos/wondermayank.svg and assets/favicon.svg");


// 4. COMMON CSS/STYLE SYSTEM (BMW + Apple Inspired, Thunder Indigo #573AFC Accent)
const commonStyles = `
:root {
  --primary: #573AFC;
  --primary-hover: #4527E0;
  --primary-focus: #6B4FFF;
  --primary-light: #9A7AFB;
  
  --ink: #1d1d1f;
  --body: #3c3c3c;
  --body-strong: #1a1a1a;
  --muted: #6b6b6b;
  --muted-soft: #9a9a9a;
  
  --hairline: #e6e6e6;
  --hairline-strong: #cccccc;
  --canvas: #ffffff;
  --canvas-parchment: #f5f5f7;
  
  --surface-soft: #f7f7f7;
  --surface-card: #fafafa;
  --surface-pearl: #fafafc;
  --surface-strong: #ebebeb;
  --surface-dark: #1a2129;
  
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #dc2626;
  
  --radius-sm: 8px;
  --radius-md: 11px;
  --radius-lg: 18px;
  --radius-pill: 9999px;
  
  --spacing-xxs: 4px;
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  --spacing-section: 80px;
}

.dark {
  --primary: #9A7AFB;
  --primary-hover: #b196fb;
  --primary-focus: #cbaefb;
  
  --ink: #f5f5f7;
  --body: #d1d1d6;
  --body-strong: #ffffff;
  --muted: #8e8e93;
  --muted-soft: #636366;
  
  --hairline: #2c2c2e;
  --hairline-strong: #3a3a3c;
  --canvas: #0e0e10;
  --canvas-parchment: #161618;
  
  --surface-soft: #1a1a1c;
  --surface-card: #1c1c1e;
  --surface-pearl: #1e1e20;
  --surface-strong: #2c2c2e;
  --surface-dark: #000000;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border-color: var(--hairline);
}

body {
  background: var(--canvas);
  color: var(--body);
  font-family: 'Inter', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}

h1, h2, h3, h4 {
  color: var(--ink);
  font-weight: 700;
  letter-spacing: -0.02em;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, background-color 0.15s ease, opacity 0.15s ease;
}

button:active {
  transform: scale(0.95);
}

input, select, textarea {
  font: inherit;
  color: var(--ink);
  background: var(--canvas);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-sm);
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

input:focus, select:focus, textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(87, 58, 252, 0.15);
}

svg.icon {
  width: 1.2em;
  height: 1.2em;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Scrollbar styles */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: var(--canvas-parchment);
}
::-webkit-scrollbar-thumb {
  background: var(--hairline-strong);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--muted);
}

/* Layout Shells */
.container {
  max-width: 85rem;
  margin-inline: auto;
  padding-inline: 2rem;
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 64px;
  border-bottom: 1px solid var(--hairline);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  transition: background-color 0.3s ease;
}
.dark .site-header {
  background: rgba(14, 14, 16, 0.8);
}
.site-header .inner {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.brand img {
  width: 28px;
  height: 28px;
  border-radius: 6px;
}
.brand .name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ink);
}
.brand .by {
  font-size: 0.875rem;
  color: var(--muted);
  font-weight: 400;
}
.brand .by a:hover {
  color: var(--primary);
  text-decoration: underline;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.nav-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: var(--radius-pill);
  color: var(--muted);
  height: 38px;
}
.nav-btn:hover {
  background: var(--canvas-parchment);
  color: var(--ink);
}
.nav-btn.active {
  background: var(--primary);
  color: var(--canvas);
}
.nav-btn.active:hover {
  background: var(--primary-hover);
}

.theme-toggle {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--hairline-strong);
  color: var(--muted);
}
.theme-toggle:hover {
  background: var(--canvas-parchment);
  color: var(--ink);
}
.theme-toggle .seg-dark, html.dark .theme-toggle .seg-light {
  display: none;
}
html.dark .theme-toggle .seg-dark {
  display: block;
}

/* Sidebar & Main Explorer */
.explorer {
  display: flex;
  min-height: calc(100vh - 64px);
}
.sidebar {
  width: 18rem;
  border-right: 1px solid var(--hairline);
  background: var(--canvas);
  flex-shrink: 0;
}
.sidebar-sticky {
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1.5rem;
}
.sidebar-nav-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid var(--hairline);
  padding-bottom: 1.25rem;
}
.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-pill);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--muted);
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
}
.sidebar-nav-item:hover {
  background: var(--canvas-parchment);
  color: var(--ink);
}
.sidebar-nav-item.active {
  background: var(--primary);
  color: var(--canvas);
}

.filter-section h3 {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  margin-bottom: 0.75rem;
}
.filter-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.fpill {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-pill);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--muted);
  text-align: left;
}
.fpill:hover {
  background: var(--canvas-parchment);
  color: var(--ink);
}
.fpill.active {
  background: var(--canvas-parchment);
  color: var(--primary);
}
.fpill .lab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
}
.fpill .lab span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fpill .count {
  font-size: 0.75rem;
  font-family: monospace;
  color: var(--muted-soft);
}

.content {
  flex-grow: 1;
  min-width: 0;
  background: var(--surface-pearl);
  padding: 2rem;
}

/* Footer styling */
.site-footer {
  background: var(--canvas-parchment);
  border-top: 1px solid var(--hairline);
  padding: var(--spacing-xxl) 0 var(--spacing-lg);
  color: var(--muted);
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.footer-brand .tagline {
  font-size: 0.875rem;
  max-width: 20rem;
}
.footer-col h4 {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.25rem;
}
.footer-col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.footer-col a {
  font-size: 0.875rem;
}
.footer-col a:hover {
  color: var(--primary);
}
.footer-bottom {
  border-top: 1px solid var(--hairline-strong);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  flex-wrap: wrap;
  gap: 1rem;
}
`;

// Helper function to build header HTML
function getHeaderHtml(activeTab) {
  return `
<header class="site-header">
  <div class="container inner">
    <div class="brand">
      <img src="assets/favicon.svg" alt="wondermayank logo" />
      <div>
        <span class="name">logos</span>
        <span class="by">by <a href="https://github.com/wondermayank" target="_blank">wondermayank</a></span>
      </div>
    </div>
    <div class="header-nav">
      <a href="index.html" class="nav-btn ${activeTab === 'home' ? 'active' : ''}">Explore</a>
      <a href="svg_viewer.html" class="nav-btn ${activeTab === 'viewer' ? 'active' : ''}">SVG Viewer</a>
      <a href="svg_maker.html" class="nav-btn ${activeTab === 'maker' ? 'active' : ''}">SVG Maker</a>
      <button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle theme">
        <span class="seg-light"><svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-15.07 1.41 1.41m11.31 11.31 1.41 1.41M2 12h2m16 0h2m-15.66 5.66-1.41 1.41m14.14-14.14-1.41 1.41"/></svg></span>
        <span class="seg-dark"><svg class="icon" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg></span>
      </button>
    </div>
  </div>
</header>
`;
}

// Helper function to build footer HTML
const footerHtml = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="brand">
          <img src="assets/favicon.svg" alt="wondermayank logo" />
          <span class="name">logos by wondermayank</span>
        </div>
        <p class="tagline">15,300+ free high-quality SVG logos for developer tools, popular apps, and tech brands.</p>
      </div>
      <div class="footer-col">
        <h4>Thunder</h4>
        <ul>
          <li><a href="https://thunderstudy.indevs.in" target="_blank">ThunderStudy</a></li>
          <li><a href="https://thunderstudy.indevs.in/dashboard" target="_blank">CBT Mock Platform</a></li>
          <li><a href="https://thunderstudy.indevs.in" target="_blank">Free Study Material</a></li>
          <li><a href="https://thunderstudy.indevs.in" target="_blank">Help / Donate</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>wondermayank</h4>
        <ul>
          <li><a href="https://wondermayank.in" target="_blank">Portfolio</a></li>
          <li><a href="https://github.com/wondermayank" target="_blank">GitHub</a></li>
          <li><a href="mailto:contact@wondermayank.indevs.in">Mail Contact</a></li>
          <li><a href="https://instagram.com/wondermayank" target="_blank">Instagram</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Request & Contribute</h4>
        <ul>
          <li><a href="mailto:contact@wondermayank.indevs.in">Contribute a logo</a></li>
          <li><a href="mailto:contact@wondermayank.indevs.in">Request a logo</a></li>
          <li><a href="https://x.com/wonder_mayank" target="_blank">Twitter / X</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Thunder · by wondermayank. All logos are trademarks of their respective owners.</span>
      <span>Provided for convenience — check each brand's guidelines before use.</span>
    </div>
  </div>
</footer>
`;

// Helper script for theme support & DOM loader hiding
const scriptThemeAndLoader = `
(function () {
  var t = localStorage.getItem("theme");
  if (t === "dark" || (!t && matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  }
})();
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const dark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", dark ? "dark" : "light");
    });
  }
});
`;

// ----------------------------------------------------
// 5. GENERATE index.html
// ----------------------------------------------------
const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>wondermayank — 15,300+ free SVG logos for apps & tech brands</title>
<meta name="description" content="15,300+ free SVG logos for apps, dev tools and tech brands. Search, customize, download or copy in one click." />
<link rel="canonical" href="https://wondermayank.github.io/logos/" />
<meta name="author" content="wondermayank" />
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<script>
${scriptThemeAndLoader}
</script>
<style>
${commonStyles}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, rgba(87, 58, 252, 0.05) 0%, rgba(154, 122, 251, 0.05) 100%);
  padding: 4rem 2rem;
  text-align: center;
  border-bottom: 1px solid var(--hairline);
  position: relative;
  overflow: hidden;
}
.hero-content {
  max-width: 48rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  z-index: 2;
}
.hero h1 {
  font-size: 3rem;
  line-height: 1.1;
  color: var(--ink);
}
.hero p {
  font-size: 1.125rem;
  color: var(--body);
}

.hero-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: var(--muted);
}
.hero-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Toolbar & search */
.toolbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}
.search-wrap {
  position: relative;
  flex-grow: 1;
}
.search-wrap .icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  pointer-events: none;
}
#search {
  width: 100%;
  height: 48px;
  padding-left: 3rem;
  padding-right: 1.5rem;
  border-radius: var(--radius-pill);
  font-size: 1rem;
  background: var(--canvas);
}

.view-toggle {
  display: flex;
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-pill);
  overflow: hidden;
  background: var(--canvas);
}
.view-btn {
  width: 48px;
  height: 46px;
  color: var(--muted);
}
.view-btn.active {
  background: var(--canvas-parchment);
  color: var(--primary);
}

/* Grid & Cards */
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
}
.cell {
  background: var(--surface-card);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-lg);
  aspect-ratio: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.cell:hover {
  transform: translateY(-4px);
  border-color: var(--primary-light);
  box-shadow: 0 10px 20px rgba(87, 58, 252, 0.05);
}
.cell img {
  max-width: 60%;
  max-height: 50px;
  object-fit: contain;
  margin-bottom: 1rem;
  transition: transform 0.2s ease;
}
.cell:hover img {
  transform: scale(1.1);
}
.cell .cname {
  font-family: monospace;
  font-size: 0.8125rem;
  color: var(--muted);
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cell-actions {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.dark .cell-actions {
  background: rgba(28, 28, 30, 0.95);
}
.cell:hover .cell-actions {
  opacity: 1;
  pointer-events: auto;
}

.pill-btn {
  padding: 0.5rem 1.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: var(--radius-pill);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: 80%;
  height: 36px;
}
.pill-btn-primary {
  background: var(--primary);
  color: var(--canvas);
}
.pill-btn-primary:hover {
  background: var(--primary-hover);
}
.pill-btn-secondary {
  border: 1px solid var(--hairline-strong);
  background: var(--canvas);
  color: var(--ink);
}
.pill-btn-secondary:hover {
  background: var(--canvas-parchment);
}

/* Pinned Sponsored Card */
.cell.sponsor {
  border: 2px solid var(--warning);
  background: linear-gradient(135deg, var(--surface-card) 0%, rgba(245, 158, 11, 0.03) 100%);
}
.sponsor-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: var(--warning);
  color: #000;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-pill);
}

/* Pagination */
.pagination {
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  border-top: 1px solid var(--hairline);
  padding-top: 1.5rem;
}
.page-nav {
  display: flex;
  gap: 0.25rem;
}
.pbtn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-pill);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--muted);
}
.pbtn:hover {
  background: var(--canvas-parchment);
  color: var(--ink);
}
.pbtn.active {
  background: var(--primary);
  color: var(--canvas);
}

/* Copy popover menu */
.copymenu-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.2);
  display: none;
}
.copymenu-backdrop.open {
  display: block;
}
.copymenu {
  position: fixed;
  z-index: 101;
  width: 19rem;
  background: var(--canvas);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 1.25rem;
  display: none;
  flex-direction: column;
  gap: 1rem;
}
.copymenu.open {
  display: flex;
}
.copymenu-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.copymenu-title {
  font-size: 0.875rem;
  font-weight: 700;
  font-family: monospace;
}
.copymenu-close {
  color: var(--muted);
}
.fmt-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.35rem;
}
.fmt-tab {
  padding: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  background: var(--canvas-parchment);
  color: var(--muted);
}
.fmt-tab.active {
  background: var(--primary);
  color: var(--canvas);
}
.copymenu-btn {
  background: var(--ink);
  color: var(--canvas);
  font-weight: 600;
  height: 40px;
  border-radius: var(--radius-pill);
  width: 100%;
}
.copymenu-btn:hover {
  opacity: 0.9;
}
.lang-toggle {
  display: flex;
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.lang-tab {
  flex: 1;
  padding: 0.35rem;
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--muted);
}
.lang-tab.active {
  background: var(--canvas-parchment);
  color: var(--ink);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.empty-state h3 {
  font-size: 1.25rem;
}
.empty-state p {
  color: var(--muted);
  max-width: 25rem;
}
</style>
</head>
<body>

<!-- STATIC LOADER SCREEN -->
<div id="loader" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#ffffff;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;">
  <h2 style="font-family:'Inter',sans-serif;font-weight:700;color:#573AFC;margin-bottom:8px;">wondermayank logos</h2>
  <p style="font-family:'Inter',sans-serif;font-weight:400;color:#6b6b6b;font-size:14px;">Loading over 15,300 SVG logos...</p>
</div>
<script>
  // Ensure loader style updates based on theme immediately before paint
  if (localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.getElementById('loader').style.backgroundColor = '#0e0e10';
    document.getElementById('loader').querySelector('h2').style.color = '#9A7AFB';
    document.getElementById('loader').querySelector('p').style.color = '#8e8e93';
  }
</script>

${getHeaderHtml('home')}

<main class="explorer">
  <aside class="sidebar">
    <div class="sidebar-sticky">
      <div class="sidebar-nav-group">
        <a href="index.html" class="sidebar-nav-item active">
          <svg class="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
          Explore Logos
        </a>
        <a href="svg_viewer.html" class="sidebar-nav-item">
          <svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
          SVG Viewer
        </a>
        <a href="svg_maker.html" class="sidebar-nav-item">
          <svg class="icon" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          SVG Maker
        </a>
      </div>
      
      <div class="filter-section">
        <h3>Type</h3>
        <div class="filter-list">
          <button type="button" class="fpill active" id="type-all" onclick="setType('all')">
            <span class="lab">All</span>
            <span class="count" id="count-all">0</span>
          </button>
          <button type="button" class="fpill" id="type-icon" onclick="setType('icon')">
            <span class="lab">Icons</span>
            <span class="count" id="count-icon">0</span>
          </button>
          <button type="button" class="fpill" id="type-wordmark" onclick="setType('wordmark')">
            <span class="lab">Wordmarks</span>
            <span class="count" id="count-wordmark">0</span>
          </button>
        </div>
      </div>
      
      <div class="filter-section">
        <h3>Categories</h3>
        <div class="filter-list" id="categories-list">
          <!-- Categories filled dynamically -->
        </div>
      </div>
    </div>
  </aside>
  
  <section class="content">
    <div class="toolbar">
      <div class="search-wrap">
        <svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input id="search" type="text" placeholder="Search 15,300+ logos — try 'react', 'stripe', 'figma'..." autocomplete="off" />
      </div>
    </div>
    
    <div class="results-grid" id="results">
      <!-- Cards rendered dynamically -->
    </div>
    
    <div class="pagination" id="pagination">
      <span class="info" id="pagination-info">Showing 1-100 of 15,300</span>
      <nav class="page-nav" id="pagination-pages">
        <!-- Pages filled dynamically -->
      </nav>
    </div>
  </section>
</main>

<div class="copymenu-backdrop" id="copyBackdrop" onclick="closeCopyMenu()"></div>
<div class="copymenu" id="copyMenu">
  <div class="copymenu-head">
    <span class="copymenu-title" id="copyMenuTitle">Logo Name</span>
    <button class="copymenu-close" onclick="closeCopyMenu()">
      <svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
  </div>
  <div class="fmt-tabs" id="copyFormatTabs">
    <!-- Format tabs -->
  </div>
  <div class="lang-toggle" id="copyLangToggle">
    <!-- JavaScript / TypeScript toggle -->
  </div>
  <button class="copymenu-btn" id="copyMenuBtn" onclick="executeCopy()">Copy Code</button>
</div>

${footerHtml}

<script>
const CATS = ${catsJson};

// Sponsored logo configuration
const SPONSOR = {
  n: "wondermayank",
  tagline: "wondermayank.github.io — portfolio & projects",
  url: "https://wondermayank.github.io/",
  logo: "logos/wondermayank.svg"
};

// Flatten all items
const ALL_ITEMS = [];
for (const c of CATS) {
  for (const n of c.items) {
    ALL_ITEMS.push({ n, cat: c.name, key: c.key, wm: n.endsWith("-wordmark") });
  }
}
ALL_ITEMS.sort((a, b) => a.n.localeCompare(b.n));

const TOTAL = ALL_ITEMS.length;
const WM_TOTAL = ALL_ITEMS.filter(i => i.wm).length;

// Filter count updates
document.getElementById('count-all').innerText = TOTAL.toLocaleString();
document.getElementById('count-icon').innerText = (TOTAL - WM_TOTAL).toLocaleString();
document.getElementById('count-wordmark').innerText = WM_TOTAL.toLocaleString();

// Sidebar Categories List rendering
const catListContainer = document.getElementById('categories-list');
let categoriesHtml = \`
  <button type="button" class="fpill active" id="cat-all" onclick="setCategory('all')">
    <span class="lab">All categories</span>
    <span class="count">\${TOTAL.toLocaleString()}</span>
  </button>
\`;
for (const c of CATS) {
  categoriesHtml += \`
    <button type="button" class="fpill" id="cat-\${c.key}" onclick="setCategory('\${c.key}')">
      <span class="lab"><span>\${c.name}</span></span>
      <span class="count">\${c.items.length.toLocaleString()}</span>
    </button>
  \`;
}
catListContainer.innerHTML = categoriesHtml;

// App State
const state = {
  q: "",
  cat: "all",
  type: "all",
  page: 1,
  perPage: 100
};

// Filter items based on state
function filtered() {
  const query = state.q.toLowerCase().trim();
  const tokens = query.split(/\\s+/).filter(Boolean);
  
  return ALL_ITEMS.filter(it => {
    // Category match
    if (state.cat !== "all" && it.key !== state.cat) return false;
    
    // Type match
    if (state.type === "icon" && it.wm) return false;
    if (state.type === "wordmark" && !it.wm) return false;
    
    // Search query match
    if (tokens.length > 0) {
      const targetStr = (it.n + " " + it.cat).toLowerCase();
      // Ensure all tokens are found in targetStr
      return tokens.every(token => targetStr.includes(token));
    }
    
    return true;
  });
}

function setType(type) {
  state.type = type;
  state.page = 1;
  
  document.getElementById('type-all').classList.toggle('active', type === 'all');
  document.getElementById('type-icon').classList.toggle('active', type === 'icon');
  document.getElementById('type-wordmark').classList.toggle('active', type === 'wordmark');
  
  render();
}

function setCategory(cat) {
  state.cat = cat;
  state.page = 1;
  
  const buttons = catListContainer.querySelectorAll('.fpill');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.id === \`cat-\${cat}\`);
  });
  
  render();
}

// Search Listener
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  state.q = searchInput.value;
  state.page = 1;
  render();
});

// Render cards and pagination
function render() {
  const list = filtered();
  const resultsGrid = document.getElementById('results');
  
  if (list.length === 0) {
    resultsGrid.innerHTML = \`
      <div class="empty-state">
        <h3>No logos match "\${state.q}"</h3>
        <p>Try searching for popular developer terms like 'react', 'nodejs', or 'github'.</p>
      </div>
    \`;
    document.getElementById('pagination').style.display = 'none';
    return;
  }
  
  document.getElementById('pagination').style.display = 'flex';
  
  // Calculate paging
  const totalPages = Math.ceil(list.length / state.perPage);
  state.page = Math.min(state.page, totalPages);
  
  const start = (state.page - 1) * state.perPage;
  const end = Math.min(start + state.perPage, list.length);
  const pageSlice = list.slice(start, end);
  
  // Render cards
  let cardsHtml = "";
  
  // Insert sponsored card if page is 1
  if (state.page === 1) {
    cardsHtml += \`
      <div class="cell sponsor">
        <span class="sponsor-badge">Sponsored</span>
        <img src="\${SPONSOR.logo}" alt="\${SPONSOR.n}" loading="lazy" />
        <span class="cname">\${SPONSOR.n}</span>
        <div class="cell-actions">
          <a class="pill-btn pill-btn-primary" href="\${SPONSOR.url}" target="_blank">Visit Site</a>
        </div>
      </div>
    \`;
  }
  
  for (const it of pageSlice) {
    cardsHtml += \`
      <div class="cell">
        <img src="logos/\${it.n}.svg" alt="\${it.n}" loading="lazy" onerror="this.src='assets/favicon.svg'" />
        <span class="cname">\${it.n}</span>
        <div class="cell-actions">
          <button class="pill-btn pill-btn-primary" onclick="openCopyMenu('\${it.n}', this)">Copy Code</button>
          <a class="pill-btn pill-btn-secondary" href="logos/\${it.n}.svg" download="\${it.n}.svg">Download</a>
        </div>
      </div>
    \`;
  }
  resultsGrid.innerHTML = cardsHtml;
  
  // Render pagination info
  document.getElementById('pagination-info').innerText = 
    \`Showing \${(start + 1).toLocaleString()}–\${end.toLocaleString()} of \${list.length.toLocaleString()}\`;
    
  // Render pagination pages
  const pagesContainer = document.getElementById('pagination-pages');
  let pagesHtml = \`
    <button class="pbtn" onclick="goToPage(\${state.page - 1})" \${state.page <= 1 ? 'disabled' : ''}>&lt;</button>
  \`;
  
  const maxButtons = 5;
  let startPage = Math.max(1, state.page - 2);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }
  
  for (let p = startPage; p <= endPage; p++) {
    pagesHtml += \`
      <button class="pbtn \${p === state.page ? 'active' : ''}" onclick="goToPage(\${p})">\${p}</button>
    \`;
  }
  
  pagesHtml += \`
    <button class="pbtn" onclick="goToPage(\${state.page + 1})" \${state.page >= totalPages ? 'disabled' : ''}>&gt;</button>
  \`;
  pagesContainer.innerHTML = pagesHtml;
}

function goToPage(page) {
  state.page = page;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ----------------------------------------------------
// COPY MENU FUNCTIONALITY
// ----------------------------------------------------
const FORMATS = [
  { id: "svg", label: "SVG" },
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "svelte", label: "Svelte" },
  { id: "angular", label: "Angular" },
  { id: "astro", label: "Astro" }
];

const menuState = {
  name: "",
  format: "svg",
  lang: "js"
};

function openCopyMenu(name, anchor) {
  menuState.name = name;
  menuState.format = "svg";
  menuState.lang = "js";
  
  document.getElementById('copyMenuTitle').innerText = name;
  
  // Render tabs
  const tabsContainer = document.getElementById('copyFormatTabs');
  tabsContainer.innerHTML = FORMATS.map(f => \`
    <button class="fmt-tab \${f.id === menuState.format ? 'active' : ''}" onclick="setCopyFormat('\${f.id}')">\${f.label}</button>
  \`).join('');
  
  updateCopyLangToggle();
  
  const backdrop = document.getElementById('copyBackdrop');
  const menu = document.getElementById('copyMenu');
  
  backdrop.classList.add('open');
  menu.classList.add('open');
  
  // Position menu
  const rect = anchor.getBoundingClientRect();
  const menuWidth = menu.offsetWidth;
  const menuHeight = menu.offsetHeight;
  let left = Math.min(rect.left, window.innerWidth - menuWidth - 20);
  let top = rect.bottom + window.scrollY + 8;
  
  if (top + menuHeight > window.scrollY + window.innerHeight) {
    top = rect.top + window.scrollY - menuHeight - 8;
  }
  
  menu.style.left = \`\${Math.max(20, left)}px\`;
  menu.style.top = \`\${top}px\`;
}

function closeCopyMenu() {
  document.getElementById('copyBackdrop').classList.remove('open');
  document.getElementById('copyMenu').classList.remove('open');
}

function setCopyFormat(fmt) {
  menuState.format = fmt;
  const tabs = document.getElementById('copyFormatTabs').querySelectorAll('.fmt-tab');
  FORMATS.forEach((f, idx) => {
    tabs[idx].classList.toggle('active', f.id === fmt);
  });
  updateCopyLangToggle();
}

function updateCopyLangToggle() {
  const toggle = document.getElementById('copyLangToggle');
  const hasLangs = ['react', 'vue', 'svelte'].includes(menuState.format);
  
  if (!hasLangs) {
    toggle.innerHTML = "";
    return;
  }
  
  toggle.innerHTML = \`
    <button class="lang-tab \${menuState.lang === 'js' ? 'active' : ''}" onclick="setCopyLang('js')">JS</button>
    <button class="lang-tab \${menuState.lang === 'ts' ? 'active' : ''}" onclick="setCopyLang('ts')">TS</button>
  \`;
}

function setCopyLang(lang) {
  menuState.lang = lang;
  updateCopyLangToggle();
}

async function executeCopy() {
  try {
    const response = await fetch(\`logos/\${menuState.name}.svg\`);
    const svgCode = await response.text();
    const formattedCode = convertSvgCode(menuState.format, menuState.lang, svgCode, menuState.name);
    
    await navigator.clipboard.writeText(formattedCode);
    
    const copyBtn = document.getElementById('copyMenuBtn');
    copyBtn.innerText = "Copied!";
    copyBtn.style.background = "var(--success)";
    
    setTimeout(() => {
      copyBtn.innerText = "Copy Code";
      copyBtn.style.background = "var(--ink)";
      closeCopyMenu();
    }, 1000);
  } catch (err) {
    console.error("Failed to copy code", err);
    alert("Could not load SVG for copying.");
  }
}

// Convert SVG to Framework Components
function convertSvgCode(fmt, lang, svg, id) {
  const pascalName = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Icon';
  const kebabName = id.split('_').join('-') + '-icon';
  
  switch (fmt) {
    case "svg":
      return svg;
    case "react": {
      let cleanSvg = svg.replace(/<svg/, '<svg {...props}').replace(/class=/g, 'className=');
      const isTs = lang === 'ts';
      return \`import React from 'react';
\${isTs ? 'import { SVGProps } from "react";\\n' : ''}
export function \${pascalName}(props\${isTs ? ': SVGProps<SVGSVGElement>' : ''}) {
  return (
    \${cleanSvg.trim().replace(/^/gm, '    ')}
  );
}
\`;
    }
    case "vue":
      return \`<template>
  \${svg.replace(/^/gm, '  ')}
</template>
<scriptSetup \${lang === 'ts' ? 'lang="ts"' : ''}>
// Vue Icon component
</scriptSetup>
\`;
    case "svelte":
      return \`\${svg}
<!-- Svelte component -->
\`;
    case "angular":
      return \`import { Component } from '@angular/core';

@Component({
  selector: '\${kebabName}',
  standalone: true,
  template: \\\`\${svg}\\\`
})
export class \${pascalName} {}
\`;
    case "astro":
      return \`---
// Astro Component
---
\${svg}
\`;
    default:
      return svg;
  }
}

// Start app
render();
</script>
</body>
</html>
`;

fs.writeFileSync('index.html', indexHtmlContent, 'utf-8');
console.log("Rewrote index.html with brand new design system and data!");

// ----------------------------------------------------
// 6. GENERATE svg_viewer.html
// ----------------------------------------------------
const viewerHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SVG Color Viewer — wondermayank</title>
<meta name="description" content="View, customize colors, copy react components, or download SVG/PNG of any logo dynamically." />
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<script>
${scriptThemeAndLoader}
</script>
<style>
${commonStyles}

.viewer-grid {
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: 2rem;
  align-items: start;
}
@media (max-width: 992px) {
  .viewer-grid {
    grid-template-columns: 1fr;
  }
}

.panel-card {
  background: var(--surface-card);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.setting-label {
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--muted);
}
.color-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.color-btn {
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-pill);
  background: var(--canvas);
}
.color-btn.active {
  background: var(--primary);
  color: var(--canvas);
  border-color: var(--primary);
}

.custom-picker {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.color-picker-input {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  padding: 0;
  cursor: pointer;
  border: 1px solid var(--hairline-strong);
}

.preview-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.preview-card {
  background: var(--canvas);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-lg);
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: background-color 0.2s ease;
}
.preview-svg-wrapper {
  max-width: 80%;
  max-height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview-svg-wrapper svg {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.logo-picker-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.logo-select {
  width: 100%;
  height: 44px;
  padding-inline: 0.75rem;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.code-area-wrap {
  position: relative;
}
.code-area {
  width: 100%;
  height: 150px;
  font-family: monospace;
  font-size: 0.8125rem;
  padding: 1rem;
  resize: none;
  background: var(--canvas-parchment);
  color: var(--ink);
}
.copy-floating-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: var(--ink);
  color: var(--canvas);
  font-size: 0.75rem;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-pill);
}
.copy-floating-btn:hover {
  opacity: 0.9;
}
</style>
</head>
<body>

<!-- STATIC LOADER SCREEN -->
<div id="loader" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#ffffff;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;">
  <h2 style="font-family:'Inter',sans-serif;font-weight:700;color:#573AFC;margin-bottom:8px;">wondermayank logos</h2>
  <p style="font-family:'Inter',sans-serif;font-weight:400;color:#6b6b6b;font-size:14px;">Loading SVG Viewer...</p>
</div>
<script>
  if (localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.getElementById('loader').style.backgroundColor = '#0e0e10';
    document.getElementById('loader').querySelector('h2').style.color = '#9A7AFB';
    document.getElementById('loader').querySelector('p').style.color = '#8e8e93';
  }
</script>

${getHeaderHtml('viewer')}

<main class="explorer">
  <aside class="sidebar">
    <div class="sidebar-sticky">
      <div class="sidebar-nav-group">
        <a href="index.html" class="sidebar-nav-item">
          <svg class="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
          Explore Logos
        </a>
        <a href="svg_viewer.html" class="sidebar-nav-item active">
          <svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
          SVG Viewer
        </a>
        <a href="svg_maker.html" class="sidebar-nav-item">
          <svg class="icon" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          SVG Maker
        </a>
      </div>
      
      <div class="logo-picker-wrap">
        <label class="setting-label">Select Logo</label>
        <select class="logo-select" id="logoSelect" onchange="loadSelectedLogo()">
          <!-- Options rendered dynamically -->
        </select>
      </div>
    </div>
  </aside>
  
  <section class="content">
    <div class="viewer-grid">
      <!-- Options Panel (Left) -->
      <div class="panel-card">
        <h2 style="font-size: 1.25rem;">Viewer Settings</h2>
        
        <div class="setting-group">
          <span class="setting-label">Background Color</span>
          <div class="color-options" id="bgOptions">
            <button class="color-btn active" onclick="setBg('transparent')">Transparent</button>
            <button class="color-btn" onclick="setBg('#ffffff')">White</button>
            <button class="color-btn" onclick="setBg('#0e0e10')">Dark</button>
            <button class="color-btn" onclick="setBg('custom')">Custom</button>
          </div>
          <div class="custom-picker" id="customBgPicker" style="display:none">
            <input type="color" class="color-picker-input" id="bgColorVal" value="#f5f5f7" oninput="applyCustomBg()" />
            <span style="font-size:0.875rem;font-weight:600">Choose Bg</span>
          </div>
        </div>
        
        <div class="setting-group">
          <span class="setting-label">Icon Fill Color</span>
          <div class="color-options" id="fillOptions">
            <button class="color-btn active" onclick="setFill('original')">Keep Original</button>
            <button class="color-btn" onclick="setFill('custom')">Custom</button>
          </div>
          <div class="custom-picker" id="customFillPicker" style="display:none">
            <input type="color" class="color-picker-input" id="fillColorVal" value="#573AFC" oninput="applyCustomColors()" />
            <span style="font-size:0.875rem;font-weight:600">Choose Fill</span>
          </div>
        </div>
        
        <div class="setting-group">
          <span class="setting-label">Icon Stroke Color</span>
          <div class="color-options" id="strokeOptions">
            <button class="color-btn active" onclick="setStroke('original')">Keep Original</button>
            <button class="color-btn" onclick="setStroke('custom')">Custom</button>
          </div>
          <div class="custom-picker" id="customStrokePicker" style="display:none">
            <input type="color" class="color-picker-input" id="strokeColorVal" value="#9A7AFB" oninput="applyCustomColors()" />
            <span style="font-size:0.875rem;font-weight:600">Choose Stroke</span>
          </div>
        </div>
        
        <div class="setting-group">
          <span class="setting-label">Stroke Width (If outline)</span>
          <input type="range" id="strokeWidthVal" min="0.5" max="8" step="0.5" value="2" oninput="applyCustomColors()" style="accent-color:var(--primary)" />
        </div>
      </div>
      
      <!-- Preview & Export Panel (Right) -->
      <div class="preview-container">
        <div class="preview-card" id="previewCard">
          <div class="preview-svg-wrapper" id="svgWrapper">
            <!-- Raw SVG loads here -->
          </div>
        </div>
        
        <div class="panel-card">
          <h2 style="font-size: 1.25rem;">Export Options</h2>
          <div class="action-grid">
            <button class="pill-btn pill-btn-primary" onclick="downloadAsSvg()">Download SVG</button>
            <button class="pill-btn pill-btn-primary" onclick="downloadAsPng()">Export PNG</button>
            <button class="pill-btn pill-btn-secondary" onclick="copyDataUri()">Copy Data URI</button>
            <button class="pill-btn pill-btn-secondary" onclick="copyReactCode()">Copy React</button>
          </div>
        </div>
        
        <div class="panel-card">
          <h2 style="font-size: 1.25rem;">SVG Source Code</h2>
          <div class="code-area-wrap">
            <textarea class="code-area" id="codeArea" readonly></textarea>
            <button class="copy-floating-btn" id="copyCodeBtn" onclick="copyRawCode()">Copy</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

${footerHtml}

<script>
const CATS = ${catsJson};

// Flatten items list for logo picker dropdown
const ALL_ITEMS = [];
for (const c of CATS) {
  for (const n of c.items) {
    ALL_ITEMS.push({ n, cat: c.name });
  }
}
ALL_ITEMS.sort((a, b) => a.n.localeCompare(b.n));

// Populate select options
const selectEl = document.getElementById('logoSelect');
selectEl.innerHTML = ALL_ITEMS.map(i => \`<option value="\${i.n}">\${i.n} (\${i.cat})</option>\`).join('');

// Selected SVG state
let currentSvgCode = "";
let currentSvgName = "";
const state = {
  bg: 'transparent',
  fill: 'original',
  stroke: 'original'
};

function setBg(bg) {
  state.bg = bg;
  const bgCard = document.getElementById('previewCard');
  const customPicker = document.getElementById('customBgPicker');
  
  // Highlight active option
  const buttons = document.getElementById('bgOptions').querySelectorAll('.color-btn');
  buttons[0].classList.toggle('active', bg === 'transparent');
  buttons[1].classList.toggle('active', bg === '#ffffff');
  buttons[2].classList.toggle('active', bg === '#0e0e10');
  buttons[3].classList.toggle('active', bg === 'custom');
  
  if (bg === 'custom') {
    customPicker.style.display = 'flex';
    applyCustomBg();
  } else {
    customPicker.style.display = 'none';
    bgCard.style.backgroundColor = bg === 'transparent' ? 'transparent' : bg;
  }
}

function applyCustomBg() {
  const val = document.getElementById('bgColorVal').value;
  document.getElementById('previewCard').style.backgroundColor = val;
}

function setFill(fill) {
  state.fill = fill;
  const picker = document.getElementById('customFillPicker');
  
  const buttons = document.getElementById('fillOptions').querySelectorAll('.color-btn');
  buttons[0].classList.toggle('active', fill === 'original');
  buttons[1].classList.toggle('active', fill === 'custom');
  
  picker.style.display = fill === 'custom' ? 'flex' : 'none';
  applyCustomColors();
}

function setStroke(stroke) {
  state.stroke = stroke;
  const picker = document.getElementById('customStrokePicker');
  
  const buttons = document.getElementById('strokeOptions').querySelectorAll('.color-btn');
  buttons[0].classList.toggle('active', stroke === 'original');
  buttons[1].classList.toggle('active', stroke === 'custom');
  
  picker.style.display = stroke === 'custom' ? 'flex' : 'none';
  applyCustomColors();
}

// Fetch SVG and render
async function loadSelectedLogo() {
  const name = selectEl.value;
  currentSvgName = name;
  try {
    const res = await fetch(\`logos/\${name}.svg\`);
    currentSvgCode = await res.text();
    applyCustomColors();
  } catch (err) {
    console.error(err);
    document.getElementById('svgWrapper').innerHTML = "<span style='color:var(--error)'>Failed to load SVG</span>";
  }
}

// Apply colors on preview SVG elements dynamically
function applyCustomColors() {
  if (!currentSvgCode) return;
  
  const wrapper = document.getElementById('svgWrapper');
  const parser = new DOMParser();
  const doc = parser.parseFromString(currentSvgCode, "image/svg+xml");
  const svgEl = doc.documentElement;
  
  // Apply customizations
  const fillColor = state.fill === 'custom' ? document.getElementById('fillColorVal').value : null;
  const strokeColor = state.stroke === 'custom' ? document.getElementById('strokeColorVal').value : null;
  const strokeWidth = document.getElementById('strokeWidthVal').value;
  
  if (fillColor || strokeColor) {
    // Inject a stylesheet inside the SVG to perfectly override the paths, polygons, shapes, rects
    const styleEl = document.createElementNS("http://www.w3.org/2000/svg", "style");
    let rules = "";
    if (fillColor) {
      rules += \`path, circle, rect, polygon, ellipse { fill: \${fillColor} !important; }\`;
    }
    if (strokeColor) {
      rules += \`path, circle, rect, polygon, ellipse, line, polyline { stroke: \${strokeColor} !important; stroke-width: \${strokeWidth}px !important; }\`;
    }
    styleEl.textContent = rules;
    svgEl.appendChild(styleEl);
  }
  
  // Update view wrapper
  wrapper.innerHTML = "";
  wrapper.appendChild(svgEl);
  
  // Update text code area
  const serialized = new XMLSerializer().serializeToString(svgEl);
  document.getElementById('codeArea').value = serialized;
}

// Actions
function copyRawCode() {
  const val = document.getElementById('codeArea').value;
  navigator.clipboard.writeText(val);
  const btn = document.getElementById('copyCodeBtn');
  btn.innerText = "Copied!";
  setTimeout(() => btn.innerText = "Copy", 1000);
}

function downloadAsSvg() {
  const val = document.getElementById('codeArea').value;
  const blob = new Blob([val], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = \`\${currentSvgName}-custom.svg\`;
  a.click();
}

function downloadAsPng() {
  const wrapper = document.getElementById('svgWrapper');
  const svgEl = wrapper.querySelector('svg');
  if (!svgEl) return;
  
  const val = document.getElementById('codeArea').value;
  const blob = new Blob([val], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    
    // Draw background if not transparent
    if (state.bg !== 'transparent') {
      ctx.fillStyle = state.bg === 'custom' ? document.getElementById('bgColorVal').value : state.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    ctx.drawImage(img, 50, 50, 400, 400);
    
    const pngUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = \`\${currentSvgName}.png\`;
    a.click();
  };
  img.src = url;
}

function copyDataUri() {
  const val = document.getElementById('codeArea').value;
  const base64 = btoa(unescape(encodeURIComponent(val)));
  const dataUri = \`data:image/svg+xml;base64,\${base64}\`;
  navigator.clipboard.writeText(dataUri);
  alert("Data URI copied to clipboard!");
}

function copyReactCode() {
  const val = document.getElementById('codeArea').value;
  const pascalName = currentSvgName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Icon';
  let cleanSvg = val.replace(/<svg/, '<svg {...props}').replace(/class=/g, 'className=');
  const reactCode = \`import React from 'react';

export function \${pascalName}(props) {
  return (
    \${cleanSvg.trim().replace(/^/gm, '    ')}
  );
}
\`;
  navigator.clipboard.writeText(reactCode);
  alert("React Component code copied!");
}

// Initial load
loadSelectedLogo();
</script>
</body>
</html>
`;

fs.writeFileSync('svg_viewer.html', viewerHtmlContent, 'utf-8');
console.log("Generated svg_viewer.html");

// ----------------------------------------------------
// 7. GENERATE svg_maker.html
// ----------------------------------------------------
const makerHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SVG Custom Maker — wondermayank</title>
<meta name="description" content="Paste raw SVG codes, preview, style dynamically, and convert to PNG, React components, and base64 instantly." />
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<script>
${scriptThemeAndLoader}
</script>
<style>
${commonStyles}

.maker-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}
@media (max-width: 992px) {
  .maker-grid {
    grid-template-columns: 1fr;
  }
}

.editor-card {
  background: var(--surface-card);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.editor-textarea {
  width: 100%;
  height: 350px;
  font-family: monospace;
  font-size: 0.8125rem;
  padding: 1rem;
  resize: vertical;
  background: var(--canvas);
}

.preview-card {
  background: var(--canvas);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-lg);
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.preview-svg-wrapper {
  max-width: 80%;
  max-height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview-svg-wrapper svg {
  width: 220px;
  height: 220px;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.error-badge {
  padding: 0.5rem 1rem;
  background: rgba(220, 38, 38, 0.05);
  color: var(--error);
  font-size: 0.875rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(220, 38, 38, 0.15);
  font-family: monospace;
}
</style>
</head>
<body>

<!-- STATIC LOADER SCREEN -->
<div id="loader" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#ffffff;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;">
  <h2 style="font-family:'Inter',sans-serif;font-weight:700;color:#573AFC;margin-bottom:8px;">wondermayank logos</h2>
  <p style="font-family:'Inter',sans-serif;font-weight:400;color:#6b6b6b;font-size:14px;">Loading SVG Maker...</p>
</div>
<script>
  if (localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.getElementById('loader').style.backgroundColor = '#0e0e10';
    document.getElementById('loader').querySelector('h2').style.color = '#9A7AFB';
    document.getElementById('loader').querySelector('p').style.color = '#8e8e93';
  }
</script>

${getHeaderHtml('maker')}

<main class="explorer">
  <aside class="sidebar">
    <div class="sidebar-sticky">
      <div class="sidebar-nav-group">
        <a href="index.html" class="sidebar-nav-item">
          <svg class="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
          Explore Logos
        </a>
        <a href="svg_viewer.html" class="sidebar-nav-item">
          <svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
          SVG Viewer
        </a>
        <a href="svg_maker.html" class="sidebar-nav-item active">
          <svg class="icon" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          SVG Maker
        </a>
      </div>
      
      <div class="editor-card" style="padding: 1rem; border: none; background: transparent;">
        <h3 style="font-size: 0.8125rem; font-weight: 700; color: var(--muted); text-transform: uppercase; margin-bottom: 0.5rem;">Sample Template</h3>
        <button class="pill-btn pill-btn-secondary" onclick="loadSampleTemplate()" style="width: 100%;">Load Hexagon Logo</button>
      </div>
    </div>
  </aside>
  
  <section class="content">
    <div class="maker-grid">
      <!-- Input Panel (Left) -->
      <div class="editor-card">
        <h2 style="font-size: 1.25rem;">Paste / Edit SVG Code</h2>
        <textarea class="editor-textarea" id="svgInput" oninput="updatePreview()" placeholder="Paste your raw SVG code here..."></textarea>
        <div id="errorBox" class="error-badge" style="display:none"></div>
      </div>
      
      <!-- Preview & Export Panel (Right) -->
      <div class="editor-card" style="background:transparent; border:none; padding:0;">
        <div class="preview-card" id="previewCard">
          <div class="preview-svg-wrapper" id="svgWrapper">
            <!-- Raw SVG parses here -->
          </div>
        </div>
        
        <div class="editor-card" style="margin-top: 1.5rem;">
          <h2 style="font-size: 1.25rem;">Convert & Export Tools</h2>
          <div class="action-grid">
            <button class="pill-btn pill-btn-primary" onclick="downloadSvg()">Download SVG</button>
            <button class="pill-btn pill-btn-primary" onclick="downloadPng()">Export PNG</button>
            <button class="pill-btn pill-btn-secondary" onclick="copyReact()">Copy React</button>
            <button class="pill-btn pill-btn-secondary" onclick="copyDataUri()">Copy Data URI</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

${footerHtml}

<script>
const sampleTemplate = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="maker-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#573AFC" />
      <stop offset="100%" stop-color="#9A7AFB" />
    </linearGradient>
  </defs>
  <!-- Beautiful procedurally-drawn Tech Monogram -->
  <polygon points="50,12 85,32 85,72 50,92 15,72 15,32" fill="none" stroke="url(#maker-grad)" stroke-width="8" stroke-linejoin="round" />
  <path d="M35,62 L50,38 L65,62" fill="none" stroke="url(#maker-grad)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="50" cy="50" r="6" fill="#ffffff" />
</svg>`;

const inputArea = document.getElementById('svgInput');
const wrapper = document.getElementById('svgWrapper');
const errorBox = document.getElementById('errorBox');

function loadSampleTemplate() {
  inputArea.value = sampleTemplate;
  updatePreview();
}

function updatePreview() {
  const code = inputArea.value.trim();
  errorBox.style.display = 'none';
  wrapper.innerHTML = "";
  
  if (!code) return;
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(code, "image/svg+xml");
  const parserError = doc.querySelector('parsererror');
  
  if (parserError) {
    errorBox.innerText = "Error: Invalid SVG code structure. Check for open tags or malformed XML.";
    errorBox.style.display = 'block';
    return;
  }
  
  // Success, append SVG element
  wrapper.appendChild(doc.documentElement);
}

function downloadSvg() {
  const code = inputArea.value.trim();
  if (!code) return;
  const blob = new Blob([code], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "custom-logo.svg";
  a.click();
}

function downloadPng() {
  const code = inputArea.value.trim();
  if (!code) return;
  
  const blob = new Blob([code], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 50, 50, 400, 400);
    
    const pngUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = "custom-logo.png";
    a.click();
  };
  img.src = url;
}

function copyReact() {
  const code = inputArea.value.trim();
  if (!code) return;
  
  let cleanSvg = code.replace(/<svg/, '<svg {...props}').replace(/class=/g, 'className=');
  const reactCode = \`import React from 'react';

export function CustomIcon(props) {
  return (
    \${cleanSvg.trim().replace(/^/gm, '    ')}
  );
}
\`;
  navigator.clipboard.writeText(reactCode);
  alert("React Component code copied!");
}

function copyDataUri() {
  const code = inputArea.value.trim();
  if (!code) return;
  
  const base64 = btoa(unescape(encodeURIComponent(code)));
  const dataUri = \`data:image/svg+xml;base64,\${base64}\`;
  navigator.clipboard.writeText(dataUri);
  alert("Data URI copied to clipboard!");
}

// Initial template load
loadSampleTemplate();
</script>
</body>
</html>
`;

fs.writeFileSync('svg_maker.html', makerHtmlContent, 'utf-8');
console.log("Generated svg_maker.html");
