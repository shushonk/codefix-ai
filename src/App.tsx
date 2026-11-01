import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  SearchCode, 
  Bug, 
  ShieldAlert, 
  History, 
  Settings, 
  Plus, 
  Command,
  ChevronRight,
  Menu,
  X,
  User,
  Bell
} from 'lucide-react';
import { cn } from './utils/ui';

import Dashboard from './pages/Dashboard';
import CodeReview from './pages/CodeReview';
import BugFixer from './pages/BugFixer';
import SecurityAnalysis from './pages/SecurityAnalysis';
import ReviewHistory from './pages/ReviewHistory';
import SettingsPage from './pages/SettingsPage';
import CommandPalette from './components/CommandPalette';
import ProjectSelector from './components/ProjectSelector';
import { useKeyShortcuts } from './hooks/useKeyShortcuts';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState('1');

  useKeyShortcuts({
    'cmd+k': () => setIsPaletteOpen(true),
    'cmd+shift+r': () => setActiveTab('review'),
  });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'review', label: 'Code Review', icon: SearchCode },
    { id: 'bugfixer', label: 'Bug Fixer', icon: Bug },
    { id: 'security', label: 'Security Analysis', icon: ShieldAlert },
    { id: 'history', label: 'Review History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 font-sans selection:bg-purple-500/30">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full bg-[#0F0F12] border-r border-slate-800/50 transition-all duration-300 z-50",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-800/50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shrink-0">
            <SearchCode className="w-5 h-5 text-white" />
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              CodeFix AI
            </span>
          )}
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                  isActive 
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" 
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-purple-400" : "group-hover:text-slate-100")} />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                {isActive && isSidebarOpen && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg border border-slate-800/50 hover:bg-slate-800/50 text-slate-500 hover:text-slate-100 transition-all"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={cn(
          "transition-all duration-300 min-h-screen",
          isSidebarOpen ? "pl-64" : "pl-20"
        )}
      >
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 bg-[#0A0A0B]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <ProjectSelector currentProject={currentProject} onSelect={setCurrentProject} />
            <div className="w-px h-6 bg-slate-800/50" />
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span>Workbench</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-100">{navItems.find(i => i.id === activeTab)?.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800/50 bg-slate-900/50 text-slate-400 text-sm hover:text-slate-100 transition-all"
            >
              <Command className="w-4 h-4" />
              <span>Search...</span>
              <span className="ml-2 px-1 rounded bg-slate-800 text-[10px] font-mono">⌘K</span>
            </button>
            <div className="w-px h-6 bg-slate-800/50" />
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-all relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 border-2 border-[#0A0A0B]" />
            </button>
            <button className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-800/50 bg-slate-900/50 hover:bg-slate-800/50 transition-all">
              <div className="w-7 h-7 rounded bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-200">Engineer</span>
            </button>
          </div>
        </header>

        {/* Viewport */}
        <div className="p-8 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'review' && <CodeReview />}
          {activeTab === 'bugfixer' && <BugFixer />}
          {activeTab === 'security' && <SecurityAnalysis />}
          {activeTab === 'history' && <ReviewHistory />}
          {activeTab === 'settings' && <SettingsPage />}
        </div>
      </main>

      <CommandPalette 
        isOpen={isPaletteOpen} 
        onClose={() => setIsPaletteOpen(false)} 
        onNavigate={setActiveTab} 
      />
    </div>
  );
}
