import React from 'react';
import { 
  GitPullRequest, 
  CheckCircle2, 
  XCircle, 
  ArrowLeftRight,
  Code2,
  Save,
  Undo2,
  Download
} from 'lucide-react';
import { cn } from '../utils/ui';

const patches = [
  { id: 'P-01', title: 'Parameterized SQL Query', file: 'auth.py', status: 'Applied', date: '2 hours ago' },
  { id: 'P-02', title: 'Add None Check to item.get()', file: 'processor.py', status: 'Draft', date: '1 hour ago' },
  { id: 'P-03', title: 'Zero Division Guard', file: 'math_utils.py', status: 'Applied', date: '30 mins ago' },
];

export default function BugFixer() {
  const [selectedPatch, setSelectedPatch] = React.useState(patches[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Bug-Fixing Engine</h1>
          <p className="text-slate-500">Manage, validate, and apply AI-generated code patches.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-white text-black rounded-lg font-medium transition-all">
              <Download className="w-4 h-4" />
              <span>Export All Patches</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Patch List */}
        <div className="lg:col-span-1 space-y-4">
           <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Pending Patches</h3>
           <div className="space-y-2">
              {patches.map((patch) => (
                <div 
                  key={patch.id}
                  onClick={() => setSelectedPatch(patch)}
                  className={cn(
                    "p-4 rounded-xl border border-slate-800/50 cursor-pointer transition-all group",
                    selectedPatch.id === patch.id ? "bg-purple-500/10 border-purple-500/30" : "bg-[#0F0F12] hover:border-slate-700"
                  )}
                >
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-slate-500">{patch.id}</span>
                      <span className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
                        patch.status === 'Applied' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                      )}>
                        {patch.status}
                      </span>
                   </div>
                   <h4 className="text-sm font-medium mb-1 truncate group-hover:text-slate-100 transition-colors">{patch.title}</h4>
                   <p className="text-[10px] text-slate-500 font-mono">{patch.file}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Diff Workspace */}
        <div className="lg:col-span-3 flex flex-col bg-[#0F0F12] border border-slate-800/50 rounded-2xl overflow-hidden min-h-[600px]">
           <div className="h-14 border-b border-slate-800/50 flex items-center justify-between px-6 bg-[#0F0F12]">
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <ArrowLeftRight className="w-4 h-4 text-purple-400" />
                    <span className="font-bold text-sm">{selectedPatch.title}</span>
                 </div>
                 <div className="w-px h-4 bg-slate-800" />
                 <span className="text-xs text-slate-500">{selectedPatch.file}</span>
              </div>
              <div className="flex items-center gap-2">
                 <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-medium hover:bg-slate-800 transition-all">
                    <Undo2 className="w-3.5 h-3.5" />
                    <span>Revert</span>
                 </button>
                 <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-all">
                    <Save className="w-3.5 h-3.5" />
                    <span>Apply Fix</span>
                 </button>
              </div>
           </div>

           <div className="flex-1 flex font-mono text-sm overflow-hidden">
              {/* Diff View Simulation */}
              <div className="flex-1 border-r border-slate-800/50 flex flex-col">
                 <div className="p-2 px-4 bg-slate-900/50 border-b border-slate-800/50 text-[10px] uppercase font-bold text-slate-500">Original</div>
                 <pre className="p-4 text-slate-400 overflow-auto flex-1 leading-relaxed">
{`3  def get_user(username):
4      conn = sqlite3.connect('users.db')
5      cursor = conn.cursor()
`}
<div className="bg-rose-500/10 text-rose-300 px-4 -mx-4 border-y border-rose-500/10">
6 -    # SQL Injection Vulnerability
7 -    query = "SELECT * FROM users WHERE username = '" + username + "'"
</div>
{`8      cursor.execute(query)
9      return cursor.fetchone()`}
                 </pre>
              </div>
              <div className="flex-1 flex flex-col">
                 <div className="p-2 px-4 bg-slate-900/50 border-b border-slate-800/50 text-[10px] uppercase font-bold text-slate-500">Proposed Fix</div>
                 <pre className="p-4 text-slate-400 overflow-auto flex-1 leading-relaxed">
{`3  def get_user(username):
4      conn = sqlite3.connect('users.db')
5      cursor = conn.cursor()
`}
<div className="bg-emerald-500/10 text-emerald-300 px-4 -mx-4 border-y border-emerald-500/10">
6 +    # Use parameterized query to prevent SQL Injection
7 +    query = "SELECT * FROM users WHERE username = ?"
8 +    cursor.execute(query, (username,))
</div>
{`9      return cursor.fetchone()`}
                 </pre>
              </div>
           </div>

           <div className="p-4 border-t border-slate-800/50 bg-[#0A0A0B]/50">
              <div className="flex items-center gap-4 mb-4">
                 <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Validation Passed</span>
                 </div>
                 <div className="w-px h-3 bg-slate-800" />
                 <p className="text-xs text-slate-500">No regressions detected. Syntax verified for Python 3.10+</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/50 text-xs text-slate-400 font-mono h-24 overflow-auto">
                 {`[TEST] Running security_suite.py...
[TEST] Test case 'sql_injection_bypass' PASSED
[TEST] Test case 'user_retrieval_normal' PASSED
[SUCCESS] 2/2 tests passed in 142ms`}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
