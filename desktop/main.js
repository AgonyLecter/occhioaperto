// Occhio Aperto — versione desktop (Electron).
// Il gioco viene servito dal protocollo app:// (i moduli ES non funzionano da file://).
const { app, BrowserWindow, protocol, net, ipcMain, Menu, shell } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true } }]);
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

const GAME = path.join(__dirname, 'game');
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280, height: 720, minWidth: 960, minHeight: 540,
    fullscreen: true, backgroundColor: '#000000', show: false, autoHideMenuBar: true,
    title: 'Occhio Aperto', icon: path.join(GAME, 'icon-512.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, sandbox: true, backgroundThrottling: false },
  });
  win.once('ready-to-show', () => win.show());
  win.loadURL('app://game/index.html');
  // F11 schermo intero, Alt+F4 esce (gestito da Windows). Esc resta al gioco (pausa).
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
  });
  // i link esterni si aprono nel browser
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  protocol.handle('app', req => {
    const { pathname } = new URL(req.url);
    const file = path.normalize(path.join(GAME, decodeURIComponent(pathname)));
    if (!file.startsWith(GAME)) return new Response('Not found', { status: 404 });
    return net.fetch(pathToFileURL(file).toString());
  });
  ipcMain.on('occhio:quit', () => app.quit());
  ipcMain.on('occhio:fullscreen', () => win && win.setFullScreen(!win.isFullScreen()));
  createWindow();
});
app.on('window-all-closed', () => app.quit());
