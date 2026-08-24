#!/usr/bin/env node
// Build static site — neo-brutalist design modeled on youmind.com prompt galleries
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PROMPTS_DIR = path.join(ROOT, 'prompts');
const OUTPUT_DIR = path.join(ROOT, 'site', 'output');

const TYPE_META = {
  'T2VA': { label: 'Text → Video', emoji: '🎬', accent: '#FF6B6B', grad: 'linear-gradient(135deg,#5B21B6,#2563EB)' },
  'I2VA': { label: 'Image → Video', emoji: '🖼️', accent: '#4ECDC4', grad: 'linear-gradient(135deg,#2563EB,#0EA5E9)' },
  'FL2VA': { label: 'First/Last Frame', emoji: '🎞️', accent: '#8B5CF6', grad: 'linear-gradient(135deg,#7C3AED,#DB2777)' },
  'L2VA': { label: 'Last Frame', emoji: '🎯', accent: '#FF9F1C', grad: 'linear-gradient(135deg,#D97706,#DC2626)' },
  'Full-Reference': { label: 'Full Reference', emoji: '🔀', accent: '#C7FF4A', grad: 'linear-gradient(135deg,#059669,#2563EB)' },
};

function readPrompts() {
  const files = fs.readdirSync(PROMPTS_DIR).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(PROMPTS_DIR, file), 'utf-8');
    let title = file.replace('.md', '').replace(/^(T2VA|I2VA|FL2VA|L2VA|FullReference)-/, '');
    let type = '';
    const typeMatch = file.match(/^(T2VA|I2VA|FL2VA|L2VA|FullReference)-/);
    if (typeMatch) type = typeMatch[1] === 'FullReference' ? 'Full-Reference' : typeMatch[1];
    for (const line of content.split('\n')) {
      if (line.startsWith('### ')) { title = line.slice(4).trim().replace(/^(T2VA|I2VA|FL2VA|L2VA|Full-Reference):\s*/, ''); break; }
    }
    const descMatch = content.match(/#### 📖 Description\n\n([\s\S]*?)(?=\n#### )/);
    const description = descMatch ? descMatch[1].trim() : '';
    // Extract the main prompt block (first ```text block)
    const promptMatch = content.match(/```text\n([\s\S]*?)\n```/);
    const promptText = promptMatch ? promptMatch[1].trim() : '';
    const tagsMatch = content.match(/\*\*Tags:\*\*\s*(.+)/);
    const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()).filter(Boolean) : [];
    const sourceMatch = content.match(/\*\*Source:\*\*(?:.+\[)?([^\]\n]+)/);
    const source = sourceMatch ? sourceMatch[1].trim() : '';
    const techMatch = content.match(/\*\*Key technique:\*\*\s*(.+)/);
    const technique = techMatch ? techMatch[1].trim() : '';
    const durMatch = content.match(/\*\*Duration:\*\*\s*(.+)/);
    const duration = durMatch ? durMatch[1].trim() : '';
    return { file, title, type, description, promptText, tags, source, technique, duration, content };
  });
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderCard(p) {
  const meta = TYPE_META[p.type] || { label: p.type, emoji: '🎬', accent: '#FF6B6B', grad: 'linear-gradient(135deg,#111827,#374151)' };
  const preview = p.promptText.replace(/\s+/g, ' ').slice(0, 260);
  return `
<article class="nb-card" data-type="${p.type}">
  <div class="nb-card-shadow"></div>
  <div class="nb-card-inner">
    <div class="nb-accent" style="background:${meta.accent}"></div>
    <a class="nb-media" href="prompts/${p.file.replace('.md','.html')}" style="background:${meta.grad}">
      <span class="nb-media-emoji">${meta.emoji}</span>
      <span class="nb-media-label">${meta.label}</span>
    </a>
    <div class="nb-body">
      <div class="nb-title-row">
        <span class="nb-type-chip" style="background:${meta.accent}22;border-color:#000;color:#000">${p.type}</span>
        ${p.duration ? `<span class="nb-duration">⏱ ${escapeHtml(p.duration)}</span>` : ''}
      </div>
      <h3 class="nb-title"><a href="prompts/${p.file.replace('.md','.html')}">${escapeHtml(p.title)}</a></h3>
      <a class="nb-snippet" href="prompts/${p.file.replace('.md','.html')}">
        <div class="nb-snippet-bar"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>PROMPT</div>
        <p class="nb-snippet-text">${escapeHtml(preview)}…</p>
      </a>
      ${p.technique ? `<p class="nb-technique">💡 ${escapeHtml(p.technique)}</p>` : ''}
      <div class="nb-footer">
        <a class="nb-btn-primary" href="prompts/${p.file.replace('.md','.html')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          Full Prompt
        </a>
        <div class="nb-tags">${p.tags.slice(0, 3).map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>
      </div>
    </div>
  </div>
</article>`;
}

function markdownToHtml(md) {
  let html = escapeHtml(md);
  html = html.replace(/^### (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)(?!\n<li>)/g, m => m.includes('<ul') ? m : '<ul>' + m + '</ul>');
  html = html.replace(/^\| (.+)\|$/gm, (m, row) => row); // flatten tables to text rows
  html = html.replace(/```text\n([\s\S]*?)\n```/g, (m, code) => `<pre><code>${code}</code></pre>`);
  html = html.replace(/```\n([\s\S]*?)\n```/g, (m, code) => `<pre><code>${code}</code></pre>`);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  html = html.replace(/^---$/gm, '<hr>');
  html = html.replace(/\n{2,}/g, '\n<p></p>\n');
  return html;
}

function renderDetail(p) {
  const meta = TYPE_META[p.type] || { label: p.type, emoji: '🎬', accent: '#FF6B6B' };
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(p.title)} — MiniMax H3 Prompts</title>
<link rel="stylesheet" href="../styles.css">
</head>
<body class="detail-page">
<nav class="nb-nav">
  <div class="nb-nav-inner">
    <a href="../index.html" class="nb-nav-back">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      All Prompts
    </a>
    <span class="nb-nav-type" style="background:${meta.accent}">${p.type}</span>
  </div>
</nav>
<main class="nb-detail">
  <header class="nb-detail-hero" style="background:${TYPE_META[p.type]?.grad || 'linear-gradient(135deg,#111827,#374151)'}">
    <span class="nb-detail-emoji">${meta.emoji}</span>
    <h1>${escapeHtml(p.title)}</h1>
  </header>
  <article class="nb-article">${markdownToHtml(p.content)}</article>
  <div class="nb-detail-actions">
    <a href="../index.html" class="nb-btn-secondary">← Back to Library</a>
    <button class="nb-btn-primary nb-copy-all" onclick="(function(btn){navigator.clipboard.writeText(document.querySelector('.nb-article pre code').textContent).then(function(){btn.textContent='✓ Copied!';setTimeout(function(){btn.textContent='Copy Prompt';},1500)})})(this)">Copy Prompt</button>
  </div>
</main>
<footer class="nb-footer-dark">
  <p>Prompts <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a> · Code <a href="https://github.com/violin86318/youmind-mini-max-h3-sync/blob/main/LICENSE" target="_blank">MIT</a> · <a href="https://github.com/violin86318/youmind-mini-max-h3-sync" target="_blank">GitHub</a></p>
</footer>
</body>
</html>`;
}

function buildSite() {
  const prompts = readPrompts();
  fs.mkdirSync(path.join(OUTPUT_DIR, 'prompts'), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'site', 'styles.css'), path.join(OUTPUT_DIR, 'styles.css'));

  prompts.forEach(p => {
    fs.writeFileSync(path.join(OUTPUT_DIR, 'prompts', p.file.replace('.md', '.html')), renderDetail(p));
  });

  const types = Object.keys(TYPE_META);
  const counts = types.map(t => ({ type: t, n: prompts.filter(p => p.type === t).length }));
  const cards = prompts.map(renderCard).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Awesome MiniMax H3 Prompts</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>

<header class="nb-hero">
  <nav class="nb-topbar">
    <div class="nb-topbar-inner">
      <a class="nb-logo" href="#">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
        H3 Prompts
      </a>
      <div class="nb-topbar-right">
        <a class="nb-topbtn" href="https://github.com/violin86318/youmind-mini-max-h3-sync" target="_blank">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#000"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.26 5.67.41.35.77 1.05.77 2.12v3.14c0 .31.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
          GitHub
        </a>
        <a class="nb-topbtn nb-topbtn-lime" href="https://huggingface.co/MiniMaxAI/MiniMax-H3" target="_blank">Model ↗</a>
      </div>
    </div>
  </nav>

  <div class="nb-hero-body">
    <div class="nb-hero-badge">🎬 OPEN SOURCE · VIDEO + AUDIO</div>
    <h1 class="nb-hero-title">
      <span class="line1">MINIMAX H3</span>
      <span class="line2">PROMPTS</span>
    </h1>
    <p class="nb-hero-sub">Structured shooting-script prompts for the open-source omnimodal video model with synchronized audio</p>

    <form class="nb-searchbox" onsubmit="return false">
      <input id="search" type="search" placeholder="Search ${prompts.length} prompts… (cinematic, dialogue, umbrella)" autocomplete="off">
      <button type="submit" aria-label="Search">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </button>
    </form>
  </div>
</header>

<div class="nb-filterwrap">
  <div class="nb-filters">
    <button class="nb-chip active" data-filter="all">ALL <b>${prompts.length}</b></button>
    ${counts.filter(c => c.n > 0).map(c => `<button class="nb-chip" data-filter="${c.type}" style="--chip:${TYPE_META[c.type].accent}">${c.type} <b>${c.n}</b></button>`).join('\n    ')}
  </div>
</div>

<main class="nb-main">
  <div class="nb-grid">
${cards}
  </div>
</main>

<footer class="nb-footer-dark">
  <div class="nb-footer-inner">
    <div>
      <p class="nb-footer-title">AWESOME MINIMAX H3 PROMPTS</p>
      <p>A community library for MiniMax's open-source omnimodal video model.</p>
    </div>
    <div class="nb-footer-links">
      <a href="https://huggingface.co/MiniMaxAI/MiniMax-H3" target="_blank">Model Weights ↗</a>
      <a href="https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md" target="_blank">Official Guide ↗</a>
      <a href="https://github.com/violin86318/youmind-mini-max-h3-sync/issues/new?template=submit-prompt.yml" target="_blank">Submit a Prompt</a>
      <a href="https://github.com/violin86318/youmind-mini-max-h3-sync" target="_blank">GitHub</a>
    </div>
  </div>
  <p class="nb-footer-bottom">Prompts CC BY 4.0 · Code MIT · Built for the MiniMax H3 community</p>
</footer>

<script>
document.querySelectorAll('.nb-chip').forEach(function(btn){
  btn.addEventListener('click', function(){
    document.querySelectorAll('.nb-chip').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    apply();
  });
});
var si = document.getElementById('search');
if (si) si.addEventListener('input', apply);
function apply(){
  var f = document.querySelector('.nb-chip.active').dataset.filter;
  var q = (si && si.value || '').toLowerCase();
  document.querySelectorAll('.nb-card').forEach(function(card){
    var okType = f === 'all' || card.dataset.type === f;
    var txt = card.textContent.toLowerCase();
    var okQ = !q || txt.indexOf(q) !== -1;
    card.style.display = (okType && okQ) ? '' : 'none';
  });
}
</script>
</body>
</html>`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), html);
  console.log(`Built site with ${prompts.length} prompts`);
}

buildSite();
