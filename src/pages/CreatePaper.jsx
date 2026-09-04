import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button.jsx';
import ModeBulkUpload from '../components/paper/ModeBulkUpload.jsx';
import ModeManualSyllabus from '../components/paper/ModeManualSyllabus.jsx';
import ModeCbseCurriculum from '../components/paper/ModeCbseCurriculum.jsx';
import PracticalStudio from '../components/paper/PracticalStudio.jsx';
import PaperViewer from '../components/paper/PaperViewer.jsx';
import ProfileModal from '../components/profile/ProfileModal.jsx';
import { getFacultyPaperStats, incrementPaperCount } from '../services/paperStatsService.js';
import { executePaperPipeline } from '../services/geminiPipelineService.js'; 
import { resolveSubjectRegistry } from "../config/cbseSubjectMatrices.js";

const CreatePaper = ({ faculty, onLogout }) => {
  const [activeMode, setActiveMode] = useState('cbse');
  const [stats, setStats] = useState({ totalTheoryPapers: 0, totalPracticalPapers: 0, bySubject: {} });
  const [showProfile, setShowProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(faculty || {});
  const [loading, setLoading] = useState(false);
  const [pipelineStatus, setPipelineStatus] = useState('');
  const [compiledPaper, setCompiledPaper] = useState(null);

  const loadStats = () => {
    if (faculty) setStats(getFacultyPaperStats(faculty.id || faculty.email));
  };

  useEffect(() => {
    loadStats();
    if (faculty) setUserProfile(faculty);
  }, [faculty]);

  const handleGeneratePaper = async (config) => {
    setLoading(true);
    setPipelineStatus('Stage 1/4: Initializing Pipeline...');

    try {
      const result = await executePaperPipeline({
        ...config,
        onProgress: (p) => setPipelineStatus(p.text)
      });

      incrementPaperCount(faculty?.id || faculty?.email, config.selectedSubject || 'Subject', false);
      loadStats();
      setCompiledPaper(result);
    } catch (err) {
      alert("Error compiling paper: " + err.message);
    } finally {
      setLoading(false);
      setPipelineStatus('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
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
            <p className="text-[11px] text-slate-400">Department: {userProfile?.department || faculty?.department || 'Computer Science & IT'}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-slate-400">Created:</span>
            <span className="font-bold text-indigo-400 font-mono">{stats.totalTheoryPapers || 0} Theory</span>
            <span className="text-slate-600">|</span>
            <span className="font-bold text-amber-400 font-mono">{stats.totalPracticalPapers || 0} Practical</span>
          </div>

          <button
            type="button"
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition"
          >
            {userProfile?.photoUrl ? (
              <img src={userProfile.photoUrl} alt="Avatar" className="h-5 w-5 rounded-full object-cover" />
            ) : (
              <span>👤</span>
            )}
            <span>{userProfile?.fullName || faculty?.fullName || 'Profile'}</span>
          </button>

          <Button variant="secondary" onClick={onLogout} className="text-xs py-1.5 px-3">
            Sign Out
          </Button>
        </div>
      </header>

      <div className="bg-slate-900/60 border-b border-slate-800 px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Academic Studios:</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setActiveMode('cbse'); setCompiledPaper(null); }}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${activeMode === 'cbse' ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
            >
              1. CBSE Syllabus & Question Matrix
            </button>
            <button
              type="button"
              onClick={() => { setActiveMode('practical'); setCompiledPaper(null); }}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${activeMode === 'practical' ? 'bg-emerald-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
            >
              2. 🧪 Practical, Viva & Project Studio
            </button>
            <button
              type="button"
              onClick={() => { setActiveMode('manual'); setCompiledPaper(null); }}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${activeMode === 'manual' ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
            >
              3. Manual Paste Syllabus
            </button>
            <button
              type="button"
              onClick={() => { setActiveMode('bulk'); setCompiledPaper(null); }}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${activeMode === 'bulk' ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
            >
              4. Self Upload Papers
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {loading && (
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between text-xs text-indigo-300">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="font-semibold">{pipelineStatus}</span>
            </div>
            <span className="font-mono text-[10px] text-indigo-400">Multi-Stage Zero Error Execution</span>
          </div>
        )}

        {compiledPaper && (
          <PaperViewer paperData={compiledPaper} onClose={() => setCompiledPaper(null)} />
        )}

        {!compiledPaper && activeMode === 'cbse' && (
          <ModeCbseCurriculum onGeneratePaper={handleGeneratePaper} loading={loading} />
        )}

        {!compiledPaper && activeMode === 'practical' && (
          <PracticalStudio
            onPracticalGenerated={(sub) => {
              incrementPaperCount(faculty?.id || faculty?.email, sub, true);
              loadStats();
            }}
          />
        )}

        {!compiledPaper && activeMode === 'manual' && (
          <ModeManualSyllabus onGenerateManual={handleGeneratePaper} />
        )}

        {!compiledPaper && activeMode === 'bulk' && (
          <ModeBulkUpload onPaperUploaded={(doc) => {
            incrementPaperCount(faculty?.id || faculty?.email, doc.title, true);
            loadStats();
          }} />
        )}
      </main>

      {showProfile && (
        <ProfileModal
          user={userProfile}
          onClose={() => setShowProfile(false)}
          onSave={(updated) => {
            setUserProfile((prev) => ({ ...prev, ...updated }));
            setShowProfile(false);
          }}
        />
      )}
    </div>
  );
};

export default CreatePaper;
