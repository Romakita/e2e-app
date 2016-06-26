///<reference path="ConsoleView.d.ts"/>

import * as React from "react";
import * as ReactDom from "react-dom";
import ConsoleLine from "./ConsoleLine";
import ConsoleLinesGroup from "./ConsoleLinesGroup";

export default class ConsoleView extends React.Component<IConsoleViewProps, {}> {
    public state : IConsoleViewState = {
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

    constructor(props: IConsoleViewProps) {
        super(props);
    }

    /**
     *
     * @param nextProps
     */
    public componentWillReceiveProps(nextProps : IConsoleViewProps) {
        let state;

        if(nextProps.stdout === 'clear') {
            state = {std: []};
        } else {
            state = {
                std: this.state.std
                    .concat(ConsoleView.Format(nextProps.stdout))
                    .concat(ConsoleView.Format(nextProps.stderr))
            };
        }
        
        this.setState(state);

    }

    /**
     *
     * @param prevProps
     */
    componentDidUpdate() {

        let node = ReactDom.findDOMNode(this);
        node.scrollTop = node.scrollHeight;

    }

    /**
     *
     */
    public createLines(): JSX.Element[] {

        let it: number = 0;
        let stacks: JSX.Element[];
        let lines: JSX.Element[] = [];

        this.state.std.forEach((line: string, index: number) => {

            it++;

            if (line.trim().match(/^at /)) {

                if (stacks === undefined) {
                    stacks = [];
                    stacks.push(<ConsoleLine key={stacks.length} content={this.state.std[index-1]} lineNumber={it} />);
                    lines.pop();
                }

                stacks.push(<ConsoleLine key={stacks.length} content={line} lineNumber={it} />);

                return;
            }

            if (stacks) {
                lines.push(<ConsoleLinesGroup key={lines.length} stacks={stacks} />);
                stacks = undefined;
            }

            lines.push(<ConsoleLine key={lines.length} content={line} lineNumber={it} />);

        });

        return lines;
    }


    /**
     *
     * @returns {any}
     */
    public render(){

        const style = Object.assign(this.style, this.props.style);

        return (
            <div style={style}>
                <pre style={this.preStyle}>
                    <code>
                        {this.createLines()}
                    </code>
                </pre>
            </div>
        )
    }

    /**
     *
     * @returns {string}
     */
    static Format(stdout){

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
        /*.filter((line: string) => {
         return !line.trim().match(/^at /)
         });*/
    }
    /**
     * Create a line with her trace.
     * @param index
     * @param line
     * @param lineNumber
     * @returns {any}
     */
    /*static NewLine(index: number, line: string, lineNumber: number): JSX.Element {

        const lineStyle = {
            padding: '0 15px 0 45px',
            margin: '0px',
            minHeight: '16px'
        };

        const indexStyle = {
            display: 'inline-block',
            textAlign: 'right',
            minWidth: '40px',
            marginLeft: '-45px',
            marginRight: '5px',
            cursor: 'pointer',
            textDecoration: 'none',
            color: "#666"
        };

        return <div key={index} style={lineStyle}>
            <a style={indexStyle}>{lineNumber}</a>
            <span dangerouslySetInnerHTML={{__html:line}}></span>
        </div>
    }*/

    /**
     *
     * @param index
     * @returns {any}
     * @constructor
     */
    /*static CreateSeeMore(index: number, stack: JSX.Element[]) {

        const style = {
            position: 'relative'
        };

        const seeMoreStyle = {
            position: 'absolute',
            top: '2px',
            right: '5px',
            padding: '2px 7px 2px',
            lineHeight: '10px',
            fontSize: '10px',
            backgroundColor: '#666',
            borderRadius: '6px',
            color: '#bbb'
        };

        return (
            <div key={index} >
                <div style={style}>
                    {stack[0]}
                    <span style={seeMoreStyle}>See more ...</span>
                </div>
                <div >{stack.splice(1, stack.length)}</div>
            </div>
        )
    }*/
}