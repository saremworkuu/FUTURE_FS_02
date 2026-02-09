import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

export type LeadStatus = 'New' | 'Contacted' | 'Converted';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  source?: string;
  status: LeadStatus;
  notes: string[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'yegna-leads';

const mockLeads: Lead[] = [
  {
    _id: '1',
    name: 'Sara Bekele',
    email: 'sara@example.com',
    phone: '+251900000001',
    source: 'Website',
    status: 'New',
    notes: ['Interested in weekend brunch booking'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: 'Daniel K',
    email: 'daniel@example.com',
    phone: '+251900000002',
    source: 'Instagram',
    status: 'Contacted',
    notes: ['Requested corporate coffee tasting'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const statuses: LeadStatus[] = ['New', 'Contacted', 'Converted'];

const LeadDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    if (typeof window === 'undefined') return mockLeads;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Lead[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fall back to mock data on parse errors
    }
    return mockLeads;
  });
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(mockLeads[0]?._id ?? null);
  const [newNote, setNewNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | LeadStatus>('All');
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch {
      // ignore storage errors
    }
  }, [leads]);

  const selectedLead = leads.find((lead) => lead._id === selectedLeadId) ?? leads[0] ?? null;

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead._id === id ? { ...lead, status, updatedAt: new Date().toISOString() } : lead,
      ),
    );
  };

  const addNoteToLead = (id: string) => {
    if (!newNote.trim()) return;
    setLeads((prev) =>
      prev.map((lead) =>
        lead._id === id
          ? {
              ...lead,
              notes: [...lead.notes, newNote.trim()],
              updatedAt: new Date().toISOString(),
            }
          : lead,
      ),
    );
    setNewNote('');
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      statusFilter === 'All'
        ? true
        : lead.status === statusFilter;

    if (!normalizedSearch) return matchesStatus;

    const haystack = `${lead.name} ${lead.email} ${lead.source ?? ''}`.toLowerCase();
    const matchesSearch = haystack.includes(normalizedSearch);

    return matchesStatus && matchesSearch;
  });

  const totalLeads = leads.length;
  const newCount = leads.filter((l) => l.status === 'New').length;
  const contactedCount = leads.filter((l) => l.status === 'Contacted').length;
  const convertedCount = leads.filter((l) => l.status === 'Converted').length;
  const conversionRate = totalLeads === 0 ? 0 : Math.round((convertedCount / totalLeads) * 100);

  return (
    <div className="space-y-5">
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl px-4 py-3 flex flex-col justify-between">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-1">Total Leads</p>
          <p className="text-2xl font-semibold text-slate-50">{totalLeads}</p>
        </div>
        <div className="bg-slate-900/70 border border-sky-900/60 rounded-2xl px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-1">New</p>
          <p className="text-xl font-semibold text-sky-300">{newCount}</p>
        </div>
        <div className="bg-slate-900/70 border border-amber-900/60 rounded-2xl px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-1">Contacted</p>
          <p className="text-xl font-semibold text-amber-300">{contactedCount}</p>
        </div>
        <div className="bg-slate-900/70 border border-emerald-900/60 rounded-2xl px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-1">Converted</p>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-semibold text-emerald-300">{convertedCount}</p>
            <p className="text-xs text-emerald-400">{conversionRate}% rate</p>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-1 gap-6 items-start">
      <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 md:p-5 overflow-hidden">
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold tracking-wide text-slate-100">Leads</h3>
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Showing {filteredLeads.length} of {totalLeads}
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or source"
                className="w-full rounded-xl bg-slate-950/60 border border-slate-700 px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-pink-500/80"
              />
            </div>
            <div className="flex flex-wrap gap-1 text-[11px]">
              {(['All', ...statuses] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setStatusFilter(option)}
                  className={`px-3 py-1 rounded-full uppercase tracking-[0.18em] border transition-colors ${
                    statusFilter === option
                      ? 'bg-pink-500 text-slate-950 border-pink-400'
                      : 'border-slate-700 text-slate-300 hover:border-pink-400 hover:text-pink-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-3 md:mx-0">
          <table className="min-w-full text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                <th className="px-3 py-2 text-left font-normal">Lead</th>
                <th className="px-3 py-2 text-left font-normal">Source</th>
                <th className="px-3 py-2 text-left font-normal">Status</th>
                <th className="px-3 py-2 text-left font-normal">Last updated</th>
                <th className="px-3 py-2 text-right font-normal">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead._id}
                  onClick={() => {
                    setSelectedLeadId(lead._id);
                    setIsDetailOpen(true);
                  }}
                  className={
                    selectedLeadId === lead._id
                      ? 'bg-slate-800/70 cursor-pointer'
                      : 'hover:bg-slate-900/60 cursor-pointer'
                  }
                >
                  <td className="px-3 py-2 align-top">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-slate-100">{lead.name}</span>
                      <span className="text-[11px] text-slate-400">{lead.email}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 align-top text-[11px] text-slate-400">{lead.source ?? 'Website'}</td>
                  <td className="px-3 py-2 align-top">
                    <span
                      className={`inline-flex text-[11px] px-2 py-1 rounded-full font-semibold tracking-wide ${
                        lead.status === 'New'
                          ? 'bg-sky-500/10 text-sky-300 border border-sky-500/40'
                          : lead.status === 'Contacted'
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 align-top text-[11px] text-slate-500">
                    {new Date(lead.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2 align-top text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLeadId(lead._id);
                        setIsDetailOpen(true);
                      }}
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-300 hover:text-pink-200"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLeads.length === 0 && (
            <p className="text-xs text-slate-500 px-3 py-4">
              No leads yet. Connect your contact form to start collecting leads.
            </p>
          )}
        </div>
      </section>
      </div>

      {selectedLead && isDetailOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 px-4">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-[1.2fr,1fr] divide-y md:divide-y-0 md:divide-x divide-slate-800">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">{selectedLead.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{selectedLead.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setLeads((prev) => prev.filter((lead) => lead._id !== selectedLead._id));
                        setIsDetailOpen(false);
                      }}
                      className="p-2 rounded-full text-slate-400 hover:text-red-400 hover:bg-slate-800/70"
                      aria-label="Delete lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsDetailOpen(false)}
                      className="text-slate-500 hover:text-slate-200 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1 text-xs">
                    <p className="uppercase tracking-[0.18em] text-[10px] text-slate-500">Status</p>
                    <div className="inline-flex items-center gap-2 rounded-lg bg-slate-950/70 border border-slate-700 px-3 py-2">
                      {statuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => updateLeadStatus(selectedLead._id, status)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] border transition-colors ${
                            selectedLead.status === status
                              ? 'bg-pink-500 text-slate-950 border-pink-400'
                              : 'border-slate-700 text-slate-300 hover:border-pink-400 hover:text-pink-200'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="uppercase tracking-[0.18em] text-[10px] text-slate-500">Message</p>
                    <div className="rounded-2xl bg-slate-950/70 border border-slate-700 px-3 py-3 text-slate-200 min-h-[72px] text-xs">
                      {selectedLead.notes[0] ?? 'No initial message captured for this lead.'}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="rounded-2xl bg-slate-950/70 border border-slate-700 px-3 py-3">
                    <p className="uppercase tracking-[0.18em] text-[10px] text-slate-500 mb-1">Source</p>
                    <p>{selectedLead.source ?? 'Website'}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950/70 border border-slate-700 px-3 py-3">
                    <p className="uppercase tracking-[0.18em] text-[10px] text-slate-500 mb-1">Created</p>
                    <p>{new Date(selectedLead.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-3 bg-slate-950/60">
                <div>
                  <p className="text-sm font-semibold text-slate-100">Notes History</p>
                  <p className="text-xs text-slate-500 mt-0.5">Track follow-ups and conversations.</p>
                </div>

                <div className="flex-1 min-h-[140px] max-h-56 overflow-y-auto space-y-2 pr-1">
                  {selectedLead.notes.length > 0 ? (
                    selectedLead.notes.map((note, index) => (
                      <div
                        key={index}
                        className="text-xs text-slate-100 bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2"
                      >
                        {note}
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-slate-500">
                      No notes yet.
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a follow-up note..."
                    className="flex-1 rounded-full bg-slate-950/70 border border-slate-700 px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-pink-500/80"
                  />
                  <button
                    onClick={() => selectedLead && addNoteToLead(selectedLead._id)}
                    className="px-4 py-2 rounded-full bg-pink-500 text-slate-950 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-pink-400"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadDashboard;
