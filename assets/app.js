/* Miraio — app.js v3 (clean rewrite) */
'use strict';

// ── DATA ─────────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  { id:1, name:'Solo Business AI', slug:'solo-business-ai', category:'AI Agent Suite',
    desc:'14 specialized AI agents that run your entire solo business — research, strategy, sales, legal, finance, and more.',
    price:97, priceType:'one-time', currency:'$', badge:'Bestseller', status:'active', featured:true, emoji:'🤖',
    features:['14 AI Agents','Voice + Text Chatbot','Onboarding Wizard','ROI Dashboard','EN/JP/VI Languages'],
    tech:['Claude API','Claude Cowork','n8n','localStorage'],
    demoUrl:'contact.html', buyUrl:'contact.html', detailUrl:'product-detail.html?id=1',
    stripeUrl:'', rating:4.9, reviews:127, tags:['AI Agent','Solo Business','Japan Market'],
    long_desc:'The complete AI operating system for solopreneurs. 14 specialized agents handle research, strategy, sales, legal, finance — in Japanese, English, and Vietnamese.' },
  { id:2, name:'Japan DX Analyzer', slug:'japan-dx-analyzer', category:'Market Intelligence',
    desc:'Deep-dive AI analysis of Japanese companies for DX consulting and IT outsourcing opportunities.',
    price:197, priceType:'one-time', currency:'$', badge:'New', status:'active', featured:true, emoji:'🏯',
    features:['Company DX audit','Pain point mapping','Keigo proposals','Japanese output'],
    tech:['Claude API','Perplexity','Web Research','Japanese NLP'],
    demoUrl:'contact.html', buyUrl:'contact.html', detailUrl:'product-detail.html?id=2',
    stripeUrl:'', rating:4.8, reviews:43, tags:['Japan','DX','IT Consulting'],
    long_desc:'Purpose-built for IT consultants targeting the Japanese market. Analyze company readiness, generate proposals in keigo, map the right stakeholders.' },
  { id:3, name:'AI Impact Dashboard', slug:'ai-impact-dashboard', category:'Analytics',
    desc:'Track and visualize your AI ROI across teams. Built for weekly leadership reporting.',
    price:149, priceType:'one-time', currency:'$', badge:'', status:'active', featured:false, emoji:'📊',
    features:['Multi-team import','KPI charts','BoD report export','EN/JP bilingual'],
    tech:['Claude API','SheetJS','Chart.js','Excel/CSV'],
    demoUrl:'contact.html', buyUrl:'contact.html', detailUrl:'product-detail.html?id=3',
    stripeUrl:'', rating:4.7, reviews:31, tags:['Analytics','Dashboard'],
    long_desc:'Aggregate AI weekly reports, visualize impact, and auto-generate Board of Directors reports.' },
  { id:4, name:'Morning Briefing Agent', slug:'morning-briefing', category:'Automation',
    desc:'Automated 7am daily brief — pipeline, invoices, and priorities in 3 minutes.',
    price:47, priceType:'one-time', currency:'$', badge:'', status:'active', featured:false, emoji:'🌅',
    features:['Auto-runs at 7am','Pipeline alerts','Invoice tracking','Priority digest'],
    tech:['Claude API','Scheduling','CRM Integration','Email'],
    demoUrl:'contact.html', buyUrl:'contact.html', detailUrl:'product-detail.html?id=4',
    stripeUrl:'', rating:4.9, reviews:89, tags:['Automation','Daily Planning'],
    long_desc:'Every morning at 7am your AI chief of staff reads your pipeline, tracks overdue invoices, and delivers a 3-minute briefing.' }
];

const DEFAULT_REVIEWS = [
  { id:1, tool:'Claude claude-sonnet-4-6', company:'Anthropic', rating:5, category:'LLM',
    headline:'Best AI for business writing & Japan market',
    excerpt:'Excellent Japanese language support, long context window, and strong business reasoning. Our top pick for solopreneurs targeting the Japanese market.',
    long_review:'After 6+ months of daily use across solo business operations, Claude claude-sonnet-4-6 stands out as the clear leader for business AI — especially for Japan-market work. The 200K token context window means you can feed entire contracts, research reports, or email chains and get coherent, nuanced responses. Japanese output quality is exceptional: proper keigo, natural business register, accurate kanji usage. For tasks like drafting proposals, analyzing competitor reports, and running multi-step agent workflows, it consistently outperforms alternatives. The API cost can add up at scale, but for a solo operator processing 50-100 tasks/day, the ROI is overwhelmingly positive.',
    pros:['Excellent Japanese language (keigo, business register)','200K token context window','Superior business reasoning & writing','Fast API response times','Anthropic Constitutional AI safety'], cons:['API cost climbs at high volume','No built-in image generation','Requires API setup for automation'],
    score:94, emoji:'🤖', affiliate:true, affiliateUrl:'https://anthropic.com', date:'2026-05', tags:['LLM'],
    criteria:[
      { label:'Performance & Quality', score:98 },
      { label:'Ease of Use', score:86 },
      { label:'Value for Money', score:80 },
      { label:'Japan Market Support', score:97 },
      { label:'Business Impact', score:96 }
    ],
    verdict:'#1 recommended LLM for solo business operators in Japan market. Nothing else comes close for Japanese-language business tasks.' },
  { id:2, tool:'n8n', company:'n8n GmbH', rating:4.5, category:'Automation',
    headline:'Best open-source workflow automation',
    excerpt:'Self-hostable, 400+ integrations, excellent for connecting Claude with your business tools. The backbone of our AI automation stack.',
    long_review:'n8n has become the orchestration layer of choice for our entire AI agent system. The visual workflow builder makes complex multi-step automations understandable and maintainable. The Claude node works natively. Self-hosting on a $10/month VPS means zero recurring SaaS cost. The 400+ integrations cover CRM (HubSpot, Pipedrive), email (Gmail, Outlook), calendars, spreadsheets, and virtually every API you\'d need. The learning curve is real — expect 2-3 weeks to become fluent — but once you are, you can automate anything. We run 12+ live workflows including lead scoring, follow-up cadences, invoice generation, and morning briefings.',
    pros:['Open source — self-hostable','400+ built-in integrations','Visual node editor','Native Claude/OpenAI nodes','Active community'], cons:['Steep initial learning curve','Complex flows need careful error handling','Self-hosting requires some DevOps'],
    score:88, emoji:'⚙️', affiliate:true, affiliateUrl:'https://n8n.io', date:'2026-04', tags:['Automation'],
    criteria:[
      { label:'Performance & Reliability', score:90 },
      { label:'Ease of Use', score:72 },
      { label:'Value for Money', score:97 },
      { label:'Integration Depth', score:98 },
      { label:'Business Impact', score:88 }
    ],
    verdict:'Best choice if you want full control of your automation stack. The self-hosting option alone justifies the learning investment.' },
  { id:3, tool:'Cursor', company:'Anysphere', rating:4.7, category:'Dev Tools',
    headline:'AI-first code editor for rapid MVP development',
    excerpt:'Cuts MVP development time by 60-70%. Claude and GPT-4 built-in. Essential for our AI Product Builder clients.',
    long_review:'Cursor transforms solo product development. The AI pair programming capabilities — especially the Composer mode for multi-file edits — let a non-specialist build production-grade code at speeds previously requiring a full dev team. We\'ve shipped 4 client MVPs using Cursor this year, each in under 2 weeks. The Claude integration is particularly strong: you can describe a feature in natural language and watch entire components materialize. Tab autocomplete is the best in class. The $20/month subscription is the easiest ROI calculation in our stack — it pays for itself in the first hour of use each month.',
    pros:['Claude & GPT-4 built-in','Multi-file AI editing (Composer)','Best-in-class tab autocomplete','Fast iteration cycles','Privacy mode available'], cons:['$20/month subscription','Occasional context window limits on large codebases','Learning to prompt well takes time'],
    score:91, emoji:'💻', affiliate:true, affiliateUrl:'https://cursor.sh', date:'2026-04', tags:['Dev Tools'],
    criteria:[
      { label:'AI Code Quality', score:95 },
      { label:'Ease of Use', score:91 },
      { label:'Value for Money', score:80 },
      { label:'Speed & Performance', score:92 },
      { label:'Business Impact', score:94 }
    ],
    verdict:'Essential for anyone building AI-powered products. The productivity multiplier is real — 60-70% faster MVP development vs. traditional tools.' },
  { id:4, tool:'Perplexity Pro', company:'Perplexity AI', rating:4.4, category:'Research',
    headline:'AI-powered research with real-time web access',
    excerpt:'Replaces Google for 80% of research tasks. Sources are cited, answers are synthesized. Great for market research and competitor analysis.',
    long_review:'Perplexity Pro has become our default research starting point. For market research, competitor monitoring, and due diligence, it synthesizes information from multiple sources with proper citations — eliminating the need to manually cross-reference 10+ tabs. The Pro tier adds Claude integration and higher usage limits. Japanese web sources are included in searches, making it useful for Japan market research. It\'s not a replacement for deep primary research, but for the 80% of quick-answer research tasks, it\'s 5x faster than traditional search.',
    pros:['Real-time web search with citations','Synthesized answers (not just links)','Japanese web sources included','Claude integration on Pro','Collections for ongoing research'], cons:['Not a substitute for deep primary research','$20/month Pro cost','Occasional source quality issues'],
    score:85, emoji:'🔍', affiliate:false, affiliateUrl:'https://perplexity.ai', date:'2026-03', tags:['Research','LLM'],
    criteria:[
      { label:'Research Quality', score:89 },
      { label:'Ease of Use', score:95 },
      { label:'Value for Money', score:82 },
      { label:'Japan Market Support', score:78 },
      { label:'Business Impact', score:85 }
    ],
    verdict:'Replace Google for 80% of your research tasks. The time savings are immediate and the citation format makes it easy to verify claims.' }
];

const DEFAULT_RESOURCES = [
  { id:1, type:'Blog', title:'How to Build a 14-Agent AI System for Solo Business', excerpt:'Step-by-step guide to designing specialized AI agents for every business function — from research to legal to finance.', date:'2026-05-10', readTime:'8 min', tags:['AI Agents','Solo Business'],
    body:'<h3>Why 14 Agents?</h3><p>A solo business has 8–14 distinct functional areas: research, strategy, copywriting, sales, product building, customer support, analytics, and admin. Each requires different prompting patterns, memory structures, and output formats.</p><h3>The Architecture</h3><p>The system uses 3 tiers: (1) an orchestrator that routes tasks, (2) specialized agents that execute, and (3) a shared data layer (localStorage or Supabase) that all agents read/write. This prevents silos and lets agents hand off to each other.</p><h3>Key Design Principles</h3><p><strong>Single Source of Truth:</strong> All agents access the same CRM, product catalog, and brand settings. <strong>Human-in-the-loop checkpoints:</strong> Before sending emails, signing contracts, or deploying code, you review and approve. <strong>Modular design:</strong> Each agent is swappable. Upgrade one without breaking others.</p><h3>Getting Started</h3><p>Begin with 3 agents: Research, Copywriter, Admin. Get these running smoothly for 2 weeks before adding Sales and Finance. Rushing to 14 agents before mastering 3 leads to a brittle system.</p>' },
  { id:2, type:'Prompt', title:'Mega Prompt: Japanese Business Email in Keigo', excerpt:'Complete template for writing formal Japanese business emails with proper honorifics, structure, and cultural nuance.', date:'2026-05-08', readTime:'2 min', tags:['Japanese','Email'],
    body:'<h3>The Prompt</h3><pre style="background:var(--bg3);padding:16px;border-radius:10px;font-size:12px;white-space:pre-wrap;line-height:1.7">You are a senior Japanese business communication specialist with 20+ years in corporate Japan.\n\nWrite a formal business email in Japanese for the following situation:\n[SITUATION: describe your specific context]\n\nRequirements:\n- Use appropriate keigo (敬語) level: [socho/kenjogo/teineigo]\n- Recipient: [Title + Company name]\n- Purpose: [Request/Proposal/Follow-up/Introduction]\n- Key points to convey: [list 2-3 points]\n- Desired outcome: [what you want recipient to do]\n\nFormat:\n- Subject line (件名)\n- Opening salutation (拝啓 or お世話になっております)\n- Body in 3 paragraphs\n- Closing (敬具 or 何卒よろしくお願い申し上げます)\n- Signature block\n\nAlso provide an English translation and 2-3 cultural notes explaining key choices.</pre><h3>Tips for Use</h3><p>Replace all [brackets] with your specific details. For cold outreach to executives, use 拝啓...敬具 framing. For ongoing relationships, お世話になっております is appropriate. Always have a Japanese native speaker review output before sending to top-tier clients.</p>' },
  { id:3, type:'Guide', title:'DX Consulting in Japan: Complete Playbook 2026', excerpt:'Everything about selling digital transformation consulting to Japanese SMEs — from entry strategy to proposal writing to closing.', date:'2026-05-05', readTime:'15 min', tags:['Japan','DX'],
    body:'<h3>Understanding the Japanese SME DX Opportunity</h3><p>Japan has 3.5 million SMEs, ~70% of which have not meaningfully digitized core operations. Government subsidies (IT導入補助金, DX促進税制) cover up to 75% of implementation costs, dramatically reducing the sales barrier for consultants.</p><h3>The Nemawashi Sales Process</h3><p>Japanese enterprise sales rarely happen in a single meeting. Typical cycle: (1) Warm introduction via紹介 (introduction), (2) 2-3 discovery meetings to build trust, (3) Proposal in Japanese with detailed spec, (4) Nemawashi — consensus-building internally at client, (5) Formal approval. Expect 3-6 months for first contract.</p><h3>What Problems to Solve First</h3><p>Lead with these guaranteed pain points: manual Excel-based reporting, paper invoicing, siloed communication (Fax still common), no centralized customer database. These are safe entry points with measurable ROI.</p><h3>Pricing in Japan</h3><p>Japanese SMEs respond well to monthly retainer models (月額固定) rather than project-based pricing. Typical entry: ¥300K–¥500K/month. Package as 安心サポート (peace-of-mind support) not "consulting." The word consultant (コンサルタント) carries a negative connotation of expensive and abstract advice.</p>' },
  { id:4, type:'News', title:'Claude claude-sonnet-4-6: What Changes for Business AI?', excerpt:'Analysis of the latest Claude model — what improved, what matters for Japan market work, and how to update your prompts.', date:'2026-05-03', readTime:'5 min', tags:['Claude','LLM'],
    body:'<h3>What\'s New in claude-sonnet-4-6</h3><p>Anthropic\'s claude-sonnet-4-6 brings meaningful improvements for business use cases: significantly better instruction following on complex multi-step tasks, stronger Japanese output quality (especially formal register), and improved consistency on structured output (JSON, tables, reports).</p><h3>Japan Market Impact</h3><p>Japanese keigo accuracy has noticeably improved. In our tests, claude-sonnet-4-6 correctly uses 尊敬語 vs 謙譲語 95% of the time without explicit instruction — up from ~80% in previous versions. Business proposal writing in Japanese is now production-ready without manual editing for most use cases.</p><h3>What to Update in Your Prompts</h3><p>You can now be less explicit about output structure in Japanese — the model infers appropriate business formatting. However, for multi-agent systems, keep explicit role and context instructions. The model still benefits from clear persona and goal framing at the top of system prompts.</p>' },
  { id:5, type:'Prompt', title:'AI Image Prompts: Professional Brand Photos', excerpt:'50 tested prompts for headshots, product mockups, team photos, and brand photography using Midjourney and DALL-E.', date:'2026-04-28', readTime:'6 min', tags:['Image','Branding'],
    body:'<h3>Headshot Prompts</h3><pre style="background:var(--bg3);padding:12px;border-radius:8px;font-size:12px;white-space:pre-wrap">Professional headshot, 35-year-old [Asian/Western] entrepreneur, confident expression, soft studio lighting, neutral grey background, business casual attire, shallow depth of field, Canon 85mm lens --ar 1:1 --style raw</pre><h3>Product Mockup Prompts</h3><pre style="background:var(--bg3);padding:12px;border-radius:8px;font-size:12px;white-space:pre-wrap">Clean product mockup of a [SaaS dashboard / mobile app / document] on a MacBook Pro, minimalist desk setup, morning light from window, shallow DOF, lifestyle photography style, white and warm wood tones --ar 16:9</pre><h3>Team/Consulting Photos</h3><pre style="background:var(--bg3);padding:12px;border-radius:8px;font-size:12px;white-space:pre-wrap">Business meeting in modern Tokyo office, floor-to-ceiling windows, city view, 3 professionals reviewing documents, natural afternoon light, photorealistic, editorial photography --ar 3:2</pre><h3>Tips</h3><p>For brand consistency, always include your color palette in the prompt. Use --style raw in Midjourney for more realistic, less stylized results. For Japanese business contexts, specify "Tokyo office" or "Japanese business culture" for culturally appropriate imagery.</p>' },
  { id:6, type:'Blog', title:'Building Profitable Referral Programs', excerpt:'How to design a referral ecosystem where partners actively send you clients — without expensive marketing spend.', date:'2026-04-20', readTime:'10 min', tags:['Growth','Marketing'],
    body:'<h3>Why Referrals Beat Ads for Consultants</h3><p>For IT consultants and service businesses, referrals convert at 3-5x the rate of cold outreach and come with built-in trust. A single active referral partner can replace ¥500K/month in marketing spend. Yet most consultants have no structured referral program — it\'s entirely ad hoc.</p><h3>The 3-Tier Partner System</h3><p><strong>Tier 1 — Active Referrers:</strong> Complementary service providers (accountants, lawyers, HR firms) who regularly interact with your ideal clients. Offer 10-15% first-year revenue share. <strong>Tier 2 — Community Partners:</strong> Industry associations, alumni networks, chambers of commerce. Offer speaking slots and co-marketing. <strong>Tier 3 — Passive Referrers:</strong> Happy clients. Offer service credits or thank-you gifts for referrals.</p><h3>The Referral Agreement</h3><p>Formalize Tier 1 relationships with a simple referral agreement: define what counts as a qualified referral, payment timeline (30 days after client pays), exclusions, and duration (12-month renewable). This protects both parties and signals seriousness.</p><h3>Tracking</h3><p>Use a simple referral tracking sheet (or CRM tag) with: referrer name, referred company, date, deal value, commission owed, paid date. Automate the payout reminder with your Morning Briefing Agent.</p>' }
];

// ── STORE ─────────────────────────────────────────────────
var Store = {
  get: function(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e) { return d; } },
  set: function(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} },
  getProducts: function() { return Store.get('nova_products', DEFAULT_PRODUCTS); },
  setProducts: function(v) { Store.set('nova_products', v); },
  getReviews: function() { return Store.get('nova_reviews', DEFAULT_REVIEWS); },
  setReviews: function(v) { Store.set('nova_reviews', v); },
  getResources: function() { return Store.get('nova_resources', DEFAULT_RESOURCES); },
  setResources: function(v) { Store.set('nova_resources', v); },
  getInquiries: function() { return Store.get('nova_inquiries', []); },
  addInquiry: function(v) {
    var arr = Store.getInquiries();
    arr.unshift(Object.assign({}, v, { id: Date.now(), date: new Date().toISOString() }));
    Store.set('nova_inquiries', arr);
  }
};

// ── LANGUAGE ──────────────────────────────────────────────
var currentLang = localStorage.getItem('nova_lang') || 'en';

function setLang(l) {
  currentLang = l;
  localStorage.setItem('nova_lang', l);
  var body = document.body;
  body.className = body.className.replace(/\blang-\w+/g, '').trim();
  if (l === 'ja') body.className += ' lang-ja';
  document.documentElement.lang = l === 'ja' ? 'ja' : 'en';
  document.querySelectorAll('[data-lang]').forEach(function(b) {
    b.classList.toggle('active', b.dataset.lang === l);
  });
  document.querySelectorAll('.nav-lang button').forEach(function(b) {
    var isEn = b.textContent.trim() === 'EN';
    b.classList.toggle('active', (isEn && l === 'en') || (!isEn && l === 'ja'));
  });
  if (typeof onLangChange === 'function') onLangChange(l);
}

// ── TOAST ─────────────────────────────────────────────────
function showToast(msg, type) {
  type = type || '';
  var c = document.getElementById('toastContainer');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toastContainer';
    c.className = 'toast-container';
    document.body.appendChild(c);
  }
  var t = document.createElement('div');
  t.className = 'toast' + (type ? ' ' + type : '');
  t.innerHTML = '<span>' + (type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ') + '</span><span>' + msg + '</span>';
  c.appendChild(t);
  setTimeout(function() {
    t.style.opacity = '0';
    t.style.transform = 'translateX(16px)';
    t.style.transition = '.25s';
    setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t); }, 280);
  }, 3200);
}

// ── MODALS ─────────────────────────────────────────────────
function openModal(id) {
  var m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  var m = document.getElementById(id);
  if (m) m.classList.remove('open');
}
function closeAllModals() {
  document.querySelectorAll('.modal-overlay.open').forEach(function(m) {
    m.classList.remove('open');
  });
}

// ── NAV INIT ──────────────────────────────────────────────
function initNav() {
  // Mark active link
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    var href = a.getAttribute('href') || '';
    if (href && href.split('?')[0] === page) a.classList.add('active');
  });

  // Scroll shadow
  window.addEventListener('scroll', function() {
    var nav = document.querySelector('.nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger — mobile menu (animated via CSS max-height)
  var ham = document.getElementById('hamburger');
  var mob = document.getElementById('mobileMenu');
  if (ham && mob) {
    ham.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = mob.classList.toggle('open');
      // Rotate hamburger icon lines to X when open
      ham.style.color = isOpen ? 'var(--red)' : '';
    });
    document.addEventListener('click', function(e) {
      if (!ham.contains(e.target) && !mob.contains(e.target)) {
        mob.classList.remove('open');
        ham.style.color = '';
      }
    });
  }

  // Close dropdowns + modals on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
      if (mob) { mob.classList.remove('open'); if (ham) ham.style.color = ''; }
    }
  });
}

// ── SCROLL REVEAL ─────────────────────────────────────────
function initReveal() {
  if (!window.IntersectionObserver) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
}

// ── TABS ──────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('[data-tab]').forEach(function(btn) {
    if (!btn.classList.contains('tab-btn')) return;
    btn.addEventListener('click', function() {
      var group = btn.dataset.group || 'default';
      document.querySelectorAll('.tab-btn[data-group="' + group + '"]').forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-content[data-group="' + group + '"]').forEach(function(c) { c.classList.remove('active'); });
      btn.classList.add('active');
      var tc = document.querySelector('.tab-content[data-group="' + group + '"][data-tab="' + btn.dataset.tab + '"]');
      if (tc) tc.classList.add('active');
    });
  });
}

// ── NEWSLETTER ────────────────────────────────────────────
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var emailEl = form.querySelector('input[type="email"]');
      if (!emailEl || !emailEl.value) return;
      var subs = Store.get('nova_subs', []);
      if (subs.indexOf(emailEl.value) === -1) { subs.push(emailEl.value); Store.set('nova_subs', subs); }
      showToast(currentLang === 'ja' ? '登録完了！' : 'Subscribed! Thank you.', 'success');
      form.reset();
    });
  });
}

// ── PRODUCT GRID (homepage — compact cards) ───────────────
function renderProductGrid(containerId, filter, limit) {
  filter = filter || 'all';
  var el = document.getElementById(containerId);
  if (!el) return;
  var products = Store.getProducts().filter(function(p) { return p.status === 'active'; });
  if (filter !== 'all') products = products.filter(function(p) { return p.category === filter; });
  if (limit) products = products.slice(0, limit);
  if (!products.length) {
    el.innerHTML = '<p style="color:var(--text3);text-align:center;padding:40px;grid-column:1/-1">No products found.</p>';
    return;
  }
  el.innerHTML = products.map(function(p) {
    var detailUrl = p.detailUrl || ('product-detail.html?id=' + p.id);
    return '<div class="product-card" data-product-id="' + p.id + '" style="cursor:pointer" onclick="location.href=\'' + detailUrl + '\'">' +
      '<div class="product-img-placeholder">' +
        '<span>' + p.emoji + '</span>' +
        (p.badge ? '<span class="product-badge">' + p.badge + '</span>' : '') +
      '</div>' +
      '<div class="product-body">' +
        '<div class="product-cat">' + p.category + '</div>' +
        '<div class="product-name">' + p.name + '</div>' +
        '<div class="product-desc">' + p.desc + '</div>' +
        '<div class="product-meta">' +
          '<span style="color:#D97706;font-size:12px">' + ('★'.repeat(Math.round(p.rating || 5))) + ' <small style="color:var(--text3)">' + (p.reviews || 0) + '</small></span>' +
        '</div>' +
        '<div style="margin-top:14px">' +
          '<a href="' + detailUrl + '" class="btn btn-primary btn-sm btn-block" style="justify-content:center" onclick="event.stopPropagation()">View Details →</a>' +
        '</div>' +
      '</div></div>';
  }).join('');
  setTimeout(initReveal, 50);
}

// ── OTHER PRODUCTS GRID (products.html — full cards) ─────
var CAT_COLORS = {
  'AI Agent Suite':     { border:'#B71C1C', bg:'rgba(183,28,28,0.06)',   dot:'#B71C1C' },
  'Market Intelligence':{ border:'#1565C0', bg:'rgba(21,101,192,0.06)',  dot:'#1565C0' },
  'Analytics':          { border:'#6A1B9A', bg:'rgba(106,27,154,0.06)',  dot:'#6A1B9A' },
  'Automation':         { border:'#1B5E20', bg:'rgba(27,94,32,0.06)',    dot:'#1B5E20' }
};
function renderOtherProducts(containerId, excludeId) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var products = Store.getProducts().filter(function(p) {
    return p.status === 'active' && p.id !== excludeId;
  });
  if (!products.length) {
    el.innerHTML = '<p style="color:var(--text3);text-align:center;padding:40px;grid-column:1/-1">No other products available.</p>';
    return;
  }
  el.innerHTML = products.map(function(p) {
    var detailUrl = p.detailUrl || ('product-detail.html?id=' + p.id);
    var tech = (p.tech || []).slice(0, 3);
    var stars = Math.round(p.rating || 5);
    var catColor = CAT_COLORS[p.category] || { border:'var(--red)', bg:'var(--red-dim)', dot:'var(--red)' };
    var halfStar = (p.rating % 1 >= 0.5) ? '½' : '';
    var emptyStars = 5 - Math.ceil(p.rating || 5);
    var starHtml = '<span style="color:#D97706">' + '★'.repeat(stars) + (halfStar ? halfStar : '') + '</span>' +
                   (emptyStars > 0 ? '<span style="color:var(--border3)">'+('☆'.repeat(emptyStars))+'</span>' : '');
    return '<div class="other-card reveal" data-product-id="' + p.id + '" style="border-top:3px solid ' + catColor.border + '">' +
      '<div class="other-card-header" style="background:' + catColor.bg + ';border-bottom:1px solid var(--border)">' +
        '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px">' +
          '<span class="other-card-icon" style="margin:0;font-size:32px">' + p.emoji + '</span>' +
          (p.badge ? '<span style="background:' + catColor.border + ';color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;flex-shrink:0">' + p.badge + '</span>' : '') +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">' +
          '<span style="width:6px;height:6px;border-radius:50%;background:' + catColor.dot + ';flex-shrink:0"></span>' +
          '<div class="other-card-cat" style="margin:0;color:' + catColor.dot + '">' + p.category + '</div>' +
        '</div>' +
        '<div class="other-card-name">' + p.name + '</div>' +
        '<div class="other-card-desc" style="margin-top:6px">' + p.desc + '</div>' +
      '</div>' +
      '<div class="other-card-body">' +
        '<ul class="other-feats">' +
          (p.features || []).slice(0,3).map(function(f){ return '<li>' + f + '</li>'; }).join('') +
        '</ul>' +
        (tech.length ? '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:10px">' +
          tech.map(function(t){ return '<span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:10px;background:var(--bg3);border:1px solid var(--border);color:var(--text2)">' + t + '</span>'; }).join('') +
        '</div>' : '') +
      '</div>' +
      '<div class="other-card-footer" style="display:flex;align-items:center;justify-content:space-between">' +
        '<span style="font-size:12px">' + starHtml + ' <span style="color:var(--text3);font-size:11px">' + (p.reviews || 0) + ' reviews</span></span>' +
        '<a href="' + detailUrl + '" class="btn btn-primary btn-sm">View Details →</a>' +
      '</div>' +
    '</div>';
  }).join('');
  setTimeout(initReveal, 50);
}

function showProductDetail(id) {
  var p = Store.getProducts().filter(function(x) { return x.id === id; })[0];
  if (!p) return;
  var m = document.getElementById('productModal');
  if (!m) {
    m = document.createElement('div');
    m.id = 'productModal';
    m.className = 'modal-overlay';
    m.innerHTML = '<div class="modal"><button class="modal-close" onclick="closeModal(\'productModal\')">✕</button><div class="modal-title"></div><div class="modal-sub"></div><div id="pdBody"></div></div>';
    document.body.appendChild(m);
    m.addEventListener('click', function(e) { if (e.target === m) m.classList.remove('open'); });
  }
  m.querySelector('.modal-title').textContent = p.name;
  m.querySelector('.modal-sub').innerHTML = '<span class="badge badge-red">' + p.category + '</span>';
  m.querySelector('#pdBody').innerHTML =
    '<div style="font-size:52px;text-align:center;padding:20px;background:var(--bg2);border-radius:var(--r-lg);margin-bottom:16px">' + p.emoji + '</div>' +
    '<p style="margin-bottom:16px;line-height:1.75;font-size:14px">' + (p.long_desc || p.desc) + '</p>' +
    '<ul style="list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:20px">' +
      p.features.map(function(f) { return '<li style="display:flex;gap:9px;font-size:13px;color:var(--text2)"><span style="color:var(--red);font-weight:800;font-size:11px;margin-top:2px;flex-shrink:0">✓</span>' + f + '</li>'; }).join('') +
    '</ul>' +
    '<div style="display:flex;gap:10px">' +
      '<a href="' + (p.detailUrl || ('product-detail.html?id=' + p.id)) + '" class="btn btn-secondary" style="flex:1;justify-content:center">View Details</a>' +
      '<a href="contact.html" class="btn btn-primary" style="flex:1;justify-content:center">Contact Us →</a>' +
    '</div>';
  m.classList.add('open');
}

// ── CHECKOUT ──────────────────────────────────────────────
function openCheckout(productId) {
  var p = Store.getProducts().filter(function(x) { return x.id === productId; })[0];
  if (!p) return;
  var m = document.getElementById('checkoutModal');
  if (!m) {
    m = document.createElement('div');
    m.id = 'checkoutModal';
    m.className = 'modal-overlay';
    m.innerHTML = '<div class="modal" style="max-width:500px">' +
      '<button class="modal-close" onclick="closeModal(\'checkoutModal\')">✕</button>' +
      '<div style="text-align:center;padding-bottom:20px;border-bottom:1px solid var(--border);margin-bottom:20px">' +
        '<div id="co-emoji" style="font-size:42px;margin-bottom:10px"></div>' +
        '<div class="modal-title" id="co-name" style="text-align:center;padding:0"></div>' +
        '<div style="font-size:24px;font-weight:800;color:var(--red);margin-top:6px" id="co-price"></div>' +
      '</div>' +
      '<a id="co-stripe" href="#" target="_blank" class="btn btn-primary btn-block" style="margin-bottom:14px;justify-content:center;display:none">💳 Pay with Card (Stripe)</a>' +
      '<div style="text-align:center;font-size:12px;color:var(--text3);margin:10px 0;display:flex;align-items:center;gap:8px"><div style="flex:1;height:1px;background:var(--border)"></div>or request invoice<div style="flex:1;height:1px;background:var(--border)"></div></div>' +
      '<form id="orderForm" onsubmit="submitOrder(event)">' +
        '<input type="hidden" id="co-pid" name="product_id">' +
        '<div class="form-row">' +
          '<div class="form-group"><label class="form-label">Name *</label><input type="text" name="name" class="form-input" required placeholder="Your name"></div>' +
          '<div class="form-group"><label class="form-label">Email *</label><input type="email" name="email" class="form-input" required placeholder="you@company.com"></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">Payment method</label>' +
          '<select name="payment" class="form-select">' +
            '<option value="invoice">Invoice / Bank transfer</option>' +
            '<option value="stripe">Stripe (credit card)</option>' +
            '<option value="paypal">PayPal</option>' +
            '<option value="wise">Wise</option>' +
          '</select>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">Notes</label><textarea name="notes" class="form-textarea" style="min-height:70px" placeholder="Questions or requirements?"></textarea></div>' +
        '<button type="submit" class="btn btn-dark btn-block">Request Invoice →</button>' +
        '<p style="font-size:11px;color:var(--text3);text-align:center;margin-top:10px">We reply within 24 hours with payment details.</p>' +
      '</form>' +
    '</div>';
    document.body.appendChild(m);
    m.addEventListener('click', function(e) { if (e.target === m) m.classList.remove('open'); });
  }
  m.querySelector('#co-emoji').textContent = p.emoji;
  m.querySelector('#co-name').textContent = p.name;
  m.querySelector('#co-price').textContent = p.currency + p.price + ' ' + p.priceType;
  m.querySelector('#co-pid').value = p.id;
  var sb = m.querySelector('#co-stripe');
  if (sb) { sb.href = p.stripeUrl || '#'; sb.style.display = p.stripeUrl ? 'flex' : 'none'; }
  m.classList.add('open');
}

function submitOrder(e) {
  e.preventDefault();
  var form = document.getElementById('orderForm');
  var pid = parseInt(document.getElementById('co-pid').value);
  var p = Store.getProducts().filter(function(x) { return x.id === pid; })[0];
  var data = {};
  new FormData(form).forEach(function(v, k) { data[k] = v; });
  data.type = 'purchase';
  data.product = p ? p.name : pid;
  Store.addInquiry(data);
  form.reset();
  closeModal('checkoutModal');
  showToast('Order request sent! We\'ll reply within 24 hours.', 'success');
}

// ── ADMIN AUTH ────────────────────────────────────────────
function checkAdmin() {
  if (sessionStorage.getItem('nova_admin')) return true;
  var p = prompt('Admin password:');
  if (p !== 'nova2026') { location.href = 'index.html'; return false; }
  sessionStorage.setItem('nova_admin', '1');
  return true;
}

// ── CONTACT FORM ──────────────────────────────────────────
function handleContactForm(formId) {
  var form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var data = {};
    new FormData(form).forEach(function(v, k) { data[k] = v; });
    Store.addInquiry(data);
    showToast(currentLang === 'ja' ? 'メッセージを送信しました！' : 'Message sent! We\'ll reply within 24 hours.', 'success');
    form.reset();
  });
}

// ── SMOOTH SCROLL ─────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

// ── ROI CALCULATOR ────────────────────────────────────────
function initROICalc() {
  var calc = document.getElementById('roiCalc');
  if (!calc) return;
  function update() {
    var h = parseInt(document.getElementById('roiHours') ? document.getElementById('roiHours').value : 20);
    var r = parseInt(document.getElementById('roiRate') ? document.getElementById('roiRate').value : 50);
    var saved = Math.round(h * 0.75);
    var value = Math.round(saved * r * 52);
    var payback = Math.round(97 / (saved * r / 7));
    if (document.getElementById('roiHoursVal')) document.getElementById('roiHoursVal').textContent = h + 'h';
    if (document.getElementById('roiRateVal')) document.getElementById('roiRateVal').textContent = '$' + r;
    if (document.getElementById('roiHoursSaved')) document.getElementById('roiHoursSaved').textContent = saved + 'h';
    if (document.getElementById('roiYearValue')) document.getElementById('roiYearValue').textContent = value >= 1000 ? '$' + Math.round(value/1000) + 'K' : '$' + value;
    if (document.getElementById('roiPayback')) document.getElementById('roiPayback').textContent = payback + 'd';
  }
  calc.querySelectorAll('input[type=range]').forEach(function(el) { el.addEventListener('input', update); });
  update();
}

// ── INIT ──────────────────────────────────────────────────

// ── BRAND SETTINGS (applied on every page) ────────────────
function applyBrandSettings() {
  var s = Store.get('miraio_brand', {});
  var logo = Store.get('miraio_logo', '');
  // Apply accent color
  if (s.color) document.documentElement.style.setProperty('--red', s.color);
  // Apply logo to nav logo elements
  // admin-logo in admin.html (nav.js handles nav + footer logo dynamically)
  if (logo) {
    document.querySelectorAll('.admin-logo').forEach(function(el) {
      if (el && !el.querySelector('img')) {
        var img = document.createElement('img');
        img.src = logo; img.alt = s.name || 'Miraio';
        img.style.cssText = 'height:28px;width:auto;object-fit:contain;vertical-align:middle;mix-blend-mode:multiply';
        img.onerror = function() { this.style.display = 'none'; };
        el.prepend(img);
      }
    });
  }
  // Apply product images
  var imgs = Store.get('miraio_product_images', {});
  Object.keys(imgs).forEach(function(pid) {
    document.querySelectorAll('[data-product-id="' + pid + '"] .product-img-placeholder').forEach(function(el) {
      el.innerHTML = '<img src="' + imgs[pid] + '" style="width:100%;height:100%;object-fit:cover">';
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initNav();
  setLang(currentLang);
  initTabs();
  initSmoothScroll();
  initNewsletter();
  setTimeout(initReveal, 100);
  setTimeout(initROICalc, 150);
  applyBrandSettings();
  // Page-specific product grids
  if (document.getElementById('productGrid')) renderProductGrid('productGrid', 'all', 3);
  if (document.getElementById('otherProductsGrid')) {
    var _featId = Store.get('nova_featured_product', 1);
    renderOtherProducts('otherProductsGrid', _featId);
  }
});
