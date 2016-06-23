
let win: Electron.BrowserWindow;

export function attach(_win_: Electron.BrowserWindow) {
    win = _win_;
}

export function log(message: any) {
    console.log('[DEBUG ]', message);
    win.webContents.send("stdout", message);
}

export function error(message: any) {
    console.error('[ERROR]', message);
    win.webContents.send("stderr", message);
}

export function send(event: string, data: any) {
    console.log('[SEND] Event("'+event+'") =>', data);
    win.webContents.send(event, data);
}