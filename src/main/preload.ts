import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels =
  | 'ipc-example'
  | 'notification'
  | 'clipboard'
  | 'pending-clipboard';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    showNotification(channel: Channels, title: string, body: string) {
      ipcRenderer.send(channel, { title, body });
    },
    addNewClipboard(channel: Channels, text: string) {
      ipcRenderer.send(channel, text);
    },
    getPendingClipboard(channel: Channels) {
      ipcRenderer.send(channel);
    },
  },
});
