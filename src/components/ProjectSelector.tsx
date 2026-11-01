import React from 'react';
import { Box, ChevronDown, Check, Plus } from 'lucide-react';
import { cn } from '../utils/ui';

interface ProjectSelectorProps {
  currentProject: string;
  onSelect: (id: string) => void;
}

const projects = [
  { id: '1', name: 'API Gateway', language: 'Go' },
  { id: '2', name: 'Auth Module', language: 'Python' },
  { id: '3', name: 'UI Dashboard', language: 'TypeScript' },
];

export default function ProjectSelector({ currentProject, onSelect }: ProjectSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selected = projects.find(p => p.id === currentProject) || projects[0];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all group"
      >
        <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center text-purple-400">
           <Box className="w-3 h-3" />
        </div>
        <span className="text-sm font-semibold text-slate-200">{selected.name}</span>
        <ChevronDown className={cn("w-3.5 h-3.5 text-slate-500 transition-transform", isOpen ? "rotate-180" : "")} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-64 bg-[#0F0F12] border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-2 space-y-1">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelect(p.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all text-left",
                    currentProject === p.id ? "bg-purple-500/10 text-purple-400" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-[10px] opacity-50 uppercase tracking-widest">{p.language}</span>
                  </div>
                  {currentProject === p.id && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
            <div className="p-2 border-t border-slate-800 bg-slate-900/30">
               <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create New Project</span>
               </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
