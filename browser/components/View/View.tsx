///<reference path="View.d.ts"/>

import * as React from 'react';
import ConsoleView from './../ConsoleView/ConsoleView';
import Toolbar from './../Toolbar/Toolbar';
import * as ipcEvents from "../services/ipcEvents";

export default class View extends React.Component<any, {}> {
    public state : IViewState =  {
        stdout: undefined,
        stderr: undefined,
        baseUrl: '',
        scenarios: [],
        currentScenario: -1
    };
    /**
     *
     * @type {{console: {position: string, top: string, left: string, bottom: string, right: string}}}
     */
    private style = {
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
    }

    /**
     *
     * @param data
     */
    private onData(data: any){
        console.log('Data', data);

        this.setState({stdout: data, stderr: undefined});
    }

    /**
     *
     * @param data
     */
    private onError(data: any){
        this.setState({stderr: data, stdout: undefined});
    }

    /**
     *
     * @param url
     */
    private onGetBaseUrl(url: string){
        this.setState({
            baseUrl: url,
            stderr: undefined,
            stdout: undefined
        });
    }

    /**
     *
     * @param scenarios
     */
    private onGetScenarios(scenarios: string[]){

        console.log('Scenarios', scenarios);

        this.setState({
            scenarios: scenarios,
            stderr: undefined,
            stdout: undefined
        });
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
    onTouchTapRun = () => {
        let electron = require('electron');

        electron.ipcRenderer.send("run", this.state.currentScenario);
    };

    /**
     *
     * @param baseUrl
     */
    onBaseUrlChange = (baseUrl: string) => {
        let electron = require('electron');

        this.setState({baseUrl: baseUrl});

        electron.ipcRenderer.send("baseUrl", baseUrl);
    };

    /**
     *
     */
    onTouchTapClear = () => {
        this.setState({stdout: "clear"});
    };

    /**
     *
     */
    onTouchTapEdit = () => {
        require('electron').ipcRenderer.send('edit');
    };

    /**
     *
     * @param scenario
     */
    onCurrentScenarioChange = (scenario: number) => {
        this.setState({currentScenario: scenario});
    };

    /**
     *
     */
    componentDidMount(): void {

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
     * @returns {any}
     */
    public render(){

        return (
            <div>

                <Toolbar
                    baseUrl={this.state.baseUrl}
                    scenarios={this.state.scenarios}
                    currentScenario={this.state.currentScenario}
                    onTouchTapOpenFolder={this.onTouchTapOpenFolder}
                    onTouchTapRun={this.onTouchTapRun}
                    onTouchTapEdit={this.onTouchTapEdit}
                    onTouchTapClear={this.onTouchTapClear}
                    onBaseUrlChange={this.onBaseUrlChange}
                    onCurrentScenarioChange={this.onCurrentScenarioChange}
                />

                <div style={this.style.console}>
                    <ConsoleView
                        stdout={this.state.stdout}
                        stderr={this.state.stderr}
                    />
                </div>
            </div>
        );
    }
}