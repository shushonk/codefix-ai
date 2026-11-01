import React, { useState } from 'react';
import { 
  Split, 
  ListFilter, 
  ChevronRight, 
  FileCode, 
  ShieldCheck, 
  Cpu, 
  Sparkles,
  Search,
  Filter,
  MoreVertical,
  Code2,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../utils/ui';
import FileExplorer from '../components/FileExplorer';

// Sub-components
const FindingCard = ({ finding, active, onClick }: any) => {
  const severityColors: any = {
    Critical: 'text-rose-500 bg-rose-500/10',
    High: 'text-amber-500 bg-amber-500/10',
    Medium: 'text-yellow-500 bg-yellow-500/10',
    Low: 'text-blue-500 bg-blue-500/10',
    Informational: 'text-slate-400 bg-slate-400/10'
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 border-b border-slate-800/50 cursor-pointer transition-all hover:bg-slate-800/30",
        active ? "bg-slate-800/50 border-l-2 border-l-purple-500" : ""
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", severityColors[finding.severity])}>
          {finding.severity}
        </span>
        <span className="text-[10px] text-slate-500 font-mono">L{finding.lineStart}</span>
      </div>
      <h4 className="text-sm font-semibold mb-1 truncate">{finding.title}</h4>
      <p className="text-xs text-slate-500 line-clamp-2">{finding.explanation}</p>
    </div>
  );
};

export default function CodeReview() {
  const [selectedFile, setSelectedFile] = useState('src/auth.py');
  const [selectedFinding, setSelectedFinding] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const findings = [
    {
      id: '1',
      title: 'SQL Injection Vulnerability',
      severity: 'Critical',
      category: 'Security',
      lineStart: 7,
      lineEnd: 9,
      explanation: 'User input from the "username" parameter is concatenated directly into a SQL query string. This allows an attacker to manipulate the query structure.',
      recommendation: 'Use parameterized queries or an ORM to handle database interactions safely.'
    },
    {
      id: '2',
      title: 'Potential Unhandled None Type',
      severity: 'Medium',
      category: 'Bugs',
      lineStart: 15,
      lineEnd: 15,
      explanation: 'The code attempts to call .get() on "item" without verifying if "item" is not None.',
      recommendation: 'Add a null check before accessing properties of "item".'
    }
  ];

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-10rem)] -m-8 flex overflow-hidden">
      {/* Left Sidebar: File Explorer & Findings */}
      <div className="w-80 flex flex-col border-r border-slate-800/50 bg-[#0F0F12]">
        <div className="flex border-b border-slate-800/50">
          <button className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-slate-100 border-b-2 border-purple-500">Explorer</button>
          <button className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300">Findings</button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <FileExplorer onSelectFile={setSelectedFile} />
        </div>

        <div className="p-4 border-t border-slate-800/50">
          <button 
            onClick={startAnalysis}
            disabled={isAnalyzing}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all disabled:opacity-50"
          >
            {isAnalyzing ? (
              <Cpu className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isAnalyzing ? 'Analyzing...' : 'Run Code Review'}</span>
          </button>
        </div>
      </div>

      {/* Main Panel: Editor */}
      <div className="flex-1 flex flex-col bg-[#0A0A0B]">
        <div className="h-12 border-b border-slate-800/50 flex items-center justify-between px-4 bg-[#0F0F12]/50">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium text-slate-300">{selectedFile}</span>
          </div>
          <div className="flex items-center gap-2">
             <button className="p-1.5 rounded hover:bg-slate-800 transition-all">
                <Split className="w-3.5 h-3.5 text-slate-400" />
             </button>
             <button className="p-1.5 rounded hover:bg-slate-800 transition-all">
                <MoreVertical className="w-3.5 h-3.5 text-slate-400" />
             </button>
          </div>
        </div>
        
        <div className="flex-1 relative overflow-hidden bg-[#0A0A0B]">
           {/* Mock Editor */}
           <div className="absolute inset-0 p-6 font-mono text-sm overflow-auto">
              <div className="flex gap-4">
                 <div className="text-slate-700 text-right select-none w-8">
                    {Array.from({length: 20}).map((_, i) => <div key={i}>{i+1}</div>)}
                 </div>
                 <div className="flex-1">
                    <pre className="text-slate-300">
{`import sqlite3

def get_user(username):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
`}
<div className="bg-rose-500/10 border-y border-rose-500/20 my-0.5 relative group cursor-pointer" onClick={() => setSelectedFinding(findings[0])}>
   <span className="text-rose-400">    # SQL Injection Vulnerability</span>
   <br />
   <span className="text-rose-400">    query = "SELECT * FROM users WHERE username = '" + username + "'"</span>
   <div className="absolute -left-1 top-0 h-full w-1 bg-rose-500" />
   <div className="hidden group-hover:block absolute left-full ml-4 top-0 z-50 bg-[#0F0F12] border border-rose-500/50 p-2 rounded shadow-xl text-xs w-48 text-rose-400">
      Critical: SQL Injection vulnerability detected here. Click to view fix.
   </div>
</div>
{`    cursor.execute(query)
    return cursor.fetchone()

def process_data(data):
    # Potential Null Pointer/None error
    results = []
    for item in data:
`}
<div className="bg-amber-500/10 border-y border-amber-500/20 my-0.5 relative group cursor-pointer" onClick={() => setSelectedFinding(findings[1])}>
   <span className="text-amber-400">        if item.get('id') &gt; 0:</span>
   <div className="absolute -left-1 top-0 h-full w-1 bg-amber-500" />
</div>
{`            results.append(item)
    return results`}
                    </pre>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Right Sidebar: AI Assistant */}
      <div className="w-96 border-l border-slate-800/50 bg-[#0F0F12] flex flex-col">
        <div className="p-4 border-b border-slate-800/50 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h3 className="font-bold">AI Assistant</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {selectedFinding ? (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                <div className="flex items-center gap-2 mb-3">
                   <AlertTriangle className={cn("w-4 h-4", selectedFinding.severity === 'Critical' ? 'text-rose-500' : 'text-amber-500')} />
                   <span className="font-bold text-sm">{selectedFinding.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {selectedFinding.explanation}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Recommendation</h4>
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs text-purple-200 leading-relaxed italic">
                  "{selectedFinding.recommendation}"
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800/50">
                <button className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-white text-black text-sm font-bold transition-all flex items-center justify-center gap-2">
                   <Code2 className="w-4 h-4" />
                   <span>Generate Proposed Fix</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                   <button className="py-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-xs font-medium transition-all text-slate-400 hover:text-slate-100">
                      Explain Code
                   </button>
                   <button className="py-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-xs font-medium transition-all text-slate-400 hover:text-slate-100">
                      Generate Tests
                   </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50 py-20">
               <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-slate-700" />
               </div>
               <p className="text-sm">Select a finding or line of code to see AI insights.</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-800/50 bg-[#0A0A0B]/50">
          <div className="relative">
            <textarea 
              placeholder="Ask CodeFix AI anything..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all resize-none min-h-[80px]"
            />
            <button className="absolute right-3 bottom-3 p-1.5 rounded-lg bg-purple-600 text-white">
               <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
