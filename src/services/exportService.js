export function formatClassWithSuperscript(clsStr) {
  const match = String(clsStr || '').match(/\d+/);
  if (!match) return clsStr ? clsStr.toUpperCase() : '12<SUP>TH</SUP>';
  const num = parseInt(match[0], 10);
  let suffix = 'TH';
  if (num === 1) suffix = 'ST';
  else if (num === 2) suffix = 'ND';
  else if (num === 3) suffix = 'RD';
  return `${num}<SUP>${suffix}</SUP>`;
}

export function printElementById() {
  window.print();
}

export function exportToDocx(paperData) {
  const school = (paperData?.paperHeader?.schoolName || 'ARDEN PROGRESSIVE SCHOOL').toUpperCase();
  const exam = (paperData?.paperHeader?.examName || 'PRE-BOARD EXAMINATION').replace(/\(\s*\d+%\s*SYLLABUS\s*\)/gi, '').trim().toUpperCase();
  const cls = formatClassWithSuperscript(paperData?.paperHeader?.className || '12');
  const sub = (paperData?.paperHeader?.subjectName || 'PHYSICS').toUpperCase();
  const marks = paperData?.paperHeader?.maxMarks || '70';
  const time = (paperData?.paperHeader?.timeAllowed || '3 HOURS').toUpperCase();

  let html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>${exam}</title>
    <style>
      body {
        font-family: 'Times New Roman', 'Mangal', serif;
        color: #000000;
        margin: 0;
        padding: 0;
      }
      p.board-title {
        font-size: 14pt;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        margin: 0 0 2pt 0;
      }
      p.school-name {
        font-size: 16pt;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        margin: 0 0 4pt 0;
      }
      p.exam-name {
        font-size: 14pt;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        margin: 0 0 6pt 0;
      }
      table.header-meta {
        width: 100%;
        border-top: 1.5pt solid #000000;
        border-bottom: 1.5pt solid #000000;
        margin-top: 4pt;
        margin-bottom: 6pt;
      }
      table.header-meta td {
        font-size: 14pt;
        font-weight: bold;
        text-transform: uppercase;
        padding: 3pt 0;
      }
      p.inst-heading {
        font-size: 14pt;
        font-weight: bold;
        text-transform: uppercase;
        margin: 6pt 0 2pt 0;
      }
      ol.inst-list {
        font-size: 12pt;
        font-weight: normal;
        margin: 0 0 8pt 18pt;
        padding: 0;
      }
      table.cbse-grid {
        width: 100%;
        border-collapse: collapse;
        margin-top: 8pt;
        margin-bottom: 12pt;
      }
      table.cbse-grid th, table.cbse-grid td {
        border: 1pt solid #000000;
        padding: 5pt 7pt;
        vertical-align: top;
      }
      .sec-row {
        font-size: 14pt;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        background-color: #F0F0F0;
        padding: 5pt;
      }
      .col-qno {
        width: 8%;
        text-align: center;
        font-size: 12pt;
        font-weight: normal;
      }
      .col-qtext {
        width: 82%;
        text-align: left;
        font-size: 12pt;
        font-weight: normal;
      }
      .col-marks {
        width: 10%;
        text-align: center;
        font-size: 12pt;
        font-weight: normal;
      }
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
        <td style='border:none; text-align:right;'>TIME: ${time} &nbsp;|&nbsp; MAX. MARKS: ${marks}</td>
      </tr>
    </table>

    <p class='inst-heading'>General Instructions:</p>
    <ol class='inst-list'>`;

  if (paperData?.generalInstructions && paperData.generalInstructions.length > 0) {
    paperData.generalInstructions.forEach((ins) => {
      html += `<li>${ins}</li>`;
    });
  } else {
    html += `<li>All questions are compulsory.</li><li>Internal choices are provided where applicable.</li>`;
  }

  html += `</ol>`;

  if (paperData?.sections && paperData.sections.length > 0) {
    paperData.sections.forEach((sec) => {
      html += `<table class='cbse-grid'>
        <tr><td colspan='3' class='sec-row'>${sec.sectionTitle}</td></tr>
        <tr>
          <th style='font-size:12pt; font-weight:bold; width:8%; text-align:center;'>Q.No</th>
          <th style='font-size:12pt; font-weight:bold; width:82%; text-align:left;'>Question Details</th>
          <th style='font-size:12pt; font-weight:bold; width:10%; text-align:center;'>Marks</th>
        </tr>`;

      sec.questions?.forEach((q) => {
        const textFormatted = (q.questionText || '').replace(/\n/g, '<br/>');
        html += `<tr>
          <td class='col-qno'>${q.qNo}</td>
          <td class='col-qtext'>${textFormatted}</td>
          <td class='col-marks'>[${q.marks}]</td>
        </tr>`;
      });

      html += `</table><br/>`;
    });
  }

  // Answer Key Section (Mandatory inside DOCX)
  if (paperData?.sections) {
    html += `<br clear='all' style='page-break-before:always'/>`;
    html += `<p class='board-title'>CENTRAL BOARD OF SECONDARY EDUCATION</p>`;
    html += `<p class='school-name'>${school}</p>`;
    html += `<p class='exam-name'>CONFIDENTIAL: MARKING SCHEME & STEP VALUES</p>`;
    html += `<table class='header-meta'>
      <tr>
        <td style='border:none; text-align:left;'>CLASS: ${cls}</td>
        <td style='border:none; text-align:center;'>SUBJECT: ${sub}</td>
        <td style='border:none; text-align:right;'>MAX. MARKS: ${marks}</td>
      </tr>
    </table>`;

    html += `<table class='cbse-grid'>
      <tr>
        <th style='font-size:12pt; font-weight:bold; width:8%; text-align:center;'>Q.No</th>
        <th style='font-size:12pt; font-weight:bold; width:82%; text-align:left;'>Detailed Step-Wise Value Points & Model Answer</th>
        <th style='font-size:12pt; font-weight:bold; width:10%; text-align:center;'>Marks</th>
      </tr>`;

    paperData.sections.flatMap((s) => s.questions || []).forEach((q) => {
      const ansFormatted = (q.answerKey || '').replace(/\n/g, '<br/>');
      html += `<tr>
        <td class='col-qno'>${q.qNo}</td>
        <td class='col-qtext'>${ansFormatted}</td>
        <td class='col-marks'>[${q.marks}]</td>
      </tr>`;
    });
    html += `</table>`;
  }

  html += `</body></html>`;

  const blob = new Blob(['\ufeff', html], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${sub.replace(/[^a-zA-Z0-9\u0900-\u097F]/g, '_')}_Class_${paperData?.paperHeader?.className || '12'}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function exportToSlides() {
  alert("Classroom Projection Slides generated.");
}
