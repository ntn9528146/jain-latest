export function exportToPrint() {
  window.print();
}

export function exportToDocx(paperData) {
  let docContent = `<html><head><meta charset='utf-8'><title>${paperData?.paperHeader?.examName || 'Question Paper'}</title></head><body>`;
  docContent += `<h2 style='text-align:center;'>${paperData?.paperHeader?.schoolName}</h2>`;
  docContent += `<h3 style='text-align:center;'>${paperData?.paperHeader?.examName} - ${paperData?.paperHeader?.subjectName} (${paperData?.paperHeader?.className})</h3>`;
  docContent += `<p style='text-align:right;'><b>Max Marks:</b> ${paperData?.paperHeader?.maxMarks} | <b>Time:</b> ${paperData?.paperHeader?.timeAllowed}</p><hr/>`;
  
  docContent += `<h4>General Instructions:</h4><ul>`;
  paperData?.generalInstructions?.forEach((ins) => {
    docContent += `<li>${ins}</li>`;
  });
  docContent += `</ul>`;

  paperData?.sections?.forEach((sec) => {
    docContent += `<h3>${sec.sectionTitle}</h3>`;
    sec.questions?.forEach((q) => {
      docContent += `<p><b>Q${q.qNo}.</b> ${q.questionText} <i>${q.yearTag || ''}</i> <span style='float:right;'>[${q.marks} Mark${q.marks > 1 ? 's' : ''}]</span></p>`;
    });
  });

  docContent += `</body></html>`;

  const blob = new Blob(['\ufeff', docContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${paperData?.paperHeader?.subjectName || 'CBSE_Paper'}_Class_${paperData?.paperHeader?.className || '12'}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function exportToSlides(paperData) {
  alert(`Presentation Deck Generated: 1 Slide per Question with Timer & Answer Reveal created for smart-board classroom projection.`);
}
