import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button.jsx';
import ModeBulkUpload from '../components/paper/ModeBulkUpload.jsx';
import ModeManualSyllabus from '../components/paper/ModeManualSyllabus.jsx';
import ModeCbseCurriculum from '../components/paper/ModeCbseCurriculum.jsx';
import ProfileModal from '../components/profile/ProfileModal.jsx';
import { getFacultyPaperStats, incrementPaperCount } from '../services/paperStatsService.js';

export default function CreatePaper({ faculty, onLogout }) {
  const [activeMode, setActiveMode] = useState('cbse'); // 'bulk' | 'manual' | 'cbse'
  const [stats, setStats] = useState(getFacultyPaperStats(faculty?.id || faculty?.email));
  const [showProfile, setShowProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(faculty);
  const [generatedResult, setGeneratedResult] = useState(null);

  const loadStats = () => {
    const s = getFacultyPaperStats(faculty?.id || faculty?.email);
    setStats(s);
  };

  useEffect(() => {
    loadStats();
  }, [faculty]);

  const handleGeneratedSuccess = (subject, isPractical = false) => {
    incrementPaperCount(faculty?.id || faculty?.email, subject, isPractical);
    loadStats();
    setGeneratedResult({
      subject,
      isPractical,
      timestamp: new Date().toLocaleTimeString(),
      token: 'CBSE-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header with Profile and Stats */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-lg">P</div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              {faculty?.schoolName || "Academic Studio"}
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {faculty?.role || "Faculty"}
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Department: {userProfile?.department || faculty?.department || 'Computer Science'}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Theory vs Practical Stats Counter */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-slate-400">Created Papers:</span>
            <span className="font-bold text-indigo-400 font-mono">{stats.totalTheoryPapers} Theory</span>
            <span className="text-slate-600">|</span>
            <span className="font-bold text-amber-400 font-mono">{stats.totalPracticalPapers} Practical</span>
          </div>

          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition"
          >
            <span>👤</span> {userProfile?.fullName || faculty?.fullName}
          </button>

          <Button variant="secondary" onClick={onLogout} className="text-xs py-1.5 px-3">
            Sign Out
          </Button>
        </div>
      </header>

      {/* Mode Selection Tabs */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Paper Creation Modes:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveMode('cbse')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${activeMode === 'cbse' ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
            >
              1. CBSE Syllabus & Checkbox Engine
            </button>
            <button
              onClick={() => setActiveMode('manual')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${activeMode === 'manual' ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
            >
              2. Manual Paste & Topic Extractor
            </button>
            <button
              onClick={() => setActiveMode('bulk')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${activeMode === 'bulk' ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
            >
              3. Self Upload & Bulk Archive
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {generatedResult && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex justify-between items-center text-xs text-emerald-300">
            <div>
              <p className="font-bold">Paper Successfully Compiled ({generatedResult.subject})</p>
              <p className="text-[11px] text-emerald-400/80">Batch ID: {generatedResult.token} • Shuffled at {generatedResult.timestamp}</p>
            </div>
            <button onClick={() => alert("Printing Paper in A4 Layout...")} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl">
              Export PDF / Print
            </button>
          </div>
        )}

        {/* Dynamic Mode Render */}
        {activeMode === 'cbse' && (
          <ModeCbseCurriculum onGeneratePaper={(data) => handleGeneratedSuccess(data.selectedSubject, false)} />
        )}

        {activeMode === 'manual' && (
          <ModeManualSyllabus onGenerateManual={(data) => handleGeneratedSuccess("Custom Subject", false)} />
        )}

        {activeMode === 'bulk' && (
          <ModeBulkUpload onPaperUploaded={(doc) => handleGeneratedSuccess(doc.title, true)} />
        )}
      </main>

      {/* Profile Modal */}
      {showProfile && (
        <ProfileModal
          user={userProfile}
          onClose={() => setShowProfile(false)}
          onSave={(updated) => {
            setUserProfile({ ...userProfile, ...updated });
            setShowProfile(false);
          }}
        />
      )}
    </div>
  );
}
