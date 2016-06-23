///<reference path="CustomAppBar.d.ts"/>

import * as React from "react";
import * as ReactDom from "react-dom";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';

export default class CustomAppBar extends React.Component<ICustomAppBarProps, {}> {

    public state: any;

    constructor(props: any) {
        super(props);

        this.state = {open: false};
    }

    /**
     *
     */
    handleToggle = () => this.setState({open: !this.state.open});
    /**
     *
     */
    handleClose = () => this.setState({open: false});
    /**
     *
     */
    openFolder = () => {
        this.handleToggle();
        this.props.onOpenProject();
    };

    public build(){
        let table = [];

        for (let i = 0; i < 5; i++){
            table.push(<MenuItem primaryText="Open" onTouchTap={this.openFolder} leftIcon={<FileFolderOpen />} />);
        }
        return table;
    }

    public render(){

        const style = {
            top: "60px"
        };

        const loadMenuItems = () => {

        };

        return (
            <div>

                <Drawer docked={false}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}>

                        <MenuItem primaryText="Open" onTouchTap={this.openFolder} leftIcon={<FileFolderOpen />} />
                        
                </Drawer>

                <AppBar
                    title="Protractor runner"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
            </div>
        )
    }
}