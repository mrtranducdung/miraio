/* Miraio — Dynamic RAG Chatbot Widget v4
 * Settings + Knowledge Base managed via Admin Panel → Chatbot Manager
 * Logs conversations to localStorage for review in Admin → Logs tab
 */
(function() {
'use strict';

// ── DEFAULT KB ──────────────────────────────────────────────────
var DEFAULT_KB = [
  { id:'p1', type:'product', title:'Solo Business AI',
    content:'Solo Business AI: $97 one-time. 14 specialized AI agents run your entire solo business. Includes: Researcher, Strategist, Copywriter, Sales Assistant, Product Builder, Customer Support, Analyst, Admin, Finance Manager, Business Coach, Legal Assistant, Partnership Manager, Brand Manager, Morning Briefing. Supports Vietnamese, English, Japanese. No server required. Requires Anthropic API key (~$10-30/month). Setup in 10 minutes.',
    tags:'solo business,14 agents,japan,automation,price,97,flagship', boost:0 },
  { id:'p2', type:'product', title:'Japan DX Analyzer',
    content:'Japan DX Analyzer: $197 one-time. AI analysis of Japanese companies for DX consulting. Features: company audit, pain point mapping, keigo proposals, Japanese language output. For IT consultants targeting Japanese SMEs.',
    tags:'japan,dx,keigo,japanese,197,consulting', boost:0 },
  { id:'p3', type:'product', title:'AI Impact Dashboard',
    content:'AI Impact Dashboard: $149 one-time. Track AI ROI across teams. KPI charts, BoD report export, EN/JP bilingual.',
    tags:'dashboard,analytics,149,roi,team', boost:0 },
  { id:'p4', type:'product', title:'Morning Briefing Agent',
    content:'Morning Briefing Agent: $47 one-time. Auto-runs at 7am daily. Pipeline alerts, invoice due dates, top priorities delivered as 3-minute digest.',
    tags:'morning,briefing,47,automatic,daily', boost:0 },
  { id:'s1', type:'service', title:'Custom AI Development',
    content:'We build custom AI agent systems. From $2,000. Includes workflow design, Claude API integration, documentation, 30-day support.',
    tags:'custom,build,develop,2000,hire', boost:0 },
  { id:'f1', type:'faq', title:'Technical requirements',
    content:'Requirements: Claude Desktop app (free) + Anthropic API key ($10-30/month typical usage). No server, no hosting, no DevOps. Everything runs on your computer. Setup takes under 10 minutes.',
    tags:'technical,setup,requirements,api,install', boost:0 },
  { id:'f2', type:'faq', title:'Data privacy',
    content:'Privacy: Your conversations go directly from your device to Anthropic API. We have no server and zero access to your data. Anthropic does not use API conversations for training by default. SOC2-backed infrastructure.',
    tags:'privacy,data,security,safe,gdpr', boost:0 },
  { id:'f3', type:'faq', title:'Languages supported',
    content:'All products support Vietnamese, English, and Japanese. Japan pack includes keigo templates, nemawashi workflows, JPY pricing. Voice input supports ja-JP and en-US.',
    tags:'language,japanese,english,vietnamese,keigo', boost:0 },
  { id:'f4', type:'faq', title:'Pricing and refunds',
    content:'All products are one-time purchase, no subscription. 30-day money-back guarantee on all products. Contact hello@miraio.com for refunds.',
    tags:'price,refund,guarantee,subscription,cost', boost:0 },
  { id:'f5', type:'faq', title:'Getting started',
    content:'Getting started: 1) Purchase product. 2) Open onboarding wizard (5 min). 3) Install .skill files in Claude Cowork. 4) Start chatting naturally. First week shows clear ROI.',
    tags:'start,begin,how,install,onboard', boost:0 },
  { id:'f6', type:'faq', title:'Demo and contact',
    content:'Book a free 30-minute demo via the contact form at contact.html. We reply within 24 hours. Email: hello@miraio.com. Languages: English, Japanese, Vietnamese.',
    tags:'demo,contact,book,meeting,email', boost:1 },
  { id:'c1', type:'company', title:'About Miraio',
    content:'Miraio: AI engineers and IT consultants based in Vietnam with 10+ years Japan market experience. 500+ users worldwide. Specializes in AI tools for Japan and Southeast Asia markets.',
    tags:'about,company,team,vietnam,japan', boost:0 }
];

// ── LOAD ADMIN SETTINGS ─────────────────────────────────────────
function loadSettings() {
  var D = {
    name:'Miraio Assistant', avatar:'🤖',
    status:'Online · Typically replies instantly',
    email:'hello@miraio.com', color:'#B71C1C',
    position:'right', width:340,
    langs:{ en:true, ja:true, vi:false },
    welcome_en:'Hi! Welcome to Miraio 👋\nAsk me anything about our products, pricing, or how we can help your business.',
    welcome_ja:'こんにちは！Miraioへようこそ。\nAI製品・サービスについて何でもお気軽にどうぞ。',
    proactive:false, delay:8,
    sys_en:'', sys_ja:'',
    sugs_en:'What products do you have?\nPricing?\nJapan market support?\nBook a demo',
    sugs_ja:'製品を教えてください\n価格はいくらですか？\n日本語対応は？\nデモを予約したい',
    fallback_en:'Thanks for your question! For details, contact **hello@miraio.com** or [book a demo](contact.html).',
    fallback_ja:'ご質問ありがとうございます。詳しくはhello@miraio.comまでお問い合わせください。',
    model:'claude-haiku-4-5-20251001', max_tokens:350, topk:3
  };
  try { return Object.assign({}, D, JSON.parse(localStorage.getItem('miraio_chatbot_settings')||'{}')); }
  catch(e) { return D; }
}

function loadKB() {
  try {
    var kb = JSON.parse(localStorage.getItem('miraio_chatbot_kb')||'null');
    return (kb && kb.length) ? kb : JSON.parse(JSON.stringify(DEFAULT_KB));
  } catch(e) { return JSON.parse(JSON.stringify(DEFAULT_KB)); }
}

var CFG = loadSettings();
var KB  = loadKB();

// ── RAG SEARCH ─────────────────────────────────────────────────
function search(query) {
  var topK = CFG.topk || 3;
  var q = (query||'').toLowerCase();
  var words = q.split(/\s+/).filter(function(w){ return w.length > 1; });
  var scored = KB.map(function(chunk) {
    var score = (chunk.boost||0)*2;
    var text = ((chunk.content||'')+' '+(chunk.title||'')+' '+(chunk.tags||'')).toLowerCase();
    words.forEach(function(w){
      if(text.indexOf(w)>-1) score+=2;
      if((chunk.title||'').toLowerCase().indexOf(w)>-1) score+=3;
      (chunk.tags||'').split(',').forEach(function(t){ if(t.trim().indexOf(w)>-1) score+=2; });
    });
    if(/price|cost|how much|値段|価格/.test(q)&&(chunk.type==='product'||chunk.type==='service')) score+=4;
    if(/japan|日本|japanese|keigo|敬語/.test(q)&&(chunk.tags||'').indexOf('japan')>-1) score+=5;
    if(/demo|contact|book|予約/.test(q)&&(chunk.tags||'').indexOf('demo')>-1) score+=6;
    if(/privacy|safe|data|セキュリティ/.test(q)&&(chunk.tags||'').indexOf('privacy')>-1) score+=5;
    if(/start|begin|how|install|始め/.test(q)&&(chunk.tags||'').indexOf('install')>-1) score+=4;
    return {chunk:chunk, score:score};
  });
  return scored.filter(function(r){return r.score>0;})
    .sort(function(a,b){return b.score-a.score;})
    .slice(0,topK).map(function(r){return r.chunk;});
}

// ── SYSTEM PROMPT ──────────────────────────────────────────────
function buildPrompt(ctx, lang) {
  var ctxStr = ctx.map(function(c){
    return '['+(c.type||'INFO').toUpperCase()+': '+c.title+']\n'+c.content;
  }).join('\n\n---\n\n');
  var customSys = lang==='ja' ? CFG.sys_ja : CFG.sys_en;
  if(customSys && customSys.trim()) {
    return customSys.replace('{CONTEXT}',ctxStr).replace('{BOT_NAME}',CFG.name)
      .replace('{SITE_NAME}','Miraio').replace('{EMAIL}',CFG.email);
  }
  if(lang==='ja') return 'あなたは'+CFG.name+'、Miraioのカスタマーアシスタントです。\n\n参照情報:\n\n'+ctxStr+'\n\nルール:\n- ナレッジベースの情報のみ使用\n- 情報がない場合は '+CFG.email+' へ案内\n- デモはcontact.htmlへ案内\n- 簡潔・親切';
  return 'You are '+CFG.name+', customer assistant for Miraio.\n\nKnowledge base:\n\n'+ctxStr+'\n\nRules:\n- Answer ONLY from the knowledge base\n- Unknown: direct to '+CFG.email+'\n- Demos: contact.html\n- Be concise, friendly';
}

// ── STATE ──────────────────────────────────────────────────────
var isOpen=false, lang=localStorage.getItem('nova_lang')||'en';
var history=[], sessionId='sess_'+Date.now(), isThinking=false;
var recognition=null, listening=false;

function getSugs() {
  var en=(CFG.sugs_en||'').split('\n').filter(Boolean).slice(0,4);
  var ja=(CFG.sugs_ja||'').split('\n').filter(Boolean).slice(0,4);
  return {en:en.length?en:['What products do you have?','Pricing?','Japan market support?','Book a demo'],
          ja:ja.length?ja:['製品を教えてください','価格はいくらですか？','日本語対応は？','デモを予約したい']};
}

// ── LOGO ───────────────────────────────────────────────────────
function logo(size) {
  try {
    var src=JSON.parse(localStorage.getItem('miraio_logo')||'null');
    if(src) return '<img src="'+src+'" style="width:'+size+'px;height:'+size+'px;border-radius:50%;object-fit:contain;background:#fff;padding:2px">';
  } catch(e){}
  var av=CFG.avatar||'🤖';
  if(av.startsWith('http')||av.startsWith('/')) return '<img src="'+av+'" style="width:'+size+'px;height:'+size+'px;border-radius:50%;object-fit:cover">';
  return '<span style="font-size:'+Math.round(size*0.55)+'px">'+av+'</span>';
}

// ── CREATE ─────────────────────────────────────────────────────
function create() {
  if(document.getElementById('nvChat')) return;
  var clr=CFG.color||'#B71C1C';
  var posStyle=CFG.position==='left'?'left:24px':'right:24px';
  var alignStyle=CFG.position==='left'?'flex-start':'flex-end';
  var wid=(CFG.width||340)+'px';

  // Build lang buttons
  var langs=CFG.langs||{en:true,ja:true};
  var langBtns='';
  if(langs.en!==false) langBtns+='<button data-clang="en" onclick="nvSetLang(\'en\')" style="padding:4px 9px;font-size:10px;font-weight:700;border:none;cursor:pointer;transition:all .13s;font-family:inherit">EN</button>';
  if(langs.ja) langBtns+='<button data-clang="ja" onclick="nvSetLang(\'ja\')" style="padding:4px 9px;font-size:10px;font-weight:700;border:none;cursor:pointer;transition:all .13s;font-family:inherit">日本語</button>';
  if(langs.vi) langBtns+='<button data-clang="vi" onclick="nvSetLang(\'vi\')" style="padding:4px 9px;font-size:10px;font-weight:700;border:none;cursor:pointer;transition:all .13s;font-family:inherit">VI</button>';

  var wrap=document.createElement('div');
  wrap.id='nvChat';
  wrap.style.cssText='position:fixed;bottom:24px;'+posStyle+';z-index:9999;display:flex;flex-direction:column;align-items:'+alignStyle+';gap:10px;pointer-events:none';
  wrap.innerHTML=
    '<div id="nvPanel" style="width:'+wid+';background:#fff;border:1px solid rgba(28,25,23,.12);border-radius:18px;display:none;flex-direction:column;box-shadow:0 12px 48px rgba(28,25,23,.16);overflow:hidden;pointer-events:auto;font-family:Inter,-apple-system,sans-serif">'+
      '<div style="background:#1C1917;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0">'+
        '<div style="display:flex;align-items:center;gap:9px">'+
          '<div style="width:34px;height:34px;border-radius:50%;background:'+clr+';display:flex;align-items:center;justify-content:center;overflow:hidden">'+logo(34)+'</div>'+
          '<div>'+
            '<div style="font-size:13px;font-weight:700;color:#FAF9F7">'+CFG.name+'</div>'+
            '<div style="font-size:10px;color:#78716C;display:flex;align-items:center;gap:4px"><span id="nvDot" style="width:5px;height:5px;background:#22C55E;border-radius:50%;display:inline-block"></span><span id="nvStatus">'+(CFG.status||'Online')+'</span></div>'+
          '</div>'+
        '</div>'+
        '<div style="display:flex;gap:6px;align-items:center">'+
          (langBtns?'<div id="nvLangBar" style="display:flex;border:1px solid rgba(255,255,255,.15);border-radius:5px;overflow:hidden">'+langBtns+'</div>':'')+
          '<button onclick="nvClose()" style="background:rgba(255,255,255,.1);border:none;color:#9E9E9E;width:26px;height:26px;border-radius:50%;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center">✕</button>'+
        '</div>'+
      '</div>'+
      '<div id="nvMessages" style="flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;min-height:200px;max-height:300px;background:#FAF9F7"></div>'+
      '<div id="nvSugs" style="padding:0 10px 8px;display:flex;gap:5px;flex-wrap:wrap;background:#FAF9F7;flex-shrink:0"></div>'+
      '<div id="nvKeyNotice" style="display:none;padding:10px 13px;background:#FEF2F2;border-top:1px solid '+clr+'33;font-size:11px;color:#991B1B;flex-shrink:0">'+
        '🔑 <a href="https://console.anthropic.com" target="_blank" style="color:'+clr+';font-weight:700">Get API key</a> to enable AI.'+
        '<input id="nvKeyInput" type="password" placeholder="sk-ant-..." oninput="nvSaveKey(this.value)" style="width:100%;margin-top:6px;background:#fff;border:1px solid '+clr+'55;border-radius:5px;padding:5px 9px;font-size:11px;outline:none;font-family:monospace">'+
      '</div>'+
      '<div style="padding:9px 10px;border-top:1px solid rgba(28,25,23,.08);display:flex;gap:7px;align-items:flex-end;background:#fff;flex-shrink:0">'+
        '<button id="nvMic" onclick="nvVoice()" style="width:34px;height:34px;border-radius:50%;border:1px solid rgba(28,25,23,.12);background:transparent;cursor:pointer;font-size:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#9E9E9E" title="Voice">🎤</button>'+
        '<textarea id="nvInput" placeholder="Ask about our products..." rows="1" style="flex:1;border:1px solid rgba(28,25,23,.12);border-radius:9px;padding:8px 11px;font-size:13px;resize:none;outline:none;font-family:inherit;max-height:80px;line-height:1.5;background:#fff;color:#1C1917" oninput="this.style.height=\'auto\';this.style.height=Math.min(this.scrollHeight,80)+\'px\'" onkeydown="if(event.key===\'Enter\'&&!event.shiftKey){event.preventDefault();nvSend()}"></textarea>'+
        '<button onclick="nvSend()" style="width:34px;height:34px;border-radius:50%;background:'+clr+';border:none;color:#fff;cursor:pointer;font-size:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center">➤</button>'+
      '</div>'+
      '<div style="text-align:center;padding:4px 0 6px;font-size:9px;color:rgba(28,25,23,.28);background:#fff;flex-shrink:0;letter-spacing:.3px">POWERED BY CLAUDE AI</div>'+
    '</div>'+
    '<button id="nvToggle" style="width:52px;height:52px;border-radius:50%;background:'+clr+';color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px '+clr+'66;transition:all .18s;pointer-events:auto;flex-shrink:0" aria-label="Chat">'+logo(28)+'</button>';

  document.body.appendChild(wrap);
  updateLangBtns();
  checkKey();
  addWelcome();

  document.getElementById('nvToggle').addEventListener('click',function(e){e.stopPropagation();nvToggle();});
  document.addEventListener('click',function(e){var w=document.getElementById('nvChat');if(w&&isOpen&&!w.contains(e.target))nvClose();});

  if(CFG.proactive) {
    setTimeout(function(){
      if(!isOpen){var t=document.getElementById('nvToggle');if(t)t.style.animation='nvPulse 1s ease 3';}
    },(CFG.delay||8)*1000);
  }
}

function nvToggle(){if(isOpen)nvClose();else nvOpen();}
function nvOpen(){
  isOpen=true;
  var p=document.getElementById('nvPanel'),t=document.getElementById('nvToggle');
  if(p)p.style.display='flex';
  if(t){t.innerHTML='✕';t.style.background='#57534E';}
  setTimeout(function(){var i=document.getElementById('nvInput');if(i)i.focus();},100);
}
function nvClose(){
  isOpen=false;
  var p=document.getElementById('nvPanel'),t=document.getElementById('nvToggle');
  if(p)p.style.display='none';
  if(t){t.innerHTML=logo(28);t.style.background=CFG.color||'#B71C1C';}
}

function nvSetLang(l){
  lang=l; localStorage.setItem('nova_lang',l); updateLangBtns();
  var placeholders={en:'Ask about our products...',ja:'AIについて何でも聞いてください...',vi:'Hỏi về sản phẩm của chúng tôi...'};
  var i=document.getElementById('nvInput');if(i)i.placeholder=placeholders[l]||placeholders.en;
  renderSugs();
}
function updateLangBtns(){
  document.querySelectorAll('[data-clang]').forEach(function(b){
    var a=b.dataset.clang===lang;b.style.background=a?(CFG.color||'#B71C1C'):'transparent';b.style.color=a?'#fff':'#9E9E9E';
  });
}

// ── RENDER ─────────────────────────────────────────────────────
function md(t){
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\n/g,'<br>')
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2" style="color:'+(CFG.color||'#B71C1C')+';text-decoration:underline">$1</a>');
}
function addBot(text){
  var m=document.getElementById('nvMessages');if(!m)return;
  var d=document.createElement('div');d.style.cssText='display:flex;gap:8px;align-items:flex-start';
  d.innerHTML='<div style="width:26px;height:26px;border-radius:50%;background:'+(CFG.color||'#B71C1C')+';display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;overflow:hidden">'+logo(26)+'</div>'+
    '<div style="background:#fff;border:1px solid rgba(28,25,23,.1);border-radius:4px 12px 12px 12px;padding:9px 12px;font-size:13px;color:#1C1917;line-height:1.65;max-width:calc(100% - 42px);box-shadow:0 1px 3px rgba(28,25,23,.06)">'+md(text)+'</div>';
  m.appendChild(d);m.scrollTop=m.scrollHeight;
}
function addUser(text){
  var m=document.getElementById('nvMessages');if(!m)return;
  var d=document.createElement('div');d.style.cssText='display:flex;justify-content:flex-end';
  d.innerHTML='<div style="background:'+(CFG.color||'#B71C1C')+';color:#fff;border-radius:12px 4px 12px 12px;padding:9px 12px;font-size:13px;line-height:1.6;max-width:80%">'+text.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</div>';
  m.appendChild(d);m.scrollTop=m.scrollHeight;
  var s=document.getElementById('nvSugs');if(s)s.innerHTML='';
}
function addTyping(){
  var m=document.getElementById('nvMessages');if(!m)return;
  var d=document.createElement('div');d.id='nvTyping';d.style.cssText='display:flex;gap:8px;align-items:flex-start';
  d.innerHTML='<div style="width:26px;height:26px;border-radius:50%;background:'+(CFG.color||'#B71C1C')+';display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">'+logo(26)+'</div>'+
    '<div style="background:#fff;border:1px solid rgba(28,25,23,.1);border-radius:4px 12px 12px 12px;padding:9px 12px;display:flex;gap:4px;align-items:center">'+
    '<span style="width:6px;height:6px;border-radius:50%;background:#9E9E9E;animation:nvDot 1.2s infinite 0s"></span>'+
    '<span style="width:6px;height:6px;border-radius:50%;background:#9E9E9E;animation:nvDot 1.2s infinite .2s"></span>'+
    '<span style="width:6px;height:6px;border-radius:50%;background:#9E9E9E;animation:nvDot 1.2s infinite .4s"></span>'+
    '</div>';
  m.appendChild(d);m.scrollTop=m.scrollHeight;
}
function removeTyping(){var t=document.getElementById('nvTyping');if(t)t.parentNode.removeChild(t);}

function addWelcome(){
  var wm={en:CFG.welcome_en||'Hi! Welcome to Miraio 👋\nAsk me anything about our products.',
          ja:CFG.welcome_ja||'こんにちは！Miraioへようこそ。\nAI製品について何でもどうぞ。',
          vi:'Xin chào! Chào mừng đến Miraio 👋\nHỏi tôi bất cứ điều gì về sản phẩm của chúng tôi.'};
  addBot(wm[lang]||wm.en);renderSugs();
}
function renderSugs(){
  var el=document.getElementById('nvSugs');if(!el)return;
  var sugs=getSugs();var list=sugs[lang]||sugs.en;var clr=CFG.color||'#B71C1C';
  el.innerHTML=list.map(function(s){
    return '<button onclick="nvUse(\''+s.replace(/\\/g,'\\\\').replace(/'/g,"\\'")+'\')\" style="padding:5px 11px;border-radius:14px;border:1px solid '+clr+'33;background:'+clr+'0D;color:'+clr+';font-size:11px;cursor:pointer;font-family:inherit;white-space:nowrap">'+s+'</button>';
  }).join('');
}
function nvUse(t){var i=document.getElementById('nvInput');if(i)i.value=t;nvSend();}

// ── SEND ───────────────────────────────────────────────────────
function nvSend(){
  var inp=document.getElementById('nvInput');if(!inp)return;
  var text=inp.value.trim();if(!text||isThinking)return;
  var key=localStorage.getItem('nova_widget_key')||localStorage.getItem('nova_api_key')||'';
  addUser(text);inp.value='';inp.style.height='auto';
  isThinking=true;setStatus(lang==='ja'?'考え中...':'Thinking...','#F59E0B');
  var ctx=search(text);
  if(!key){fallback(text,ctx);return;}
  addTyping();
  history.push({role:'user',content:text});
  fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-allow-browser':'true'},
    body:JSON.stringify({model:CFG.model||'claude-haiku-4-5-20251001',max_tokens:CFG.max_tokens||350,system:buildPrompt(ctx,lang),messages:history})
  })
  .then(function(r){return r.json();})
  .then(function(d){
    removeTyping();
    var reply=(d.content&&d.content[0]&&d.content[0].text)||(lang==='ja'?'もう一度お試しください。':'Sorry, please try again.');
    history.push({role:'assistant',content:reply});
    if(history.length>12)history=history.slice(-10);
    addBot(reply);isThinking=false;
    setStatus(lang==='ja'?'オンライン':(CFG.status||'Online'),'#22C55E');
    logMsg(text,reply);
  })
  .catch(function(){removeTyping();fallback(text,ctx);});
}

function fallback(text,ctx){
  isThinking=false;setStatus(lang==='ja'?'オンライン':(CFG.status||'Online'),'#22C55E');
  if(!ctx.length){
    addBot(lang==='ja'?(CFG.fallback_ja||'ご質問ありがとうございます。詳しくはhello@miraio.comまでお問い合わせください。'):(CFG.fallback_en||'Thanks! Contact **hello@miraio.com** or [book a demo](contact.html).'));
    return;
  }
  var c=ctx[0],body=c.content.split('.').slice(0,2).join('.')+'.',
      cta=lang==='ja'?'\n\n[デモを予約](contact.html)または **'+CFG.email+'** まで。':'\n\n[Book a demo](contact.html) or email **'+CFG.email+'**.';
  addBot('**'+c.title+'**\n'+body+cta);
}

function logMsg(userMsg,botReply){
  try{
    var logs=JSON.parse(localStorage.getItem('miraio_chat_logs')||'[]');
    var sess=null;
    for(var i=0;i<logs.length;i++){if(logs[i].id===sessionId){sess=logs[i];break;}}
    if(!sess){sess={id:sessionId,ts:Date.now(),lang:lang,messages:[]};logs.push(sess);}
    sess.messages.push({role:'user',content:userMsg},{role:'assistant',content:botReply});
    if(logs.length>50)logs=logs.slice(-50);
    localStorage.setItem('miraio_chat_logs',JSON.stringify(logs));
  }catch(e){}
}

function setStatus(text,color){
  var d=document.getElementById('nvDot'),s=document.getElementById('nvStatus');
  if(d)d.style.background=color;if(s)s.textContent=text;
}

function checkKey(){
  var key=localStorage.getItem('nova_widget_key')||localStorage.getItem('nova_api_key');
  var el=document.getElementById('nvKeyNotice');if(el)el.style.display=key?'none':'block';
}
function nvSaveKey(v){
  if(v&&v.startsWith('sk-ant-')){
    localStorage.setItem('nova_widget_key',v);
    var el=document.getElementById('nvKeyNotice');if(el)el.style.display='none';
  }
}

// ── VOICE ───────────────────────────────────────────────────────
function nvVoice(){
  var btn=document.getElementById('nvMic');
  if(!('webkitSpeechRecognition' in window||'SpeechRecognition' in window)){
    addBot(lang==='ja'?'音声入力はChrome/Edgeのみ対応しています。':'Voice input requires Chrome or Edge.');return;
  }
  if(listening){if(recognition)recognition.stop();return;}
  var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  recognition=new SR();
  recognition.lang={en:'en-US',ja:'ja-JP',vi:'vi-VN'}[lang]||'en-US';
  recognition.continuous=false;recognition.interimResults=true;
  recognition.onstart=function(){listening=true;if(btn){btn.style.background='#FEE2E2';btn.style.color=CFG.color||'#B71C1C';}};
  recognition.onresult=function(e){var t=Array.from(e.results).map(function(r){return r[0].transcript;}).join('');var i=document.getElementById('nvInput');if(i)i.value=t;};
  recognition.onend=function(){listening=false;if(btn){btn.style.background='transparent';btn.style.color='#9E9E9E';}var i=document.getElementById('nvInput');if(i&&i.value.trim())nvSend();};
  recognition.onerror=function(){listening=false;if(btn){btn.style.background='transparent';btn.style.color='#9E9E9E';}};
  recognition.start();
}

// ── CSS ─────────────────────────────────────────────────────────
var style=document.createElement('style');
style.textContent='@keyframes nvDot{0%,60%,100%{transform:translateY(0);opacity:.3}30%{transform:translateY(-4px);opacity:1}}@keyframes nvPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}#nvMessages::-webkit-scrollbar{width:3px}#nvMessages::-webkit-scrollbar-thumb{background:rgba(28,25,23,.15);border-radius:3px}';
document.head.appendChild(style);

// ── EXPOSE & INIT ──────────────────────────────────────────────
window.nvToggle=nvToggle;window.nvClose=nvClose;window.nvOpen=nvOpen;
window.nvSetLang=nvSetLang;window.nvSend=nvSend;window.nvUse=nvUse;
window.nvSaveKey=nvSaveKey;window.nvVoice=nvVoice;

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',function(){setTimeout(create,500);});
}else{setTimeout(create,500);}

})();
