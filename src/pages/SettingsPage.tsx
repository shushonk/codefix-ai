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
  ChevronRight
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
              <SettingItem 
                icon={Github} 
                title="GitHub Repository" 
                description="Connect your repositories to enable automated pull-request reviews."
              >
                 <button className="flex items-center gap-2 px-4 py-2 bg-[#24292F] hover:bg-[#1B1F23] text-white rounded-lg text-sm font-medium transition-all">
                    <Github className="w-4 h-4" />
                    <span>Connect</span>
                 </button>
              </SettingItem>
              <SettingItem 
                icon={Key} 
                title="External Scanner Keys" 
                description="Optional API keys for additional static analysis tools."
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
