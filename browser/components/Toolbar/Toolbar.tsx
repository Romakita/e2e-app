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

    public style = {
        open: {
            minWidth: '40px',
            marginLeft: '10px',
            marginRight: '10px'
        },
        baseUrl: {
            marginTop:"5px",
            width: "360px",
            marginRight: "10px"
        },
        scenarios: {
            marginTop:"5px",
            width: "350px"
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
        this.props.onTouchTapRun();
    };

    /**
     *
     */
    onChangeBaseUrl = (event) => {
        this.props.onBaseUrlChange(event.target.value);
    };
    /**
     *
     */
    onChangeScenario = (event, index, value) => {

        this.props.onCurrentScenarioChange(value);

    };

    /**
     *
     * @returns {any}
     */
    public buildScenarios() {

        if (this.props.scenarios && this.props.scenarios.length) {

            let scenarios = this.props.scenarios.map((scenario: string, index: number) => {
                return <MenuItem value={index} key={index} primaryText={scenario.replace('scenario-', '')} />
            });

            return (
                <ToolbarGroup lastChild={true}>
                    <SelectField style={this.style.scenarios}
                                 iconStyle={this.style.scenariosIcon}
                                 value={this.props.currentScenario}
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
                        value={this.props.baseUrl}
                        onChange={this.onChangeBaseUrl}
                    />

                </ToolbarGroup>

                {this.buildScenarios()}

            </UIToolbar>
        )
    }
}