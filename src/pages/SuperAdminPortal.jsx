import React, { useState } from 'react';
import Button from '../components/common/Button.jsx';
import { getSchools, saveSchools, getUsers, saveUsers } from '../services/authStore.js';
import { generateSecretCode, getAllInviteCodes } from '../services/inviteService.js';
import { SAAS_PLANS } from '../config/saasPlans.js';
import { ROLES } from '../config/rbacRules.js';

export default function SuperAdminPortal({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('vault'); // vault | plans
  const [schools, setSchools] = useState(getSchools());
  const [selectedSchoolId, setSelectedSchoolId] = useState(schools[0]?.id || '');
  const [users, setUsersList] = useState(getUsers());
  const [showAddSchoolModal, setShowAddSchoolModal] = useState(false);
  const [newSchoolData, setNewSchoolData] = useState({ name: '', city: '', plan: 'Vidyapeeth Pro (Secondary Board Edition)' });
  const [codeNotice, setCodeNotice] = useState('');

  const currentSchool = schools.find((s) => s.id === selectedSchoolId) || schools[0];
  const currentSchoolUsers = users.filter((u) => u.schoolId === currentSchool?.id);

  // Add School
  const handleCreateSchool = (e) => {
    e.preventDefault();
    if (!newSchoolData.name.trim() || !newSchoolData.city.trim()) return;

    const newId = "SCH_" + (schools.length + 1).toString().padStart(3, '0');
    const newSchool = {
      id: newId,
      name: newSchoolData.name.trim(),
      city: newSchoolData.city.trim(),
      status: "Active",
      plan: newSchoolData.plan
    };

    const updated = [...schools, newSchool];
    setSchools(updated);
    saveSchools(updated);
    setSelectedSchoolId(newId);
    setShowAddSchoolModal(false);
    setNewSchoolData({ name: '', city: '', plan: 'Vidyapeeth Pro (Secondary Board Edition)' });
  };

  // Change / Assign Plan to School
  const handleAssignPlan = (planName) => {
    const updated = schools.map((s) => (s.id === currentSchool.id ? { ...s, plan: planName } : s));
    setSchools(updated);
    saveSchools(updated);
    alert(`Successfully assigned [${planName}] to ${currentSchool.name}!`);
  };

  const handleIssueMasterCode = () => {
    const code = generateSecretCode({
      schoolId: currentSchool.id,
      schoolName: currentSchool.name,
      assignedRole: ROLES.PRINCIPAL,
      department: "Academic Administration",
      generatedBy: "System Developer (Root)"
    });
    setCodeNotice(`Generated Token: ${code.code} for ${currentSchool.name}`);
    setTimeout(() => setCodeNotice(''), 7000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="bg-slate-900 border-b border-indigo-950 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-amber-500 flex items-center justify-center font-black text-slate-950 text-lg">S</div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              SaaS Multi-School Developer Cockpit
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Root Access (100)
              </span>
            </h1>
            <p className="text-xs text-slate-400">Developer Identity: {user.fullName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddSchoolModal(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition"
          >
            + Add New School
          </button>
          <nav className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button onClick={() => setActiveTab('vault')} className={`px-3 py-1.5 rounded-lg font-medium ${activeTab === 'vault' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>School Vault</button>
            <button onClick={() => setActiveTab('plans')} className={`px-3 py-1.5 rounded-lg font-medium ${activeTab === 'plans' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>SaaS Plans (From ₹7,999)</button>
          </nav>
          <Button variant="secondary" onClick={onLogout} className="text-xs py-1.5 px-3">Sign Out</Button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* School Selector Bar */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Selected School:</span>
            <select
              value={selectedSchoolId}
              onChange={(e) => setSelectedSchoolId(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-indigo-300 font-bold text-sm"
            >
              {schools.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.city})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handleIssueMasterCode} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs transition">
              + Issue Token for {currentSchool.name}
            </button>
          </div>
        </div>

        {codeNotice && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">{codeNotice}</div>
        )}

        {/* Tab 1: School Identity Vault */}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Active Subscription Tier</p>
                <p className="text-lg font-bold text-emerald-400 mt-1">{currentSchool.plan}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Registered Accounts</p>
                <p className="text-2xl font-bold text-white mt-1">{currentSchoolUsers.length} <span className="text-xs font-normal text-slate-400">Total IDs</span></p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Institutional Status</p>
                <p className="text-sm font-bold text-emerald-400 mt-2">Active Partnership</p>
              </div>
            </div>

            {/* School User Accounts Table */}
            <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900">
              <div className="p-4 bg-slate-950 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white">Accounts Registered Under {currentSchool.name} Only</h3>
                <p className="text-xs text-slate-400">Cleartext passwords strictly isolated for Developer access.</p>
              </div>
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Faculty Name</th>
                    <th className="p-3">Login Email</th>
                    <th className="p-3">Decrypted Password</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {currentSchoolUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/20">
                      <td className="p-3 font-sans font-medium text-white">{u.fullName}</td>
                      <td className="p-3 text-slate-400">{u.email}</td>
                      <td className="p-3 font-bold text-amber-300 bg-slate-950 px-2 rounded">{u.password}</td>
                      <td className="p-3 font-sans text-indigo-300">{u.department || 'Academic'}</td>
                      <td className="p-3 font-sans"><span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">{u.role}</span></td>
                      <td className="p-3 font-sans"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">{u.status}</span></td>
                    </tr>
                  ))}
                  {currentSchoolUsers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-slate-500 font-sans">No staff registered for this school yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: SaaS Plans with "Assign Plan" button */}
        {activeTab === 'plans' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">Assign SaaS Subscription Plan to {currentSchool.name}</h2>
              <p className="text-xs text-slate-400">Clicking 'Assign to School' directly updates the commercial plan for the selected institution.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SAAS_PLANS.map((plan) => (
                <div key={plan.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
                      {plan.recommendedFor}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white font-mono">₹{plan.price.toLocaleString('en-IN')}</span>
                      <span className="text-slate-500 text-xs">/ Annual</span>
                    </div>
                    <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">Coverage: {plan.classesCovered}</p>
                    <ul className="space-y-1.5 pt-2 text-xs text-slate-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button onClick={() => handleAssignPlan(plan.name)}>
                    Assign to {currentSchool.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add School Modal */}
        {showAddSchoolModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white">Onboard New Institution</h3>
              <form onSubmit={handleCreateSchool} className="space-y-3">
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">School Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Doon Cambridge School"
                    value={newSchoolData.name}
                    onChange={(e) => setNewSchoolData({ ...newSchoolData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dehradun"
                    value={newSchoolData.city}
                    onChange={(e) => setNewSchoolData({ ...newSchoolData, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">Select Annual Plan</label>
                  <select
                    value={newSchoolData.plan}
                    onChange={(e) => setNewSchoolData({ ...newSchoolData, plan: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  >
                    {SAAS_PLANS.map((p) => (
                      <option key={p.id} value={p.name}>{p.name} (₹{p.price.toLocaleString('en-IN')})</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="submit">Save & Register</Button>
                  <Button variant="secondary" onClick={() => setShowAddSchoolModal(false)}>Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
