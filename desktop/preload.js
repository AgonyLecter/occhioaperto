const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('occhioDesktop', {
  quit: () => ipcRenderer.send('occhio:quit'),
  toggleFullscreen: () => ipcRenderer.send('occhio:fullscreen'),
});
