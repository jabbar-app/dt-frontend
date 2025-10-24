import { useEffect } from 'react';

interface KeyboardShortcutsConfig {
  onPlayPause?: () => void;
  onRestart?: () => void;
  onToggleAnalytics?: () => void;
  onToggleSimulationOnly?: () => void;
  onNavigateLeft?: () => void;
  onNavigateRight?: () => void;
  onNavigateUp?: () => void;
  onNavigateDown?: () => void;
}

export function useKeyboardShortcuts(config: KeyboardShortcutsConfig) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key) {
        case ' ':
          event.preventDefault();
          config.onPlayPause?.();
          break;
        case 'f':
        case 'F':
          event.preventDefault();
          config.onToggleSimulationOnly?.();
          break;
        case 'r':
        case 'R':
          event.preventDefault();
          config.onRestart?.();
          break;
        case 'a':
        case 'A':
          event.preventDefault();
          config.onToggleAnalytics?.();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          config.onNavigateLeft?.();
          break;
        case 'ArrowRight':
          event.preventDefault();
          config.onNavigateRight?.();
          break;
        case 'ArrowUp':
          event.preventDefault();
          config.onNavigateUp?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          config.onNavigateDown?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [config]);
}
