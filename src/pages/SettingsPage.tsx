import React from 'react';
import { 
  User, 
  Settings as SettingsIcon, 
  Cpu, 
  Shield, 
  Bell, 
  Code,
  Github,
  Key,
  Moon,
  Trash2,
  ChevronRight,
  Palette,
  Layout,
  GitBranch,
  RefreshCw,
  GitPullRequest,
  ListTodo,
  Rocket,
  Webhook,
  Activity,
  Terminal,
  FileCheck
} from 'lucide-react';
import { cn } from '../utils/ui';

const SettingItem = ({ icon: Icon, title, description, children }: any) => (
  <div className="flex items-start gap-6 p-6">
    <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 shrink-0">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1 space-y-1">
      <h4 className="font-bold text-slate-100">{title}</h4>
      <p className="text-sm text-slate-500 max-w-lg">{description}</p>
    </div>
    <div className="shrink-0">
      {children}
    </div>
  </div>
);

export default function SettingsPage() {
  const [editorTheme, setEditorTheme] = React.useState(() => localStorage.getItem('editor-theme') || 'one-dark');
  const [isGithubLinked, setIsGithubLinked] = React.useState(() => localStorage.getItem('github-linked') === 'true');
  const [repoUrl, setGithubRepo] = React.useState(() => localStorage.getItem('github-repo') || '');
  const [isConnecting, setIsConnecting] = React.useState(false);

  const handleThemeChange = (theme: string) => {
    setEditorTheme(theme);
    localStorage.setItem('editor-theme', theme);
  };

  const handleGithubConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsGithubLinked(true);
      localStorage.setItem('github-linked', 'true');
      setIsConnecting(false);
    }, 1500);
  };

  const handleGithubDisconnect = () => {
    setIsGithubLinked(false);
    localStorage.setItem('github-linked', 'false');
    setGithubRepo('');
    localStorage.removeItem('github-repo');
  };

  // Linting State
  interface LintingCategories {
    Bugs: boolean;
    Security: boolean;
    Performance: boolean;
    CodeQuality: boolean;
  }

  const [lintingCategories, setLintingCategories] = React.useState<LintingCategories>(() => {
    const saved = localStorage.getItem('linting-categories');
    return saved ? JSON.parse(saved) : {
      Bugs: true,
      Security: true,
      Performance: true,
      CodeQuality: true,
    };
  });

  const [customRules, setCustomRules] = React.useState<{id: string, name: string, pattern: string}[]>(() => {
    const saved = localStorage.getItem('custom-rules');
    return saved ? JSON.parse(saved) : [];
  });

  const [newRuleName, setNewRuleName] = React.useState('');
  const [newRulePattern, setNewRulePattern] = React.useState('');

  // CI/CD State
  const [ciProvider, setCiProvider] = React.useState(() => localStorage.getItem('ci-provider') || 'github-actions');
  const [isCiEnabled, setIsCiCiEnabled] = React.useState(() => localStorage.getItem('ci-enabled') === 'true');

  const toggleCategory = (cat: string) => {
    const updated = { ...lintingCategories, [cat]: !lintingCategories[cat as keyof typeof lintingCategories] };
    setLintingCategories(updated);
    localStorage.setItem('linting-categories', JSON.stringify(updated));
  };

  const addCustomRule = () => {
    if (newRuleName && newRulePattern) {
      const updated = [...customRules, { id: Math.random().toString(36).substr(2, 9), name: newRuleName, pattern: newRulePattern }];
      setCustomRules(updated);
      localStorage.setItem('custom-rules', JSON.stringify(updated));
      setNewRuleName('');
      setNewRulePattern('');
    }
  };

  const removeCustomRule = (id: string) => {
    const updated = customRules.filter(r => r.id !== id);
    setCustomRules(updated);
    localStorage.setItem('custom-rules', JSON.stringify(updated));
  };

  const toggleCI = () => {
    const next = !isCiEnabled;
    setIsCiCiEnabled(next);
    localStorage.setItem('ci-enabled', String(next));
  };

  const handleCiProviderChange = (provider: string) => {
    setCiProvider(provider);
    localStorage.setItem('ci-provider', provider);
  };
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Workbench Settings</h1>
        <p className="text-slate-500">Configure AI models, analysis thresholds, and security integrations.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="rounded-2xl bg-[#0F0F12] border border-slate-800/50 divide-y divide-slate-800/50">
           <div className="p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                 <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                 <h3 className="text-xl font-bold">Senior Engineer</h3>
                 <p className="text-sm text-slate-500">vs9991490@gmail.com</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-slate-800 text-sm font-medium hover:bg-slate-800 transition-all">
                 Edit Profile
              </button>
           </div>
        </div>

        {/* Appearance */}
        <div className="space-y-3">
           <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 px-2">Appearance</h3>
           <div className="rounded-2xl bg-[#0F0F12] border border-slate-800/50 divide-y divide-slate-800/50">
              <SettingItem 
                icon={Palette} 
                title="Syntax Highlighting" 
                description="Choose your preferred color scheme for the code editor."
              >
                 <select 
                   value={editorTheme}
                   onChange={(e) => handleThemeChange(e.target.value)}
                   className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                 >
                    <option value="one-dark">One Dark</option>
                    <option value="github-light">Github Light</option>
                    <option value="monokai">Monokai</option>
                    <option value="dracula">Dracula</option>
                 </select>
              </SettingItem>
           </div>
        </div>

        {/* AI & Analysis */}
        <div className="space-y-3">
           <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 px-2">AI & Analysis</h3>
           <div className="rounded-2xl bg-[#0F0F12] border border-slate-800/50 divide-y divide-slate-800/50">
              <SettingItem 
                icon={Cpu} 
                title="AI Analysis Model" 
                description="Select the engine used for code review and patch generation."
              >
                 <select className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50">
                    <option>Gemini 3.8 Flash (Latest)</option>
                    <option>Gemini 4 Argon (Experimental)</option>
                 </select>
              </SettingItem>
              <SettingItem 
                icon={Code} 
                title="Default Language" 
                description="Preferred programming language for new workbench sessions."
              >
                 <select className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50">
                    <option>Python</option>
                    <option>TypeScript</option>
                    <option>Java</option>
                    <option>Go</option>
                 </select>
              </SettingItem>
           </div>
        </div>

        {/* Linting Rules */}
        <div className="space-y-3">
           <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 px-2">Linting Rules</h3>
           <div className="rounded-2xl bg-[#0F0F12] border border-slate-800/50 divide-y divide-slate-800/50">
              <div className="p-6">
                 <h4 className="font-bold text-slate-100 mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    Analysis Categories
                 </h4>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(lintingCategories).map(([cat, enabled]) => (
                       <div key={cat} className="space-y-2">
                          <button
                            onClick={() => toggleCategory(cat)}
                            className={cn(
                              "w-full flex flex-col items-center gap-2 p-4 rounded-xl border transition-all text-center",
                              enabled ? "bg-purple-500/10 border-purple-500/30 text-purple-400" : "bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700"
                            )}
                          >
                             <FileCheck className={cn("w-6 h-6", enabled ? "text-purple-400" : "text-slate-600")} />
                             <span className="text-[10px] font-bold uppercase tracking-widest">{cat}</span>
                          </button>
                          {cat === 'Security' && enabled && (
                             <div className="flex flex-col gap-1 px-1">
                                <label className="flex items-center gap-2 text-[9px] text-slate-500 cursor-pointer hover:text-slate-300">
                                   <input type="checkbox" defaultChecked className="rounded border-slate-800 bg-slate-900 text-purple-500 focus:ring-0 w-2.5 h-2.5" />
                                   <span>Injection (SQL/OS)</span>
                                </label>
                                <label className="flex items-center gap-2 text-[9px] text-slate-500 cursor-pointer hover:text-slate-300">
                                   <input type="checkbox" defaultChecked className="rounded border-slate-800 bg-slate-900 text-purple-500 focus:ring-0 w-2.5 h-2.5" />
                                   <span>Broken Auth</span>
                                </label>
                                <label className="flex items-center gap-2 text-[9px] text-slate-500 cursor-pointer hover:text-slate-300">
                                   <input type="checkbox" defaultChecked className="rounded border-slate-800 bg-slate-900 text-purple-500 focus:ring-0 w-2.5 h-2.5" />
                                   <span>Data Exposure</span>
                                </label>
                             </div>
                          )}
                       </div>
                    ))}
                 </div>
              </div>

              <div className="p-6 space-y-6">
                 <div>
                    <h4 className="font-bold text-slate-100 mb-2 flex items-center gap-2">
                       <ListTodo className="w-4 h-4 text-blue-400" />
                       Custom Regex Rules
                    </h4>
                    <p className="text-sm text-slate-500 mb-4">Define patterns to detect specific code anti-patterns or business-logic violations.</p>
                 </div>
                 
                 <div className="space-y-3">
                    {customRules.map(rule => (
                       <div key={rule.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                          <div className="flex-1">
                             <p className="text-xs font-bold text-slate-200">{rule.name}</p>
                             <code className="text-[10px] text-slate-500 font-mono">{rule.pattern}</code>
                          </div>
                          <button 
                            onClick={() => removeCustomRule(rule.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-600 hover:text-rose-500 transition-all"
                          >
                             <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                    ))}
                 </div>

                 <div className="flex gap-3">
                    <div className="flex-1 space-y-2">
                       <input 
                         type="text" 
                         placeholder="Rule Name (e.g. No Hardcoded IPs)"
                         value={newRuleName}
                         onChange={(e) => setNewRuleName(e.target.value)}
                         className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                       />
                       <input 
                         type="text" 
                         placeholder="Regex Pattern (e.g. \b\d{1,3}\.\d{1,3}\b)"
                         value={newRulePattern}
                         onChange={(e) => setNewRulePattern(e.target.value)}
                         className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                       />
                    </div>
                    <button 
                      onClick={addCustomRule}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-all h-fit self-end"
                    >
                       Add Rule
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Integrations Panel */}
        <div className="space-y-3">
           <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 px-2">Integrations Panel</h3>
           <div className="rounded-2xl bg-[#0F0F12] border border-slate-800/50 divide-y divide-slate-800/50">
              {/* GitHub Connection */}
              <div className="p-6 space-y-4">
                 <div className="flex items-start gap-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 shrink-0">
                       <Github className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                       <h4 className="font-bold text-slate-100">GitHub Core</h4>
                       <p className="text-sm text-slate-500 max-w-lg">
                          Connect your GitHub identity to enable source fetching and PR creation.
                       </p>
                    </div>
                    <div className="shrink-0">
                       {isGithubLinked ? (
                          <button 
                            onClick={handleGithubDisconnect}
                            className="px-4 py-2 rounded-lg border border-rose-500/20 text-rose-500 text-sm font-medium hover:bg-rose-500/5 transition-all"
                          >
                             Disconnect
                          </button>
                       ) : (
                          <button 
                            onClick={handleGithubConnect}
                            disabled={isConnecting}
                            className="flex items-center gap-2 px-4 py-2 bg-[#24292F] hover:bg-[#1B1F23] text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                          >
                             {isConnecting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                             <span>{isConnecting ? 'Authorizing...' : 'Connect GitHub'}</span>
                          </button>
                       )}
                    </div>
                 </div>
              </div>

              {/* CI/CD Pipelines */}
              <div className="p-6 space-y-4">
                 <div className="flex items-start gap-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 shrink-0">
                       <Rocket className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                       <h4 className="font-bold text-slate-100">CI/CD Pipeline Automation</h4>
                       <p className="text-sm text-slate-500 max-w-lg">
                          Automatically trigger reviews on new commits using external pipelines.
                       </p>
                    </div>
                    <div className="shrink-0">
                       <button 
                         onClick={toggleCI}
                         className={cn(
                           "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                           isCiEnabled ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "border-slate-800 text-slate-400 hover:bg-slate-800"
                         )}
                       >
                          {isCiEnabled ? 'Active' : 'Enable Pipeline'}
                       </button>
                    </div>
                 </div>

                 {isCiEnabled && (
                    <div className="pt-4 mt-4 border-t border-slate-800/50 space-y-6 animate-in slide-in-from-top-2 duration-300">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">CI Provider</label>
                             <select 
                               value={ciProvider}
                               onChange={(e) => handleCiProviderChange(e.target.value)}
                               className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                             >
                                <option value="github-actions">GitHub Actions</option>
                                <option value="gitlab-ci">GitLab CI</option>
                                <option value="circle-ci">CircleCI</option>
                             </select>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live Status</label>
                             <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-slate-900/50 border border-slate-800 border-dashed">
                                <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                                <span className="text-xs text-slate-400">Listening for commits...</span>
                             </div>
                          </div>
                       </div>
                       
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Trigger Webhook URL</label>
                          <div className="flex gap-2">
                             <input 
                               type="text" 
                               readOnly
                               value={`https://api.codefix.ai/hooks/${ciProvider}/v1/trigger`}
                               className="flex-1 bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-[10px] font-mono text-slate-500 focus:outline-none"
                             />
                             <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-all">
                                Copy URL
                             </button>
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Recent Automation Events</label>
                          <div className="rounded-lg bg-[#0A0A0B] border border-slate-800 overflow-hidden">
                             <div className="p-2 px-3 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                                <span className="text-[9px] font-bold uppercase text-slate-500">Event History</span>
                                <span className="text-[9px] text-emerald-500 font-mono italic">Real-time</span>
                             </div>
                             <div className="p-3 font-mono text-[10px] space-y-1 max-h-32 overflow-auto text-slate-500">
                                <p className="text-slate-400 flex justify-between">
                                   <span>[PUSH] main: 8a2f1b3 by vs999</span>
                                   <span className="text-slate-600">2m ago</span>
                                </p>
                                <p className="flex justify-between">
                                   <span>[PR] #142 opened by bot:codefix</span>
                                   <span className="text-slate-600">1h ago</span>
                                </p>
                                <p className="flex justify-between">
                                   <span>[HOOK] health-check successful</span>
                                   <span className="text-slate-600">2h ago</span>
                                </p>
                             </div>
                          </div>
                       </div>

                       <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3">
                          <Webhook className="w-4 h-4 text-blue-400 mt-0.5" />
                          <div>
                             <p className="text-xs font-bold text-slate-200">Continuous Review Policy</p>
                             <p className="text-[10px] text-slate-500 mt-1">
                                Automated reviews will post feedback to {ciProvider === 'gitlab-ci' ? 'GitLab MRs' : 'GitHub PRs'} on every commit.
                             </p>
                          </div>
                       </div>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-3 pt-6">
           <h3 className="text-xs font-bold uppercase tracking-widest text-rose-500/70 px-2">Danger Zone</h3>
           <div className="rounded-2xl bg-rose-500/5 border border-rose-500/10 divide-y divide-rose-500/10">
              <SettingItem 
                icon={Trash2} 
                title="Purge Review History" 
                description="Permanently delete all stored code reviews and patch logs. This action cannot be undone."
              >
                 <button className="px-4 py-2 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 border border-rose-500/20 text-sm font-bold transition-all">
                    Purge All
                 </button>
              </SettingItem>
           </div>
        </div>
      </div>
    </div>
  );
}
