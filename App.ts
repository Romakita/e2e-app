import {Project} from "./lib/Project";
require('source-map-support').install();

import {app, BrowserWindow, ipcMain, dialog} from "electron";
import {MenuBuilder} from "./lib/MenuBuilder";
import * as baseUrl from "./lib/utils/baseUrl";
import * as std from "./lib/utils/std";
import * as atom from "./lib/utils/atom";
import OpenDialogOptions = Electron.OpenDialogOptions;
import {Scenario} from "./lib/Scenario";


class App {
    static app: App;
    protected win: Electron.BrowserWindow = new BrowserWindow({width: 900, height: 600});
    private Menu: MenuBuilder;
    private project: Project;

    /**
     *
     */
    constructor(){

        this.win.loadURL(`file://${__dirname}/browser/index.html`);
        
        this.win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.win = null;
        });

        std.attach(this.win);

        this.Menu = new MenuBuilder(this.win);

        this.buildMenu();

        ipcMain.on('ready', this.onReady.bind(this));
        ipcMain.on('baseUrl', this.onBaseUrlChange.bind(this));
        ipcMain.on('open', this.openProject.bind(this));
        ipcMain.on('edit', this.edit.bind(this));
        ipcMain.on('run', (evt, index) => (this.runScenario(index)));
    }

    /**
     *
     */
    private onReady(){
        baseUrl.send();
    }

    /**
     *
     * @param evt
     * @param url
     */
    private onBaseUrlChange(evt, url){
        baseUrl.set(url);
    }

    /**
     *
     * @param evt
     */
    private openProject(){

        let options: OpenDialogOptions = {
            title: "Open project",
            properties: ['openDirectory']
        };

        dialog.showOpenDialog(this.win, options, (fileNames: string[]) => {

            if(fileNames && fileNames.length){
                this.loadProject(fileNames[0]);
            }

        });

    }

    /**
     *
     * @param scenario
     */
    public runScenario(scenario: number) {

        if (scenario == -1) {
            this.project.runAll();
        } else {
            this.project.run(scenario);
        }

    }

    /**
     *
     */
    public buildMenu(){

        let scenarios: Scenario[] = [];

        if(this.project && this.project.scenarios && this.project.scenarios.length){
            scenarios = this.project.scenarios;
        }

        this.Menu.build({
            onClickOpen: this.openProject.bind(this),
            onClickRun: this.runScenario.bind(this),
            scenarios: scenarios.map(scenario => scenario.label)
        });
    }

    /**
     *
     * @param directory
     */
    public loadProject(directory: string) {

        if(this.project) {
            if(this.project.directory == directory) {
                return;
            }
        }

        this.project = new Project(directory);

        std.send('scenarios', this.project.scenarios.map(item => (item.label)));
    }

    public edit() {
        atom.open(this.project.directory);
    }

    /**
     *
     * @returns {App|boolean}
     */
    static isInitialized(){
        return App.app && App.app.win === null;
    }

    /**
     *
     * @constructor
     */
    static Initialize(){
        if (App.app === undefined) {
            App.app = new App();
        }
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', App.Initialize);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (!App.isInitialized()) {
        App.Initialize();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

