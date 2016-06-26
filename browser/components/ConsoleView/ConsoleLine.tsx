///<reference path="ConsoleLine.d.ts"/>

import * as React from "react";

export default class ConsoleLine extends React.Component<IConsoleLineProps, {}> {

    public state = {
        backgroundHover: ''
    };
    /**
     *
     * @type {{padding: string, margin: string, minHeight: string}}
     */
    private style: __React.CSSProperties = {
        padding: '0 15px 0 45px',
        margin: '0px',
        minHeight: '16px',
    };
    /**
     *
     * @type {{display: string, textAlign: string, minWidth: string, marginLeft: string, marginRight: string, cursor: string, textDecoration: string, color: string}}
     */
    private lineNumberStyle: __React.CSSProperties = {
        display: 'inline-block',
        textAlign: 'right',
        minWidth: '40px',
        marginLeft: '-45px',
        marginRight: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
        color: "#666"
    };

    /**
     *
     * @param props
     */
    constructor(props: IConsoleLineProps){
        super(props);
    }

    onMouseOver = () => {
        this.setState({backgroundHover:'#444'});
    };

    onMouseOut = () => {
        this.setState({backgroundHover:''});
    };
    /**
     *
     * @returns {any}
     */
    public render(): JSX.Element {

        const style = Object.assign(this.props.style || {}, this.style, {backgroundColor: this.state.backgroundHover});
        const anchorStyle = Object.assign(this.props.lineNumberStyle || {}, this.lineNumberStyle);

        return (
            <div style={style}
                 onMouseOver={this.onMouseOver}
                 onMouseOut={this.onMouseOut}>
                <a style={anchorStyle}>
                    {this.props.lineNumber}
                </a>
                <div style={{display: 'inline-block'}} dangerouslySetInnerHTML={{__html: this.props.content}}></div>
            </div>
        );
    }
}