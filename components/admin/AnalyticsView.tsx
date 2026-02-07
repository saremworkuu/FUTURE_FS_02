import React from 'react';

interface AnalyticsViewProps {
  totalLeads: number;
  newCount: number;
  contactedCount: number;
  convertedCount: number;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ totalLeads, newCount, contactedCount, convertedCount }) => {
  const conversionRate = totalLeads === 0 ? 0 : Math.round((convertedCount / totalLeads) * 100);

  return (
    <div className="space-y-5">
      <section className="grid lg:grid-cols-[1.4fr,1.2fr] gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-1">Lead Distribution</h3>
            <p className="text-xs text-slate-400 mb-4">Snapshot of leads by status.</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-40 w-40 rounded-full bg-slate-800 flex items-center justify-center">
              <div className="h-28 w-28 rounded-full bg-slate-950" />
              <div className="absolute inset-2 rounded-full border-4 border-sky-500/80 border-b-transparent border-r-emerald-500/80" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-slate-300">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sky-400" />New</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" />Contacted</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" />Converted</span>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col">
          <h3 className="text-sm font-semibold text-slate-100 mb-1">Inbound Velocity</h3>
          <p className="text-xs text-slate-400 mb-4">Recent lead volume over the last few days.</p>
          <div className="flex-1 flex items-end justify-around gap-3">
            <div className="w-10 bg-slate-800 rounded-xl overflow-hidden flex items-end justify-center">
              <div className="w-full bg-indigo-500 rounded-t-xl" style={{ height: '60%' }} />
            </div>
            <div className="w-10 bg-slate-800 rounded-xl overflow-hidden flex items-end justify-center">
              <div className="w-full bg-indigo-500 rounded-t-xl" style={{ height: '85%' }} />
            </div>
            <div className="w-10 bg-slate-800 rounded-xl overflow-hidden flex items-end justify-center">
              <div className="w-full bg-indigo-500 rounded-t-xl" style={{ height: '40%' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 rounded-2xl p-5 border border-indigo-500/60 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-indigo-100 mb-1">Overall Conversion Success</p>
          <p className="text-sm text-indigo-50 max-w-xl">
            Your business has converted {conversionRate.toFixed(1)}% of total prospects into successful clients based on demo data.
          </p>
        </div>
        <div className="shrink-0 flex items-center justify-center h-20 w-24 rounded-2xl bg-slate-950/10 border border-indigo-200/40">
          <span className="text-2xl font-semibold text-white">{conversionRate}%</span>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsView;
