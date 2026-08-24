#!/usr/bin/env node
// Build static site — neo-brutalist design, 中文界面, 视频支持
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PROMPTS_DIR = path.join(ROOT, 'prompts');
const OUTPUT_DIR = path.join(ROOT, 'site', 'output');

const TYPE_META = {
  'T2VA': { label: '文生视频', emoji: '🎬', accent: '#FF6B6B', grad: 'linear-gradient(135deg,#5B21B6,#2563EB)' },
  'I2VA': { label: '图生视频', emoji: '🖼️', accent: '#4ECDC4', grad: 'linear-gradient(135deg,#2563EB,#0EA5E9)' },
  'FL2VA': { label: '首尾帧', emoji: '🎞️', accent: '#8B5CF6', grad: 'linear-gradient(135deg,#7C3AED,#DB2777)' },
  'L2VA': { label: '尾帧', emoji: '🎯', accent: '#FF9F1C', grad: 'linear-gradient(135deg,#D97706,#DC2626)' },
  'Full-Reference': { label: '全参考', emoji: '🔀', accent: '#C7FF4A', grad: 'linear-gradient(135deg,#059669,#2563EB)' },
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
    const descMatch = content.match(/#### 📖 描述\n\n([\s\S]*?)(?=\n#### )/);
    const description = descMatch ? descMatch[1].trim() : '';
    // 官方验证标记
    const official = /官方(可复现)?(验证|仓库)/.test(content) || file.includes('official');
    // 视频与封面
    const videoMatch = content.match(/<video[^>]*src="([^"]+)"[^>]*>/) || content.match(/<video[^>]*>/);
    const videoSrc = (content.match(/<video[^>]*\ssrc="([^"]+)"/) || [])[1] || '';
    const videoPoster = (content.match(/<video[^>]*\sposter="([^"]+)"/) || [])[1] || '';
    // 主 prompt 块
    const promptMatch = content.match(/```text\n([\s\S]*?)\n```/);
    const promptText = promptMatch ? promptMatch[1].trim() : '';
    const tagsMatch = content.match(/- \*\*标签:\*\*\s*(.+)/) || content.match(/\*\*Tags:\*\*\s*(.+)/);
    const tags = tagsMatch ? tagsMatch[1].split(/[,，]/).map(t => t.trim()).filter(Boolean) : [];
    const techMatch = content.match(/- \*\*核心技巧:\*\*\s*(.+)/) || content.match(/\*\*Key technique:\*\*\s*(.+)/);
    const technique = techMatch ? techMatch[1].trim() : '';
    const durMatch = content.match(/- \*\*时长:\*\*\s*(.+)/) || content.match(/\*\*Duration:\*\*\s*(.+)/);
    const duration = durMatch ? durMatch[1].trim() : '';
    return { file, title, type, description, promptText, tags, technique, duration, video: videoSrc, videoPoster, official, content };
  }).sort((a, b) => (b.official - a.official)); // 官方案例排前
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderCard(p) {
  const meta = TYPE_META[p.type] || { label: p.type, emoji: '🎬', accent: '#FF6B6B', grad: 'linear-gradient(135deg,#111827,#374151)' };
  const href = `prompts/${p.file.replace('.md', '.html')}`;
  const preview = p.promptText.replace(/\s+/g, ' ').slice(0, 240);

  let media;
  if (p.video) {
    const posterAttr = p.videoPoster ? ` poster="${p.videoPoster}"` : '';
    media = `<a class="nb-media nb-media-video" href="${href}" style="background:${meta.grad}">
      <video muted loop autoplay playsinline preload="metadata"${posterAttr} src="${p.video}"></video>
      <span class="nb-media-label">${p.official ? '✅ 官方验证' : meta.label}</span>
    </a>`;
  } else {
    media = `<a class="nb-media" href="${href}" style="background:${meta.grad}">
      <span class="nb-media-emoji">${meta.emoji}</span>
      <span class="nb-media-label">${meta.label}</span>
    </a>`;
  }

  return `
<article class="nb-card" data-type="${p.type}" data-tags="${escapeHtml(p.tags.join(','))}${p.official ? ' 官方' : ''}">
  <div class="nb-card-shadow"></div>
  <div class="nb-card-inner">
    <div class="nb-accent" style="background:${meta.accent}"></div>
    ${media}
    <div class="nb-body">
      <div class="nb-title-row">
        <div class="nb-title-chips">
          <span class="nb-type-chip" style="background:${meta.accent}22;color:#000;border-color:#000">${p.type}</span>
          ${p.official ? '<span class="nb-official-chip">✅ 官方验证</span>' : ''}
        </div>
        ${p.duration ? `<span class="nb-duration">⏱ ${escapeHtml(p.duration)}</span>` : ''}
      </div>
      <h3 class="nb-title"><a href="${href}">${escapeHtml(p.title)}</a></h3>
      <p class="nb-desc">${escapeHtml(p.description.slice(0, 90))}${p.description.length > 90 ? '…' : ''}</p>
      <a class="nb-snippet" href="${href}">
        <div class="nb-snippet-bar"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>完整提示词</div>
        <p class="nb-snippet-text">${escapeHtml(preview)}…</p>
      </a>
      ${p.technique ? `<p class="nb-technique">💡 ${escapeHtml(p.technique)}</p>` : ''}
      <div class="nb-footer">
        <a class="nb-btn-primary" href="${href}">查看完整提示词
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <div class="nb-tags">${p.tags.slice(0, 3).map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>
      </div>
    </div>
  </div>
</article>`;
}

function markdownToHtml(md) {
  // Protect video tags before escaping
  const videos = [];
  md = md.replace(/<video[^>]*>[\s\S]*?<\/video>|<video[^>]*\/?>/g, m => {
    videos.push(m);
    return `\u0000VIDEO${videos.length - 1}\u0000`;
  });

  let html = escapeHtml(md);
  html = html.replace(/^### (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');
  html = html.replace(/^- (.+)$/gm, '<li data-md-li>$1</li>\n');
  html = html.replace(/(<li data-md-li>[\s\S]*?<\/li>\n)(?!(<li data-md-li>|\u0000))/g, m => '<ul>' + m + '</ul>');
  html = html.replace(/<\/li>\n<li data-md-li>/g, '</li><li data-md-li>');
  html = html.replace(/```text\n([\s\S]*?)\n```/g, (m, code) => `<pre><code>${code}</code></pre>`);
  html = html.replace(/```\n([\s\S]*?)\n```/g, (m, code) => `<pre><code>${code}</code></pre>`);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  html = html.replace(/^---$/gm, '<hr>');
  html = html.replace(/\n{2,}/g, '\n');
  // Restore videos
  html = html.replace(/\u0000VIDEO(\d+)\u0000/g, (m, i) => videos[Number(i)]);
  return html;
}

function renderDetail(p) {
  const meta = TYPE_META[p.type] || { label: p.type, emoji: '🎬', accent: '#FF6B6B', grad: 'linear-gradient(135deg,#111827,#374151)' };
  const rawPrompt = p.promptText.replace(/<\/?script/gi, '');
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(p.title)} — MiniMax H3 提示词库</title>
<link rel="stylesheet" href="../styles.css">
</head>
<body class="detail-page">
<nav class="nb-nav">
  <div class="nb-nav-inner">
    <a href="../index.html" class="nb-nav-back">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      返回列表
    </a>
    <span class="nb-nav-type" style="background:${meta.accent}">${p.type} · ${meta.label}</span>
  </div>
</nav>
<main class="nb-detail">
  <header class="nb-detail-hero" style="background:${meta.grad}">
    <span class="nb-detail-emoji">${meta.emoji}</span>
    <h1>${escapeHtml(p.title)}</h1>
    <p class="nb-detail-sub">${escapeHtml(p.description.slice(0, 120))}</p>
  </header>
  <article class="nb-article">
${markdownToHtml(p.content).replace(/(src|poster)="assets\//g, '$1="../assets/')}
  </article>
  <div class="nb-detail-actions">
    <button class="nb-btn-primary nb-copy-btn" data-prompt-id="prompt-${p.file}">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      复制完整提示词
    </button>
    <a href="../index.html" class="nb-btn-secondary">← 浏览全部提示词</a>
  </div>
  <script type="application/json" id="prompt-${p.file}">${JSON.stringify(rawPrompt)}</script>
</main>
<footer class="nb-footer-dark">
  <p class="nb-footer-bottom">提示词遵循 CC BY 4.0 · 代码 MIT · 为 MiniMax H3 社区而建 · <a href="https://github.com/violin86318/youmind-mini-max-h3-sync" target="_blank">GitHub</a></p>
</footer>
<script>
document.querySelectorAll('.nb-copy-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    var el = document.querySelector('script[type="application/json"]');
    var text = JSON.parse(el.textContent);
    navigator.clipboard.writeText(text).then(function(){
      var old = btn.innerHTML;
      btn.innerHTML = '✓ 已复制到剪贴板';
      setTimeout(function(){ btn.innerHTML = old; }, 1600);
    });
  });
});
</script>
</body>
</html>`;
}

function copyAssets() {
  const ASSETS = path.join(ROOT, 'site', 'output', 'assets');
  fs.rmSync(ASSETS, { recursive: true, force: true });
  // 资源源目录：本地 site/assets（含 videos/posters）
  const SRC = path.join(ROOT, 'site', 'assets');
  if (!fs.existsSync(SRC)) return;
  fs.mkdirSync(path.join(ASSETS, 'videos'), { recursive: true });
  fs.mkdirSync(path.join(ASSETS, 'posters'), { recursive: true });
  for (const dir of ['videos', 'posters']) {
    const d = path.join(SRC, dir);
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d)) {
      fs.copyFileSync(path.join(d, f), path.join(ASSETS, dir, f));
    }
  }
}

function buildSite() {
  const prompts = readPrompts();
  fs.mkdirSync(path.join(OUTPUT_DIR, 'prompts'), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'site', 'styles.css'), path.join(OUTPUT_DIR, 'styles.css'));
  copyAssets();

  prompts.forEach(p => {
    fs.writeFileSync(path.join(OUTPUT_DIR, 'prompts', p.file.replace('.md', '.html')), renderDetail(p));
  });

  const types = Object.keys(TYPE_META);
  const counts = types.map(t => ({ type: t, n: prompts.filter(p => p.type === t).length }));
  const cards = prompts.map(renderCard).join('\n');
  const nOfficial = prompts.filter(p => p.official).length;

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MiniMax H3 提示词库 — 开源全模态视频模型结构化 Prompt 合集</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>

<header class="nb-hero">
  <nav class="nb-topbar">
    <div class="nb-topbar-inner">
      <a class="nb-logo" href="#">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
        H3 提示词库
      </a>
      <div class="nb-topbar-right">
        <a class="nb-topbtn" href="https://github.com/violin86318/youmind-mini-max-h3-sync" target="_blank">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#000"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.26 5.67.41.35.77 1.05.77 2.12v3.14c0 .31.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
          GitHub
        </a>
        <a class="nb-topbtn nb-topbtn-lime" href="https://huggingface.co/MiniMaxAI/MiniMax-H3" target="_blank">开源模型 ↗</a>
      </div>
    </div>
  </nav>

  <div class="nb-hero-body">
    <div class="nb-hero-badge">🎬 开源 · 视频 + 音频同步生成</div>
    <h1 class="nb-hero-title">
      <span class="line1">MINIMAX H3</span>
      <span class="line2">提示词库</span>
    </h1>
    <p class="nb-hero-sub">为开源全模态视频模型 MiniMax H3 精选的结构化分镜提示词合集——含官方验证案例与社区实战技巧</p>

    <form class="nb-searchbox" onsubmit="return false">
      <input id="search" type="search" placeholder="搜索 ${prompts.length} 条提示词…（电影感、对白、撑伞）" autocomplete="off">
      <button type="submit" aria-label="搜索">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </button>
    </form>
  </div>
</header>

<div class="nb-filterwrap">
  <div class="nb-filters">
    <button class="nb-chip active" data-filter="all">全部 <b>${prompts.length}</b></button>
    ${counts.filter(c => c.n > 0).map(c => `<button class="nb-chip" data-filter="${c.type}" style="--chip:${TYPE_META[c.type].accent}">${TYPE_META[c.type].label} <b>${c.n}</b></button>`).join('\n    ')}
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
      <p class="nb-footer-title">MINIMAX H3 提示词库</p>
      <p>为 MiniMax 开源全模态视频模型建设的社区提示词库。含 ${nOfficial} 个官方验证的可复现案例（提示词 + 视频一一对应），覆盖文生视频、图生视频、首尾帧、尾帧与全参考五大模式。</p>
    </div>
    <div class="nb-footer-links">
      <a href="https://huggingface.co/MiniMaxAI/MiniMax-H3" target="_blank">开源模型权重 ↗</a>
      <a href="https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md" target="_blank">官方提示词指南 ↗</a>
      <a href="https://github.com/violin86318/youmind-mini-max-h3-sync/issues/new?template=submit-prompt.yml" target="_blank">提交提示词</a>
      <a href="https://github.com/violin86318/youmind-mini-max-h3-sync" target="_blank">GitHub 仓库</a>
    </div>
  </div>
  <p class="nb-footer-bottom">提示词遵循 CC BY 4.0 协议 · 代码 MIT 协议 · 为 MiniMax H3 社区而建</p>
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
    var okQ = !q || txt.indexOf(q) !== -1 || card.dataset.tags.indexOf(q) !== -1;
    card.style.display = (okType && okQ) ? '' : 'none';
  });
}
// 卡片视频：进入视口才播放，省流量
var vids = document.querySelectorAll('.nb-media-video video');
if ('IntersectionObserver' in window && vids.length) {
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      var v = e.target;
      if (e.isIntersecting) { v.play().catch(function(){}); }
      else { v.pause(); }
    });
  }, { threshold: 0.4 });
  vids.forEach(function(v){ io.observe(v); });
}
</script>
</body>
</html>`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), html);
  console.log(`Built site with ${prompts.length} prompts (${prompts.filter(p => p.video).length} with video)`);
}

buildSite();
