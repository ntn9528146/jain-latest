import React, { useState } from 'react';
import Button from '../components/common/Button.jsx';
import { getSchools, saveSchools, getUsers, saveUsers } from '../services/authStore.js';
import { generateSecretCode, getAllInviteCodes } from '../services/inviteService.js';
import { ROLES } from '../config/rbacRules.js';

export default function SuperAdminPortal({ user, onLogout }) {
  const [schools, setSchools] = useState(getSchools());
  const [selectedSchoolId, setSelectedSchoolId] = useState(schools[0]?.id || '');
  const [showAddSchool, setShowAddSchool] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSchoolCity, setNewSchoolCity] = useState('');
  const [targetRole, setTargetRole] = useState(ROLES.PRINCIPAL);
  const [codeNotice, setCodeNotice] = useState('');

  const users = getUsers();
  const currentSchool = schools.find((s) => s.id === selectedSchoolId) || schools[0];
  
  // Strict School-Specific filtering
  const currentSchoolUsers = users.filter((u) => u.schoolId === currentSchool?.id);
  const currentSchoolCodes = getAllInviteCodes().filter((c) => c.schoolId === currentSchool?.id);

  // Add School
  const handleAddSchool = (e) => {
    e.preventDefault();
    if (!newSchoolName.trim() || !newSchoolCity.trim()) return;

    const newId = "SCH_" + (schools.length + 1).toString().padStart(3, '0');
    const newEntry = {
      id: newId,
      name: newSchoolName.trim(),
      city: newSchoolCity.trim(),
      status: "Active",
      suspendReason: "",
      plan: "Enterprise 2026-27"
    };

    const updated = [...schools, newEntry];
    setSchools(updated);
    saveSchools(updated);
    setSelectedSchoolId(newId);
    setNewSchoolName('');
    setNewSchoolCity('');
    setShowAddSchool(false);
  };

  // Suspend School with Reason
  const handleToggleSchoolSuspension = (targetSchool) => {
    let reason = "";
    if (targetSchool.status === 'Active') {
      reason = prompt(`Enter reason for suspending ${targetSchool.name}:`, "Annual Subscription Renewal Overdue");
      if (reason === null) return; // cancelled
      if (!reason.trim()) reason = "Suspended by Developer";
    }

    const updated = schools.map((s) => {
      if (s.id === targetSchool.id) {
        return {
          ...s,
          status: s.status === 'Active' ? 'Suspended' : 'Active',
          suspendReason: s.status === 'Active' ? reason : ""
        };
      }
      return s;
    });

    setSchools(updated);
    saveSchools(updated);
  };

  // Remove School
  const handleRemoveSchool = (targetSchool) => {
    if (!confirm(`Are you sure you want to permanently remove ${targetSchool.name}? All linked teachers will be detached.`)) return;

    const updated = schools.filter((s) => s.id !== targetSchool.id);
    setSchools(updated);
    saveSchools(updated);
    if (selectedSchoolId === targetSchool.id && updated.length > 0) {
      setSelectedSchoolId(updated[0].id);
    }
  };

  const handleCreateMasterToken = () => {
    const code = generateSecretCode({
      schoolId: currentSchool.id,
      schoolName: currentSchool.name,
      assignedRole: targetRole,
      department: "Administration",
      generatedBy: "Developer (Master Override)"
    });
    setCodeNotice(`Master Token Generated: ${code.code} for [${targetRole}] at ${currentSchool.name}`);
    setTimeout(() => setCodeNotice(''), 7000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Super Developer Header */}
      <header className="bg-slate-900 border-b border-indigo-950 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-amber-500 flex items-center justify-center font-black text-slate-950 text-lg">
            S
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              SaaS Multi-School Developer Cockpit
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Root (100)
              </span>
            </h1>
            <p className="text-xs text-slate-400">Architect: {user.fullName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddSchool(!showAddSchool)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-1.5 rounded-xl font-semibold transition"
          >
            + Onboard New School
          </button>
          <Button variant="secondary" onClick={onLogout} className="text-xs py-1.5 px-3">
            Sign Out
          </Button>
        </div>
      </header>

      {/* Add School Modal */}
      {showAddSchool && (
        <div className="bg-slate-900 border-b border-slate-800 p-6">
          <div className="max-w-xl mx-auto space-y-3">
            <h3 className="text-sm font-bold text-white">Register New Institution</h3>
            <form onSubmit={handleAddSchool} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <input
                type="text"
                placeholder="School Name (e.g. St. Xavier Senior Secondary)"
                value={newSchoolName}
                onChange={(e) => setNewSchoolName(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
              <input
                type="text"
                placeholder="City (e.g. Dehradun)"
                value={newSchoolCity}
                onChange={(e) => setNewSchoolCity(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
              <div className="sm:col-span-2 flex gap-2">
                <Button type="submit">Save & Add School</Button>
                <Button variant="secondary" onClick={() => setShowAddSchool(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Developer View */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* School Switcher Bar */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400">Select School to Audit:</span>
            <select
              value={selectedSchoolId}
              onChange={(e) => setSelectedSchoolId(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-indigo-300 font-bold text-xs"
            >
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.city}) [{s.status}]
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleSchoolSuspension(currentSchool)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition ${
                currentSchool?.status === 'Active'
                  ? 'border-amber-500/40 text-amber-300 hover:bg-amber-500/10'
                  : 'border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10'
              }`}
            >
              {currentSchool?.status === 'Active' ? 'Suspend School' : 'Activate School'}
            </button>
            <button
              onClick={() => handleRemoveSchool(currentSchool)}
              className="text-xs px-3 py-1.5 rounded-xl font-bold border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 transition"
            >
              Delete School
            </button>
          </div>
        </div>

        {/* School Status Alert if Suspended */}
        {currentSchool?.status === 'Suspended' && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold">⚠️ Institution Access Suspended:</span> {currentSchool?.name}
              <p className="text-[11px] text-rose-400/80 mt-0.5">Reason: {currentSchool.suspendReason || "Payment / Contract Hold"}</p>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-200">Staff Blocked</span>
          </div>
        )}

        {/* KPI Stats Strictly for the SELECTED School */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Institution Accounts</p>
            <p className="text-2xl font-bold text-white mt-1">{currentSchoolUsers.length} <span className="text-xs font-normal text-slate-400">Total IDs</span></p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Issued Invite Codes</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">{currentSchoolCodes.length}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Plan License</p>
            <p className="text-base font-bold text-emerald-400 mt-2">{currentSchool?.plan}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Fee Collection</p>
            <p className="text-2xl font-bold text-white mt-1">₹14,999 <span className="text-xs font-normal text-emerald-400">Settled</span></p>
          </div>
        </div>

        {/* Master Token Generator for This School */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div>
              <h3 className="text-sm font-bold text-white">Generate Secret Token for {currentSchool?.name}</h3>
              <p className="text-xs text-slate-400">Single-use token directly linked to this school.</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200"
              >
                <option value={ROLES.PRINCIPAL}>Principal</option>
                <option value={ROLES.DIRECTOR}>Director / Management</option>
                <option value={ROLES.TEACHER}>Subject Teacher</option>
              </select>
              <button
                onClick={handleCreateMasterToken}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl transition"
              >
                + Issue Token
              </button>
            </div>
          </div>

          {codeNotice && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              {codeNotice}
            </div>
          )}

          {/* User Table for SELECTED SCHOOL ONLY */}
          <div className="border border-slate-800 rounded-xl overflow-hidden mt-4">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Faculty Name</th>
                  <th className="p-3">Email ID</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                {currentSchoolUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/20">
                    <td className="p-3 font-sans font-medium text-white">{u.fullName}</td>
                    <td className="p-3 text-slate-400">{u.email}</td>
                    <td className="p-3 font-sans">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 text-[10px]">{u.role}</span>
                    </td>
                    <td className="p-3 font-sans text-slate-400">{u.department}</td>
                    <td className="p-3 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${u.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {currentSchoolUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-slate-500 font-sans">No staff registered for this school yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
