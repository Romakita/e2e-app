import {Menu} from "electron";
import BrowserWindow = Electron.BrowserWindow;
import {Scenario} from "./Scenario";

export interface IMenuBuilderOptions {
    onClickOpen: Function;
    scenarios: string[];
    onClickRun: (index: number) => void;
}

export class MenuBuilder {

    constructor(
        private win: BrowserWindow
    ){

    }

    /**
     *
     */
    public build(options: IMenuBuilderOptions){

        let template = [
            {
                label: 'File',
                submenu: [
                    {
                        label: 'Open project',
                        accelerator: "CmdOrCtrl+O",
                        click: () => {
                            options.onClickOpen();
                        }
                    }
                ]
            },
            {
                label: "Edit",
                submenu: [
                    { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" }
                ]
            }
        ];

        if (options.scenarios.length){

            let runTemplate = {
                label: 'Run',
                submenu: [
                    {
                        label: 'Run all',
                        click: () => {
                            options.onClickRun(-1);
                        }
                    },
                    {
                        type: 'separator'
                    }
                ]
            };

            options.scenarios.forEach((scenario: string, index: number) => {

                let submenu = {
                    label: `run ${scenario}`,
                    click: () => {
                        options.onClickRun(index);
                    }
                };

                runTemplate.submenu.push(<any>submenu);
            });

            template.push(<any>runTemplate);
        }

        template.push(<any>{
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click(item, focusedWindow) {
                        if (focusedWindow) focusedWindow.reload();
                    }
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
                    click(item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                    click(item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.webContents.toggleDevTools();
                    }
                },
            ]
        });


        const menu = Menu.buildFromTemplate(<any>template);
        Menu.setApplicationMenu(menu);
    }
}