import React, { useState } from 'react';
import Button from '../common/Button.jsx';

export default function ModeBulkUpload({ onPaperUploaded }) {
  const [uploadedPapers, setUploadedPapers] = useState([]);
  const [paperTitle, setPaperTitle] = useState('');
  const [examCategory, setExamCategory] = useState('Periodic Test 1');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newDoc = {
      id: 'doc_' + Date.now(),
      name: file.name,
      title: paperTitle || file.name,
      category: examCategory,
      size: (file.size / 1024).toFixed(1) + ' KB',
      uploadedAt: new Date().toLocaleDateString()
    };

    setUploadedPapers([newDoc, ...uploadedPapers]);
    setPaperTitle('');
    if (onPaperUploaded) onPaperUploaded(newDoc);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 text-xs">
      <div>
        <h3 className="text-sm font-bold text-white">Mode 1: Self-Archived Question Papers</h3>
        <p className="text-slate-400 mt-0.5">Upload and store your school's existing papers in bulk (PDF, DOCX, scans).</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-400 text-[10px] uppercase mb-1">Paper Title / Description</label>
          <input
            type="text"
            placeholder="e.g. Class 12 Pre-Board Computer Science Set-A"
            value={paperTitle}
            onChange={(e) => setPaperTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-[10px] uppercase mb-1">Exam Type</label>
          <select
            value={examCategory}
            onChange={(e) => setExamCategory(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
          >
            <option>Periodic Test 1 / Unit Test</option>
            <option>Half Yearly Examination</option>
            <option>Pre-Board Examination</option>
            <option>Annual Final Examination</option>
          </select>
        </div>
      </div>

      <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500 rounded-2xl p-6 text-center space-y-2 bg-slate-950/50 transition">
        <div className="text-2xl">📁</div>
        <p className="font-semibold text-white">Click to Browse or Drag Question Paper Here</p>
        <p className="text-slate-500 text-[11px]">Accepts PDF, DOCX, TXT files up to 25MB each</p>
        <input type="file" onChange={handleFileUpload} className="hidden" id="file-upload-input" />
        <label htmlFor="file-upload-input" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl cursor-pointer mt-2">
          Select Document
        </label>
      </div>

      {uploadedPapers.length > 0 && (
        <div className="space-y-2 pt-2">
          <p className="font-bold text-slate-400 text-[11px] uppercase tracking-wider">Stored In Server Vault ({uploadedPapers.length})</p>
          <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
            {uploadedPapers.map((doc) => (
              <div key={doc.id} className="p-3 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">{doc.title}</p>
                  <p className="text-[10px] text-slate-500">{doc.category} • {doc.size} • {doc.uploadedAt}</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono text-[10px]">SAVED</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
