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
  const [editingUser, setEditingUser] = useState(null);
  const [codeNotice, setCodeNotice] = useState('');

  const currentSchool = schools.find((s) => s.id === selectedSchoolId) || schools[0];
  
  // STRICT FILTERING: Only users of SELECTED SCHOOL appear
  const currentSchoolUsers = users.filter((u) => u.schoolId === currentSchool?.id);
  const currentSchoolCodes = getAllInviteCodes().filter((c) => c.schoolId === currentSchool?.id);

  // Match the assigned plan
  const matchedPlan = SAAS_PLANS.find((p) => currentSchool?.plan?.includes(p.name)) || SAAS_PLANS[1];

  const handleSaveUserEdit = (e) => {
    e.preventDefault();
    const updated = users.map((u) => (u.id === editingUser.id ? editingUser : u));
    setUsersList(updated);
    saveUsers(updated);
    setEditingUser(null);
  };

  const handleDeleteUser = (targetId) => {
    if (!confirm('Permanent Action: Remove this account completely from the database?')) return;
    const updated = users.filter((u) => u.id !== targetId);
    setUsersList(updated);
    saveUsers(updated);
  };

  const handleToggleUserSuspend = (targetUser) => {
    const updated = users.map((u) => (u.id === targetUser.id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    setUsersList(updated);
    saveUsers(updated);
  };

  const handleIssueMasterCode = () => {
    const code = generateSecretCode({
      schoolId: currentSchool.id,
      schoolName: currentSchool.name,
      assignedRole: ROLES.TEACHER,
      department: "Computer Science",
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
                Root (100)
              </span>
            </h1>
            <p className="text-xs text-slate-400">Developer Identity: {user.fullName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <nav className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button onClick={() => setActiveTab('vault')} className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'vault' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>School Identity Vault</button>
            <button onClick={() => setActiveTab('plans')} className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'plans' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>All SaaS Plans (From ₹7,999)</button>
          </nav>
          <Button variant="secondary" onClick={onLogout} className="text-xs py-1.5 px-3">Sign Out</Button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* School Selector Dropdown */}
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
              + Generate Token for this School
            </button>
          </div>
        </div>

        {codeNotice && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">{codeNotice}</div>
        )}

        {activeTab === 'vault' && (
          <div className="space-y-6">
            {/* Scoped School Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Active Institution License</p>
                <p className="text-lg font-bold text-emerald-400 mt-1">{currentSchool.plan}</p>
                <p className="text-xs text-slate-400 mt-0.5">Commercial Tier: ₹{matchedPlan.price.toLocaleString('en-IN')}/yr</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Registered IDs in this School</p>
                <p className="text-2xl font-bold text-white mt-1">{currentSchoolUsers.length} <span className="text-xs font-normal text-slate-400">Total Accounts</span></p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Tokens Issued</p>
                <p className="text-2xl font-bold text-indigo-400 mt-1">{currentSchoolCodes.length} <span className="text-xs font-normal text-slate-400">Generated</span></p>
              </div>
            </div>

            {/* Scoped Credentials Table (Only selected school users) */}
            <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900">
              <div className="p-4 bg-slate-950 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white">Accounts Registered Under {currentSchool.name} Only</h3>
                <p className="text-xs text-slate-400">Passwords decrypted exclusively for Developer override.</p>
              </div>
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Faculty Name</th>
                    <th className="p-3">Login Email</th>
                    <th className="p-3">Decrypted Password</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">State</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {currentSchoolUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/20">
                      <td className="p-3 font-sans font-medium text-white">{u.fullName}</td>
                      <td className="p-3 text-slate-400">{u.email}</td>
                      <td className="p-3">
                        <span className="bg-slate-950 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded font-bold font-mono">
                          {u.password}
                        </span>
                      </td>
                      <td className="p-3 font-sans text-slate-400">{u.department || 'Academic'}</td>
                      <td className="p-3 font-sans"><span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 text-[10px]">{u.role}</span></td>
                      <td className="p-3 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${u.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 text-right font-sans space-x-2">
                        <button onClick={() => setEditingUser(u)} className="text-xs text-indigo-400 hover:underline">Edit</button>
                        <button onClick={() => handleToggleUserSuspend(u)} className="text-xs text-amber-400 hover:underline">
                          {u.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                        <button onClick={() => handleDeleteUser(u.id)} className="text-xs text-rose-400 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {currentSchoolUsers.length === 0 && (
                    <tr>
                      <td colSpan="7" className="p-4 text-center text-slate-500 font-sans">No users registered for {currentSchool.name} yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Pricing Plans */}
        {activeTab === 'plans' && (
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
              </div>
            ))}
          </div>
        )}

        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white">Edit User Credentials ({editingUser.fullName})</h3>
              <form onSubmit={handleSaveUserEdit} className="space-y-3">
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">Full Name</label>
                  <input type="text" value={editingUser.fullName} onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">Email ID</label>
                  <input type="email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase mb-1">Decrypted Password</label>
                  <input type="text" value={editingUser.password} onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })} className="w-full bg-slate-950 border border-amber-500/40 rounded-xl px-3 py-2 text-amber-300 font-mono" />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="submit">Save Changes</Button>
                  <Button variant="secondary" onClick={() => setEditingUser(null)}>Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
