import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';
import { cn } from '../utils/ui';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const colors = {
    success: "border-emerald-500/20 bg-emerald-500/5 text-emerald-200",
    error: "border-rose-500/20 bg-rose-500/5 text-rose-200",
    info: "border-blue-500/20 bg-blue-500/5 text-blue-200",
  };

  return (
    <div className={cn(
      "fixed bottom-8 right-8 z-[200] flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl animate-in slide-in-from-right-10 duration-300",
      colors[type]
    )}>
      {icons[type]}
      <p className="text-sm font-medium pr-6">{message}</p>
      <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 transition-all ml-auto">
        <X className="w-4 h-4 opacity-50" />
      </button>
    </div>
  );
}
