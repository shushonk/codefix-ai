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
  AlertTriangle,
  Share2,
  Check,
  Send,
  Play,
  FileCheck,
  Terminal,
  Zap,
  BookOpen,
  Wand2,
  Bot,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../utils/ui';
import FileExplorer from '../components/FileExplorer';
import { SAMPLE_PROJECTS } from '../data/samples';

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

export default function CodeReview({ 
  currentProjectId, 
  onShowToast 
}: { 
  currentProjectId: string;
  onShowToast?: (message: string, type: 'success' | 'error' | 'info') => void;
}) {
  const project = SAMPLE_PROJECTS.find(p => p.id === currentProjectId) || SAMPLE_PROJECTS[0];
  const [selectedFilePath, setSelectedFilePath] = useState(project.files[0]?.path || '');
  const [selectedFinding, setSelectedFinding] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [sharedId, setSharedId] = useState<string | null>(null);
  const [leftTab, setLeftTab] = useState<'explorer' | 'findings' | 'testing'>('explorer');
  
  // Chat State
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Testing State
  const [testResults, setTestResults] = useState<{ name: string; status: 'pass' | 'fail'; log: string }[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const selectedFile = project.files.find(f => f.path === selectedFilePath) || project.files[0];

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput;
    setChatInput('');
    const newMessages = [...messages, { role: 'user', content: userMessage } as const];
    setMessages(newMessages);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          code: selectedFile.content,
          language: selectedFile.language,
          context: selectedFinding ? `Focusing on finding: ${selectedFinding.title}` : undefined
        }),
      });

      const data = await response.json();
      if (data.content) {
        setMessages([...newMessages, { role: 'assistant', content: data.content }]);
      }
    } catch (error) {
      console.error('Chat failed:', error);
    } finally {
      setIsChatLoading(false);
    }
  };

  const runSimulatedTests = () => {
    setIsRunningTests(true);
    setTestResults([]);
    
    setTimeout(() => {
      const simulated = [
        { name: 'Syntax Integrity', status: 'pass' as const, log: 'Syntactic validation complete.' },
        { name: 'Logical Bounds', status: 'pass' as const, log: 'Boundary conditions verified.' },
        { name: 'Security Baseline', status: selectedFilePath.includes('auth') ? 'fail' as const : 'pass' as const, 
          log: selectedFilePath.includes('auth') ? 'Vulnerability detected in query string.' : 'No basic vulnerabilities found.' }
      ];
      setTestResults(simulated);
      setIsRunningTests(false);
      if (onShowToast) {
        onShowToast(`Tests completed for ${selectedFilePath}`, 'info');
      }
    }, 1500);
  };

  const handleShare = () => {
    setIsSharing(true);
    // Simulate API call to generate workspace snapshot
    setTimeout(() => {
      const id = `snap-${Math.random().toString(36).substring(2, 9)}`;
      setSharedId(id);
      setIsSharing(false);
      
      const shareUrl = `${window.location.origin}/share/${id}`;
      navigator.clipboard.writeText(shareUrl);
      
      if (onShowToast) {
        onShowToast(`Workbench snapshot created: ${id}. Link copied to clipboard.`, 'success');
      }
      
      setTimeout(() => setSharedId(null), 5000);
    }, 1200);
  };

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
      {/* Left Sidebar: File Explorer, Findings & Testing */}
      <div className="w-80 flex flex-col border-r border-slate-800/50 bg-[#0F0F12]">
        <div className="flex border-b border-slate-800/50">
          <button 
            onClick={() => setLeftTab('explorer')}
            className={cn(
              "flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all",
              leftTab === 'explorer' ? "text-purple-400 border-b-2 border-purple-500" : "text-slate-500 hover:text-slate-300"
            )}
          >
            Explorer
          </button>
          <button 
            onClick={() => setLeftTab('findings')}
            className={cn(
              "flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all",
              leftTab === 'findings' ? "text-purple-400 border-b-2 border-purple-500" : "text-slate-500 hover:text-slate-300"
            )}
          >
            Findings
          </button>
          <button 
            onClick={() => setLeftTab('testing')}
            className={cn(
              "flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all",
              leftTab === 'testing' ? "text-purple-400 border-b-2 border-purple-500" : "text-slate-500 hover:text-slate-300"
            )}
          >
            Testing
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {leftTab === 'explorer' && <FileExplorer files={project.files} onSelectFile={setSelectedFilePath} />}
          {leftTab === 'findings' && (
            <div className="divide-y divide-slate-800/50">
              {findings.map(f => (
                <FindingCard 
                  key={f.id} 
                  finding={f} 
                  active={selectedFinding?.id === f.id} 
                  onClick={() => setSelectedFinding(f)} 
                />
              ))}
            </div>
          )}
          {leftTab === 'testing' && (
            <div className="p-4 space-y-6">
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Test Runner</h4>
                     <button 
                       onClick={runSimulatedTests}
                       disabled={isRunningTests}
                       className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-50"
                     >
                        {isRunningTests ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                     </button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50 flex flex-col items-center justify-center text-center py-8">
                     <Terminal className="w-8 h-8 text-slate-700 mb-2" />
                     <p className="text-xs text-slate-500">Run unit tests to validate code integrity.</p>
                  </div>
               </div>

               {testResults.length > 0 && (
                 <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Results</h4>
                    {testResults.map((test, i) => (
                      <div key={i} className="p-3 rounded-lg border border-slate-800/50 bg-slate-900/30 space-y-2">
                         <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-300">{test.name}</span>
                            {test.status === 'pass' ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                            )}
                         </div>
                         <p className="text-[10px] font-mono text-slate-500 leading-relaxed">
                            {`> ${test.log}`}
                         </p>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          )}
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
            <span className="text-xs font-medium text-slate-300">{selectedFilePath}</span>
          </div>
          <div className="flex items-center gap-2">
             <button 
               onClick={handleShare}
               disabled={isSharing}
               className={cn(
                 "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-xs font-medium",
                 sharedId 
                   ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" 
                   : "border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
               )}
             >
                {isSharing ? (
                  <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                ) : sharedId ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Share2 className="w-3.5 h-3.5" />
                )}
                <span>{sharedId ? 'Link Copied' : 'Share Review'}</span>
             </button>
             <div className="w-px h-4 bg-slate-800 mx-1" />
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
                    {Array.from({length: selectedFile?.content.split('\n').length || 10}).map((_, i) => <div key={i}>{i+1}</div>)}
                 </div>
                 <div className="flex-1">
                    <pre className="text-slate-300 whitespace-pre-wrap">
                       {selectedFile?.content}
                    </pre>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Right Sidebar: AI Assistant & Chat */}
      <div className="w-96 border-l border-slate-800/50 bg-[#0F0F12] flex flex-col">
        <div className="p-4 border-b border-slate-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="font-bold">AI Assistant</h3>
          </div>
          {messages.length > 0 && (
            <button 
              onClick={() => setMessages([])}
              className="text-[10px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-widest"
            >
              Clear Chat
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 && !selectedFinding && (
             <div className="p-4 space-y-6">
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                   <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-bold">How can I help?</span>
                   </div>
                   <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      I can help you refactor code, generate documentation, or explain complex logic.
                   </p>
                   <div className="grid grid-cols-1 gap-2">
                      <button 
                        onClick={() => { setChatInput('Refactor this code for better performance'); handleSendMessage(); }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:bg-slate-800 transition-all text-left"
                      >
                         <Wand2 className="w-3.5 h-3.5 text-blue-400" />
                         <span>Refactor for performance</span>
                      </button>
                      <button 
                        onClick={() => { setChatInput('Generate JSDoc/Docstring documentation for this module'); handleSendMessage(); }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:bg-slate-800 transition-all text-left"
                      >
                         <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                         <span>Generate documentation</span>
                      </button>
                      <button 
                        onClick={() => { setChatInput('Explain how this code works in detail'); handleSendMessage(); }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:bg-slate-800 transition-all text-left"
                      >
                         <Zap className="w-3.5 h-3.5 text-amber-400" />
                         <span>Explain logic</span>
                      </button>
                   </div>
                </div>
             </div>
          )}

          {selectedFinding && (
            <div className="p-4 space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                <div className="flex items-center gap-2 mb-3">
                   <AlertTriangle className={cn("w-4 h-4", selectedFinding.severity === 'Critical' ? 'text-rose-500' : 'text-amber-500')} />
                   <span className="font-bold text-sm">{selectedFinding.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {selectedFinding.explanation}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800/50">
                <button className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-white text-black text-sm font-bold transition-all flex items-center justify-center gap-2">
                   <Code2 className="w-4 h-4" />
                   <span>Generate Proposed Fix</span>
                </button>
              </div>
            </div>
          )}

          <div className="p-4 space-y-4">
             {messages.map((msg, i) => (
               <div key={i} className={cn(
                 "flex flex-col gap-2",
                 msg.role === 'user' ? "items-end" : "items-start"
               )}>
                  <div className={cn(
                    "max-w-[90%] p-3 rounded-2xl text-xs leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-purple-600 text-white rounded-tr-none" 
                      : "bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none"
                  )}>
                     {msg.content}
                  </div>
               </div>
             ))}
             {isChatLoading && (
               <div className="flex items-center gap-2 text-slate-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce delay-150" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce delay-300" />
               </div>
             )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-800/50 bg-[#0A0A0B]/50">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="relative"
          >
            <textarea 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
              placeholder="Ask follow-up questions..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all resize-none min-h-[80px]"
            />
            <button 
              type="submit"
              disabled={!chatInput.trim() || isChatLoading}
              className="absolute right-3 bottom-3 p-1.5 rounded-lg bg-purple-600 text-white disabled:opacity-50 transition-all"
            >
               {isChatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
