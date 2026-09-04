import React, { useState } from 'react';
import Button from '../common/Button.jsx';
import { exportToDocx, printElementById } from '../../services/exportService.js';

const ModeBulkUpload = ({ onPaperUploaded }) => {
  const [uploadedDocs, setUploadedDocs] = useState([
    {
      id: 'DOC_101',
      title: 'Class 12 Physics Mid-Term Board Mock 2025',
      subject: 'Physics',
      date: '02 Sep 2026',
      totalMarks: 70,
      content: 'Q1. State Gauss Law in electrostatics.\nQ2. Derive the expression for drift velocity of electrons in a conductor.'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Hindi Core (Code 302)');
  const [paperContent, setPaperContent] = useState('');
  const [selectedForPrint, setSelectedForPrint] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewTitle(file.name.replace(/\.[^/.]+$/, ''));
      const reader = new FileReader();
      // Read strictly as UTF-8 so Hindi/Devanagari characters never get corrupted
      reader.readAsText(file, 'UTF-8');
      reader.onload = (event) => {
        setPaperContent(event.target?.result || '');
      };
    }
  };

  const handleSaveUpload = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !paperContent.trim()) return;

    const newDoc = {
      id: 'DOC_' + (uploadedDocs.length + 101),
      title: newTitle.trim(),
      subject: newSubject,
      date: new Date().toLocaleDateString('en-GB'),
      totalMarks: 80,
      content: paperContent.trim()
    };

    setUploadedDocs([newDoc, ...uploadedDocs]);
    if (onPaperUploaded) onPaperUploaded(newDoc);
    setNewTitle('');
    setPaperContent('');
    alert(`सफलतापूर्वक सुरक्षित किया गया: ${newDoc.title}`);
  };

  const handlePrintDoc = (doc) => {
    setSelectedForPrint(doc);
    setTimeout(() => {
      printElementById('printable-selfupload-core');
    }, 150);
  };

  return (
    <div className="space-y-6 text-xs font-sans">
      <div className="no-print bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white">Mode 4: Self Upload & Bulk Archive Engine</h3>
          <p className="text-slate-400 mt-0.5">Upload Hindi/English paper file or paste text directly to archive and print in official A4 format.</p>
        </div>

        <div className="p-4 bg-slate-950 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 text-center">
          <span className="text-2xl">📁</span>
          <div>
            <label className="cursor-pointer text-indigo-400 hover:text-indigo-300 font-bold underline">
              Browse and Upload Paper Document (.txt, .docx, UTF-8 text)
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>
            <p className="text-[10px] text-slate-500 mt-0.5">Supports pure Hindi (Mangal/Devanagari) and English formats</p>
          </div>
        </div>

        <form onSubmit={handleSaveUpload} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Paper Title</label>
              <input
                type="text"
                required
                placeholder="उदा. कक्षा 12 हिंदी कोर प्री-बोर्ड प्रश्न पत्र 1"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Subject</label>
              <input
                type="text"
                required
                placeholder="उदा. हिंदी / Hindi Core"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Paper Text / Questions (हिंदी या अंग्रेज़ी)</label>
            <textarea
              rows="5"
              required
              placeholder="प्रश्न यहाँ टाइप या पेस्ट करें..."
              value={paperContent}
              onChange={(e) => setPaperContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-serif text-[12px]"
            />
          </div>

          <Button type="submit">Upload & Save Paper</Button>
        </form>
      </div>

      <div className="no-print bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-white">Archived Self-Uploaded Papers ({uploadedDocs.length})</h4>
        <div className="border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3">Paper Document Title</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {uploadedDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white font-serif">{doc.title}</td>
                  <td className="p-3 text-indigo-400 font-mono">{doc.subject}</td>
                  <td className="p-3 text-slate-400 text-[11px]">{doc.date}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => handlePrintDoc(doc)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1 rounded-lg text-[11px]"
                    >
                      🖨️ Print Paper
                    </button>
                    <button
                      type="button"
                      onClick={() => exportToDocx({
                        paperHeader: {
                          schoolName: 'ARDEN PROGRESSIVE SCHOOL',
                          examName: doc.title,
                          subjectName: doc.subject,
                          className: '12',
                          maxMarks: 80,
                          timeAllowed: '3 Hours'
                        },
                        generalInstructions: ["सभी प्रश्न अनिवार्य हैं।"],
                        sections: [{ sectionTitle: 'प्रश्न पत्र', marksPerQ: 1, questions: [{ qNo: 1, marks: 80, questionText: doc.content, answerKey: 'यथावत' }] }]
                      })}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-lg text-[11px]"
                    >
                      DOCX
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedForPrint && (
        <div id="printable-selfupload-core" className="bg-white text-black p-8 sm:p-12 rounded-xl shadow-xl space-y-4 font-serif">
          <div className="border-b-2 border-black pb-3 relative">
            <div className="flex items-center justify-center relative">
              <div className="absolute left-0 top-0 h-14 w-14 rounded-full border-2 border-black flex flex-col items-center justify-center bg-slate-100 font-bold text-xs text-center leading-none">
                <span className="text-[14px]">🏫</span>
                <span className="text-[8px] font-black mt-0.5">APS</span>
              </div>
              <div className="text-center px-16">
                <p className="text-xl font-black uppercase text-black">ARDEN PROGRESSIVE SCHOOL</p>
                <p className="text-sm font-bold uppercase text-black">{selectedForPrint.title}</p>
              </div>
            </div>

            <table className="w-full border-t border-b border-black text-xs font-bold mt-3">
              <tbody>
                <tr>
                  <td className="text-left py-1">SUBJECT: {selectedForPrint.subject}</td>
                  <td className="text-right py-1">MAX. MARKS: {selectedForPrint.totalMarks} &nbsp;|&nbsp; TIME: 3 HOURS</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 border border-black rounded text-xs whitespace-pre-wrap leading-relaxed text-black font-serif text-left">
            {selectedForPrint.content}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeBulkUpload;
