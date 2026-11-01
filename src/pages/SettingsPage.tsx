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
  GitPullRequest
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

        {/* Integrations */}
        <div className="space-y-3">
           <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 px-2">Integrations</h3>
           <div className="rounded-2xl bg-[#0F0F12] border border-slate-800/50 divide-y divide-slate-800/50">
              <div className="p-6 space-y-4">
                 <div className="flex items-start gap-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 shrink-0">
                       <Github className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                       <h4 className="font-bold text-slate-100">GitHub Connection</h4>
                       <p className="text-sm text-slate-500 max-w-lg">
                          Link your GitHub account to sync repositories and automate pull requests.
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

                 {isGithubLinked && (
                    <div className="pt-4 mt-4 border-t border-slate-800/50 space-y-4 animate-in slide-in-from-top-2 duration-300">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Target Repository</label>
                             <div className="relative">
                                <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                <input 
                                  type="text" 
                                  placeholder="owner/repo-name"
                                  value={repoUrl}
                                  onChange={(e) => {
                                     setGithubRepo(e.target.value);
                                     localStorage.setItem('github-repo', e.target.value);
                                  }}
                                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                                />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sync Mode</label>
                             <select className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50">
                                <option>Automated (PRs)</option>
                                <option>Manual Approval</option>
                             </select>
                          </div>
                       </div>
                       <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <GitPullRequest className="w-5 h-5 text-purple-400" />
                             <div>
                                <p className="text-xs font-bold text-slate-200">Active Syncing</p>
                                <p className="text-[10px] text-slate-500 italic">CodeFix AI will suggest patches via PRs.</p>
                             </div>
                          </div>
                          <button className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-all">
                             View PR History
                          </button>
                       </div>
                    </div>
                 )}
              </div>

              <SettingItem 
                icon={Key} 
                title="External Scanner Keys" 
                description="Optional API keys for additional static analysis tools like SonarQube or Snyk."
              >
                 <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-all">
                    <span>Manage Keys</span>
                    <ChevronRight className="w-4 h-4" />
                 </button>
              </SettingItem>
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
