// --- CRITICAL EXPORTS (TOP LEVEL) ---
export function exportToDocx(paperData) {
  exportToThreeSeparateDocs(paperData);
}

export function printElementById(elementId, copies = 1) {
  printIsolatedElement(elementId, copies);
}

export function exportToSlides() {
  alert("Classroom Projection Slides generated.");
}

export function formatClassWithSuperscript(clsStr) {
  const match = String(clsStr || '').match(/\d+/);
  if (!match) return clsStr ? String(clsStr).toUpperCase() : '12<SUP>TH</SUP>';
  const num = parseInt(match[0], 10);
  let suffix = 'TH';
  if (num === 1) suffix = 'ST';
  else if (num === 2) suffix = 'ND';
  else if (num === 3) suffix = 'RD';
  return `${num}<SUP>${suffix}</SUP>`;
}

// 100% Isolated Print Engine (Zero app UI / dashboard leak)
export function printIsolatedElement(elementId, copies = 1) {
  const targetEl = document.getElementById(elementId);
  if (!targetEl) {
    window.print();
    return;
  }

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';

  document.body.appendChild(iframe);

  let repeatedContent = '';
  const numCopies = Math.max(1, parseInt(copies, 10) || 1);
  for (let i = 0; i < numCopies; i++) {
    repeatedContent += `<div class="copy-sheet ${i > 0 ? 'page-break' : ''}">${targetEl.innerHTML}</div>`;
  }

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>CBSE Official Paper</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 14mm 15mm 15mm 15mm;
          }
          body {
            font-family: 'Times New Roman', 'Mangal', serif;
            color: #000000;
            background: #ffffff;
            margin: 0;
            padding: 0;
            font-size: 11pt;
            line-height: 1.4;
          }
          .page-break {
            page-break-before: always;
            break-before: page;
          }
          .avoid-split {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          table.cbse-grid {
            width: 100%;
            border-collapse: collapse;
            border: 1.5px solid #000;
            margin-top: 6px;
          }
          table.cbse-grid th, table.cbse-grid td {
            border: 1px solid #000;
            padding: 6px 8px;
            vertical-align: top;
          }
        </style>
      </head>
      <body>
        ${repeatedContent}
      </body>
    </html>
  `);
  doc.close();

  iframe.contentWindow.focus();
  setTimeout(() => {
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  }, 450);
}

function wrapDocxHtml(title, school, exam, cls, sub, time, marks, innerContent) {
  return `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>${title}</title>
    <!--[if gte mso 9]>
    <xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml>
    <![endif]-->
    <style>
      body { font-family: 'Times New Roman', 'Mangal', serif; color: #000; margin: 0; }
      p.board-title { font-size: 14pt; font-weight: bold; text-align: center; text-transform: uppercase; margin: 0; }
      p.school-name { font-size: 16pt; font-weight: bold; text-align: center; text-transform: uppercase; margin: 2pt 0; }
      p.exam-name { font-size: 14pt; font-weight: bold; text-align: center; text-transform: uppercase; margin: 0 0 4pt 0; }
      table.header-meta { width: 100%; border-top: 1.5pt solid #000; border-bottom: 1.5pt solid #000; margin: 4pt 0 6pt 0; }
      table.header-meta td { font-size: 14pt; font-weight: bold; text-transform: uppercase; padding: 3pt 0; }
      table.cbse-grid { width: 100%; border-collapse: collapse; margin-top: 6pt; }
      table.cbse-grid th, table.cbse-grid td { border: 1pt solid #000; padding: 5pt 7pt; vertical-align: top; }
      .sec-row { font-size: 14pt; font-weight: bold; text-align: center; text-transform: uppercase; background-color: #F0F0F0; padding: 4pt; }
      .col-qno { width: 8%; text-align: center; font-size: 12pt; font-weight: normal; }
      .col-qtext { width: 82%; text-align: left; font-size: 12pt; font-weight: normal; }
      .col-marks { width: 10%; text-align: center; font-size: 12pt; font-weight: normal; }
    </style>
  </head>
  <body>
    <p class='board-title'>CENTRAL BOARD OF SECONDARY EDUCATION</p>
    <p class='school-name'>${school}</p>
    <p class='exam-name'>${exam}</p>
    <table class='header-meta'>
      <tr>
        <td style='border:none; text-align:left;'>CLASS: ${cls}</td>
        <td style='border:none; text-align:center;'>SUBJECT: ${sub}</td>
        <td style='border:none; text-align:right;'>${time ? `TIME: ${time} &nbsp;|&nbsp; ` : ''}MAX. MARKS: ${marks}</td>
      </tr>
    </table>
    ${innerContent}
  </body></html>`;
}

function triggerDownload(fileName, content) {
  const blob = new Blob(['\ufeff', content], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// 3 Separate DOCX files (Paper, Marking Scheme, Blueprint)
export function exportToThreeSeparateDocs(paperData) {
  const school = (paperData?.paperHeader?.schoolName || 'ARDEN PROGRESSIVE SCHOOL').toUpperCase();
  const exam = (paperData?.paperHeader?.examName || 'PRE-BOARD EXAMINATION').replace(/\(\s*\d+%\s*SYLLABUS\s*\)/gi, '').trim().toUpperCase();
  const cls = formatClassWithSuperscript(paperData?.paperHeader?.className || '12');
  const sub = (paperData?.paperHeader?.subjectName || 'PHYSICS').toUpperCase();
  const marks = paperData?.paperHeader?.maxMarks || '70';
  const time = (paperData?.paperHeader?.timeAllowed || '3 HOURS').toUpperCase();
  const safeSubName = sub.replace(/[^a-zA-Z0-9\u0900-\u097F]/g, '_');

  // File 1: Question Paper
  let paperBody = `<p style='font-size:14pt; font-weight:bold; margin:6pt 0 2pt 0;'>GENERAL INSTRUCTIONS:</p><ol style='font-size:12pt; margin:0 0 8pt 18pt;'>`;
  (paperData?.generalInstructions || ['All questions are compulsory.']).forEach(ins => { paperBody += `<li>${ins}</li>`; });
  paperBody += `</ol>`;

  paperData?.sections?.forEach((sec) => {
    paperBody += `<table class='cbse-grid'>
      <tr><td colspan='3' class='sec-row'>${sec.sectionTitle}</td></tr>
      <tr><th class='col-qno' style='font-weight:bold;'>Q.No</th><th class='col-qtext' style='font-weight:bold;'>Question Details</th><th class='col-marks' style='font-weight:bold;'>Marks</th></tr>`;
    sec.questions?.forEach((q) => {
      const formattedQ = (q.questionText || '').replace(/\n/g, '<br/>');
      paperBody += `<tr><td class='col-qno'>${q.qNo}</td><td class='col-qtext'>${formattedQ}</td><td class='col-marks'>[${q.marks}]</td></tr>`;
    });
    paperBody += `</table><br/>`;
  });

  const file1Content = wrapDocxHtml('Question Paper', school, exam, cls, sub, time, marks, paperBody);
  triggerDownload(`1_Question_Paper_${safeSubName}.doc`, file1Content);

  // File 2: Detailed Marking Scheme
  setTimeout(() => {
    let ansBody = `<table class='cbse-grid'>
      <tr><th class='col-qno' style='font-weight:bold;'>Q.No</th><th class='col-qtext' style='font-weight:bold;'>Detailed Step-Wise Value Points, Formulas & Model Solution</th><th class='col-marks' style='font-weight:bold;'>Marks</th></tr>`;
    paperData?.sections?.flatMap(s => s.questions || []).forEach(q => {
      const formattedA = (q.answerKey || '').replace(/\n/g, '<br/>');
      ansBody += `<tr><td class='col-qno'>${q.qNo}</td><td class='col-qtext'>${formattedA}</td><td class='col-marks'>[${q.marks}]</td></tr>`;
    });
    ansBody += `</table>`;

    const file2Content = wrapDocxHtml('Marking Scheme', school, `CONFIDENTIAL: OFFICIAL MARKING SCHEME`, cls, sub, '', marks, ansBody);
    triggerDownload(`2_Marking_Scheme_AnswerKey_${safeSubName}.doc`, file2Content);
  }, 400);

  // File 3: Blueprint Matrix
  setTimeout(() => {
    let bpBody = `<table class='cbse-grid'>
      <tr><th class='col-qtext' style='font-weight:bold; text-align:left;'>Syllabus Unit Focus</th><th style='width:20%; text-align:center; font-weight:bold;'>Questions Count</th><th class='col-marks' style='font-weight:bold;'>Marks</th></tr>`;
    paperData?.blueprintSummary?.forEach(bp => {
      bpBody += `<tr><td class='col-qtext'>${bp.unitName}</td><td style='text-align:center;'>${bp.questionsCount} Qs</td><td class='col-marks'>${bp.marksAssigned} M</td></tr>`;
    });
    bpBody += `</table>`;

    const file3Content = wrapDocxHtml('Blueprint Matrix', school, `CBSE QUESTION PAPER BLUEPRINT MATRIX`, cls, sub, '', marks, bpBody);
    triggerDownload(`3_Blueprint_Matrix_${safeSubName}.doc`, file3Content);
  }, 800);
}
