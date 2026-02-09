import React, { useState } from 'react';
import LeadDashboard from './LeadDashboard';
import AnalyticsView from './AnalyticsView';

interface AdminAppProps {
  onLogout?: () => void;
}

const AdminApp: React.FC<AdminAppProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics'>('leads');

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 flex">
      <aside className="hidden md:flex w-64 bg-[#020617] border-r border-slate-800 p-6 flex-col justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight mb-8">Mini CRM Admin</h1>
          <nav className="space-y-3 text-sm">
            <span className="block text-slate-400 uppercase tracking-[0.18em] text-[10px]">Navigation</span>
            <button className="w-full text-left px-3 py-2 rounded-lg bg-slate-900 text-slate-100 text-sm font-medium">
              Leads
            </button>
          </nav>
        </div>
        <div className="mt-8 text-[11px] text-slate-500 space-y-2">
          <div>
            <p className="uppercase tracking-[0.18em] mb-1">Account</p>
            <p className="text-slate-400">Signed in as admin</p>
          </div>
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="mt-1 inline-flex items-center justify-center rounded-full border border-slate-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 hover:bg-slate-800 hover:text-slate-50"
            >
              Logout
            </button>
          )}
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 bg-slate-950/80">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-pink-400 mb-1">Lead Dashboard</p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Client leads overview</h2>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Live demo data</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
              <p>Track inbound inquiries and follow up from your yegna ቡና website.</p>
              <div className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                <span className="uppercase tracking-[0.18em]">Leads</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pt-2">
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  activeTab === 'leads'
                    ? 'bg-slate-900 text-slate-50 border-slate-700'
                    : 'text-slate-400 border-transparent hover:text-slate-200'
                }`}
              >
                Leads
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-slate-900 text-slate-50 border-slate-700'
                    : 'text-slate-400 border-transparent hover:text-slate-200'
                }`}
              >
                Analytics
              </button>
            </div>
          </header>

          {activeTab === 'leads' ? <LeadDashboard /> : <AnalyticsView />}
        </div>
      </main>
    </div>
  );
};

export default AdminApp;
