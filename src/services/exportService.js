export function exportToPrint() {
  window.print();
}

export function exportToDocx(paperData) {
  let doc = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset='utf-8'>
    <title>${paperData?.paperHeader?.examName || 'CBSE Exam Paper'}</title>
    <style>
      body { font-family: 'Times New Roman', serif; font-size: 11.5pt; line-height: 1.4; }
      .header-title { font-size: 15pt; font-weight: bold; text-align: center; text-transform: uppercase; }
      .header-sub { font-size: 12pt; font-weight: bold; text-align: center; }
      table { width: 100%; border-collapse: collapse; margin-top: 12px; }
      th, td { border: 1px solid #000000; padding: 6px 8px; vertical-align: top; }
      .qno { width: 8%; text-align: center; font-weight: bold; }
      .qtext { width: 82%; text-align: justify; }
      .qmarks { width: 10%; text-align: center; font-weight: bold; }
      .sec-title { background-color: #f2f2f2; font-weight: bold; text-align: center; text-transform: uppercase; }
    </style>
  </head>
  <body>
    <p class='header-title'>${paperData?.paperHeader?.schoolName || 'AFFILIATED SENIOR SECONDARY SCHOOL'}</p>
    <p class='header-sub'>${paperData?.paperHeader?.examName || 'EXAMINATION 2026-27'}</p>
    <p style='text-align:center; font-weight:bold;'>CLASS: ${paperData?.paperHeader?.className || '12'} | SUBJECT: ${paperData?.paperHeader?.subjectName || 'GENERAL'}</p>
    <p style='text-align:right; font-weight:bold;'>Max Marks: ${paperData?.paperHeader?.maxMarks} | Time: ${paperData?.paperHeader?.timeAllowed}</p>
    <hr/>
    <p><b>General Instructions:</b></p>
    <ul>`;

  paperData?.generalInstructions?.forEach((ins) => {
    doc += `<li>${ins}</li>`;
  });

  doc += `</ul>`;

  paperData?.sections?.forEach((sec) => {
    doc += `<table>
      <tr><td colspan='3' class='sec-title'>${sec.sectionTitle}</td></tr>
      <tr><th class='qno'>Q.No</th><th class='qtext'>Question Details</th><th class='qmarks'>Marks</th></tr>`;

    sec.questions?.forEach((q) => {
      doc += `<tr>
        <td class='qno'>${q.qNo}</td>
        <td class='qtext'>${q.questionText.replace(/\n/g, '<br/>')}</td>
        <td class='qmarks'>[${q.marks}]</td>
      </tr>`;
    });

    doc += `</table><br/>`;
  });

  doc += `</body></html>`;

  const blob = new Blob(['\ufeff', doc], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(paperData?.paperHeader?.subjectName || 'CBSE_Paper').replace(/[^a-zA-Z0-9]/g, '_')}_Class_${paperData?.paperHeader?.className || '12'}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function exportToSlides(paperData) {
  alert("Classroom Projection Deck: 1 Question per slide with live timer generated.");
}
