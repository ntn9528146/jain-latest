import React, { useState } from 'react';
import Button from '../common/Button.jsx';
import { exportToDocx } from '../../services/exportService.js';

export default function ModeBulkUpload({ onPaperUploaded }) {
  const [uploadedDocs, setUploadedDocs] = useState([
    {
      id: 'DOC_101',
      title: 'Class 12 Physics Mid-Term Board Mock 2025',
      subject: 'Physics',
      date: '02 Sep 2026',
      totalMarks: 70,
      content: 'Q1. State Gauss Law in electrostatics.\nQ2. Derive the expression for drift velocity of electrons.'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Physics');
  const [paperContent, setPaperContent] = useState('');
  const [selectedForPrint, setSelectedForPrint] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewTitle(file.name.replace(/\.[^/.]+$/, ""));
      const reader = new FileReader();
      reader.onload = (event) => {
        setPaperContent(event.target?.result || 'Sample extracted file text...');
      };
      reader.readAsText(file);
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
    alert(`Successfully archived: ${newDoc.title}`);
  };

  const handlePrintDoc = (doc) => {
    setSelectedForPrint(doc);
    setTimeout(() => window.print(), 200);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Upload Box (Hidden on Print) */}
      <div className="no-print bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white">Mode 4: Self Upload & Bulk Archive Engine</h3>
          <p className="text-slate-400 mt-0.5">Upload a paper file or paste text directly to archive and print in official A4 format.</p>
        </div>

        {/* File Browse Picker */}
        <div className="p-4 bg-slate-950 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 text-center">
          <span className="text-2xl">📁</span>
          <div>
            <label className="cursor-pointer text-indigo-400 hover:text-indigo-300 font-bold underline">
              Browse and Upload Paper Document (.txt, .docx, .pdf)
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>
            <p className="text-[10px] text-slate-500 mt-0.5">Or type / paste questions manually below</p>
          </div>
        </div>

        <form onSubmit={handleSaveUpload} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Paper Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Class 12 Pre-Board Mock 1"
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
                placeholder="e.g. Computer Science / Physics"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Paper Text / Questions</label>
            <textarea
              rows="4"
              required
              placeholder="Paste questions here..."
              value={paperContent}
              onChange={(e) => setPaperContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-[11px]"
            />
          </div>

          <Button type="submit">Upload & Save Paper</Button>
        </form>
      </div>

      {/* Uploaded Papers Table */}
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
            <tbody className="divide-y divide-slate-800 text-slate-300 font-sans">
              {uploadedDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">{doc.title}</td>
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
                      onClick={() => exportToDocx({ paperHeader: { schoolName: 'ARDEN PROGRESSIVE SCHOOL', examName: doc.title, subjectName: doc.subject, className: '12', maxMarks: 80, timeAllowed: '3 Hours' } })}
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

      {/* Print Region for Self-Uploaded Paper */}
      {selectedForPrint && (
        <div id="cbse-print-region" className="bg-white text-black p-8 sm:p-12 rounded-xl shadow-xl space-y-4 font-serif">
          <div className="text-center border-b-2 border-black pb-3">
            <h1 className="text-xl font-bold uppercase text-black">ARDEN PROGRESSIVE SCHOOL</h1>
            <h2 className="text-sm font-bold uppercase text-black">{selectedForPrint.title}</h2>
            <div className="flex justify-between text-xs font-bold pt-2 border-t border-black mt-2">
              <span>SUBJECT: {selectedForPrint.subject}</span>
              <span>MAX. MARKS: {selectedForPrint.totalMarks}</span>
              <span>TIME: 3 HOURS</span>
            </div>
          </div>

          <div className="p-4 border border-black rounded text-xs whitespace-pre-wrap leading-relaxed text-black font-sans">
            {selectedForPrint.content}
          </div>
        </div>
      )}
    </div>
  );
}
