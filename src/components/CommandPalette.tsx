import React from 'react';
import { Search, Command, SearchCode, ShieldAlert, Bug, History, Settings } from 'lucide-react';
import { cn } from '../utils/ui';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export default function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = React.useState('');

  const items = [
    { id: 'dashboard', label: 'Go to Dashboard', icon: Command },
    { id: 'review', label: 'Start Code Review', icon: SearchCode },
    { id: 'bugfixer', label: 'Open Bug Fixer', icon: Bug },
    { id: 'security', label: 'Security Analysis', icon: ShieldAlert },
    { id: 'history', label: 'Review History', icon: History },
    { id: 'settings', label: 'Workbench Settings', icon: Settings },
  ];

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
      <div className="absolute inset-0 bg-[#0A0A0B]/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="w-full max-w-xl bg-[#0F0F12] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-500" />
          <input 
            autoFocus
            type="text" 
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-600 text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-500 uppercase">Esc</button>
        </div>

        <div className="p-2 max-h-[300px] overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800/50 group transition-all text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-purple-400 transition-colors">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-slate-100">{item.label}</span>
                <span className="ml-auto text-[10px] text-slate-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity">Enter</span>
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-slate-500 text-sm">
              No results found for "{query}"
            </div>
          )}
        </div>

        <div className="p-3 border-t border-slate-800 bg-slate-900/30 flex items-center gap-4">
           <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
              <span className="px-1 py-0.5 rounded bg-slate-800">↑↓</span>
              <span>Navigate</span>
           </div>
           <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
              <span className="px-1 py-0.5 rounded bg-slate-800">Enter</span>
              <span>Select</span>
           </div>
        </div>
      </div>
    </div>
  );
}
