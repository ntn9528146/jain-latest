// Universal CBSE Vector Diagram Engine
export function generateQuestionSvg(type = '', label = '') {
  const t = (type + ' ' + label).toLowerCase();
  
  // 1. PN Junction / Diode Characteristics
  if (t.includes('bias') || t.includes('diode') || t.includes('curve') || t.includes('semiconductor')) {
    return `<svg viewBox="0 0 300 160" class="w-64 h-36 mx-auto my-2 border border-slate-300 bg-white rounded p-1">
      <line x1="30" y1="130" x2="280" y2="130" stroke="#334155" stroke-width="2"/>
      <line x1="70" y1="20" x2="70" y2="150" stroke="#334155" stroke-width="2"/>
      <text x="282" y="134" font-size="10" fill="#334155">V</text>
      <text x="74" y="24" font-size="10" fill="#334155">I (mA)</text>
      <path d="M 70 130 Q 140 130 160 110 T 190 30" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <path d="M 70 130 L 40 133 L 38 150" fill="none" stroke="#dc2626" stroke-width="2"/>
      <line x1="160" y1="130" x2="160" y2="110" stroke="#64748b" stroke-dasharray="2,2"/>
      <text x="150" y="145" font-size="9" fill="#64748b">V_k</text>
      <text x="175" y="70" font-size="9" fill="#2563eb" font-weight="bold">Forward Bias</text>
      <text x="5" y="145" font-size="8" fill="#dc2626">Reverse Breakdown</text>
    </svg>`;
  }

  // 2. Gauss Law / Cylindrical Gaussian Surface
  if (t.includes('gauss') || t.includes('cylinder') || t.includes('wire') || t.includes('flux')) {
    return `<svg viewBox="0 0 300 150" class="w-64 h-32 mx-auto my-2 border border-slate-300 bg-white rounded p-1">
      <line x1="30" y1="75" x2="270" y2="75" stroke="#e11d48" stroke-width="3"/>
      <text x="275" y="78" font-size="10" fill="#e11d48">+λ</text>
      <ellipse cx="90" cy="75" rx="15" ry="35" fill="none" stroke="#2563eb" stroke-width="2"/>
      <ellipse cx="210" cy="75" rx="15" ry="35" fill="none" stroke="#2563eb" stroke-width="2"/>
      <line x1="90" y1="40" x2="210" y2="40" stroke="#2563eb" stroke-width="2"/>
      <line x1="90" y1="110" x2="210" y2="110" stroke="#2563eb" stroke-width="2"/>
      <line x1="150" y1="40" x2="150" y2="15" stroke="#16a34a" stroke-width="2"/>
      <text x="155" y="25" font-size="10" fill="#16a34a">E ⃗</text>
      <line x1="150" y1="75" x2="150" y2="40" stroke="#64748b" stroke-dasharray="2,2"/>
      <text x="153" y="60" font-size="9" fill="#64748b">r</text>
      <text x="140" y="130" font-size="9" fill="#2563eb">Gaussian Surface (L)</text>
    </svg>`;
  }

  // 3. Parallel Currents / Ampere Force
  if (t.includes('ampere') || t.includes('conductor') || t.includes('parallel current')) {
    return `<svg viewBox="0 0 280 140" class="w-60 h-32 mx-auto my-2 border border-slate-300 bg-white rounded p-1">
      <line x1="90" y1="20" x2="90" y2="120" stroke="#0284c7" stroke-width="3"/>
      <line x1="190" y1="20" x2="190" y2="120" stroke="#0284c7" stroke-width="3"/>
      <text x="82" y="15" font-size="10" fill="#0284c7">I₁</text>
      <text x="185" y="15" font-size="10" fill="#0284c7">I₂</text>
      <line x1="90" y1="70" x2="130" y2="70" stroke="#dc2626" stroke-width="2"/>
      <line x1="190" y1="70" x2="150" y2="70" stroke="#dc2626" stroke-width="2"/>
      <text x="135" y="65" font-size="9" fill="#dc2626">F/L</text>
      <line x1="90" y1="105" x2="190" y2="105" stroke="#64748b" stroke-dasharray="2,2"/>
      <text x="138" y="118" font-size="9" fill="#64748b">d</text>
    </svg>`;
  }

  // 4. Phasor Diagram (LCR)
  if (t.includes('phasor') || t.includes('lcr') || t.includes('ac circuit')) {
    return `<svg viewBox="0 0 260 140" class="w-56 h-32 mx-auto my-2 border border-slate-300 bg-white rounded p-1">
      <line x1="30" y1="70" x2="230" y2="70" stroke="#64748b" stroke-width="1.5"/>
      <line x1="80" y1="20" x2="80" y2="120" stroke="#64748b" stroke-width="1.5"/>
      <line x1="80" y1="70" x2="180" y2="70" stroke="#2563eb" stroke-width="2.5"/>
      <text x="185" y="73" font-size="9" fill="#2563eb">V_R, I</text>
      <line x1="80" y1="70" x2="80" y2="25" stroke="#16a34a" stroke-width="2.5"/>
      <text x="85" y="30" font-size="9" fill="#16a34a">V_L</text>
      <line x1="80" y1="70" x2="80" y2="115" stroke="#ea580c" stroke-width="2.5"/>
      <text x="85" y="115" font-size="9" fill="#ea580c">V_C</text>
      <line x1="80" y1="70" x2="160" y2="35" stroke="#9333ea" stroke-width="2.5"/>
      <text x="165" y="38" font-size="9" fill="#9333ea">V_net</text>
    </svg>`;
  }

  return '';
}
