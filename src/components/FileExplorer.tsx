import React from 'react';
import { File, Folder, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { cn } from '../utils/ui';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  path: string;
}

interface FileExplorerProps {
  files: { path: string }[];
  onSelectFile: (path: string) => void;
}

export default function FileExplorer({ files, onSelectFile }: FileExplorerProps) {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = React.useState('');

  const buildTree = (paths: string[]) => {
    const root: FileNode[] = [];
    paths.forEach(path => {
      const parts = path.split('/');
      let currentLevel = root;
      let currentPath = '';

      parts.forEach((part, index) => {
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        const isFile = index === parts.length - 1;
        let node = currentLevel.find(n => n.name === part);

        if (!node) {
          node = {
            name: part,
            type: isFile ? 'file' : 'folder',
            path: currentPath,
            children: isFile ? undefined : []
          };
          currentLevel.push(node);
        }
        if (!isFile) {
          currentLevel = node.children!;
        }
      });
    });
    return root;
  };

  const tree = React.useMemo(() => buildTree(files.map(f => f.path)), [files]);

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {tree.map(node => renderNode(node))}
      </div>
    </div>
  );
}
