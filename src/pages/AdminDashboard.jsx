import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button.jsx';
import PaymentModal from '../components/billing/PaymentModal.jsx';
import { getUsers, saveUsers, canManageTarget } from '../services/authStore.js';
import { getAllInviteCodes, generateSecretCode } from '../services/inviteService.js';
import { ROLES } from '../config/rbacRules.js';
import { SCHOOL_DEPARTMENTS } from '../config/departments.js';

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('faculty'); // faculty | codes | billing
  const [facultyList, setFacultyList] = useState([]);
  const [allSchoolCodes, setAllSchoolCodes] = useState([]);
  const [newRole, setNewRole] = useState(ROLES.TEACHER);
  const [department, setDepartment] = useState('Computer Science & IT');
  const [generatedSuccess, setGeneratedSuccess] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const loadData = () => {
    const all = getUsers();
    setFacultyList(all.filter((u) => u.schoolId === user.schoolId));
    setAllSchoolCodes(getAllInviteCodes().filter((c) => c.schoolId === user.schoolId));
  };

  useEffect(() => {
    loadData();
  }, [user]);

  // Hide redeemed codes from active distribution view
  const activeUnusedCodes = allSchoolCodes.filter((c) => !c.isUsed);

  // Count how many codes were redeemed by each teacher
  const getCodesGivenCount = (teacherEmail) => {
    return allSchoolCodes.filter((c) => c.usedBy?.toLowerCase() === teacherEmail?.toLowerCase()).length;
  };

  const toggleUserStatus = (targetUser) => {
    if (!canManageTarget(user.role, targetUser.role)) {
      alert("Hierarchy Restriction: You cannot modify rights of a peer or higher authority.");
      return;
    }
    const all = getUsers();
    const updated = all.map((u) => (u.id === targetUser.id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    saveUsers(updated);
    loadData();
  };

  const handleGenerateCode = (e) => {
    e.preventDefault();
    const newCode = generateSecretCode({
      schoolId: user.schoolId,
      schoolName: user.schoolName,
      assignedRole: newRole,
      department: department,
      generatedBy: user.fullName
    });
    setGeneratedSuccess(`Token Generated: ${newCode.code} for [${newRole}] (${department})`);
    loadData();
    setTimeout(() => setGeneratedSuccess(''), 6000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-lg">A</div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              {user.schoolName}
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {user.role} Authority
              </span>
            </h1>
            <p className="text-xs text-slate-400">Moderator: {user.fullName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <nav className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button onClick={() => setActiveTab('faculty')} className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'faculty' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Faculty Directory</button>
            <button onClick={() => setActiveTab('codes')} className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'codes' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Active Tokens ({activeUnusedCodes.length})</button>
            <button onClick={() => setActiveTab('billing')} className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'billing' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>License & Billing</button>
          </nav>
          <Button variant="secondary" onClick={onLogout} className="text-xs py-1.5 px-3">Sign Out</Button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {activeTab === 'faculty' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Registered Faculty & Staff Directory</h2>
            <div className="border border-slate-800 bg-slate-900 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Faculty Name</th>
                    <th className="p-3.5">Email</th>
                    <th className="p-3.5">Subject / Department</th>
                    <th className="p-3.5">Role</th>
                    <th className="p-3.5 text-center">Codes Claimed</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {facultyList.map((f) => (
                    <tr key={f.id} className="hover:bg-slate-800/30">
                      <td className="p-3.5 font-medium text-white">{f.fullName}</td>
                      <td className="p-3.5 font-mono text-slate-400">{f.email}</td>
                      <td className="p-3.5">
                        <span className="font-semibold text-indigo-300">{f.department || 'Computer Science & IT'}</span>
                      </td>
                      <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">{f.role}</span></td>
                      <td className="p-3.5 text-center font-mono font-bold text-amber-300">
                        {getCodesGivenCount(f.email)} Code(s)
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${f.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>{f.status}</span>
                      </td>
                      <td className="p-3.5 text-right">
                        {canManageTarget(user.role, f.role) ? (
                          <button onClick={() => toggleUserStatus(f)} className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${f.status === 'Active' ? 'border-amber-500/30 text-amber-300 hover:bg-amber-500/10' : 'border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10'}`}>
                            {f.status === 'Active' ? 'Suspend' : 'Activate'}
                          </button>
                        ) : <span className="text-[10px] text-slate-600 italic">Peer Admin</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'codes' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-white">Generate Single-Use Faculty Token</h3>
              {generatedSuccess && <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">{generatedSuccess}</div>}
              <form onSubmit={handleGenerateCode} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 uppercase text-[10px] mb-1">Assign Role</label>
                  <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200">
                    <option value={ROLES.TEACHER}>Subject Teacher</option>
                    <option value={ROLES.VICE_PRINCIPAL}>Vice Principal / HOD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 uppercase text-[10px] mb-1">Subject Department</label>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200">
                    {SCHOOL_DEPARTMENTS.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="w-full mt-2">Generate Unique Code</Button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Available Unredeemed Tokens ({activeUnusedCodes.length})</h3>
                <p className="text-xs text-slate-400">Tokens disappear automatically from this list once redeemed by a teacher.</p>
              </div>
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Code</th>
                    <th className="p-2.5">Role</th>
                    <th className="p-2.5">Subject Department</th>
                    <th className="p-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {activeUnusedCodes.map((c, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-bold text-amber-300">{c.code}</td>
                      <td className="p-2.5 font-sans text-slate-300">{c.assignedRole}</td>
                      <td className="p-2.5 font-sans text-indigo-300">{c.department}</td>
                      <td className="p-2.5 text-right font-sans">
                        <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">READY TO USE</span>
                      </td>
                    </tr>
                  ))}
                  {activeUnusedCodes.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-4 text-center text-slate-500 font-sans">All generated tokens have been redeemed.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Annual License & Payment Gateway</h3>
            <p className="text-xs text-slate-400">Institutional Plan for {user.schoolName}. Settle renewal invoices directly via our unified payment portal.</p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-white">Academic Year 2026-27 License</p>
                <p className="text-slate-400 text-[11px]">Due on 31 March 2027</p>
              </div>
              <span className="text-base font-bold text-emerald-400 font-mono">₹13,999</span>
            </div>
            <Button onClick={() => setShowPaymentModal(true)}>Open Payment Gateway (UPI / NetBanking / Card)</Button>
          </div>
        )}
      </main>

      {showPaymentModal && (
        <PaymentModal school={{ name: user.schoolName }} onClose={() => setShowPaymentModal(false)} />
      )}
    </div>
  );
}
