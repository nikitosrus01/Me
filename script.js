:root {
    --bg-color: #12141a;
    --card-bg: rgba(22, 26, 35, 0.75);
    --text-color: #d8dce6;
    --text-dim: #7a8499;
    --accent-orange: #ff6b1a;
    --accent-blue: #00d9ff;
    --grid-line: rgba(42, 50, 69, 0.4);
    --border-color: rgba(60, 72, 98, 0.5);
    
    --font-heading: 'Space Grotesk', sans-serif;
    --font-body: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: var(--font-body);
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
}

/* Координатная сетка фоном */
.cad-grid-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: 
        linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
        linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: -2;
    pointer-events: none;
}

.hud-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(circle at center, transparent 60%, rgba(10, 12, 16, 0.8) 100%);
    z-index: -1;
    pointer-events: none;
}

.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
}

.mono-code {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 1px;
    color: var(--text-dim);
}

.accent-text {
    color: var(--accent-orange);
    font-weight: bold;
}

/* Navigation */
.nav-bar {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background: rgba(18, 20, 26, 0.9);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border-color);
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
}

.hud-dot {
    width: 8px;
    height: 8px;
    background-color: var(--accent-orange);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--accent-orange);
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 20px;
}

.nav-links a {
    color: var(--text-color);
    text-decoration: none;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: var(--accent-orange);
}

.nav-num {
    color: var(--accent-orange);
}

/* Sections */
.section {
    padding: 80px 0;
    border-bottom: 1px dashed var(--border-color);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.section.visible {
    opacity: 1;
    transform: translateY(0);
}

.section-tag {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    margin-bottom: 30px;
    letter-spacing: 2px;
    color: var(--text-dim);
}

/* CAD Frame Styling */
.cad-frame {
    position: relative;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    padding: 25px;
    transition: border-color 0.3s, transform 0.3s;
}

/* Угловые маркеры */
.cad-frame::before, .cad-frame::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-color: var(--accent-orange);
    border-style: solid;
    pointer-events: none;
    opacity: 0.5;
    transition: opacity 0.3s, border-color 0.3s;
}

.cad-frame::before {
    top: -1px;
    left: -1px;
    border-width: 2px 0 0 2px;
}

.cad-frame::after {
    bottom: -1px;
    right: -1px;
    border-width: 0 2px 2px 0;
}

.cad-frame:hover {
    border-color: rgba(255, 107, 26, 0.4);
    transform: translateY(-2px);
}

.cad-frame:hover::before, .cad-frame:hover::after {
    opacity: 1;
}

/* Hero Section */
.hero-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 40px;
    align-items: center;
    margin-bottom: 40px;
}

.status-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.status-light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--accent-orange);
}

.pulse {
    animation: pulse-anim 2s infinite;
}

@keyframes pulse-anim {
    0% { box-shadow: 0 0 0 0 rgba(255, 107, 26, 0.7); }
    70% { box-shadow: 0 0 0 8px rgba(255, 107, 26, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 107, 26, 0); }
}

.hero-title {
    font-family: var(--font-heading);
    font-size: 2.8rem;
    line-height: 1.1;
    margin-bottom: 10px;
}

.hero-title .alias {
    font-size: 1.5rem;
    color: var(--accent-orange);
    font-family: var(--font-mono);
    font-weight: normal;
}

.hero-subtitle {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    color: var(--accent-blue);
    margin-bottom: 20px;
}

.hero-bio {
    color: var(--text-color);
    font-size: 1rem;
}

/* HUD Viewport Photo */
.cad-viewport {
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;
    background: #090b0e;
    border: 1px solid var(--border-color);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.hero-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(30%) contrast(110%);
}

.photo-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.placeholder-initials {
    font-family: var(--font-heading);
    font-size: 4rem;
    color: var(--accent-orange);
}

.hud-indicators {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content: space-between;
    z-index: 2;
}

.hud-tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    background: rgba(18, 20, 26, 0.8);
    padding: 2px 6px;
    border: 1px solid var(--border-color);
    color: var(--accent-orange);
}

.sight-crosshair {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

.crosshair-h {
    position: absolute;
    width: 60%;
    height: 1px;
    background: rgba(255, 107, 26, 0.3);
}

.crosshair-v {
    position: absolute;
    height: 60%;
    width: 1px;
    background: rgba(255, 107, 26, 0.3);
}

.sight-circle {
    width: 80px;
    height: 80px;
    border: 1px dashed rgba(255, 107, 26, 0.5);
    border-radius: 50%;
}

.dimension-line {
    position: absolute;
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--text-dim);
}

.line-x {
    bottom: 5px;
    width: 80%;
    text-align: center;
    border-bottom: 1px solid var(--text-dim);
}

.line-y {
    right: 5px;
    height: 80%;
    writing-mode: vertical-rl;
    text-align: center;
    border-right: 1px solid var(--text-dim);
}

.cad-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: var(--accent-orange);
    border-style: solid;
    z-index: 3;
}

.top-left { top: 5px; left: 5px; border-width: 2px 0 0 2px; }
.top-right { top: 5px; right: 5px; border-width: 2px 2px 0 0; }
.bottom-left { bottom: 5px; left: 5px; border-width: 0 0 2px 2px; }
.bottom-right { bottom: 5px; right: 5px; border-width: 0 2px 2px 0; }

/* Spec Table */
.spec-table-container {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    padding: 20px;
}

.spec-title {
    margin-bottom: 15px;
}

.spec-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
}

.spec-table th, .spec-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
}

.spec-table th {
    font-family: var(--font-mono);
    color: var(--accent-orange);
    font-size: 0.75rem;
}

.param-name {
    font-family: var(--font-mono);
    color: var(--text-dim);
}

.param-val {
    font-weight: 500;
}

.param-extra {
    font-family: var(--font-mono);
    color: var(--text-dim);
    font-size: 0.8rem;
}

/* Stack Section */
.stack-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.span-2 {
    grid-column: span 2;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 10px;
}

.card-header h3 {
    font-family: var(--font-heading);
    font-size: 1.2rem;
}

.tech-list {
    list-style: none;
}

.tech-list li {
    padding: 6px 0;
    font-family: var(--font-mono);
    font-size: 0.95rem;
}

.tech-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.chip {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    padding: 6px 12px;
    background: rgba(42, 50, 69, 0.4);
    border: 1px solid var(--border-color);
    border-radius: 2px;
}

.chip.accent {
    border-color: var(--accent-orange);
    color: var(--accent-orange);
}

/* Projects Section */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 25px;
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.proj-id {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent-orange);
}

.proj-status {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 2px 8px;
    border: 1px solid;
}

.status-active {
    color: var(--accent-orange);
    border-color: var(--accent-orange);
}

.status-done {
    color: var(--accent-blue);
    border-color: var(--accent-blue);
}

.proj-title {
    font-family: var(--font-heading);
    font-size: 1.3rem;
    margin-bottom: 12px;
}

.proj-desc {
    font-size: 0.92rem;
    color: #b0b8c8;
    margin-bottom: 20px;
}

.proj-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.proj-tags span {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    background: rgba(255, 107, 26, 0.1);
    color: var(--text-color);
    padding: 3px 8px;
    border: 1px solid rgba(255, 107, 26, 0.2);
}

/* Timeline */
.timeline {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.timeline-year {
    font-family: var(--font-mono);
    font-size: 1.2rem;
    color: var(--accent-orange);
    margin-bottom: 15px;
    border-left: 3px solid var(--accent-orange);
    padding-left: 10px;
}

.timeline-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 15px;
}

.timeline-badge {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--accent-blue);
    margin-bottom: 8px;
    font-weight: bold;
}

.timeline-card h4 {
    font-family: var(--font-heading);
    margin-bottom: 5px;
}

.timeline-card p {
    font-size: 0.85rem;
    color: var(--text-dim);
}

/* Partners & SIT */
.partners-wrapper {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.partners-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.partner-item {
    text-align: center;
}

.partner-item h4 {
    font-family: var(--font-heading);
    margin-top: 5px;
}

.sit-block {
    background: linear-gradient(135deg, rgba(22, 26, 35, 0.9), rgba(30, 36, 50, 0.9));
    border-color: var(--accent-orange);
}

.sit-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.sit-block h3 {
    font-family: var(--font-heading);
    font-size: 1.4rem;
    margin-bottom: 10px;
}

/* Contacts */
.contact-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.contact-grid {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 15px;
    font-family: var(--font-mono);
}

.contact-label {
    width: 100px;
    color: var(--text-dim);
}

.contact-value {
    color: var(--accent-orange);
    text-decoration: none;
    transition: text-decoration 0.3s;
}

.contact-value:hover {
    text-decoration: underline;
}

/* Footer */
.footer {
    padding: 30px 0;
    border-top: 1px solid var(--border-color);
    margin-top: 40px;
}

.footer-content {
    display: flex;
    justify-content: space-between;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-grid {
        grid-template-columns: 1fr;
    }
    .span-2 {
        grid-column: span 1;
    }
    .stack-grid {
        grid-template-columns: 1fr;
    }
    .projects-grid {
        grid-template-columns: 1fr;
    }
    .partners-list {
        grid-template-columns: 1fr;
    }
    .nav-links {
        display: none;
    }
}