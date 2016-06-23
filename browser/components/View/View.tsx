///<reference path="View.d.ts"/>

import * as React from 'react';
import ProtractorConsole from './../ProtractorConsole/ProtractorConsole';
import Toolbar from './../Toolbar/Toolbar';
import * as ipcEvents from "../services/ipcEvents";

export default class View extends React.Component<any, {}> {
    public state : IViewState =  {
        console:{
            stdout: undefined,
            stderr: undefined
        },
        toolbar: {
            baseUrl: "",
            scenarios: []
        }
    };

    private style ={
        console: {
            position: "absolute",
            top: '56px',
            left: '0px',
            bottom: '0px',
            right: '0px'

        }
    };

    constructor(props: any){
        super(props);

        ipcEvents.on('stdout', (data) => {
            this.onData(data);
        });

        ipcEvents.on('stderr', (data) => {
            this.onError(data);
        });

        ipcEvents.on('scenarios', (data) => {
            this.onGetScenarios(data);
        });

        ipcEvents.on('baseUrl', (data) => {
            this.onGetBaseUrl(data);
        });

        require('electron').ipcRenderer.send("ready");
    }

    /**
     *
     * @param data
     */
    private onData(data: any){
        console.log('Data', data);

        this.setState({console:{stdout: data, stderr: undefined}});
    }

    /**
     *
     * @param data
     */
    private onError(data: any){
        this.setState({console:{stderr: data, stdout: undefined}});
    }

    /**
     *
     * @param url
     */
    private onGetBaseUrl(url: string){
        this.setState({
            toolbar:{
                baseUrl: url
            },
            console: {
                stderr: undefined,
                stdout: undefined
            }
        });
    }

    /**
     *
     * @param scenarios
     */
    private onGetScenarios(scenarios: string[]){

        console.log('Scenarios', scenarios);

        this.setState({
            toolbar:{
                scenarios: scenarios
            },
            console: {
                stderr: undefined,
                stdout: undefined
            }
        });
    }

    /**
     *
     * @param state
     * @param callback
     */
    public setState(state:{}, callback?:()=>any): void {
        super.setState(Object.assign(this.state, state), callback);
    }

    /**
     *
     */
    onTouchTapOpenFolder = () => {
        let electron = require('electron');

        electron.ipcRenderer.send("open");
    };

    /**
     *
     * @param scenario
     */
    onTouchTapRun = (scenario: number) => {
        let electron = require('electron');

        electron.ipcRenderer.send("run", scenario);
    };

    /**
     *
     * @param baseUrl
     */
    onBaseUrlChange = (baseUrl: string) => {
        let electron = require('electron');

        console.log('BaseUrl', baseUrl);

        electron.ipcRenderer.send("baseUrl", baseUrl);
    };

    onTouchTapClear = () => {
        this.setState({console:{stdout: "clear"}});
    };

    onTouchTapEdit = () => {
        require('electron').ipcRenderer.send('edit');
    };


    /**
     *
     * @returns {any}
     */
    public render(){

        let stdout = this.state.console.stdout;
        let stderr = this.state.console.stderr;

        return (
            <div>
                <Toolbar
                    baseUrl={this.state.toolbar.baseUrl}
                    onTouchTapOpenFolder={this.onTouchTapOpenFolder}
                    onTouchTapRun={this.onTouchTapRun}
                    onTouchTapEdit={this.onTouchTapEdit}
                    onTouchTapClear={this.onTouchTapClear}
                    onBaseUrlChange={this.onBaseUrlChange}
                    scenarios={this.state.toolbar.scenarios}
                />
                <div style={this.style.console} >
                    <ProtractorConsole stdout={stdout} stderr={stderr} />
                </div>
            </div>
        );
    }
}