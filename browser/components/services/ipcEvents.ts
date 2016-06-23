import IpcRendererEvent = Electron.IpcRendererEvent;
let electron = require('electron');

let callbacks = {
    onStdout: (data) => {},
    onStdErr: (data) => {},
    onGetScenarios: (scenarios: string[]) => {},
    onGetBaseUrl: (baseUrl: string) => {},
};

electron.ipcRenderer.on("stdout", (event: IpcRendererEvent, data) => (
    callbacks.onStdout(data)
));

electron.ipcRenderer.on("stderr", (event: IpcRendererEvent, data) => (
    callbacks.onStdErr(data)
));

electron.ipcRenderer.on("scenarios", (event: IpcRendererEvent, data) => (
    callbacks.onGetScenarios(data)
));

electron.ipcRenderer.on("baseUrl", (event: IpcRendererEvent, data) => (
    callbacks.onGetBaseUrl(data)
));

export function on(event: string, fn: Function) {
    switch(event) {

        case "stdout":
            callbacks.onStdout = <any>fn;
            break;

        case "stderr":
            callbacks.onStdErr = <any>fn;
            break;

        case "scenarios":
            callbacks.onGetScenarios = <any>fn;
            break;

        case "baseUrl":
            callbacks.onGetBaseUrl = <any>fn;
            break;
    }
}