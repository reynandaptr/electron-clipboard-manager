import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
        showNotification(channel: Channels, title: string, body: string): void;
        addNewClipboard(channel: Channels, text: string): void;
        getPendingClipboard(channel: Channels): void;
      };
    };
  }
}

export {};
