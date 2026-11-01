import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  FileWarning, 
  ExternalLink,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';
import { cn } from '../utils/ui';

const vulnerabilities = [
  { id: 'V-001', title: 'CWE-89: SQL Injection', severity: 'Critical', status: 'Open', file: 'auth.py', date: '2026-10-31' },
  { id: 'V-002', title: 'CWE-79: Cross-Site Scripting', severity: 'High', status: 'Fixed', file: 'dashboard.html', date: '2026-10-30' },
  { id: 'V-003', title: 'CWE-522: Insufficiently Protected Credentials', severity: 'Critical', status: 'Open', file: 'settings.py', date: '2026-10-29' },
  { id: 'V-004', title: 'CWE-20: Improper Input Validation', severity: 'Medium', status: 'Open', file: 'upload.py', date: '2026-10-28' },
];

export default function SecurityAnalysis() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Security Posture</h1>
          <p className="text-slate-500">Real-time vulnerability tracking and threat modeling.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2 rounded-lg border border-slate-800 text-sm font-medium hover:bg-slate-800 transition-all">
              Export Report
           </button>
           <button className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium transition-all">
              Trigger Scan
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
               <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
               <p className="text-sm text-rose-500/70 font-medium">Critical Risks</p>
               <p className="text-2xl font-bold text-rose-500">03</p>
            </div>
         </div>
         <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
               <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
               <p className="text-sm text-amber-500/70 font-medium">Security Score</p>
               <p className="text-2xl font-bold text-amber-500">B+</p>
            </div>
         </div>
         <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
               <Lock className="w-6 h-6" />
            </div>
            <div>
               <p className="text-sm text-blue-500/70 font-medium">Hardened Files</p>
               <p className="text-2xl font-bold text-blue-500">82%</p>
            </div>
         </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#0F0F12] border border-slate-800/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="font-bold">Vulnerability Database</h3>
            <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-lg">
               <button className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-slate-800 text-white shadow-sm">All</button>
               <button className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded text-slate-500 hover:text-slate-300 transition-colors">Open</button>
               <button className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded text-slate-500 hover:text-slate-300 transition-colors">Fixed</button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search vulnerabilities..."
                className="bg-slate-900/50 border border-slate-800 rounded-lg py-1.5 pl-9 pr-3 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-rose-500/30 transition-all"
              />
            </div>
            <button className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-100 transition-all">
               <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/50">
                <th className="pb-3 pl-4">ID</th>
                <th className="pb-3">Vulnerability</th>
                <th className="pb-3">Severity</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {vulnerabilities.map((vuln) => (
                <tr key={vuln.id} className="border-b border-slate-800/30 hover:bg-slate-900/40 transition-all group">
                  <td className="py-4 pl-4 font-mono text-xs text-slate-500">{vuln.id}</td>
                  <td className="py-4">
                    <div>
                      <div className="font-medium text-slate-200">{vuln.title}</div>
                      <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-2 font-mono uppercase">
                         <FileWarning className="w-3 h-3" />
                         {vuln.file}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                      vuln.severity === 'Critical' ? 'bg-rose-500/10 text-rose-500' : 
                      vuln.severity === 'High' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                    )}>
                      {vuln.severity}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                       <div className={cn("w-1.5 h-1.5 rounded-full", vuln.status === 'Open' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500')} />
                       <span className="text-xs">{vuln.status}</span>
                    </div>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-100 transition-all">
                       <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
