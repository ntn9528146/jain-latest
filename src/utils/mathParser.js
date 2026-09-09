export const formatMathText = (text) => {
  if (!text) return '';
  
  let processed = String(text);

  // Remove wrapping $ signs if any
  processed = processed.replace(/\$(.*?)\$/g, '$1');

  // 1. Handle LaTeX \text{...} commands
  processed = processed.replace(/\\text\{([^}]+)\}/g, '$1');

  // 2. Dots & Ellipsis
  processed = processed.replace(/\\dots/g, '…');
  processed = processed.replace(/\\ldots/g, '…');

  // 3. Degrees: ^{\circ} or ^\circ -> °
  processed = processed.replace(/\^\{\\circ\}/g, '°');
  processed = processed.replace(/\^\\circ/g, '°');

  // 4. Fractions: \frac{num}{den} -> stacked fraction format
  processed = processed.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span style="display:inline-flex; flex-direction:column; vertical-align:middle; text-align:center; margin:0 3px; font-size:0.95em;"><span style="border-bottom:1px solid currentColor; padding:0 2px;">$1</span><span style="padding:0 2px;">$2</span></span>');

  // 5. Superscripts (Powers like x^2, x^{2})
  processed = processed.replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>');
  processed = processed.replace(/\^([0-9a-zA-Z+\-]+)/g, '<sup>$1</sup>');

  // 6. Subscripts (Like S_n, x_1)
  processed = processed.replace(/_\{([^}]+)\}/g, '<sub>$1</sub>');
  processed = processed.replace(/_([0-9a-zA-Z])/g, '<sub>$1</sub>');

  // 7. Square roots (\sqrt{x})
  processed = processed.replace(/\\sqrt\{([^}]+)\}/g, '√(<i>$1</i>)');

  // 8. Common mathematical symbols & functions
  processed = processed
    .replace(/\\sin/g, 'sin')
    .replace(/\\cos/g, 'cos')
    .replace(/\\tan/g, 'tan')
    .replace(/\\pi/g, 'π')
    .replace(/\\theta/g, 'θ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\infty/g, '∞')
    .replace(/\\times/g, '×')
    .replace(/\\cdot/g, '·')
    .replace(/\\div/g, '÷')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\ne/g, '≠')
    .replace(/\\circ/g, '°');

  return processed;
};
