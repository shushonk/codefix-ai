import React from 'react';
import { File, Folder, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { cn } from '../utils/ui';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  path: string;
}

const SAMPLE_TREE: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    path: 'src',
    children: [
      { name: 'auth.py', type: 'file', path: 'src/auth.py' },
      { name: 'utils.py', type: 'file', path: 'src/utils.py' },
    ]
  },
  { name: 'requirements.txt', type: 'file', path: 'requirements.txt' },
  { name: 'README.md', type: 'file', path: 'README.md' },
];

export default function FileExplorer({ onSelectFile }: { onSelectFile: (path: string) => void }) {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({ 'src': true });

  const toggleFolder = (path: string) => {
    setExpanded(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const renderNode = (node: FileNode, level: number = 0) => {
    const isExpanded = expanded[node.path];
    
    if (node.type === 'folder') {
      return (
        <div key={node.path}>
          <button 
            onClick={() => toggleFolder(node.path)}
            className="w-full flex items-center gap-2 px-3 py-1 hover:bg-slate-800/50 rounded-md text-sm text-slate-400 hover:text-slate-200 transition-colors"
            style={{ paddingLeft: `${level * 12 + 12}px` }}
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            <Folder className="w-4 h-4 text-blue-500/70" />
            <span>{node.name}</span>
          </button>
          {isExpanded && node.children?.map(child => renderNode(child, level + 1))}
        </div>
      );
    }

    return (
      <button 
        key={node.path}
        onClick={() => onSelectFile(node.path)}
        className="w-full flex items-center gap-2 px-3 py-1 hover:bg-slate-800/50 rounded-md text-sm text-slate-400 hover:text-slate-200 transition-colors"
        style={{ paddingLeft: `${level * 12 + 28}px` }}
      >
        <File className="w-4 h-4 text-slate-500" />
        <span>{node.name}</span>
      </button>
    );
  };

  return (
    <div className="h-full flex flex-col bg-[#0F0F12]">
      <div className="p-4 border-b border-slate-800/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search files..."
            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-1.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {SAMPLE_TREE.map(node => renderNode(node))}
      </div>
    </div>
  );
}
