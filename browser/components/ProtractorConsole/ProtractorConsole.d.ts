///<reference path="../Toolbar/Toolbar.d.ts"/>

import CSSProperties = __React.CSSProperties;
import React = __React;

declare interface IProtractorConsoleProps {
    stdout: string;
    stderr: string;
    style?: CSSProperties;
    toolbarElement?: React.ReactElement<IToolbarProps>
}
declare interface IProtractorConsoleState {
    std: string[]
}