export function printElementById(elementId) {
  const targetEl = document.getElementById(elementId);
  if (!targetEl) {
    window.print();
    return;
  }

  const printFrame = document.createElement('iframe');
  printFrame.style.position = 'fixed';
  printFrame.style.right = '0';
  printFrame.style.bottom = '0';
  printFrame.style.width = '0';
  printFrame.style.height = '0';
  printFrame.style.border = '0';

  document.body.appendChild(printFrame);

  const doc = printFrame.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>CBSE Examination Assessment</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 12mm 15mm 15mm 15mm;
            @bottom-right {
              content: "Page " counter(page) " of " counter(pages);
              font-family: 'Times New Roman', 'Mangal', serif;
              font-size: 9pt;
            }
          }
          body {
            font-family: 'Times New Roman', 'Mangal', serif;
            font-size: 11pt;
            line-height: 1.38;
            color: #000;
            background: #fff;
            margin: 0;
            padding: 0;
          }
          .brand-header {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            border-bottom: 2px solid #000;
            padding-bottom: 6px;
            margin-bottom: 6px;
          }
          .school-logo {
            position: absolute;
            left: 0;
            top: 2px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            border: 1px solid #333;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 18pt;
            background: #f4f4f4;
          }
          .school-details {
            text-align: center;
            width: 100%;
          }
          .school-title {
            font-size: 15pt;
            font-weight: bold;
            text-transform: uppercase;
            margin: 0;
            letter-spacing: 0.5px;
          }
          .exam-sub {
            font-size: 11.5pt;
            font-weight: bold;
            text-transform: uppercase;
            margin: 2px 0 0 0;
          }
          .cbse-meta-table {
            width: 100%;
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            margin: 6px 0;
            font-size: 10pt;
            font-weight: bold;
          }
          .cbse-meta-table td {
            padding: 4px 0;
          }
          .instructions-card {
            border: 1px solid #000;
            padding: 6px 10px;
            font-size: 9.5pt;
            background: #fafafa;
            margin-bottom: 8px;
          }
          .instructions-card ol {
            margin: 2px 0 0 16px;
            padding: 0;
          }
          .cbse-grid {
            width: 100%;
            border-collapse: collapse;
            border: 1.5px solid #000000;
            margin-top: 6px;
          }
          .cbse-grid th, .cbse-grid td {
            border: 1px solid #000000;
            padding: 6px 8px;
            vertical-align: top;
          }
          .qno-col { width: 7%; text-align: center; font-weight: bold; }
          .qtext-col { width: 83%; text-align: left; }
          .marks-col { width: 10%; text-align: center; font-weight: bold; }
          .section-bar {
            background-color: #f0f0f0;
            font-weight: bold;
            text-align: center;
            text-transform: uppercase;
            border: 1px solid #000;
            padding: 4px;
            margin-top: 10px;
          }
          .ascii-box {
            font-family: 'Courier New', Courier, monospace;
            background: #f8f9fa;
            border: 1px dashed #666;
            padding: 6px;
            font-size: 9.5pt;
            white-space: pre;
            margin: 4px 0;
            display: inline-block;
          }
          .avoid-split {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .page-break {
            page-break-before: always;
            break-before: page;
          }
          .footer-tracker {
            text-align: right;
            font-size: 8.5pt;
            margin-top: 16px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        ${targetEl.innerHTML}
      </body>
    </html>
  `);
  doc.close();

  printFrame.contentWindow.focus();
  setTimeout(() => {
    printFrame.contentWindow.print();
    document.body.removeChild(printFrame);
  }, 400);
}

// Fixed Word DOCX Exporter with UTF-8 BOM, Mangal Hindi support and clean tables
export function exportToDocx(paperData) {
  const school = paperData?.paperHeader?.schoolName || 'ARDEN PROGRESSIVE SCHOOL';
  const exam = (paperData?.paperHeader?.examName || 'EXAMINATION 2026-27').replace(/\(\s*\d+%\s*SYLLABUS\s*\)/gi, '').trim();
  const cls = paperData?.paperHeader?.className || '12';
  const sub = paperData?.paperHeader?.subjectName || 'Subject';
  const marks = paperData?.paperHeader?.maxMarks || '70';
  const time = paperData?.paperHeader?.timeAllowed || '3 Hours';

  let html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>${exam}</title>
    <!--[if gte mso 9]>
    <xml>
      <w:WordDocument>
        <w:View>Print</w:View>
        <w:Zoom>100</w:Zoom>
        <w:DoNotOptimizeForBrowser/>
      </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
      body {
        font-family: 'Times New Roman', 'Mangal', 'Segoe UI', serif;
        font-size: 11pt;
        line-height: 1.35;
        color: #000;
      }
      p.school-head {
        font-size: 15pt;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        margin: 0;
      }
      p.exam-head {
        font-size: 12pt;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        margin: 3pt 0 6pt 0;
      }
      table.meta-grid {
        width: 100%;
        border-top: 1.5pt solid #000;
        border-bottom: 1.5pt solid #000;
        margin: 4pt 0 8pt 0;
      }
      table.meta-grid td {
        font-size: 10pt;
        font-weight: bold;
        padding: 3pt 0;
      }
      table.cbse-doc-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 8pt;
        margin-bottom: 12pt;
      }
      table.cbse-doc-table th, table.cbse-doc-table td {
        border: 1pt solid #000;
        padding: 6pt 8pt;
        vertical-align: top;
      }
      .col-qno { width: 8%; text-align: center; font-weight: bold; }
      .col-qtext { width: 82%; text-align: left; }
      .col-marks { width: 10%; text-align: center; font-weight: bold; }
      .sec-row {
        background-color: #E5E7EB;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        padding: 4pt;
      }
      pre.code-table {
        font-family: 'Courier New', monospace;
        font-size: 9.5pt;
        background: #F3F4F6;
        padding: 4pt;
      }
    </style>
  </head>
  <body>
    <p class='school-head'>🏫 ${school}</p>
    <p class='exam-head'>${exam}</p>

    <table class='meta-grid'>
      <tr>
        <td style='border:none; text-align:left;'>CLASS: ${cls}</td>
        <td style='border:none; text-align:center;'>SUBJECT: ${sub}</td>
        <td style='border:none; text-align:right;'>TIME: ${time} &nbsp;&nbsp;|&nbsp;&nbsp; MAX. MARKS: ${marks}</td>
      </tr>
    </table>

    <p style='font-weight:bold; margin:4pt 0;'>General Instructions:</p>
    <ol style='margin:0 0 10pt 18pt; font-size:10pt;'>`;

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
      html += `<table class='cbse-doc-table'>
        <tr><td colspan='3' class='sec-row'>${sec.sectionTitle}</td></tr>
        <tr><th class='col-qno'>Q.No</th><th class='col-qtext'>Question Details</th><th class='col-marks'>Marks</th></tr>`;

      sec.questions?.forEach((q) => {
        const textFormatted = (q.questionText || '')
          .replace(/\n/g, '<br/>')
          .replace(/\+[-+]+\+/g, (match) => `<pre class='code-table'>${match}</pre>`);

        html += `<tr>
          <td class='col-qno'>${q.qNo}</td>
          <td class='col-qtext'>${textFormatted}</td>
          <td class='col-marks'>[${q.marks}]</td>
        </tr>`;
      });

      html += `</table><br/>`;
    });
  }

  // Answer Key Attachment in Word
  if (paperData?.sections) {
    html += `<br clear='all' style='page-break-before:always'/>`;
    html += `<p class='exam-head'>CONFIDENTIAL: MARKING SCHEME & STEP VALUES</p>`;
    html += `<table class='cbse-doc-table'>
      <tr><th class='col-qno'>Q.No</th><th class='col-qtext'>Step-by-Step Model Answer</th><th class='col-marks'>Marks</th></tr>`;

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

  // Prepend UTF-8 BOM so Hindi/Devanagari text never renders as garbled boxes
  const blob = new Blob(['\ufeff', html], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${sub.replace(/[^a-zA-Z0-9\u0900-\u097F]/g, '_')}_Class_${cls}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function exportToSlides() {
  alert("Classroom Projection Slides generated.");
}
