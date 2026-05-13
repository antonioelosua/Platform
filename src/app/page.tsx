"use client"

<!DOCTYPE html>
<html lang="es-MX">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Totalplay — Calculadora de Valor · Reclutamiento con IA</title>
<style>
:root {
  color-scheme: light;
  --dark:   #0A1A2E;     /* Totalplay deep navy */
  --dark-2: #122842;
  --ink:    #1A2238;
  --muted:  #5A6B85;
  --line:   #E2E8F0;
  --bg:     #F6F8FC;
  --card:   #FFFFFF;
  --accent:   #1E3A8A;   /* Totalplay-inspired dark blue */
  --accent-2: #2754C5;
  --accent-soft: #E2EAF6;
  --accent-soft-2: #C2D2EE;
  --cyan: #38BDF8;       /* glow accent from Totalplay imagery */
  --gold: #F5B400;
  --shadow: 0 1px 2px rgba(10,26,46,.06), 0 8px 24px rgba(10,26,46,.10);
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: var(--bg);
  color: var(--ink);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
.wrap { max-width: 1240px; margin: 0 auto; padding: 28px 24px 64px; }
 
/* Header */
.hero {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 28px;
  color: #fff; border-radius: 16px; box-shadow: var(--shadow);
  background-color: var(--dark);
  background-image:
    radial-gradient(700px 220px at 90% -20%, rgba(56,189,248,.35), transparent 65%),
    radial-gradient(500px 180px at 15% 110%, rgba(56,189,248,.22), transparent 60%),
    linear-gradient(135deg, var(--dark) 0%, var(--dark-2) 100%);
}
.brand { display: flex; align-items: center; gap: 14px; }
.tp-logo {
  height: 40px; padding: 6px 14px; border-radius: 10px;
  background: var(--accent);
  display: flex; align-items: center; gap: 8px; color: #fff; font-weight: 800; font-size: 16px;
  letter-spacing: .3px;
  box-shadow: 0 4px 14px rgba(30,58,138,.45);
  border: 1px solid rgba(255,255,255,.10);
}
.tp-logo svg { width: 18px; height: 18px; }
.brand .name { font-weight: 700; letter-spacing: .3px; font-size: 18px; }
.brand .sub { font-size: 12px; opacity: .8; }
.hero h1 { font-size: 18px; font-weight: 600; margin: 0; opacity: .95; }
.hero .pill {
  font-size: 11px; padding: 6px 10px; border-radius: 999px;
  background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.18);
}
 
/* Intro */
.intro { margin: 26px 4px 22px; }
.intro h2 { font-size: 30px; margin: 0 0 8px; color: var(--dark); letter-spacing: -.02em; }
.intro p { margin: 0; color: var(--muted); max-width: 820px; }
 
/* Layout */
.grid { display: grid; grid-template-columns: 380px 1fr; gap: 22px; }
@media (max-width: 980px) { .grid { grid-template-columns: 1fr; } }
 
/* Inputs panel */
.panel {
  background: var(--card); border: 1px solid var(--line);
  border-radius: 16px; padding: 22px; box-shadow: var(--shadow);
}
.panel h3 {
  margin: 0 0 4px; font-size: 16px; color: var(--dark);
  display: flex; align-items: center; gap: 8px;
}
.panel h3::before {
  content: ""; width: 6px; height: 18px; border-radius: 3px; background: var(--accent);
}
.panel .lead { font-size: 13px; color: var(--muted); margin-bottom: 18px; }
 
.field { margin-bottom: 16px; }
.field-row {
  display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;
  gap: 8px;
}
.field label { font-size: 13px; font-weight: 600; color: var(--ink); }
.field .val {
  font-size: 13px; font-weight: 700; color: var(--accent);
  background: var(--accent-soft); border: 1px solid var(--accent-soft-2); padding: 2px 8px; border-radius: 6px;
  white-space: nowrap;
}
input[type="range"] {
  width: 100%; -webkit-appearance: none; appearance: none;
  height: 6px; background: linear-gradient(to right, var(--accent) 0%, var(--accent) var(--p,30%), #E1E8F2 var(--p,30%), #E1E8F2 100%);
  border-radius: 999px; outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 18px; height: 18px; border-radius: 50%;
  background: #fff; border: 3px solid var(--accent);
  box-shadow: 0 2px 6px rgba(26,26,26,.18); cursor: pointer;
}
input[type="range"]::-moz-range-thumb {
  width: 18px; height: 18px; border-radius: 50%;
  background: #fff; border: 3px solid var(--accent); cursor: pointer;
}
.hint { font-size: 11px; color: var(--muted); margin-top: 4px; }
 
.actions { display: flex; gap: 10px; margin-top: 8px; }
.btn {
  flex: 1; padding: 11px 14px; border-radius: 10px; font-weight: 600; font-size: 14px;
  border: none; cursor: pointer; transition: transform .05s ease, box-shadow .2s ease;
}
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover { background: var(--accent-2); box-shadow: 0 6px 16px rgba(30,58,138,.35); }
.btn-ghost { background: var(--accent-soft); color: var(--accent); }
.btn-ghost:hover { background: var(--accent-soft-2); }
.btn:active { transform: translateY(1px); }
 
/* Results header */
.results-header {
  color: #fff; border-radius: 16px; padding: 22px 26px; box-shadow: var(--shadow);
  display: flex; align-items: center; justify-content: space-between; gap: 14px;
  background-color: var(--dark);
  background-image:
    radial-gradient(500px 200px at 100% 0%, rgba(56,189,248,.30), transparent 65%),
    linear-gradient(135deg, var(--dark) 0%, var(--dark-2) 100%);
}
.results-header .label { font-size: 13px; opacity: .85; letter-spacing: .04em; text-transform: uppercase; color: #fff; }
.results-header .total { font-size: 38px; font-weight: 800; letter-spacing: -.02em; margin-top: 2px; color: #fff; }
.results-header .annual { font-size: 12px; opacity: .85; color: #fff; }
.cta {
  background: var(--accent); color: #fff; border: none; padding: 11px 16px;
  border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 13px;
  box-shadow: 0 4px 14px rgba(30,58,138,.45);
}
.cta:hover { background: var(--accent-2); }
 
.cards {
  display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 14px;
}
@media (max-width: 700px) { .cards { grid-template-columns: 1fr; } }
.card {
  background: var(--card); border: 1px solid var(--line); border-radius: 14px;
  padding: 18px; box-shadow: var(--shadow); position: relative; overflow: hidden;
  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
}
.card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(26,26,26,.10); border-color: #C7D2E0; }
.card .check {
  width: 28px; height: 28px; border-radius: 8px; background: var(--accent-soft);
  color: var(--accent); display: grid; place-items: center; font-weight: 700; margin-bottom: 10px;
}
.card h4 { margin: 0 0 4px; color: var(--dark); font-size: 15px; }
.card .amount {
  font-size: 26px; font-weight: 800; color: var(--dark); letter-spacing: -.01em; margin: 6px 0 4px;
}
.card .desc { font-size: 12.5px; color: var(--muted); margin: 6px 0 0; }
.card .pct {
  position: absolute; top: 14px; right: 14px;
  font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 999px;
  background: var(--accent-soft); color: var(--accent); border: 1px solid var(--accent-soft-2);
}
 
/* Disclosure */
.assump {
  margin-top: 22px; background: var(--card); border: 1px solid var(--line);
  border-radius: 14px; padding: 16px 18px; box-shadow: var(--shadow);
}
.assump summary { cursor: pointer; font-weight: 600; color: var(--dark); font-size: 14px; }
.assump ul { margin: 10px 0 0; padding-left: 18px; color: var(--muted); font-size: 12.5px; }
.assump li { margin-bottom: 4px; }
 
.foot { margin-top: 22px; text-align: center; font-size: 12px; color: var(--muted); }
.foot a { color: var(--accent); text-decoration: none; font-weight: 600; }
</style>
</head>
<body>
<div class="wrap">
 
  <div class="hero">
    <div class="brand">
      <div class="tp-logo">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 4 L21 12 L3 20 Z" opacity=".95"/>
        </svg>
        Totalplay
      </div>
      <div>
        <div class="name">Totalplay</div>
        <div class="sub">Agentes inteligentes para reclutamiento</div>
      </div>
    </div>
    <h1>Calculadora de Valor · Reclutamiento con IA</h1>
    <div class="pill">Powered by Beecker AI Agents</div>
  </div>
 
  <div class="intro">
    <h2>Estima el valor de los agentes de IA de Totalplay para tu equipo de reclutamiento.</h2>
    <p>Nuestros agentes de IA automatizan el sourcing, filtrado de candidatos, agendamiento de entrevistas y cumplimiento normativo a lo largo del ciclo de contratación. Ajusta los valores para reflejar tu organización hoy y descubre el valor anual estimado que puedes obtener.</p>
  </div>
 
  <div class="grid">
 
    <!-- INPUTS -->
    <div class="panel">
      <h3>Tu organización hoy</h3>
      <p class="lead">Mueve cada control para reflejar tu operación actual. Los resultados se actualizan en tiempo real.</p>
 
      <div class="field">
        <div class="field-row"><label for="i-emp">Número de empleados</label><span class="val" id="v-emp">500</span></div>
        <input type="range" id="i-emp" min="20" max="2500" step="10" value="500" />
        <div class="hint">PyME / mediana empresa: típicamente 20 – 2,500 empleados</div>
      </div>
 
      <div class="field">
        <div class="field-row"><label for="i-hires">Contrataciones anuales</label><span class="val" id="v-hires">150</span></div>
        <input type="range" id="i-hires" min="10" max="2000" step="5" value="150" />
        <div class="hint">Total de nuevas contrataciones por año</div>
      </div>
 
      <div class="field">
        <div class="field-row"><label for="i-salary">Salario integrado promedio del reclutador</label><span class="val" id="v-salary">$720,000</span></div>
        <input type="range" id="i-salary" min="250000" max="1800000" step="10000" value="720000" />
        <div class="hint">Costo anual cargado (sueldo + prestaciones)</div>
      </div>
 
      <div class="field">
        <div class="field-row"><label for="i-ttf">Tiempo promedio para cubrir vacante (días)</label><span class="val" id="v-ttf">35</span></div>
        <input type="range" id="i-ttf" min="10" max="90" step="1" value="35" />
      </div>
 
      <div class="field">
        <div class="field-row"><label for="i-mkt">Gasto anual en marketing de reclutamiento y anuncios</label><span class="val" id="v-mkt">$300,000</span></div>
        <input type="range" id="i-mkt" min="20000" max="1500000" step="10000" value="300000" />
      </div>
 
      <div class="field">
        <div class="field-row"><label for="i-agency">Gasto anual en agencias externas / headhunters</label><span class="val" id="v-agency">$400,000</span></div>
        <input type="range" id="i-agency" min="0" max="3000000" step="10000" value="400000" />
      </div>
 
      <div class="field">
        <div class="field-row"><label for="i-tech">Gasto anual en tecnología de talento (ATS, HRIS, etc.)</label><span class="val" id="v-tech">$200,000</span></div>
        <input type="range" id="i-tech" min="20000" max="1000000" step="5000" value="200000" />
      </div>
 
      <div class="actions">
        <button class="btn btn-ghost" id="btn-reset">Restablecer</button>
        <button class="btn btn-primary" id="btn-calc">Calcular</button>
      </div>
    </div>
 
    <!-- RESULTS -->
    <div>
      <div class="results-header">
        <div>
          <div class="label">Valor anual estimado</div>
          <div class="total" id="r-total">$0</div>
          <div class="annual">con agentes de IA de Totalplay · año 1, suma de las 5 categorías · cifras en MXN</div>
        </div>
        <button class="cta" id="btn-download">Descargar resumen</button>
      </div>
 
      <div class="cards">
        <div class="card" title="Los agentes de IA se encargan del sourcing, filtrado y agendamiento — tu equipo se concentra en lo estratégico.">
          <span class="pct">+35%</span>
          <div class="check">&#10003;</div>
          <h4>Incrementa la productividad del equipo</h4>
          <div class="amount" id="r-prod">$0</div>
          <p class="desc">Los agentes de IA automatizan las tareas de mayor volumen y menor valor — búsqueda de candidatos, filtrado de CVs y agendamiento — liberando a tus reclutadores para enfocarse en contrataciones estratégicas.</p>
        </div>
 
        <div class="card" title="Sourcing y filtrado más rápidos acortan el tiempo de cobertura.">
          <span class="pct">−30% tiempo</span>
          <div class="check">&#10003;</div>
          <h4>Acelera la velocidad de contratación</h4>
          <div class="amount" id="r-vel">$0</div>
          <p class="desc">Reduce los días que tarda en cubrir una vacante con agentes que interactúan con candidatos 24/7. Cada día abierto representa pérdida de productividad para el negocio.</p>
        </div>
 
        <div class="card" title="Filtrado estandarizado y trazabilidad completa.">
          <span class="pct">−50% errores</span>
          <div class="check">&#10003;</div>
          <h4>Reduce riesgo de cumplimiento y calidad</h4>
          <div class="amount" id="r-comp">$0</div>
          <p class="desc">Filtrado estandarizado, entrevistas estructuradas y registros auditables reducen la dependencia del área legal y el riesgo de sanciones por sesgo o reprocesos. Alineado con LFT, NOM-035 y mejores prácticas de igualdad laboral.</p>
        </div>
 
        <div class="card" title="La IA encuentra más candidatos pasivos de calidad sin pagar agencias.">
          <span class="pct">−25% gasto</span>
          <div class="check">&#10003;</div>
          <h4>Reduce gasto en marketing y agencias</h4>
          <div class="amount" id="r-mkt">$0</div>
          <p class="desc">Los agentes de IA encuentran candidatos pasivos de alta calidad en internet y dentro de tu propia base de datos — reduciendo dependencia de bolsas de trabajo costosas y headhunters externos.</p>
        </div>
 
        <div class="card" title="Consolida soluciones puntuales en una sola plataforma.">
          <span class="pct">−15% gasto</span>
          <div class="check">&#10003;</div>
          <h4>Reduce gasto en tecnología de talento</h4>
          <div class="amount" id="r-tech">$0</div>
          <p class="desc">Sustituye soluciones puntuales fragmentadas y reduce costos de integración consolidando sourcing, filtrado, agendamiento y onboarding en una sola plataforma agéntica.</p>
        </div>
 
        <div class="card" style="background: linear-gradient(135deg, #F5F9FF 0%, #E2EAF6 100%); border-color: var(--accent-soft-2);" title="Suma total de las cinco categorías.">
          <span class="pct" style="background:#FFF7DE; color:#A07900; border-color:#FFE89C;">ROI</span>
          <div class="check" style="background:rgba(245,180,0,.18); color:#A07900;">&#9733;</div>
          <h4>Valor anual total estimado</h4>
          <div class="amount" id="r-total-2">$0</div>
          <p class="desc">Suma de las cinco categorías. Estimación de primer año basada en benchmarks de la industria para automatización de reclutamiento con IA. Contacta a Totalplay para modelar tu caso específico.</p>
        </div>
      </div>
 
      <details class="assump">
        <summary>Cómo calculamos esto (supuestos)</summary>
        <ul>
          <li><b>Productividad:</b> ~1 reclutador por cada 60 contrataciones al año; los agentes recuperan ~35% de esa capacidad.</li>
          <li><b>Velocidad:</b> reducción de 30% en el tiempo de cobertura; cada día abierto representa $1,500 MXN de productividad perdida por vacante.</li>
          <li><b>Cumplimiento y calidad:</b> $1,500 MXN de exposición a riesgo y reprocesos por contratación; reducción de 50%.</li>
          <li><b>Marketing y agencias:</b> reducción de 25% sobre el gasto combinado de anuncios y agencias externas.</li>
          <li><b>Tecnología:</b> reducción de 15% en gasto de tecnología de talento por consolidación.</li>
          <li>Las cifras se muestran en pesos mexicanos (MXN). Las estimaciones son orientativas; contáctanos para una propuesta de valor personalizada.</li>
        </ul>
      </details>
    </div>
  </div>
 
  <div class="foot">Hecho para Totalplay · &copy; <span id="year"></span> · <a href="#">Hablar con ventas</a></div>
</div>
 
<script>
(function () {
  const $ = (id) => document.getElementById(id);
  const fmtMoney = (n) => "$" + Math.round(n).toLocaleString("es-MX");
  const fmtNum   = (n) => Number(n).toLocaleString("es-MX");
 
  const inputs = ["emp","hires","salary","ttf","mkt","agency","tech"];
  const defaults = { emp:500, hires:150, salary:720000, ttf:35, mkt:300000, agency:400000, tech:200000 };
 
  function readInputs() {
    const o = {};
    inputs.forEach(k => o[k] = Number($("i-"+k).value));
    return o;
  }
 
  function updateSliderFill(el) {
    const min = Number(el.min), max = Number(el.max), val = Number(el.value);
    const pct = ((val - min) / (max - min)) * 100;
    el.style.setProperty("--p", pct + "%");
  }
 
  function updateLabels(v) {
    $("v-emp").textContent    = fmtNum(v.emp);
    $("v-hires").textContent  = fmtNum(v.hires);
    $("v-salary").textContent = fmtMoney(v.salary);
    $("v-ttf").textContent    = v.ttf;
    $("v-mkt").textContent    = fmtMoney(v.mkt);
    $("v-agency").textContent = fmtMoney(v.agency);
    $("v-tech").textContent   = fmtMoney(v.tech);
  }
 
  function calculate(v) {
    // Productividad: # reclutadores * salario integrado * 35%
    const recruiters = Math.max(1, v.hires / 60);
    const productivity = recruiters * v.salary * 0.35;
 
    // Velocidad: 30% menos tiempo de cobertura, $1,500 MXN/día por vacante abierta
    const daysSaved = v.ttf * 0.30;
    const velocity = daysSaved * v.hires * 1500;
 
    // Cumplimiento: $1,500 MXN/contratación de riesgo, 50% de reducción
    const compliance = v.hires * 1500 * 0.50;
 
    // Marketing + agencias: 25% de reducción
    const marketing = (v.mkt + v.agency) * 0.25;
 
    // Tecnología: 15% de reducción
    const tech = v.tech * 0.15;
 
    const total = productivity + velocity + compliance + marketing + tech;
    return { productivity, velocity, compliance, marketing, tech, total };
  }
 
  function render() {
    const v = readInputs();
    updateLabels(v);
    inputs.forEach(k => updateSliderFill($("i-"+k)));
    const r = calculate(v);
    $("r-prod").textContent    = fmtMoney(r.productivity);
    $("r-vel").textContent     = fmtMoney(r.velocity);
    $("r-comp").textContent    = fmtMoney(r.compliance);
    $("r-mkt").textContent     = fmtMoney(r.marketing);
    $("r-tech").textContent    = fmtMoney(r.tech);
    $("r-total").textContent   = fmtMoney(r.total) + " MXN";
    $("r-total-2").textContent = fmtMoney(r.total) + " MXN";
  }
 
  inputs.forEach(k => {
    const el = $("i-"+k);
    el.addEventListener("input", render);
  });
 
  $("btn-reset").addEventListener("click", () => {
    inputs.forEach(k => $("i-"+k).value = defaults[k]);
    render();
  });
 
  $("btn-calc").addEventListener("click", () => {
    render();
    document.querySelector(".results-header").scrollIntoView({ behavior: "smooth", block: "start" });
  });
 
  // ---- Minimal inline PDF generator (no external library) ----
  // PDF strings are encoded as Latin-1 / WinAnsiEncoding using octal escapes
  // for non-ASCII bytes; bytes-equal-chars so xref offsets are exact.
  // Map common Unicode punctuation into the WinAnsi byte positions Helvetica supports.
  const WIN_ANSI = {
    0x2013: 0x96, 0x2014: 0x97, 0x2212: 0x2D,
    0x201C: 0x93, 0x201D: 0x94, 0x2018: 0x91, 0x2019: 0x92,
    0x2022: 0x95, 0x2026: 0x85, 0x20AC: 0x80, 0x2122: 0x99
  };
  function pdfEscape(s) {
    let out = "";
    for (let i = 0; i < s.length; i++) {
      let c = s.charCodeAt(i);
      if (c > 255 && WIN_ANSI[c] !== undefined) c = WIN_ANSI[c];
      if (c > 255) c = 0x3F; // unsupported -> '?'
      if (c === 92) out += "\\\\";
      else if (c === 40) out += "\\(";
      else if (c === 41) out += "\\)";
      else if (c < 32 || c > 126) out += "\\" + c.toString(8).padStart(3, "0");
      else out += String.fromCharCode(c);
    }
    return out;
  }
  function approxWidth(s, size) { return s.length * size * 0.55; }
 
  function buildPdf(drawFn) {
    let stream = "";
    const dc = {
      text(x, y, size, font, rgb, s) {
        stream += "q " + rgb[0] + " " + rgb[1] + " " + rgb[2] + " rg ";
        stream += "BT /" + font + " " + size + " Tf 1 0 0 1 " + x + " " + y +
                  " Tm (" + pdfEscape(s) + ") Tj ET Q\n";
      },
      textRight(xRight, y, size, font, rgb, s) {
        this.text(xRight - approxWidth(s, size), y, size, font, rgb, s);
      },
      rect(x, y, w, h, rgb) {
        stream += "q " + rgb[0] + " " + rgb[1] + " " + rgb[2] + " rg " +
                  x + " " + y + " " + w + " " + h + " re f Q\n";
      },
      line(x1, y1, x2, y2, rgb, w) {
        stream += "q " + rgb[0] + " " + rgb[1] + " " + rgb[2] + " RG " +
                  (w || 1) + " w " + x1 + " " + y1 + " m " + x2 + " " + y2 + " l S Q\n";
      }
    };
    drawFn(dc);
 
    let s = "%PDF-1.3\n";
    const offsets = [];
    const addObj = (body) => {
      const n = offsets.length + 1;
      offsets.push(s.length);
      s += n + " 0 obj\n" + body + "\nendobj\n";
      return n;
    };
    addObj("<< /Type /Catalog /Pages 2 0 R >>");
    addObj("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
    addObj("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] " +
           "/Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>");
    addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
    addObj("<< /Length " + stream.length + " >>\nstream\n" + stream + "endstream");
 
    const xref = s.length;
    s += "xref\n0 " + (offsets.length + 1) + "\n0000000000 65535 f \n";
    offsets.forEach(o => { s += String(o).padStart(10, "0") + " 00000 n \n"; });
    s += "trailer\n<< /Size " + (offsets.length + 1) + " /Root 1 0 R >>\n" +
         "startxref\n" + xref + "\n%%EOF";
 
    // Convert ASCII string to byte array (every char is 0-255 by construction).
    const bytes = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i) & 0xff;
    return new Blob([bytes], { type: "application/pdf" });
  }
 
  function pdfDate() {
    const d = new Date();
    return d.toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" });
  }
 
  function drawBrief(dc, v, r) {
    // Brand palette (0-1 floats)
    const NAVY  = [0.039, 0.102, 0.180]; // #0A1A2E
    const BLUE  = [0.118, 0.227, 0.541]; // #1E3A8A
    const INK   = [0.102, 0.133, 0.220]; // #1A2238
    const MUTE  = [0.353, 0.420, 0.522]; // #5A6B85
    const WHITE = [1, 1, 1];
    const LINE  = [0.886, 0.910, 0.937]; // #E2E8F0
 
    // ---- Header band ----
    dc.rect(0, 740, 612, 52, NAVY);
    // Logo pill
    dc.rect(54, 752, 110, 28, BLUE);
    dc.text(70, 760, 14, "F2", WHITE, "Totalplay");
    // Right pill text
    dc.textRight(558, 760, 9, "F1", WHITE, "Powered by Beecker AI Agents");
 
    // ---- Title ----
    dc.text(54, 710, 18, "F2", NAVY, "Calculadora de Valor — Reclutamiento con IA");
    dc.text(54, 692, 10, "F1", MUTE, "Resumen del valor anual estimado  ·  cifras en MXN  ·  " + pdfDate());
    dc.line(54, 680, 558, 680, LINE, 1);
 
    // ---- Inputs section ----
    dc.text(54, 660, 13, "F2", BLUE, "Tu organización hoy");
    const inputRows = [
      ["Número de empleados",                            fmtNum(v.emp)],
      ["Contrataciones anuales",                              fmtNum(v.hires)],
      ["Salario integrado promedio del reclutador",           fmtMoney(v.salary) + " MXN"],
      ["Tiempo promedio para cubrir vacante (días)",     String(v.ttf)],
      ["Gasto anual en marketing de reclutamiento",           fmtMoney(v.mkt) + " MXN"],
      ["Gasto anual en agencias externas / headhunters",      fmtMoney(v.agency) + " MXN"],
      ["Gasto anual en tecnología de talento",           fmtMoney(v.tech) + " MXN"]
    ];
    let y = 638;
    inputRows.forEach((row, i) => {
      if (i % 2 === 0) dc.rect(54, y - 4, 504, 18, [0.965, 0.973, 0.984]);
      dc.text(62, y, 10, "F1", INK, row[0]);
      dc.textRight(550, y, 10, "F2", NAVY, row[1]);
      y -= 18;
    });
 
    // ---- Results section ----
    y -= 14;
    dc.text(54, y, 13, "F2", BLUE, "Valor anual estimado por categoría");
    y -= 22;
    const resultRows = [
      ["Incrementa la productividad del equipo",   "+35%",          r.productivity],
      ["Acelera la velocidad de contratación", "−30% tiempo", r.velocity],
      ["Reduce riesgo de cumplimiento y calidad",  "−50% errores", r.compliance],
      ["Reduce gasto en marketing y agencias",     "−25% gasto",   r.marketing],
      ["Reduce gasto en tecnología de talento", "−15% gasto", r.tech]
    ];
    resultRows.forEach((row, i) => {
      if (i % 2 === 0) dc.rect(54, y - 4, 504, 20, [0.965, 0.973, 0.984]);
      dc.text(62, y, 10, "F2", INK, row[0]);
      dc.text(360, y, 9, "F1", MUTE, row[1]);
      dc.textRight(550, y, 11, "F2", NAVY, "$" + Math.round(row[2]).toLocaleString("es-MX"));
      y -= 20;
    });
 
    // ---- Total banner ----
    y -= 6;
    dc.rect(54, y - 50, 504, 56, NAVY);
    dc.text(70, y - 18, 10, "F1", WHITE, "VALOR ANUAL TOTAL ESTIMADO");
    const totalStr = "$" + Math.round(r.total).toLocaleString("es-MX") + " MXN";
    dc.textRight(546, y - 40, 22, "F2", WHITE, totalStr);
    y -= 70;
 
    // ---- Assumptions ----
    dc.text(54, y, 12, "F2", BLUE, "Cómo se calcula");
    y -= 16;
    const bullets = [
      "Productividad: ~1 reclutador por cada 60 contrataciones/año; los agentes recuperan ~35% de esa capacidad.",
      "Velocidad: reducción de 30% en tiempo de cobertura; $1,500 MXN/día de productividad perdida por vacante.",
      "Cumplimiento y calidad: $1,500 MXN de exposición por contratación; reducción de 50%.",
      "Marketing y agencias: reducción de 25% sobre el gasto combinado.",
      "Tecnología: reducción de 15% por consolidación de plataforma."
    ];
    bullets.forEach(b => {
      dc.text(62, y, 9, "F1", MUTE, "•  " + b);
      y -= 13;
    });
 
    // ---- Footer ----
    dc.line(54, 70, 558, 70, LINE, 1);
    dc.text(54, 56, 9, "F1", MUTE, "Powered by Beecker AI Agents  ·  Hecho para Totalplay");
    dc.textRight(558, 56, 9, "F1", MUTE, "Estimación orientativa — contacte a ventas para una propuesta personalizada.");
  }
 
  $("btn-download").addEventListener("click", () => {
    const v = readInputs(); const r = calculate(v);
    const blob = buildPdf((dc) => drawBrief(dc, v, r));
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "totalplay-valor-reclutamiento.pdf"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  });
 
  $("year").textContent = new Date().getFullYear();
  render();
})();
</script>
