/* ==========================================================================
   TOKENS
   ========================================================================== */
:root{
  --bg:            #0e141e;
  --bg-elevated:   #131c29;
  --bg-elevated-2: #172232;
  --grid-line:     rgba(120,160,200,0.055);
  --line:          #26364a;
  --line-soft:     #1c2838;
  --text:          #d8dce6;
  --text-dim:      #8791a3;
  --text-faint:    #576073;
  --accent:        #00d9ff;
  --accent-soft:   rgba(0,217,255,0.12);
  --accent-dim:    rgba(0,217,255,0.35);
  --warn:          #ff6b1a;

  --font-display:  'Space Grotesk', sans-serif;
  --font-body:     'Inter', sans-serif;
  --font-mono:     'JetBrains Mono', monospace;

  --section-pad-x: clamp(20px, 6vw, 96px);
  --max-w: 1240px;
}

*{ box-sizing:border-box; margin:0; padding:0; }

html{ scroll-behavior:smooth; }

@media (prefers-reduced-motion: reduce){
  html{ scroll-behavior:auto; }
  *{ animation-duration:0.001ms !important; transition-duration:0.001ms !important; }
}

body{
  background:var(--bg);
  color:var(--text);
  font-family:var(--font-body);
  font-size:16px;
  line-height:1.55;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}

.mono{ font-family:var(--font-mono); }
.accent{ color:var(--accent); }

a{ color:inherit; text-decoration:none; }
ul{ list-style:none; }

::selection{ background:var(--accent); color:#031014; }

/* ==========================================================================
   BACKGROUND GRID
   ========================================================================== */
.grid-overlay{
  position:fixed; inset:0;
  z-index:0;
  pointer-events:none;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size:44px 44px;
  mask-image:radial-gradient(ellipse 100% 90% at 50% 0%, black 40%, transparent 90%);
}

/* ==========================================================================
   NAV
   ========================================================================== */
.nav{
  position:fixed; top:0; left:0; right:0;
  z-index:100;
  display:flex; align-items:center; justify-content:space-between;
  padding:18px var(--section-pad-x);
  background:rgba(14,20,30,0.72);
  backdrop-filter:blur(10px);
  border-bottom:1px solid var(--line-soft);
}
.nav-logo{ font-size:14px; letter-spacing:0.06em; font-weight:600; }
.nav-links{ display:flex; gap:22px; font-size:12px; }
.nav-links a{
  color:var(--text-faint);
  letter-spacing:0.08em;
  transition:color .2s ease;
  position:relative;
  padding-bottom:2px;
}
.nav-links a::after{
  content:'';
  position:absolute; left:0; bottom:-4px;
  width:0; height:1px;
  background:var(--accent);
  transition:width .25s ease;
}
.nav-links a:hover{ color:var(--text); }
.nav-links a.active{ color:var(--accent); }
.nav-links a.active::after{ width:100%; }
.nav-status{ font-size:11px; color:var(--text-faint); letter-spacing:0.05em; }

/* ==========================================================================
   LAYOUT / SECTION SCAFFOLD
   ========================================================================== */
.section{
  position:relative;
  z-index:1;
  max-width:var(--max-w);
  margin:0 auto;
  padding:120px var(--section-pad-x) 60px;
}

.section-head{
  display:flex;
  align-items:baseline;
  gap:16px;
  margin-bottom:52px;
  flex-wrap:wrap;
}
.section-num{ color:var(--accent); font-size:14px; letter-spacing:0.08em; }
.section-title{
  font-family:var(--font-display);
  font-size:clamp(26px, 3.4vw, 38px);
  font-weight:600;
  letter-spacing:-0.01em;
}
.section-line{
  flex:1 1 80px;
  height:1px;
  background:linear-gradient(90deg, var(--line) 0%, transparent 100%);
  min-width:40px;
}
.section-meta{ font-size:11px; color:var(--text-faint); letter-spacing:0.08em; }

/* corner brackets, reused across cards */
.corner{
  position:absolute;
  width:14px; height:14px;
  border:1.5px solid var(--line);
  transition:border-color .25s ease;
  pointer-events:none;
}
.corner.tl{ top:-1px; left:-1px; border-right:none; border-bottom:none; }
.corner.tr{ top:-1px; right:-1px; border-left:none; border-bottom:none; }
.corner.bl{ bottom:-1px; left:-1px; border-right:none; border-top:none; }
.corner.br{ bottom:-1px; right:-1px; border-left:none; border-top:none; }

/* reveal-on-scroll */
.reveal{
  opacity:0;
  transform:translateY(18px);
  transition:opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
}
.reveal.in-view{ opacity:1; transform:translateY(0); }

/* ==========================================================================
   HERO
   ========================================================================== */
.hero-section{ padding-top:150px; min-height:100vh; display:flex; align-items:center; }
.hero-grid{
  display:grid;
  grid-template-columns:340px 1fr;
  grid-template-areas:
    "frame text"
    "frame spec"
    "hint  spec";
  gap:20px 56px;
  width:100%;
}
.hero-frame-wrap{ grid-area:frame; }
.hero-text{ grid-area:text; align-self:end; }
.spec-table{ grid-area:spec; }
.scroll-hint{ grid-area:hint; align-self:end; }

.hero-frame{
  position:relative;
  aspect-ratio:1/1;
  width:100%;
  background:var(--bg-elevated);
  border:1px solid var(--line);
  overflow:hidden;
}
.hero-frame .corner{ width:22px; height:22px; border-width:2px; border-color:var(--accent-dim); }
.hero-photo{
  position:absolute; inset:0;
  width:100%; height:100%;
  object-fit:cover;
  filter:grayscale(0.35) contrast(1.05);
}
.hero-fallback{
  display:none;
  position:absolute; inset:0;
  align-items:center; justify-content:center;
  font-size:64px; font-weight:700;
  color:var(--text-faint);
  letter-spacing:0.05em;
  background:
    repeating-linear-gradient(45deg, transparent 0 12px, rgba(255,255,255,0.02) 12px 24px);
}
.crosshair{ position:absolute; inset:0; pointer-events:none; opacity:0.5; }
.ch-line{ position:absolute; background:var(--accent-dim); }
.ch-h{ top:50%; left:20px; right:20px; height:1px; }
.ch-v{ left:50%; top:20px; bottom:20px; width:1px; }

.hud-tag{
  position:absolute;
  font-size:10px;
  letter-spacing:0.04em;
  color:var(--text-dim);
  line-height:1.4;
  background:rgba(14,20,30,0.55);
  padding:3px 6px;
}
.hud-tl{ top:10px; left:10px; }
.hud-tr{ top:10px; right:10px; text-align:right; color:var(--accent); }
.hud-bl{ bottom:10px; left:10px; }
.hud-br{ bottom:10px; right:10px; text-align:right; }
.dot{ display:inline-block; width:6px; height:6px; border-radius:50%; margin-right:4px; }
.dot.rec{ background:var(--warn); animation:blink 1.6s infinite; }
@keyframes blink{ 0%,100%{opacity:1;} 50%{opacity:.25;} }

.frame-caption{
  margin-top:10px;
  font-size:10px;
  color:var(--text-faint);
  letter-spacing:0.1em;
  text-align:center;
}

.eyebrow{
  font-size:12px;
  color:var(--accent);
  letter-spacing:0.12em;
  margin-bottom:18px;
}
.hero-name{
  font-family:var(--font-display);
  font-size:clamp(40px, 7vw, 76px);
  font-weight:700;
  line-height:0.98;
  letter-spacing:-0.02em;
  margin-bottom:18px;
}
.hero-handle{
  display:block;
  font-size:clamp(15px, 2vw, 20px);
  font-weight:400;
  letter-spacing:0.01em;
  margin-top:8px;
}
.hero-role{
  font-size:clamp(15px, 1.6vw, 18px);
  color:var(--text-dim);
  margin-bottom:18px;
}
.hero-role .sep{ color:var(--text-faint); margin:0 2px; }
.hero-bio{
  max-width:56ch;
  color:var(--text-dim);
  font-size:15px;
}

.spec-table{
  border:1px solid var(--line);
  background:var(--bg-elevated);
  padding:18px 20px;
}
.spec-table-title{
  font-size:10px; color:var(--text-faint);
  letter-spacing:0.1em;
  margin-bottom:12px;
  padding-bottom:10px;
  border-bottom:1px dashed var(--line);
}
.spec-row{
  display:flex; align-items:baseline; gap:8px;
  font-size:13px;
  padding:6px 0;
}
.spec-key{ color:var(--text-faint); flex-shrink:0; }
.spec-dots{
  flex:1;
  border-bottom:1px dotted var(--line);
  transform:translateY(-4px);
}
.spec-val{ color:var(--text); flex-shrink:0; }

.scroll-hint{
  font-size:11px;
  color:var(--text-faint);
  letter-spacing:0.08em;
  transition:color .2s ease;
}
.scroll-hint:hover{ color:var(--accent); }

/* ==========================================================================
   STACK
   ========================================================================== */
.stack-grid{
  display:grid;
  grid-template-columns:repeat(3, 1fr);
  gap:1px;
  background:var(--line-soft);
  border:1px solid var(--line-soft);
}
.stack-card{
  position:relative;
  background:var(--bg-elevated);
  padding:28px 26px 32px;
}
.stack-card .corner{ opacity:0; transition:opacity .25s ease, border-color .25s ease; }
.stack-card:hover .corner{ opacity:1; border-color:var(--accent); }
.stack-card-num{ font-size:11px; color:var(--text-faint); letter-spacing:0.08em; margin-bottom:14px; }
.stack-card-title{
  font-family:var(--font-display);
  font-size:18px; font-weight:600;
  margin-bottom:20px;
  padding-bottom:14px;
  border-bottom:1px solid var(--line);
}
.stack-list li{
  font-size:13.5px;
  color:var(--text-dim);
  padding:6px 0;
  border-bottom:1px dotted var(--line-soft);
  position:relative;
  padding-left:16px;
}
.stack-list li::before{
  content:'▪';
  position:absolute; left:0; top:6px;
  color:var(--accent);
  font-size:9px;
}
.stack-list.two-col{
  columns:2;
  column-gap:18px;
}
.stack-list.two-col li{ break-inside:avoid; }

/* ==========================================================================
   PROJECTS
   ========================================================================== */
.projects-grid{
  display:grid;
  grid-template-columns:repeat(2, 1fr);
  gap:22px;
}
.project-card{
  position:relative;
  background:var(--bg-elevated);
  border:1px solid var(--line);
  padding:26px 26px 24px;
  transition:transform .25s ease, border-color .25s ease;
}
.project-card:hover{ transform:translateY(-3px); border-color:var(--line); }
.project-card:hover .corner{ border-color:var(--accent); }
.project-head{
  display:flex; justify-content:space-between; align-items:center;
  margin-bottom:16px;
}
.project-id{ font-size:12px; color:var(--text-faint); letter-spacing:0.08em; }
.status-badge{
  font-size:9.5px;
  letter-spacing:0.06em;
  padding:4px 8px;
  border:1px solid var(--line);
  color:var(--text-dim);
}
.status-badge.status-active{ color:var(--accent); border-color:var(--accent-dim); }
.status-badge.status-done{ color:var(--text-faint); }
.project-title{
  font-family:var(--font-display);
  font-size:21px; font-weight:600;
  margin-bottom:4px;
}
.project-sub{
  font-size:11.5px;
  color:var(--text-faint);
  letter-spacing:0.03em;
  margin-bottom:14px;
}
.project-desc{
  font-size:14px;
  color:var(--text-dim);
  margin-bottom:18px;
}
.tags{ display:flex; flex-wrap:wrap; gap:8px; }
.tags span{
  font-size:10.5px;
  color:var(--text-dim);
  border:1px solid var(--line);
  padding:4px 8px;
  letter-spacing:0.02em;
}

/* ==========================================================================
   TIMELINE
   ========================================================================== */
.timeline{ position:relative; padding-left:24px; }
.timeline::before{
  content:'';
  position:absolute; left:5px; top:6px; bottom:6px;
  width:1px;
  background:linear-gradient(var(--line), transparent);
}
.timeline-year{
  display:flex; align-items:center; gap:16px;
  margin:36px 0 18px;
}
.timeline-year:first-child{ margin-top:0; }
.year-label{ font-size:13px; color:var(--accent); letter-spacing:0.08em; }
.year-line{ flex:1; height:1px; background:var(--line); }

.timeline-entry{
  position:relative;
  display:grid;
  grid-template-columns:170px 1fr;
  gap:20px;
  padding:16px 0;
  border-bottom:1px dashed var(--line-soft);
}
.tl-tick{
  position:absolute; left:-24px; top:22px;
  width:9px; height:9px;
  border:1.5px solid var(--accent);
  background:var(--bg);
  transform:rotate(45deg);
}
.tl-badge{
  font-size:11px;
  color:var(--text-dim);
  letter-spacing:0.04em;
  align-self:start;
  padding-top:3px;
}
.tl-title{
  font-family:var(--font-display);
  font-size:17px; font-weight:600;
  margin-bottom:4px;
}
.tl-desc{ font-size:13.5px; color:var(--text-dim); }

/* ==========================================================================
   PARTNERS / S.I.T
   ========================================================================== */
.partners-grid{
  display:grid;
  grid-template-columns:repeat(3, 1fr);
  gap:16px;
  margin-bottom:22px;
}
.partner-card{
  position:relative;
  background:var(--bg-elevated);
  border:1px solid var(--line);
  padding:20px 20px 22px;
}
.partner-card .corner{ opacity:0; transition:opacity .25s ease, border-color .25s ease; }
.partner-card:hover .corner{ opacity:1; border-color:var(--accent); }
.partner-num{ font-size:10.5px; color:var(--text-faint); letter-spacing:0.08em; margin-bottom:10px; }
.partner-title{ font-family:var(--font-display); font-size:16.5px; font-weight:600; margin-bottom:6px; }
.partner-desc{ font-size:11.5px; color:var(--text-dim); }

.sit-block{
  position:relative;
  background:var(--bg-elevated);
  border:1px solid var(--line);
  padding:30px 32px;
}
.sit-block .corner{ border-color:var(--accent-dim); }
.sit-head{
  display:flex; justify-content:space-between; align-items:center;
  margin-bottom:16px;
  padding-bottom:14px;
  border-bottom:1px dashed var(--line);
  flex-wrap:wrap; gap:8px;
}
.sit-tag{ font-size:11px; color:var(--text-faint); letter-spacing:0.08em; }
.sit-id{ font-size:16px; color:var(--accent); letter-spacing:0.06em; }
.sit-desc{ font-size:14.5px; color:var(--text-dim); max-width:74ch; }
.sit-desc strong{ color:var(--text); font-weight:600; }

/* ==========================================================================
   CONTACT
   ========================================================================== */
.contact-card{
  position:relative;
  background:var(--bg-elevated);
  border:1px solid var(--line);
  padding:24px 26px;
  margin-bottom:40px;
}
.contact-card-title{
  font-size:10px; color:var(--text-faint);
  letter-spacing:0.1em;
  margin-bottom:14px;
  padding-bottom:12px;
  border-bottom:1px dashed var(--line);
}
.contact-row{
  display:flex; align-items:center; gap:12px;
  width:100%;
  background:none; border:none;
  padding:14px 0;
  border-bottom:1px solid var(--line-soft);
  cursor:pointer;
  font-family:inherit;
  color:inherit;
  text-align:left;
}
.contact-row:last-child{ border-bottom:none; }
.contact-key{ color:var(--text-faint); font-size:13px; flex-shrink:0; width:90px; }
.contact-val{ font-size:14px; color:var(--text); flex-shrink:0; }
.copy-flag{
  margin-left:auto;
  font-size:10px;
  color:var(--text-faint);
  letter-spacing:0.06em;
  opacity:0;
  transition:opacity .2s ease, color .2s ease;
}
.contact-row:hover .copy-flag{ opacity:1; }
.contact-row:hover .contact-val{ color:var(--accent); }
.copy-flag.copied{ opacity:1 !important; color:var(--accent) !important; }

.footer{
  display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px;
  font-size:10.5px;
  color:var(--text-faint);
  letter-spacing:0.06em;
  padding-top:20px;
  border-top:1px solid var(--line-soft);
}

/* ==========================================================================
   RESPONSIVE
   ========================================================================== */
@media (max-width:900px){
  .hero-grid{
    grid-template-columns:1fr;
    grid-template-areas:
      "frame"
      "text"
      "spec"
      "hint";
  }
  .hero-frame-wrap{ max-width:320px; margin:0 auto; }
  .stack-grid{ grid-template-columns:1fr; }
  .projects-grid{ grid-template-columns:1fr; }
  .partners-grid{ grid-template-columns:1fr; }
  .timeline-entry{ grid-template-columns:1fr; gap:6px; }
}

@media (max-width:600px){
  .nav{ padding:14px 18px; }
  .nav-links{ gap:14px; }
  .nav-status{ display:none; }
  .section{ padding:100px 18px 48px; }
  .hero-section{ padding-top:120px; }
  .contact-key{ width:70px; }
}