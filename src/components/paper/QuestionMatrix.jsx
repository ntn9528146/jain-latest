import React from 'react';

export default function QuestionMatrix({ matrix, onChange, targetMarks }) {
  const currentCalculatedMarks = matrix.reduce((sum, item) => {
    return sum + (item.enabled ? item.marks * item.count : 0);
  }, 0);

  const totalQuestions = matrix.reduce((sum, item) => {
    return sum + (item.enabled ? Number(item.count) : 0);
  }, 0);

  const updateItem = (index, field, value) => {
    const updated = [...matrix];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            CBSE Question Format & Section Blueprint Matrix
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Live Balance
            </span>
          </h4>
          <p className="text-[11px] text-slate-400">
            Check or uncheck question formats, adjust question count and marks per question.
          </p>
        </div>

        {/* Live Calculation Badge */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Calculated Marks:</span>
            <span className={`text-base font-bold font-mono ${currentCalculatedMarks === targetMarks ? 'text-emerald-400' : 'text-amber-400'}`}>
              {currentCalculatedMarks} / {targetMarks}
            </span>
          </div>
          <div className="border-l border-slate-800 pl-3">
            <span className="text-slate-400 block text-[10px] uppercase">Total Qs:</span>
            <span className="text-base font-bold text-white font-mono">{totalQuestions}</span>
          </div>
        </div>
      </div>

      {currentCalculatedMarks !== targetMarks && (
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-center justify-between">
          <span>⚠️ Current configured total ({currentCalculatedMarks}) differs from target paper marks ({targetMarks}). You can adjust the question count below or continue.</span>
        </div>
      )}

      {/* Matrix Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
            <tr>
              <th className="p-3">Enable</th>
              <th className="p-3">Question Type / Format</th>
              <th className="p-3 text-center">Marks per Q</th>
              <th className="p-3 text-center">Questions Count</th>
              <th className="p-3 text-right">Section Marks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
            {matrix.map((item, idx) => (
              <tr key={item.id} className={`hover:bg-slate-900/40 transition ${!item.enabled ? 'opacity-40' : ''}`}>
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={(e) => updateItem(idx, 'enabled', e.target.checked)}
                    className="h-4 w-4 rounded bg-slate-900 border-slate-700 text-indigo-600 cursor-pointer"
                  />
                </td>
                <td className="p-3 font-sans font-medium text-white">{item.label}</td>
                <td className="p-3 text-center">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={!item.enabled || item.marks <= 1}
                      onClick={() => updateItem(idx, 'marks', Math.max(1, item.marks - 1))}
                      className="h-6 w-6 rounded bg-slate-900 border border-slate-700 hover:border-indigo-500 flex items-center justify-center text-xs text-white disabled:opacity-30"
                    >−</button>
                    <span className="w-8 text-center font-bold text-indigo-300">{item.marks}</span>
                    <button
                      type="button"
                      disabled={!item.enabled}
                      onClick={() => updateItem(idx, 'marks', item.marks + 1)}
                      className="h-6 w-6 rounded bg-slate-900 border border-slate-700 hover:border-indigo-500 flex items-center justify-center text-xs text-white disabled:opacity-30"
                    >+</button>
                  </div>
                </td>
                <td className="p-3 text-center">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={!item.enabled || item.count <= 1}
                      onClick={() => updateItem(idx, 'count', Math.max(1, item.count - 1))}
                      className="h-6 w-6 rounded bg-slate-900 border border-slate-700 hover:border-indigo-500 flex items-center justify-center text-xs text-white disabled:opacity-30"
                    >−</button>
                    <span className="w-8 text-center font-bold text-amber-300">{item.count}</span>
                    <button
                      type="button"
                      disabled={!item.enabled}
                      onClick={() => updateItem(idx, 'count', item.count + 1)}
                      className="h-6 w-6 rounded bg-slate-900 border border-slate-700 hover:border-indigo-500 flex items-center justify-center text-xs text-white disabled:opacity-30"
                    >+</button>
                  </div>
                </td>
                <td className="p-3 text-right font-bold text-white">
                  {item.enabled ? item.marks * item.count : 0} M
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
