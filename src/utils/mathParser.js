export const formatMathText = (text) => {
  if (!text) return '';
  let processed = String(text);

  // 1. Clean up LaTeX wrappers and text macros
  processed = processed
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\mathbf\{([^}]+)\}/g, '<b>$1</b>')
    .replace(/\\mathrm\{([^}]+)\}/g, '$1');

  // Remove wrapping $ signs safely
  processed = processed.replace(/\$(.*?)\$/g, (match, p1) => p1);

  // 2. Handle Nested & Complex Structures FIRST (e.g. \sqrt{\frac{...}{...}})
  // We process fractions first so they can be embedded inside roots or text cleanly
  processed = processed.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span style="display:inline-flex; flex-direction:column; vertical-align:middle; text-align:center; margin:0 4px; font-size:0.95em;"><span style="border-bottom:1.5px solid currentColor; padding:0 3px;">$1</span><span style="padding:0 3px;">$2</span></span>');

  // Square roots (\sqrt{x}) - now handles inner fractions correctly
  processed = processed.replace(/\\sqrt\{([^}]+)\}/g, '√(<i>$1</i>)');

  // 3. Dots, Ellipsis & Degrees
  processed = processed
    .replace(/\\dots/g, '…')
    .replace(/\\ldots/g, '…')
    .replace(/\^\{\\circ\}/g, '°')
    .replace(/\^\\circ/g, '°')
    .replace(/\^o\b/g, '°');

  // 4. Superscripts & Subscripts
  processed = processed
    .replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>')
    .replace(/\^([0-9a-zA-Z+\-]+)/g, '<sup>$1</sup>')
    .replace(/_\{([^}]+)\}/g, '<sub>$1</sub>')
    .replace(/_([0-9a-zA-Z])/g, '<sub>$1</sub>');

  // 5. Trigonometric, Mathematical & Greek Symbols (Comprehensive Mapping)
  processed = processed
    .replace(/\\sin\b/g, 'sin')
    .replace(/\\cos\b/g, 'cos')
    .replace(/\\tan\b/g, 'tan')
    .replace(/\\cot\b/g, 'cot')
    .replace(/\\sec\b/g, 'sec')
    .replace(/\\csc\b/g, 'csc')
    .replace(/\\cosec\b/g, 'cosec')
    .replace(/\\pi\b/g, 'π')
    .replace(/\\theta\b/g, 'θ')
    .replace(/\\alpha\b/g, 'α')
    .replace(/\\beta\b/g, 'β')
    .replace(/\\gamma\b/g, 'γ')
    .replace(/\\delta\b/g, 'δ')
    .replace(/\\infty\b/g, '∞')
    .replace(/\\times\b/g, '×')
    .replace(/\\cdot\b/g, '·')
    .replace(/\\div\b/g, '÷')
    .replace(/\\le\b/g, '≤')
    .replace(/\\ge\b/g, '≥')
    .replace(/\\ne\b/g, '≠')
    .replace(/\\approx\b/g, '≈')
    .replace(/\\triangle\b/g, '△')
    .replace(/\\sim\b/g, '∼')
    .replace(/\\cong\b/g, '≅')
    .replace(/\\circ\b/g, '°');

  return processed;
};
