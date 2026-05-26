/* Miraio — nav.js  (config-driven, editable from admin) */
(function() {

/* ── Inline SVG helpers ─────────────────────────────── */
var ico = {
  zap:      '<svg class="lucide logo-spark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  chevron:  '<svg class="lucide chevron-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  menu:     '<svg class="lucide" style="width:18px;height:18px;stroke-width:2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  linkedin: '<svg class="lucide" style="width:15px;height:15px;stroke-width:1.75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
  twitter:  '<svg class="lucide" style="width:14px;height:14px;stroke-width:1.75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l16 16"/><path d="M4 20L20 4"/></svg>',
  github:   '<svg class="lucide" style="width:15px;height:15px;stroke-width:1.75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>'
};

/* ── Sub-item icon map (name → small inline SVG) ────── */
var NAV_ICON = {
  bot:     '<svg style="width:14px;height:14px;stroke-width:1.75;opacity:.6;margin-right:4px;vertical-align:-2px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>',
  castle:  '<svg style="width:14px;height:14px;stroke-width:1.75;opacity:.6;margin-right:4px;vertical-align:-2px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"/><path d="M18 11V4H6v7"/><path d="M15 22v-4a3 3 0 0 0-6 0v4"/><path d="M2 11l2-3"/><path d="M22 11l-2-3"/><path d="M9 3H6"/><path d="M18 3h-3"/></svg>',
  chart:   '<svg style="width:14px;height:14px;stroke-width:1.75;opacity:.6;margin-right:4px;vertical-align:-2px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  star:    '<svg style="width:14px;height:14px;stroke-width:1.75;opacity:.6;margin-right:4px;vertical-align:-2px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  book:    '<svg style="width:14px;height:14px;stroke-width:1.75;opacity:.6;margin-right:4px;vertical-align:-2px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  mail:    '<svg style="width:14px;height:14px;stroke-width:1.75;opacity:.6;margin-right:4px;vertical-align:-2px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  users:   '<svg style="width:14px;height:14px;stroke-width:1.75;opacity:.6;margin-right:4px;vertical-align:-2px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  home:    '<svg style="width:14px;height:14px;stroke-width:1.75;opacity:.6;margin-right:4px;vertical-align:-2px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  link:    '<svg style="width:14px;height:14px;stroke-width:1.75;opacity:.6;margin-right:4px;vertical-align:-2px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
};

/* ── Default menu config (source of truth) ──────────── */
var DEFAULT_NAV_MENU = {
  items: [
    { id:1,  type:'link',     label_en:'Home',           label_ja:'ホーム',       url:'index.html' },
    { id:2,  type:'dropdown', label_en:'Products',       label_ja:'製品',         url:'products.html', children:[
      { id:21, type:'link', label_en:'Solo Business AI',                             url:'product-detail.html?id=1',  icon:'bot'    },
      { id:22, type:'link', label_en:'Japan DX Analyzer', label_ja:'Japan DXアナライザー', url:'product-detail.html?id=2',  icon:'castle' },
      { id:23, type:'link', label_en:'AI Impact Dashboard',                          url:'product-detail.html?id=3',  icon:'chart'  },
      { id:24, type:'link', label_en:'Morning Briefing Agent',                       url:'product-detail.html?id=4',  icon:'star'   },
      { id:25, type:'divider' },
      { id:26, type:'link', label_en:'All Products →',    label_ja:'全製品 →',      url:'products.html',             icon:'link'   }
    ]},
    { id:3,  type:'link',     label_en:'AI Reviews',     label_ja:'AIレビュー',   url:'reviews.html' },
    { id:4,  type:'dropdown', label_en:'Resources',      label_ja:'リソース',     url:'resources.html', children:[
      { id:41, type:'link',    label_en:'Blog',                                    url:'resources.html?tab=blog'    },
      { id:42, type:'link',    label_en:'AI Prompts',    label_ja:'AIプロンプト', url:'resources.html?tab=prompts' },
      { id:43, type:'link',    label_en:'Guides',                                  url:'resources.html?tab=guides'  },
      { id:44, type:'link',    label_en:'News',                                    url:'resources.html?tab=news'    },
      { id:45, type:'divider' },
      { id:46, type:'link',    label_en:'About Us',      label_ja:'会社概要',     url:'about.html'    },
      { id:47, type:'link',    label_en:'Contact',       label_ja:'お問い合わせ', url:'contact.html'  }
    ]},
    { id:5,  type:'link',     label_en:'Partner with us', label_ja:'パートナー', url:'partner.html' }
  ]
};

/* ── Load saved config or fall back to defaults ─────── */
function getNavMenu() {
  try {
    var s = localStorage.getItem('miraio_nav_menu');
    return (s && JSON.parse(s)) || DEFAULT_NAV_MENU;
  } catch(e) { return DEFAULT_NAV_MENU; }
}

/* ── Render label with EN/JA spans ──────────────────── */
function navLabel(item) {
  if (!item.label_en) return '';
  return item.label_ja
    ? '<span class="en-i">' + item.label_en + '</span><span class="ja-i">' + item.label_ja + '</span>'
    : item.label_en;
}

/* ── Build desktop nav-links HTML from config ────────── */
function buildDesktopLinks(items) {
  return items.map(function(item) {
    if (item.type === 'dropdown') {
      var children = (item.children || []).map(function(c) {
        if (c.type === 'divider') {
          return '<div style="height:1px;background:var(--border,#e5e0d8);margin:4px 6px"></div>';
        }
        var icn = (c.icon && NAV_ICON[c.icon]) ? NAV_ICON[c.icon] : '';
        return '<a href="' + (c.url || '#') + '">' + icn + navLabel(c) + '</a>';
      }).join('');
      return '<div class="dropdown">' +
        '<a href="' + (item.url || '#') + '" class="has-dropdown">' + navLabel(item) + ico.chevron + '</a>' +
        '<div class="dropdown-menu">' + children + '</div>' +
      '</div>';
    }
    return '<a href="' + (item.url || '#') + '">' + navLabel(item) + '</a>';
  }).join('');
}

/* ── Build mobile menu links from config ─────────────── */
function buildMobileLinks(items) {
  var html = '';
  items.forEach(function(item) {
    if (item.type === 'link') {
      html += '<a href="' + (item.url || '#') + '">' + navLabel(item) + '</a>';
    } else if (item.type === 'dropdown') {
      // Show parent link + all children flattened
      html += '<a href="' + (item.url || '#') + '" style="font-weight:600;color:var(--text)">' + navLabel(item) + '</a>';
      (item.children || []).forEach(function(c) {
        if (c.type === 'divider') return;
        html += '<a href="' + (c.url || '#') + '" style="padding-left:24px;font-size:13px;opacity:.8">' + navLabel(c) + '</a>';
      });
    }
  });
  return html;
}

/* ── Read brand settings helper (JSON-aware) ─────────── */
function _readBrand() {
  var b = {}; try { var s = localStorage.getItem('miraio_brand'); b = s ? JSON.parse(s) : {}; } catch(e) {}
  return b;
}
function _readLogo() {
  try { var v = localStorage.getItem('miraio_logo'); return v ? JSON.parse(v) : ''; } catch(e) { return ''; }
}
function _logoImg(src, alt) {
  return '<img src="' + src + '" alt="' + alt + '" style="height:28px;width:auto;object-fit:contain;vertical-align:middle;margin-right:6px" onerror="this.style.display=\'none\'">';
}
function _readFooterSettings() {
  var def = {
    email:'hello@miraio.com',
    copy:'© 2026 Miraio · hello@miraio.com',
    desc_en:'AI tools and consulting for solopreneurs and IT consultants operating in Japan and Southeast Asia.',
    desc_ja:'日本・東南アジア市場のソロプレナーとITコンサルタント向けAIツール・コンサルティング。',
    sns:[{platform:'linkedin',url:'#',label:'LinkedIn'},{platform:'twitter',url:'#',label:'Twitter/X'},{platform:'github',url:'#',label:'GitHub'}],
    nl_title_en:'Stay ahead of AI trends',
    nl_title_ja:'AIトレンドを先取り',
    nl_sub_en:'Weekly insights on AI tools and business automation.',
    nl_sub_ja:'AIツールとビジネス自動化の週次インサイト。'
  };
  try { var s = localStorage.getItem('miraio_footer_settings'); return (s && JSON.parse(s)) || def; } catch(e) { return def; }
}

/* ── Build full NAV + mobile HTML ────────────────────── */
function buildNav() {
  var menu = getNavMenu();
  var _brand = _readBrand();
  var _siteName = _brand.name || 'Miraio';
  var _logo = _readLogo();
  var _logoHtml = _logo ? _logoImg(_logo, _siteName) : ico.zap;
  return [
    '<nav class="nav" id="mainNav">',
    '<div class="nav-inner">',
    '<a href="index.html" class="nav-logo">' + _logoHtml + '<span style="color:var(--red)">' + _siteName + '</span></a>',
    '<div class="nav-links">' + buildDesktopLinks(menu.items) + '</div>',
    '<div class="nav-right">',
      '<div class="nav-lang">',
        '<button data-lang="en" onclick="setLang(\'en\')">EN</button>',
        '<button data-lang="ja" onclick="setLang(\'ja\')">日本語</button>',
      '</div>',
      '<a href="contact.html" class="nav-cta"><span class="en-i">Book a free Consultation</span><span class="ja-i">無料相談を予約</span></a>',
      '<button class="hamburger" id="hamburger" aria-label="Menu">' + ico.menu + '</button>',
    '</div>',
    '</div></nav>',
    '<div class="mobile-menu" id="mobileMenu">',
    buildMobileLinks(menu.items),
    '<div style="padding:8px 6px">',
      '<a href="contact.html" class="btn btn-primary btn-sm btn-block" style="justify-content:center">',
        '<span class="en-i">Book a free Consultation</span><span class="ja-i">無料相談を予約</span>',
      '</a>',
    '</div>',
    '</div>'
  ].join('');
}

function buildFooter() {
  var _fb = _readBrand();
  var _fn = _fb.name || 'Miraio';
  var _fl = _readLogo();
  var _flHtml = _fl ? _logoImg(_fl, _fn) : ico.zap + ' ';
  var _fs = _readFooterSettings();
  var _email = _fs.email || 'hello@miraio.com';
  var _copy  = _fs.copy  || ('© 2026 ' + _fn + ' · ' + _email);
  var _descEn = _fs.desc_en || 'AI tools and consulting.';
  var _descJa = _fs.desc_ja || 'AIツール・コンサルティング。';
  var _snsHtml = (_fs.sns || []).map(function(s) {
    var p = s.platform || '';
    var icn = ico[p] || ('<svg class="lucide" style="width:14px;height:14px;stroke-width:1.75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>');
    return '<a href="' + (s.url || '#') + '" class="social-btn" aria-label="' + (s.label || p) + '">' + icn + '</a>';
  }).join('');
  var _nlTitleEn = _fs.nl_title_en || 'Stay ahead of AI trends';
  var _nlTitleJa = _fs.nl_title_ja || 'AIトレンドを先取り';
  var _nlSubEn   = _fs.nl_sub_en   || 'Weekly insights on AI tools and business automation.';
  var _nlSubJa   = _fs.nl_sub_ja   || 'AIツールとビジネス自動化の週次インサイト。';
  return [
'<footer class="footer">',
'<div class="container">',
'<div class="footer-grid">',
  '<div class="footer-brand">',
    '<span class="logo-text">' + _flHtml + '<em>' + _fn + '</em></span>',
    '<p><span class="en-i">' + _descEn + '</span><span class="ja-i">' + _descJa + '</span></p>',
    '<div class="footer-social">' + (_snsHtml || '') + '</div>',
  '</div>',
  '<div class="footer-col">',
    '<h4><span class="en-i">Products</span><span class="ja-i">製品</span></h4>',
    '<a href="solo-business-ai.html">Solo Business AI</a>',
    '<a href="products.html">Japan DX Analyzer</a>',
    '<a href="products.html">AI Impact Dashboard</a>',
    '<a href="products.html?cat=Automation">Morning Briefing Agent</a>',
    '<a href="products.html"><span class="en-i">All Products →</span><span class="ja-i">全製品 →</span></a>',
  '</div>',
  '<div class="footer-col">',
    '<h4><span class="en-i">Resources</span><span class="ja-i">リソース</span></h4>',
    '<a href="resources.html?tab=blog">Blog</a>',
    '<a href="resources.html?tab=prompts"><span class="en-i">AI Prompts</span><span class="ja-i">AIプロンプト</span></a>',
    '<a href="resources.html?tab=guides">Guides</a>',
    '<a href="reviews.html"><span class="en-i">AI Reviews</span><span class="ja-i">AIレビュー</span></a>',
    '<a href="partner.html"><span class="en-i">Partner with us</span><span class="ja-i">パートナー</span></a>',
  '</div>',
  '<div class="footer-col">',
    '<h4><span class="en-i">Company</span><span class="ja-i">会社</span></h4>',
    '<a href="about.html"><span class="en-i">About Us</span><span class="ja-i">会社概要</span></a>',
    '<a href="contact.html"><span class="en-i">Contact</span><span class="ja-i">お問い合わせ</span></a>',
    '<a href="contact.html"><span class="en-i">Book a Consultation</span><span class="ja-i">無料相談</span></a>',
    '<a href="admin.html" style="opacity:.35">Admin</a>',
  '</div>',
'</div>',
'<div style="background:var(--bg3);border:1px solid var(--border2);border-radius:16px;padding:36px;text-align:center;margin-top:40px">',
  '<h3 style="color:var(--text);font-size:18px;margin-bottom:6px"><span class="en-i">' + _nlTitleEn + '</span><span class="ja-i">' + _nlTitleJa + '</span></h3>',
  '<p style="color:var(--text2);font-size:13px;margin-bottom:0"><span class="en-i">' + _nlSubEn + '</span><span class="ja-i">' + _nlSubJa + '</span></p>',
  '<form class="newsletter-form" style="max-width:420px;margin:16px auto 0">',
    '<input type="email" placeholder="your@email.com" required style="flex:1;background:var(--card);border:1px solid var(--border2);border-radius:8px;padding:11px 14px;font-size:13px;color:var(--text);outline:none;font-family:inherit;transition:border-color .15s">',
    '<button type="submit" class="btn btn-primary" style="white-space:nowrap"><span class="en-i">Subscribe</span><span class="ja-i">登録</span></button>',
  '</form>',
'</div>',
'<div class="footer-bottom">',
  '<p>' + _copy + '</p>',
  '<div class="footer-bottom-links">',
    '<a href="privacy.html"><span class="en-i">Privacy</span><span class="ja-i">プライバシー</span></a>',
    '<a href="admin.html">Admin</a>',
  '</div>',
'</div>',
'</div></footer>',
'<div id="toastContainer" class="toast-container"></div>'
  ].join('');
}

// ── Load Inter Variable Font ───────────────────────────
if (!document.querySelector('link[href*="Inter"]')) {
  var fl = document.createElement('link');
  fl.rel = 'stylesheet';
  fl.href = 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap';
  document.head.appendChild(fl);
}

// ── Inject nav ─────────────────────────────────────────
var NAV = buildNav();
var navPH = document.getElementById('nav-placeholder');
if (navPH) {
  var tmp = document.createElement('div');
  tmp.innerHTML = NAV;
    while (tmp.firstChild) navPH.parentNode.insertBefore(tmp.firstChild, navPH);
  navPH.parentNode.removeChild(navPH);
}

// Inject footer
var ftPH = document.getElementById('footer-placeholder');
if (ftPH) {
  var ftTmp = document.createElement('div');
  ftTmp.innerHTML = buildFooter();
  while (ftTmp.firstChild) ftPH.parentNode.insertBefore(ftTmp.firstChild, ftPH);
  ftPH.parentNode.removeChild(ftPH);
}
})();

// Inject chat-widget on all pages except admin
(function() {
  if (window.location.pathname.indexOf('admin') > -1) return;
  if (document.getElementById('nvChat')) return;
  var s = document.createElement('script');
  // resolve path relative to nav.js location
  var navSrc = '';
  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src && scripts[i].src.indexOf('nav.js') > -1) {
      navSrc = scripts[i].src.replace('nav.js', 'chat-widget.js');
      break;
    }
  }
  s.src = navSrc || 'assets/chat-widget.js';
  document.body.appendChild(s);
})();
