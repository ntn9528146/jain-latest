import React, { useState } from 'react';
import Button from '../components/common/Button.jsx';
import { getSchools, saveSchools, getUsers, saveUsers } from '../services/authStore.js';
import { generateSecretCode, getAllInviteCodes } from '../services/inviteService.js';
import { SAAS_PLANS } from '../config/saasPlans.js';
import { ROLES } from '../config/rbacRules.js';

export default function SuperAdminPortal({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('schools'); // schools | users | plans
  const [schools, setSchools] = useState(getSchools());
  const [selectedSchoolId, setSelectedSchoolId] = useState(schools[0]?.id || '');
  const [users, setUsersList] = useState(getUsers());
  const [editingUser, setEditingUser] = useState(null);
  const [codeNotice, setCodeNotice] = useState('');

  const currentSchool = schools.find((s) => s.id === selectedSchoolId) || schools[0];
  const schoolScopedUsers = users.filter((u) => u.schoolId === currentSchool?.id);

  // Edit User Details (Developer Only)
  const handleSaveUserEdit = (e) => {
    e.preventDefault();
    const updated = users.map((u) => (u.id === editingUser.id ? editingUser : u));
    setUsersList(updated);
    saveUsers(updated);
    setEditingUser(null);
  };

  // Delete User
  const handleDeleteUser = (targetId) => {
    if (!confirm('Permanent Action: Do you want to remove this account from the database?')) return;
    const updated = users.filter((u) => u.id !== targetId);
    setUsersList(updated);
    saveUsers(updated);
  };

  // Suspend User
  const handleToggleUserSuspend = (targetUser) => {
    const updated = users.map((u) => {
      if (u.id === targetUser.id) {
        return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return u;
    });
    setUsersList(updated);
    saveUsers(updated);
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
            <p className="text-xs text-slate-400">Architect: {user.fullName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <nav className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button onClick={() => setActiveTab('schools')} className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'schools' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Institutions</button>
            <button onClick={() => setActiveTab('users')} className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'users' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Master Credentials Vault</button>
            <button onClick={() => setActiveTab('plans')} className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'plans' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>SaaS Plans & Pricing</button>
          </nav>
          <Button variant="secondary" onClick={onLogout} className="text-xs py-1.5 px-3">Sign Out</Button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* Tab 1: Institution Scope */}
        {activeTab === 'schools' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400 font-semibold">Active Institution:</span>
                <select
                  value={selectedSchoolId}
                  onChange={(e) => setSelectedSchoolId(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-indigo-300 font-bold"
                >
                  {schools.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.city}) [{s.status}]</option>
                  ))}
                </select>
              </div>
              <span className="text-xs font-mono text-emerald-400">Linked IDs: {schoolScopedUsers.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <p className="text-[10px] text-slate-400 uppercase">Institution Plan</p>
                <p className="text-lg font-bold text-white mt-1">{currentSchool.plan}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <p className="text-[10px] text-slate-400 uppercase">Total User Accounts</p>
                <p className="text-2xl font-bold text-indigo-400 mt-1">{schoolScopedUsers.length}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <p className="text-[10px] text-slate-400 uppercase">Current Status</p>
                <p className={`text-sm font-bold mt-2 ${currentSchool.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'}`}>{currentSchool.status}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Master Credentials Vault (Developer Only - Passwords Visible) */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-white">Master Credentials & Identity Vault</h2>
                <p className="text-xs text-slate-400">Strictly confidential to System Developer. Cleartext passwords & privilege controls.</p>
              </div>
            </div>

            <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">User / Identity</th>
                    <th className="p-3">Email Login</th>
                    <th className="p-3">Decrypted Password</th>
                    <th className="p-3">School</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">State</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/20">
                      <td className="p-3 font-sans text-white font-medium">{u.fullName}</td>
                      <td className="p-3 text-slate-400">{u.email}</td>
                      <td className="p-3">
                        <span className="bg-slate-950 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded font-bold">
                          {u.password}
                        </span>
                      </td>
                      <td className="p-3 font-sans text-slate-400">{u.schoolName}</td>
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
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: SaaS Subscription Plans (₹7,999 to ₹19,999) */}
        {activeTab === 'plans' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">Institutional SaaS Offerings for Schools</h2>
              <p className="text-xs text-slate-400">Standardized annual commercial packages designed for CBSE accredited institutions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SAAS_PLANS.map((plan) => (
                <div key={plan.id} className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 p-6 rounded-2xl flex flex-col justify-between space-y-4 transition">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
                      {plan.recommendedFor}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white font-mono">₹{plan.price.toLocaleString('en-IN')}</span>
                      <span className="text-slate-500 text-xs">/ {plan.billingCycle}</span>
                    </div>
                    <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                      <strong className="text-slate-300">Coverage:</strong> {plan.classesCovered}
                    </p>
                    <p className="text-xs text-slate-400">
                      <strong className="text-slate-300">Faculty Seats:</strong> {plan.maxFacultyAccounts}
                    </p>
                    <ul className="space-y-1.5 pt-2 text-xs text-slate-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full bg-slate-950 hover:bg-indigo-600 text-white font-semibold py-2.5 rounded-xl border border-slate-800 hover:border-transparent text-xs transition">
                    Assign Plan to School
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal for Editing User by Developer */}
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white">Edit User Credentials (Master Override)</h3>
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
