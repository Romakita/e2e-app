///<reference path="ProtractorConsole.d.ts"/>

import * as React from "react";
import * as ReactDom from "react-dom";

export default class ProtractorConsole extends React.Component<IProtractorConsoleProps, {}> {
    public state : IProtractorConsoleState = {
        std: []
    };

    public style = {
        background: "#222",
        color: "#f1f1f1",
        fontFamily:"Monaco,monospace",
        right: '0px',
        top: '0px',
        bottom: '0px',
        left: '0px',
        overflow: 'auto',
        position: 'absolute'
    };

    public preStyle = {
        clear: "left",
        minHeight: "42px",
        padding: "15px 0",
        color: "#f1f1f1",
        fontSize: "12px",
        lineHeight: "19px",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        counterReset: "line-numbering",
        marginTop: 0
    };

    constructor(props: IProtractorConsoleProps) {
        super(props);
    }

    /**
     *
     * @returns {string}
     */
    public format(stdout){

        if (stdout == undefined) {
            return [];
        }

        return stdout
            .replace(/\[31m/gi, '<span style="color:red">')
            .replace(/\[32m/gi, '<span style="color:greenyellow">')
            .replace(/\[90m/gi, '<span style="color:green">')
            .replace(/\[39m/gi, '</span>')
            .replace(/\[0m/gi, '')
            .split('\n');
    }

    /**
     *
     * @param nextProps
     */
    public componentWillReceiveProps(nextProps : IProtractorConsoleProps) {
        let state;

        if(nextProps.stdout === 'clear') {
            state = {std: []};
        } else {
            state = {
                std: this.state.std
                    .concat(this.format(nextProps.stdout))
                    .concat(this.format(nextProps.stderr))
            };
        }


        this.setState(state);

    }
    /**
     *
     * @param prevProps
     */
    componentDidUpdate() {
        //if (this.shouldScrollBottom) {
            let node = ReactDom.findDOMNode(this);
            node.scrollTop = node.scrollHeight;
        //}
    }
    /**
     *
     * @returns {any}
     */
    public render(){

        const style = Object.assign(this.style, this.props.style);
        const lineStyle = {
            padding: '0 15px 0 45px',
            margin: '0px',
            minHeight: '16px'
        };

        const indexStyle = {
            display: 'inline-block',
            textAlign: 'right',
            minWidth: '40px',
            marginLeft: '-33px',
            marginRight: '5px',
            cursor: 'pointer',
            textDecoration: 'none',
            color: "#666"
        };

        const lines = this.state.std.map((line, index) => (
            <div key={index} style={lineStyle}>
                <a style={indexStyle}>{index+1}</a>
                <span dangerouslySetInnerHTML={{__html:line}}></span>
            </div>
        ));

        return (
            <div style={style}>
                <pre style={this.preStyle}>
                    <code>
                        {lines}
                    </code>
                </pre>
            </div>
        )
    }
}