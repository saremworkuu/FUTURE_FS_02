import React, { useEffect, useState } from 'react';
import type { Lead } from './LeadDashboard';

const STORAGE_KEY = 'yegna-leads';

const AnalyticsView: React.FC = () => {
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    newCount: 0,
    contactedCount: 0,
    convertedCount: 0,
  });

  const [velocity, setVelocity] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      const leads: Lead[] = raw ? JSON.parse(raw) : [];

      if (!Array.isArray(leads) || leads.length === 0) {
        setMetrics({ totalLeads: 0, newCount: 0, contactedCount: 0, convertedCount: 0 });
        setVelocity([0, 0, 0]);
        return;
      }

      const totalLeads = leads.length;
      const newCount = leads.filter((l) => l.status === 'New').length;
      const contactedCount = leads.filter((l) => l.status === 'Contacted').length;
      const convertedCount = leads.filter((l) => l.status === 'Converted').length;

      setMetrics({ totalLeads, newCount, contactedCount, convertedCount });

      // Compute simple inbound velocity: leads created over the last 3 days
      const daysBack = 3;
      const counts = new Array(daysBack).fill(0) as number[];
      const now = new Date();

      leads.forEach((lead) => {
        const created = new Date(lead.createdAt);
        const diffMs = now.getTime() - created.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays < daysBack) {
          // Oldest on the left, today on the right
          const index = daysBack - 1 - diffDays;
          counts[index] += 1;
        }
      });

      setVelocity(counts);
    } catch {
      setMetrics({ totalLeads: 0, newCount: 0, contactedCount: 0, convertedCount: 0 });
      setVelocity([0, 0, 0]);
    }
  }, []);

  const { totalLeads, newCount, contactedCount, convertedCount } = metrics;

  const conversionRate = totalLeads === 0 ? 0 : Math.round((convertedCount / totalLeads) * 100);

   const distributionTotal = newCount + contactedCount + convertedCount;

   const newAngle = distributionTotal === 0 ? 0 : (newCount / distributionTotal) * 360;
   const contactedAngle = distributionTotal === 0 ? 0 : (contactedCount / distributionTotal) * 360;
   const convertedAngle = distributionTotal === 0 ? 0 : (convertedCount / distributionTotal) * 360;

   const leadDistributionStyle =
     distributionTotal === 0
       ? { backgroundColor: '#020617' }
       : {
           backgroundImage: `conic-gradient(#38bdf8 0deg ${newAngle}deg, #fbbf24 ${newAngle}deg ${
             newAngle + contactedAngle
           }deg, #34d399 ${newAngle + contactedAngle}deg ${
             newAngle + contactedAngle + convertedAngle
           }deg)` ,
         } as React.CSSProperties;

   const maxVelocity = Math.max(...velocity);

  return (
    <div className="space-y-5">
      <section className="grid lg:grid-cols-[1.4fr,1.2fr] gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-1">Lead Distribution</h3>
            <p className="text-xs text-slate-400 mb-4">Snapshot of leads by status.</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-40 w-40 flex items-center justify-center">
              <div
                className="h-40 w-40 rounded-full shadow-inner"
                style={leadDistributionStyle}
              />
              <div className="absolute h-24 w-24 rounded-full bg-slate-950" />
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xs text-slate-400">Total Leads</span>
                <span className="text-lg font-semibold text-slate-100">{totalLeads}</span>
              </div>
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
            {velocity.map((count, index) => {
              const height =
                maxVelocity === 0
                  ? '12%'
                  : `${Math.max(18, Math.round((count / maxVelocity) * 80))}%`;
              return (
                <div
                  key={index}
                  className="w-10 bg-slate-800 rounded-xl overflow-hidden flex flex-col items-center justify-end pb-1"
                >
                  <div
                    className="w-full bg-indigo-500 rounded-t-xl transition-all duration-300"
                    style={{ height }}
                  />
                  <span className="mt-1 text-[10px] text-slate-400">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-pink-600 via-pink-500 to-rose-500 rounded-2xl p-5 border border-pink-400/70 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-pink-50 mb-1">Overall Conversion Success</p>
          <p className="text-sm text-pink-50 max-w-xl">
            Your business has converted {conversionRate.toFixed(1)}% of total prospects into successful clients from the leads currently stored in this workspace.
          </p>
        </div>
        <div className="shrink-0 flex items-center justify-center h-20 w-24 rounded-2xl bg-slate-950/10 border border-pink-200/60">
          <span className="text-2xl font-semibold text-white">{conversionRate}%</span>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsView;
