export const formatMathText = (text) => {
  if (!text) return '';
  
  let processed = String(text);

  // 1. Auto-Sanitization: Clean up common AI / LLM formatting artifacts
  processed = processed
    .replace(/\\text\{([^}]+)\}/g, '$1') // Clean \text{...}
    .replace(/\\mathbf\{([^}]+)\}/g, '<b>$1</b>')
    .replace(/\\mathrm\{([^}]+)\}/g, '$1')
    .replace(/\\quad/g, '&nbsp;&nbsp;')
    .replace(/\\qquad/g, '&nbsp;&nbsp;&nbsp;&nbsp;');

  // 2. Handle wrapping $ signs safely (strip outer delimiters for inline parsing)
  processed = processed.replace(/\$(.*?)\$/g, (match, p1) => p1);

  // 3. Dots & Ellipsis
  processed = processed
    .replace(/\\dots/g, '…')
    .replace(/\\ldots/g, '…');

  // 4. Degrees: ^{\circ} or ^\circ or ^o -> °
  processed = processed
    .replace(/\^\{\\circ\}/g, '°')
    .replace(/\^\\circ/g, '°')
    .replace(/\^o\b/g, '°');

  // 5. Fractions: \frac{num}{den} -> stacked fraction format with robust fallback
  processed = processed.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span style="display:inline-flex; flex-direction:column; vertical-align:middle; text-align:center; margin:0 4px; font-size:0.95em;"><span style="border-bottom:1.5px solid currentColor; padding:0 3px;">$1</span><span style="padding:0 3px;">$2</span></span>');

  // 6. Superscripts (Powers like x^3, x^{32}, a^2)
  processed = processed
    .replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>')
    .replace(/\^([0-9a-zA-Z+\-]+)/g, '<sup>$1</sup>');

  // 7. Subscripts (Like S_n, x_1, a_{10}, HCF(a, b))
  processed = processed
    .replace(/_\{([^}]+)\}/g, '<sub>$1</sub>')
    .replace(/_([0-9a-zA-Z])/g, '<sub>$1</sub>');

  // 8. Square roots (\sqrt{x} or \sqrt{5})
  processed = processed.replace(/\\sqrt\{([^}]+)\}/g, '√(<i>$1</i>)');

  // 9. Comprehensive Math & Greek Symbols Mapping
  processed = processed
    .replace(/\\pi/g, 'π')
    .replace(/\\theta/g, 'θ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\delta/g, 'δ')
    .replace(/\\infty/g, '∞')
    .replace(/\\times/g, '×')
    .replace(/\\cdot/g, '·')
    .replace(/\\div/g, '÷')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\ne/g, '≠')
    .replace(/\\approx/g, '≈')
    .replace(/\\triangle/g, '△')
    .replace(/\\sim/g, '∼')
    .replace(/\\cong/g, '≅')
    .replace(/\\circ/g, '°');

  return processed;
};
