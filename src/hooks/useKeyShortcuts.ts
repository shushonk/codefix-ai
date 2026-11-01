import { useEffect } from 'react';

export function useKeyShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? event.metaKey : event.ctrlKey;

      for (const [key, callback] of Object.entries(shortcuts)) {
        const parts = key.toLowerCase().split('+');
        const triggerKey = parts.pop();
        const needsShift = parts.includes('shift');
        const needsCmd = parts.includes('cmd') || parts.includes('ctrl');

        if (
          event.key.toLowerCase() === triggerKey &&
          (needsCmd ? cmdOrCtrl : true) &&
          (needsShift ? event.shiftKey : !event.shiftKey)
        ) {
          event.preventDefault();
          callback();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
