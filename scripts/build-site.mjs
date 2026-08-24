#!/usr/bin/env node
// Build static site from prompt files — v2 with beautiful design
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PROMPTS_DIR = path.join(ROOT, 'prompts');
const OUTPUT_DIR = path.join(ROOT, 'site', 'output');

// Parse prompt files with ### header format
function readPrompts() {
  const files = fs.readdirSync(PROMPTS_DIR).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(PROMPTS_DIR, file, ), 'utf-8');
    const lines = content.split('\n');
    
    // Extract title from ### header
    let title = file.replace('.md', '');
    let type = '';
    const typeMatch = file.match(/^(T2VA|I2VA|FL2VA|L2VA|FullReference)-/);
    if (typeMatch) {
      type = typeMatch[1] === 'FullReference' ? 'Full-Reference' : typeMatch[1];
    }
    
    for (const line of lines) {
      if (line.startsWith('### ')) {
        title = line.slice(4).trim();
        // Remove type prefix from title
        title = title.replace(/^(T2VA|I2VA|FL2VA|L2VA|Full-Reference):\s*/, '');
        break;
      }
    }
    
    // Extract description
    let description = '';
    const descMatch = content.match(/#### 📖 Description\n\n([\s\S]*?)(?=\n#### )/);
    if (descMatch) description = descMatch[1].trim();
    
    // Extract tags
    const tagsMatch = content.match(/\*\*Tags:\*\*\s*(.+)/);
    const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()) : [];
    
    // Extract source
    const sourceMatch = content.match(/\*\*Source:\*\*\s*(.+)/);
    const source = sourceMatch ? sourceMatch[1].trim() : '';
    
    // Extract key technique
    const techniqueMatch = content.match(/\*\*Key technique:\*\*\s*(.+)/);
    const technique = techniqueMatch ? techniqueMatch[1].trim() : '';
    
    // Extract duration
    const durationMatch = content.match(/\*\*Duration:\*\*\s*(.+)/);
    const duration = durationMatch ? durationMatch[1].trim() : '';
    
    return { file, title, type, description, tags, source, technique, duration, content };
  });
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderPromptCard(p) {
  const typeColors = {
    'T2VA': '#6366f1',
    'I2VA': '#8b5cf6',
    'FL2VA': '#ec4899',
    'L2VA': '#f59e0b',
    'Full-Reference': '#10b981'
  };
  const color = typeColors[p.type] || '#6b7280';
  
  return `
    <article class="prompt-card" data-type="${p.type}" data-tags="${p.tags.join(',')}">
      <div class="card-accent" style="background:${color}"></div>
      <div class="card-body">
        <div class="card-top">
          <span class="type-badge" style="background:${color}20;color:${color};border:1px solid ${color}40">${p.type}</span>
          ${p.duration ? `<span class="duration-badge">${escapeHtml(p.duration)}</span>` : ''}
        </div>
        <h3 class="card-title"><a href="prompts/${p.file}">${escapeHtml(p.title)}</a></h3>
        <p class="card-desc">${escapeHtml(p.description.slice(0, 150))}${p.description.length > 150 ? '...' : ''}</p>
        ${p.technique ? `<p class="card-technique">💡 ${escapeHtml(p.technique)}</p>` : ''}
        <div class="card-tags">
          ${p.tags.slice(0, 4).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
        </div>
      </div>
    </article>`;
}

function renderDetailPage(p) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(p.title)} — MiniMax H3 Prompts</title>
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <nav class="top-nav">
    <a href="../index.html" class="nav-brand">← Back to Library</a>
  </nav>
  <main class="detail-main">
    <article class="detail-article">
      ${p.content}
    </article>
  </main>
  <footer>
    <p>Prompts: CC BY 4.0 | <a href="https://github.com/violin86318/youmind-mini-max-h3-sync">GitHub</a></p>
  </footer>
</body>
</html>`;
}

function buildSite() {
  const prompts = readPrompts();
  const types = ['T2VA', 'I2VA', 'FL2VA', 'L2VA', 'Full-Reference'];
  
  // Ensure output dirs exist
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(path.join(OUTPUT_DIR, 'prompts'), { recursive: true });
  
  // Copy CSS
  fs.copyFileSync(path.join(ROOT, 'site', 'styles.css'), path.join(OUTPUT_DIR, 'styles.css'));
  
  // Generate individual prompt pages
  prompts.forEach(p => {
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'prompts', p.file.replace('.md', '.html')),
      renderDetailPage(p)
    );
  });
  
  // Generate cards
  const cards = prompts.map(renderPromptCard).join('\n');
  
  // Type counts
  const typeCounts = types.map(t => ({
    type: t,
    count: prompts.filter(p => p.type === t).length
  }));
  
  const totalPrompts = prompts.length;
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Awesome MiniMax H3 Prompts — Structured Prompt Library</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="bg-gradient"></div>
  
  <header class="hero">
    <div class="hero-content">
      <div class="hero-badge">🎬 Open Source Prompt Library</div>
      <h1>Awesome MiniMax H3 Prompts</h1>
      <p class="hero-subtitle">A curated collection of structured shooting-script prompts for <a href="https://huggingface.co/MiniMaxAI/MiniMax-H3" target="_blank">MiniMax H3</a> — the open-source omnimodal video generation model with synchronized audio</p>
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-number">${totalPrompts}</span>
          <span class="stat-label">Prompts</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">5</span>
          <span class="stat-label">Modes</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">11</span>
          <span class="stat-label">Languages</span>
        </div>
      </div>
    </div>
  </header>

  <nav class="filter-bar">
    <div class="filter-inner">
      <button class="filter-btn active" data-filter="all">All <span class="count">${totalPrompts}</span></button>
      ${typeCounts.map(t => `<button class="filter-btn" data-filter="${t.type}">${t.type} <span class="count">${t.count}</span></button>`).join('\n      ')}
      <input type="search" id="search" placeholder="Search prompts..." class="search-input">
    </div>
  </nav>

  <main class="container">
    <div class="prompt-grid">
      ${cards}
    </div>
  </main>

  <footer>
    <div class="footer-content">
      <p>Prompts: <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> · Code: <a href="https://github.com/violin86318/youmind-mini-max-h3-sync/blob/main/LICENSE">MIT</a></p>
      <p><a href="https://github.com/violin86318/youmind-mini-max-h3-sync">GitHub</a> · Built for the MiniMax H3 community</p>
    </div>
  </footer>

  <script>
    // Filter by type
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilters();
      });
    });
    
    // Search
    document.getElementById('search').addEventListener('input', applyFilters);
    
    function applyFilters() {
      const filter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
      const query = document.getElementById('search').value.toLowerCase();
      document.querySelectorAll('.prompt-card').forEach(card => {
        const matchesType = filter === 'all' || card.dataset.type === filter;
        const matchesSearch = !query || 
          card.querySelector('.card-title')?.textContent.toLowerCase().includes(query) ||
          card.querySelector('.card-desc')?.textContent.toLowerCase().includes(query) ||
          card.dataset.tags.toLowerCase().includes(query);
        card.style.display = (matchesType && matchesSearch) ? '' : 'none';
      });
    }
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), html);
  console.log(`✅ Built site with ${prompts.length} prompts`);
}

buildSite();
