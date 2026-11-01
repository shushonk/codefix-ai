import React from 'react';
import { 
  History, 
  Search, 
  Calendar, 
  FileText, 
  ArrowUpRight,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { cn, formatDate } from '../utils/ui';

const reviews = [
  { id: 'REV-2023-001', project: 'API Gateway', date: '2026-10-31T14:30:00Z', findings: 12, critical: 2, status: 'Completed' },
  { id: 'REV-2023-002', project: 'User Microservice', date: '2026-10-30T09:15:00Z', findings: 5, critical: 0, status: 'Completed' },
  { id: 'REV-2023-003', project: 'Auth Provider', date: '2026-10-29T16:45:00Z', findings: 24, critical: 8, status: 'Action Required' },
  { id: 'REV-2023-004', project: 'Data Processor', date: '2026-10-28T11:00:00Z', findings: 8, critical: 1, status: 'Completed' },
];

export default function ReviewHistory() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Review History</h1>
          <p className="text-slate-500">A comprehensive log of all previous code analysis sessions.</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#0F0F12] border border-slate-800/50">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-2">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                 <input 
                   type="text" 
                   placeholder="Search history..."
                   className="bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm w-80 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                 />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800 text-sm font-medium hover:bg-slate-800 transition-all text-slate-400">
                 <Calendar className="w-4 h-4" />
                 <span>Last 30 Days</span>
              </button>
           </div>
           <button className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-100 transition-all">
              <Filter className="w-4 h-4" />
           </button>
        </div>

        <div className="space-y-3">
           {reviews.map((rev) => (
             <div key={rev.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-800/30 bg-slate-900/10 hover:bg-slate-900/30 transition-all group">
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-purple-400 transition-colors">
                      <FileText className="w-6 h-6" />
                   </div>
                   <div>
                      <div className="flex items-center gap-3">
                         <h4 className="font-bold text-slate-100">{rev.project}</h4>
                         <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-500">{rev.id}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{formatDate(rev.date)}</p>
                   </div>
                </div>

                <div className="flex items-center gap-12">
                   <div className="flex items-center gap-8 text-center">
                      <div>
                         <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Findings</p>
                         <p className="text-sm font-bold">{rev.findings}</p>
                      </div>
                      <div>
                         <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Critical</p>
                         <p className={cn("text-sm font-bold", rev.critical > 0 ? "text-rose-500" : "text-slate-100")}>{rev.critical}</p>
                      </div>
                      <div>
                         <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Status</p>
                         <span className={cn(
                           "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                           rev.status === 'Completed' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                         )}>
                           {rev.status}
                         </span>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <button className="px-4 py-1.5 rounded-lg border border-slate-800 text-xs font-bold hover:bg-slate-800 transition-all">
                         View Details
                      </button>
                      <button className="p-1.5 rounded hover:bg-slate-800 text-slate-600 transition-all">
                         <MoreHorizontal className="w-4 h-4" />
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
