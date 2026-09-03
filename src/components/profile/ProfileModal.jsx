import React, { useState } from 'react';
import Button from '../common/Button.jsx';
import { SCHOOL_DEPARTMENTS } from '../../config/departments.js';

export default function ProfileModal({ user, onClose, onSave }) {
  const [profile, setProfile] = useState({
    fullName: user.fullName || '',
    phone: user.phone || '',
    department: user.department || 'Computer Science & IT',
    dob: user.dob || '',
    address: user.address || '',
    designation: user.designation || 'Faculty Member',
    photoUrl: user.photoUrl || ''
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Faculty Profile Settings</h3>
            <p className="text-[11px] text-slate-400">All fields are optional. Fill only what is required.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {/* Profile Photo Display & Upload */}
          <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="h-14 w-14 rounded-full overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
              {profile.photoUrl ? (
                <img src={profile.photoUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xl font-bold">{profile.fullName?.charAt(0) || 'U'}</span>
              )}
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Upload Profile Photo (Optional)</label>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-[10px] text-slate-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 uppercase text-[10px] mb-1">Full Name</label>
              <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-slate-400 uppercase text-[10px] mb-1">Phone Number</label>
              <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="+91..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 uppercase text-[10px] mb-1">Assigned Department</label>
              <select name="department" value={profile.department} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200">
                {SCHOOL_DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 uppercase text-[10px] mb-1">Date of Birth</label>
              <input type="date" name="dob" value={profile.dob} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200" />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 uppercase text-[10px] mb-1">Residential / Campus Address</label>
            <textarea name="address" rows="2" value={profile.address} onChange={handleChange} placeholder="Address details..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit">Update Profile</Button>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
