import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Eye, Trash2, Download, RefreshCw, X } from 'lucide-react';
import { RsvpEntry } from '../types';

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);

  // Load RSVPs
  const loadRsvps = () => {
    const stored = localStorage.getItem('ayaan_communion_rsvps_v2');
    if (stored) {
      try {
        setRsvps(JSON.parse(stored));
      } catch (e) {
        setRsvps([]);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadRsvps();
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Super secret passcode for parents (Gayan & Irani)
    if (passcode.toLowerCase() === 'ayaan2026' || passcode.toLowerCase() === 'negombo') {
      setIsAuthenticated(true);
      setErrorMsg('');
      loadRsvps();
    } else {
      setErrorMsg('Incorrect passcode. Please try again.');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this RSVP entry?')) {
      const updated = rsvps.filter(item => item.id !== id);
      setRsvps(updated);
      localStorage.setItem('ayaan_communion_rsvps_v2', JSON.stringify(updated));
    }
  };

  const handleClearAll = () => {
    if (window.confirm('WARNING: Are you sure you want to clear ALL RSVP responses? This cannot be undone.')) {
      setRsvps([]);
      localStorage.setItem('ayaan_communion_rsvps_v2', JSON.stringify([]));
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Status', 'Guests Count', 'Dietary Notes', 'Blessing/Wish', 'Date/Time'];
    const rows = rsvps.map(r => [
      `"${r.name.replace(/"/g, '""')}"`,
      r.status,
      r.guestsCount,
      `"${(r.dietaryNotes || '').replace(/"/g, '""')}"`,
      `"${(r.prayerWish || '').replace(/"/g, '""')}"`,
      r.timestamp
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Ayaans_Communion_RSVPs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculations
  const totalResponses = rsvps.length;
  const attendingCount = rsvps.filter(r => r.status === 'attending').length;
  const decliningCount = rsvps.filter(r => r.status === 'declined').length;
  const totalGuestsExpected = rsvps.reduce((acc, curr) => acc + (curr.guestsCount || 0), 0);

  return (
    <div id="parents-admin-portal-container" className="w-full max-w-4xl px-4 mt-8 mb-24 border-t border-gold-300/10 pt-10 text-center">
      
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="mx-auto flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-gold-600 transition-colors cursor-pointer"
        >
          <Lock className="h-3 w-3" />
          <span>Parents RSVP Portal</span>
        </button>
      ) : (
        <div className="bg-white rounded-xl border border-gold-300/30 gold-glow p-6 text-left max-w-xl mx-auto relative animate-fade-in">
          {/* Close Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              setIsAuthenticated(false);
              setPasscode('');
            }}
            className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 cursor-pointer"
            title="Close Portal"
          >
            <X className="h-4 w-4" />
          </button>

          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center gap-2 text-gold-700 border-b border-gold-100 pb-3">
                <Lock className="h-4 w-4" />
                <h3 className="font-serif text-lg font-bold">Parents Portal Login</h3>
              </div>
              <p className="font-sans text-xs text-stone-500 leading-relaxed">
                Parents (Gayan & Irani) can enter their secret passcode to view and manage guest list responses, dietary summaries, and direct printouts.
              </p>
              
              <div className="space-y-1">
                <label className="font-sans text-xs font-semibold text-stone-600">Passcode</label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (ayaan2026)"
                  className="w-full rounded-md border border-stone-300/70 px-3 py-2 font-sans text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50"
                />
                {errorMsg && <p className="text-red-500 text-[11px] mt-1 font-sans">{errorMsg}</p>}
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-gold-600 hover:bg-gold-700 text-white font-sans text-xs uppercase tracking-[0.15em] font-semibold py-2.5 transition-colors cursor-pointer"
              >
                Unlock Guest List
              </button>
            </form>
          ) : (
            <div className="space-y-6 max-w-full">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold-100 pb-4">
                <div className="flex items-center gap-2 text-gold-700">
                  <Unlock className="h-4 w-4" />
                  <h3 className="font-serif text-lg font-bold">Guest RSVPs Dashboard</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={loadRsvps}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-stone-700 transition-colors"
                    title="Refresh List"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 bg-gold-600 hover:bg-gold-700 text-white px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-colors cursor-pointer"
                    title="Export to CSV Spreadsheet"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Total RSVPs', val: totalResponses, color: 'text-stone-800' },
                  { label: 'Attending (Accepts)', val: attendingCount, color: 'text-emerald-600' },
                  { label: 'Declined', val: decliningCount, color: 'text-rose-500' },
                  { label: 'Total Headcount', val: totalGuestsExpected, color: 'text-gold-600 font-bold' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-stone-50 rounded-lg p-3 border border-stone-100">
                    <span className="font-sans text-[10px] text-stone-400 block uppercase tracking-wider">{stat.label}</span>
                    <span className={`text-xl font-display font-semibold ${stat.color} block mt-1`}>{stat.val}</span>
                  </div>
                ))}
              </div>

              {/* Guest Entries Table */}
              <div className="space-y-3">
                <h4 className="font-serif text-sm font-bold text-stone-700">Detailed Guest List</h4>
                <div className="border border-stone-100 rounded-lg overflow-x-auto max-h-[300px] overflow-y-auto">
                  <table className="w-full text-left font-sans text-xs border-collapse">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-100 text-stone-500">
                        <th className="p-3 font-semibold">Guest Name</th>
                        <th className="p-3 font-semibold">Status</th>
                        <th className="p-3 font-semibold text-center">Headcount</th>
                        <th className="p-3 font-semibold">Dietary</th>
                        <th className="p-3 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                      {rsvps.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-stone-400 font-sans">No guest responses found yet.</td>
                        </tr>
                      ) : (
                        rsvps.map((rsvp) => (
                          <tr key={rsvp.id} className="hover:bg-gold-50/20 text-stone-700">
                            <td className="p-3 font-medium">
                              <div>{rsvp.name}</div>
                              {rsvp.prayerWish && (
                                <div className="text-[10px] italic text-stone-400 max-w-xs truncate mt-0.5" title={rsvp.prayerWish}>
                                  "{rsvp.prayerWish}"
                                </div>
                              )}
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full font-sans text-[9px] font-bold ${
                                rsvp.status === 'attending' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  : 'bg-rose-50 text-rose-600 border border-rose-100'
                              }`}>
                                {rsvp.status === 'attending' ? 'Attending' : 'Declined'}
                              </span>
                            </td>
                            <td className="p-3 text-center font-bold">
                              {rsvp.status === 'attending' ? rsvp.guestsCount : '—'}
                            </td>
                            <td className="p-3 italic text-stone-500">
                              {rsvp.dietaryNotes || '—'}
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleDelete(rsvp.id)}
                                className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                                title="Delete Response"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action utilities */}
              <div className="flex justify-between items-center border-t border-stone-100 pt-4">
                <button
                  onClick={handleClearAll}
                  className="rounded-full border border-rose-200 hover:bg-rose-50 hover:text-rose-600 text-stone-400 px-4 py-1.5 text-xs font-sans transition-all"
                >
                  Clear All Responses
                </button>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="font-sans text-xs text-stone-400 hover:text-stone-600"
                >
                  Lock Dashboard
                </button>
              </div>

            </div>
          )}
        </div>
      )}

    </div>
  );
}
