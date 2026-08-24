#!/usr/bin/env node
// Build static site from prompt files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PROMPTS_DIR = path.join(ROOT, 'prompts');
const OUTPUT_DIR = path.join(ROOT, 'site', 'output');

function readPrompts() {
  const files = fs.readdirSync(PROMPTS_DIR).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(PROMPTS_DIR, file), 'utf-8');
    const frontmatter = {};
    if (content.startsWith('---')) {
      const end = content.indexOf('---', 3);
      const fm = content.slice(3, end);
      for (const line of fm.split('\n')) {
        const match = line.match(/^(\w+):\s*(.+)$/);
        if (match) frontmatter[match[1]] = match[2].replace(/^["']|["']$/g, '');
      }
    }
    return { file, frontmatter, content };
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderPromptCard(p) {
  const fm = p.frontmatter;
  const tags = (fm.tags || '').split(',').map(t => t.trim()).filter(Boolean);
  return `
    <div class="prompt-card" data-type="${fm.type || ''}">
      <div class="prompt-header">
        <h3><a href="prompts/${p.file}">${escapeHtml(fm.title || p.file)}</a></h3>
        <span class="badge badge-${(fm.type || '').toLowerCase()}">${fm.type || 'Unknown'}</span>
      </div>
      <div class="prompt-meta">
        <span>Source: ${escapeHtml(fm.source || 'Unknown')}</span>
        <span>Submitted: ${escapeHtml(fm.submitted || 'Unknown')}</span>
      </div>
      <div class="prompt-tags">
        ${tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
      </div>
    </div>`;
}

function buildSite() {
  const prompts = readPrompts();
  const types = ['T2VA', 'I2VA', 'FL2VA', 'L2VA', 'Full-Reference'];

  const cards = prompts.map(renderPromptCard).join('\n');

  const typeCounts = types.map(t => ({
    type: t,
    count: prompts.filter(p => p.frontmatter.type === t).length
  }));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Awesome MiniMax H3 Prompts</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>🎬 Awesome MiniMax H3 Prompts</h1>
    <p class="subtitle">Structured prompts for MiniMax AI's open-source video generation model</p>
    <div class="stats">
      ${typeCounts.map(t => `<div class="stat"><span class="stat-count">${t.count}</span><span class="stat-label">${t.type}</span></div>`).join('')}
    </div>
  </header>

  <nav class="filter-bar">
    <button class="filter-btn active" data-filter="all">All</button>
    ${types.map(t => `<button class="filter-btn" data-filter="${t}">${t}</button>`).join('\n')}
  </nav>

  <main>
    <div class="prompt-grid">
      ${cards}
    </div>
  </main>

  <footer>
    <p>Prompts: CC BY 4.0 | <a href="https://github.com/violin86318/youmind-mini-max-h3-sync">GitHub</a></p>
  </footer>

  <script>
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.prompt-card').forEach(card => {
          card.style.display = (filter === 'all' || card.dataset.type === filter) ? '' : 'none';
        });
      });
    });
  </script>
</body>
</html>`;

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), html);
  console.log(`Built site with ${prompts.length} prompts`);
}

buildSite();
