///<reference path="../Toolbar/Toolbar.d.ts"/>

declare interface IConsoleViewProps {
    stdout: string;
    stderr: string;
    style?: __React.CSSProperties;
    toolbarElement?: __React.ReactElement<IToolbarProps>
}

declare interface IConsoleViewState {
    std: string[]
}