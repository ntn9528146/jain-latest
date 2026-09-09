export const formatMathText = (text) => {
  if (!text) return '';
  let processed = String(text);

  processed = processed
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\mathbf\{([^}]+)\}/g, '<b>$1</b>')
    .replace(/\\mathrm\{([^}]+)\}/g, '$1');

  processed = processed.replace(/\$(.*?)\$/g, (match, p1) => p1);

  processed = processed
    .replace(/\\dots/g, '…')
    .replace(/\\ldots/g, '…')
    .replace(/\^\{\\circ\}/g, '°')
    .replace(/\^\\circ/g, '°')
    .replace(/\^o\b/g, '°');

  processed = processed.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span style="display:inline-flex; flex-direction:column; vertical-align:middle; text-align:center; margin:0 4px; font-size:0.95em;"><span style="border-bottom:1.5px solid currentColor; padding:0 3px;">$1</span><span style="padding:0 3px;">$2</span></span>');

  processed = processed
    .replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>')
    .replace(/\^([0-9a-zA-Z+\-]+)/g, '<sup>$1</sup>')
    .replace(/_\{([^}]+)\}/g, '<sub>$1</sub>')
    .replace(/_([0-9a-zA-Z])/g, '<sub>$1</sub>')
    .replace(/\\sqrt\{([^}]+)\}/g, '√(<i>$1</i>)');

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
