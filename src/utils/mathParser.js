export const formatMathText = (text) => {
  if (!text) return "";
  let processed = String(text);

  processed = processed
    .replace(/\\text\{([^}]+)\}/g, "$1")
    .replace(/\\mathbf\{([^}]+)\}/g, "<b>$1</b>")
    .replace(/\\mathrm\{([^}]+)\}/g, "$1");

  processed = processed.replace(/\$(.*?)\$/g, (m, p1) => p1);

  // 1. Handle Sqrt containing fractions FIRST: \sqrt{\frac{num}{den}}
  processed = processed.replace(/\\sqrt\{\\frac\{([^}]+)\}\{([^}]+)\}\}/g, 
    "√(<i><span style=\"display:inline-flex; flex-direction:column; vertical-align:middle; text-align:center; margin:0 2px; font-size:0.95em;\"><span style=\"border-bottom:1px solid currentColor; padding:0 2px;\">$1</span><span style=\"padding:0 2px;\">$2</span></span></i>)"
  );

  // 2. Standard Fractions: \frac{num}{den}
  processed = processed.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, 
    "<span style=\"display:inline-flex; flex-direction:column; vertical-align:middle; text-align:center; margin:0 4px; font-size:0.95em;\"><span style=\"border-bottom:1.5px solid currentColor; padding:0 3px;\">$1</span><span style=\"padding:0 3px;\">$2</span></span>"
  );

  // 3. Standard Square roots: \sqrt{x}
  processed = processed.replace(/\\sqrt\{([^}]+)\}/g, "√(<i>$1</i>)");

  processed = processed
    .replace(/\\dots/g, "…")
    .replace(/\\ldots/g, "…")
    .replace(/\^\{\\circ\}/g, "°")
    .replace(/\^\\circ/g, "°")
    .replace(/\^o\b/g, "°");

  processed = processed
    .replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>")
    .replace(/\^([0-9a-zA-Z+\-]+)/g, "<sup>$1</sup>")
    .replace(/_\{([^}]+)\}/g, "<sub>$1</sub>")
    .replace(/_([0-9a-zA-Z])/g, "<sub>$1</sub>");

  processed = processed
    .replace(/\\sin\b/g, "sin")
    .replace(/\\cos\b/g, "cos")
    .replace(/\\tan\b/g, "tan")
    .replace(/\\cot\b/g, "cot")
    .replace(/\\sec\b/g, "sec")
    .replace(/\\csc\b/g, "csc")
    .replace(/\\cosec\b/g, "cosec")
    .replace(/\\pi\b/g, "π")
    .replace(/\\theta\b/g, "θ")
    .replace(/\\alpha\b/g, "α")
    .replace(/\\beta\b/g, "β")
    .replace(/\\gamma\b/g, "γ")
    .replace(/\\delta\b/g, "δ")
    .replace(/\\infty\b/g, "∞")
    .replace(/\\times\b/g, "×")
    .replace(/\\cdot\b/g, "·")
    .replace(/\\div\b/g, "÷")
    .replace(/\\le\b/g, "≤")
    .replace(/\\ge\b/g, "≥")
    .replace(/\\ne\b/g, "≠")
    .replace(/\\approx\b/g, "≈")
    .replace(/\\triangle\b/g, "△")
    .replace(/\\sim\b/g, "∼")
    .replace(/\\cong\b/g, "≅")
    .replace(/\\circ\b/g, "°");

  return processed;
};
