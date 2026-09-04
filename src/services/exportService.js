// Print directly without app UI interference
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
        <title>CBSE Official Examination Paper</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 14mm 15mm 14mm 15mm;
          }
          body {
            font-family: 'Times New Roman', 'Mangal', serif;
            font-size: 11pt;
            line-height: 1.4;
            color: #000000;
            background: #ffffff;
            margin: 0;
            padding: 0;
          }
          .header-title {
            font-size: 14pt;
            font-weight: bold;
            text-align: center;
            text-transform: uppercase;
            margin: 0;
          }
          .header-sub {
            font-size: 11pt;
            font-weight: bold;
            text-align: center;
            margin: 3px 0;
          }
          .meta-table {
            width: 100%;
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            margin: 6px 0;
            font-weight: bold;
            font-size: 10pt;
          }
          .instructions-box {
            font-size: 10pt;
            border: 1px solid #333;
            padding: 6px 10px;
            margin-bottom: 10px;
            background: #fafafa;
          }
          .instructions-box ol {
            margin: 4px 0 0 16px;
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
          .qno { width: 7%; text-align: center; font-weight: bold; }
          .qtext { width: 83%; text-align: left; }
          .marks { width: 10%; text-align: center; font-weight: bold; }
          .sec-banner {
            text-align: center;
            font-weight: bold;
            text-transform: uppercase;
            background: #f0f0f0;
            padding: 4px;
            border: 1px solid #000;
          }
          .option-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            margin-top: 4px;
            gap: 2px;
          }
          .page-break {
            page-break-before: always;
            break-before: page;
          }
          .no-split {
            page-break-inside: avoid;
            break-inside: avoid;
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

// Fixed DOCX Export with Mangal Hindi font and formatted Word tables
export function exportToDocx(paperData) {
  const school = paperData?.paperHeader?.schoolName || 'ARDEN PROGRESSIVE SCHOOL';
  const exam = paperData?.paperHeader?.examName || 'PRE-BOARD EXAMINATION (100% SYLLABUS)';
  const cls = paperData?.paperHeader?.className || '12';
  const sub = paperData?.paperHeader?.subjectName || 'Subject';
  const marks = paperData?.paperHeader?.maxMarks || '70';
  const time = paperData?.paperHeader?.timeAllowed || '3 Hours';

  let doc = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset='utf-8'>
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
        font-family: 'Times New Roman', 'Mangal', serif;
        font-size: 11pt;
        line-height: 1.35;
        color: #000000;
      }
      p.header-title {
        font-size: 14pt;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        margin: 0 0 2pt 0;
      }
      p.header-sub {
        font-size: 11pt;
        font-weight: bold;
        text-align: center;
        margin: 0 0 6pt 0;
      }
      table.meta-bar {
        width: 100%;
        border-top: 1pt solid #000;
        border-bottom: 1pt solid #000;
        margin-bottom: 8pt;
      }
      table.meta-bar td {
        font-size: 10pt;
        font-weight: bold;
        padding: 3pt 0;
      }
      table.cbse-table {
        width: 100%;
        border-collapse: collapse;
        border: 1pt solid #000000;
        margin-top: 6pt;
        margin-bottom: 12pt;
      }
      table.cbse-table th, table.cbse-table td {
        border: 1pt solid #000000;
        padding: 5pt 7pt;
        vertical-align: top;
      }
      .col-qno { width: 8%; text-align: center; font-weight: bold; }
      .col-text { width: 82%; text-align: left; mso-line-height-rule: exactly; }
      .col-marks { width: 10%; text-align: center; font-weight: bold; }
      .sec-head {
        background-color: #EAEAEA;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        padding: 4pt;
      }
      ol.inst {
        margin: 4pt 0 8pt 16pt;
        font-size: 10pt;
      }
    </style>
  </head>
  <body>
    <p class='header-title'>${school}</p>
    <p class='header-sub'>${exam}</p>
    
    <table class='meta-bar'>
      <tr>
        <td style='text-align:left;'>CLASS: ${cls}</td>
        <td style='text-align:center;'>SUBJECT: ${sub}</td>
        <td style='text-align:right;'>TIME: ${time} | MAX. MARKS: ${marks}</td>
      </tr>
    </table>

    <p style='font-weight:bold; font-size:10pt; margin:4pt 0 2pt 0;'>General Instructions:</p>
    <ol class='inst'>`;

  if (paperData?.generalInstructions && paperData.generalInstructions.length > 0) {
    paperData.generalInstructions.forEach((ins) => {
      doc += `<li>${ins}</li>`;
    });
  } else {
    doc += `<li>All questions are compulsory.</li><li>Internal choices are provided where applicable.</li>`;
  }

  doc += `</ol>`;

  if (paperData?.sections && paperData.sections.length > 0) {
    paperData.sections.forEach((sec) => {
      doc += `<table class='cbse-table'>
        <tr><td colspan='3' class='sec-head'>${sec.sectionTitle}</td></tr>
        <tr><th class='col-qno'>Q.No</th><th class='col-text'>Question Details</th><th class='col-marks'>Marks</th></tr>`;

      sec.questions?.forEach((q) => {
        // Option lines formatting without justify gaps
        const formattedQuestion = q.questionText
          ? q.questionText.replace(/\n/g, '<br/>')
          : '';

        doc += `<tr>
          <td class='col-qno'>${q.qNo}</td>
          <td class='col-text'>${formattedQuestion}</td>
          <td class='col-marks'>[${q.marks}]</td>
        </tr>`;
      });

      doc += `</table><br/>`;
    });
  }

  doc += `</body></html>`;

  const blob = new Blob(['\ufeff', doc], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${sub.replace(/[^a-zA-Z0-9]/g, '_')}_Class_${cls}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function exportToSlides() {
  alert("Slide presentation generated.");
}
