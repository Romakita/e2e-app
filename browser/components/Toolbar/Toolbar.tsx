///<reference path="Toolbar.d.ts"/>

import * as React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import {Toolbar as UIToolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

export default class Toolbar extends React.Component<IToolbarProps, {}> {

    public state: IToolbarState = {
        baseUrl: "",
        currentScenario: -1,
        scenarios: []
    };

    public style = {
        open: {
            minWidth: '40px',
            marginLeft: '10px',
            marginRight: '10px'
        },
        baseUrl: {
            marginTop:"5px",
            width: "300px",
            marginRight: "10px"
        },
        scenarios: {
            marginTop:"5px"
        },

        scenariosIcon: {
            fill: "#333"
        },

        run: {
            minWidth: '40px',
            marginLeft: '10px',
            marginRight: '0px'
        },
        edit: {
            minWidth: '40px',
            marginLeft: '10px',
            marginRight: '10px'
        },
        delete: {
            minWidth: '40px',
            marginLeft: '10px',
            marginRight: '10px'
        }
    };


    constructor(props) {
        super(props);
        this.state.scenarios = props.scenarios;
        this.state.baseUrl = props.baseUrl;
    }

    /**
     *
     */
    onTouchTapOpenFolder = () => {
        this.props.onTouchTapOpenFolder();
    };

    /**
     * 
     */
    onTouchTapRun = () => {
        this.props.onTouchTapRun(this.state.currentScenario);
    };

    /**
     *
     */
    onChangeBaseUrl = (event) => {

        this.setState({
            baseUrl: event.target.value
        });

        this.props.onBaseUrlChange(event.target.value);
    };
    /**
     *
     */
    onChangeScenario = (event, index, value) => {
        this.setState({
            currentScenario: value
        });
    };

    setState(state:{}, callback?:()=>any):void {
        super.setState(Object.assign(this.state, state), callback);
    }

    /**
     *
     * @returns {any}
     */
    public buildScenarios() {

        if (this.state.scenarios && this.state.scenarios.length) {

            let scenarios = this.state.scenarios.map((scenario: string, index: number) => {
                return <MenuItem value={index} key={index} primaryText={scenario} />
            });

            return (
                <ToolbarGroup lastChild={true}>
                    <SelectField style={this.style.scenarios}
                                 iconStyle={this.style.scenariosIcon}
                                 value={this.state.currentScenario}
                                 onChange={this.onChangeScenario}>
                        <MenuItem value={-1} key={-1} primaryText="All scenarios" />
                        {scenarios}
                    </SelectField>

                    <FlatButton
                        style={this.style.run}
                        secondary={true}
                        icon={<AvPlayArrow />}
                        onTouchTap={this.onTouchTapRun}
                    />

                    <FlatButton
                        onTouchTap={this.props.onTouchTapEdit}
                        style={this.style.edit}
                        icon={<EditorModeEdit />}
                    />

                    <ToolbarSeparator style={{marginLeft:'5px'}} />

                    <FlatButton onTouchTap={this.props.onTouchTapClear}
                                style={this.style.delete}
                                icon={<ActionDelete />} />
                </ToolbarGroup>

            );
        }


    }

    /**
     *
     * @param nextProps
     */
    public componentWillReceiveProps(nextProps : IToolbarProps) {

        const state = {
            baseUrl: nextProps.baseUrl || this.state.baseUrl,
            scenarios: nextProps.scenarios || this.state.scenarios
        };

        this.setState(state);

    }
    /**
     *
     * @returns {any}
     */
    public render(){
        
        return (
            <UIToolbar>
                <ToolbarGroup firstChild={true}>
                    <FlatButton
                        style={this.style.open}
                        primary={true}
                        icon={<FileFolderOpen />}
                        onTouchTap={this.onTouchTapOpenFolder}
                    />

                    <TextField
                        style={this.style.baseUrl}
                        hintText="http://"
                        value={this.state.baseUrl}
                        onChange={this.onChangeBaseUrl}
                    />

                </ToolbarGroup>

                {this.buildScenarios()}

            </UIToolbar>
        )
    }
}