import React, { useState } from 'react';
import Button from '../common/Button.jsx';

export default function PaymentModal({ school, onClose, onPaymentSuccess }) {
  const [method, setMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      if (onPaymentSuccess) onPaymentSuccess(method);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">License Fee Settlement</h3>
            <p className="text-xs text-slate-400">{school?.name}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">✕</button>
        </div>

        {success ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2 text-center">
            <p className="text-sm font-bold">Payment Verified Successfully! 🎉</p>
            <p>Invoice #APS-2026-INV-992 marked Paid. School valid until March 2027.</p>
            <Button onClick={onClose} className="mt-3">Back to Dashboard</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400">Total Payable (Annual SaaS):</span>
              <span className="text-base font-bold text-emerald-400 font-mono">₹14,999.00</span>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-4 gap-2 text-xs">
              {[
                { id: 'upi', label: 'UPI / QR' },
                { id: 'card', label: 'Card' },
                { id: 'netbanking', label: 'NetBank' },
                { id: 'challan', label: 'RTGS Challan' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`py-2 px-1 rounded-xl font-medium border text-center transition ${
                    method === m.id
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Sub-view based on method */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-3">
              {method === 'upi' && (
                <div className="text-center space-y-2">
                  <div className="h-32 w-32 mx-auto bg-white rounded-lg flex items-center justify-center text-slate-900 font-mono font-bold text-[11px] p-2 border">
                    [DYNAMIC UPI QR CODE]
                  </div>
                  <p className="text-slate-400 text-[11px]">Scan using GPay, PhonePe, Paytm, or BHIM</p>
                  <p className="font-mono text-indigo-400">VPA: paperpilot.saas@icici</p>
                </div>
              )}

              {method === 'card' && (
                <div className="space-y-2">
                  <input type="text" placeholder="Card Number (16 digits)" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="MM/YY" className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200" />
                    <input type="password" placeholder="CVV" className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200" />
                  </div>
                </div>
              )}

              {method === 'netbanking' && (
                <div className="space-y-2">
                  <select className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200">
                    <option>State Bank of India (Corporate)</option>
                    <option>HDFC Bank Corporate</option>
                    <option>ICICI Corporate Banking</option>
                    <option>Punjab National Bank</option>
                  </select>
                </div>
              )}

              {method === 'challan' && (
                <div className="space-y-1 text-slate-300">
                  <p>• Account Name: PaperPilot EduTech Pvt Ltd</p>
                  <p>• Account Number: 50200088921822</p>
                  <p>• IFSC: HDFC0001024</p>
                  <p className="text-[10px] text-amber-300">Upload UTR acknowledgement after wire transfer.</p>
                </div>
              )}
            </div>

            <Button onClick={handlePay} disabled={processing} className="w-full">
              {processing ? 'Connecting Gateway...' : `Authorize & Pay ₹14,999`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
