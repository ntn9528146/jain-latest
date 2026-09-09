export function formatMathText(text) {
  if (!text) return '';
  
  let processed = String(text);

  // 1. Fractions: \frac{num}{den} -> stacked fraction format
  processed = processed.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span style="display:inline-flex; flex-direction:column; vertical-align:middle; text-align:center; margin:0 3px; font-size:0.95em;"><span style="border-bottom:1px solid currentColor; padding:0 2px;">$1</span><span style="padding:0 2px;">$2</span></span>');

  // 2. Superscripts (Powers like x^2, x^{2})
  processed = processed.replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>');
  processed = processed.replace(/\^([0-9a-zA-Z+\-]+)/g, '<sup>$1</sup>');

  // 3. Subscripts (Like CH_3, CH_{3}, f_1, f_{1})
  processed = processed.replace(/_\{([^}]+)\}/g, '<sub>$1</sub>');
  processed = processed.replace(/_([0-9a-zA-Z])/g, '<sub>$1</sub>');

  // 4. Square roots (\sqrt{x})
  processed = processed.replace(/\\sqrt\{([^}]+)\}/g, '√(<i>$1</i>)');

  // 5. Common mathematical/chemical symbols & cleanup
  processed = processed
    .replace(/\\pi/g, 'π')
    .replace(/\\theta/g, 'θ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\infty/g, '∞')
    .replace(/\\times/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\ne/g, '≠')
    .replace(/\$/g, '');

  return processed;
}
