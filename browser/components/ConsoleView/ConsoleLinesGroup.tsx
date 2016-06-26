///<reference path="./ConsoleLinesGroup.d.ts"/>

import * as React from "react";
import FlatButton from 'material-ui/FlatButton';

export default class ConsoleLinesGroup extends React.Component<IConsoleLinesGroupProps, {}> {

    state: IConsoleLinesGroupState = {
        show: false
    };
    /**
     *
     * @type {{padding: string, margin: string, minHeight: string}}
     */
    private style: __React.CSSProperties = {
        position: 'relative'
    };
    /**
     *
     * @type {{}}
     */
    private seeMoreStyle: __React.CSSProperties = {
        position: 'absolute',
        top: '2px',
        right: '5px',
        padding: '2px 7px 2px',
        lineHeight: '10px',
        fontSize: '10px',
        backgroundColor: '#666',
        borderRadius: '6px',
        color: '#bbb',
        minWidth: "0px",
        height:"auto"
    };

    /**
     *
     * @param props
     */
    constructor(props: IConsoleLinesGroupProps){
        super(props);
    }

    /**
     *
     */
    toggle = () => {
        console.log("Click", this.state.show);
        this.setState({
            show: !this.state.show
        });
    };

    /**
     *
     * @returns {any}
     */
    public render(): JSX.Element {
        
        return (
            <div style={Object.assign(this.props.style || {}, this.style)}>

                <div style={{paddingRight:'80px'}}>
                    {this.props.stacks[0]}
                </div>

                <FlatButton label="see more"
                            style={Object.assign(this.props.seeMoreStyle || {}, this.seeMoreStyle)}
                            labelStyle={{
                                fontSize: "10px",
                                textTransform: "none",
                                paddingLeft: "3px",
                                paddingRight: "3px"
                            }}
                            onTouchTap={this.toggle}>
                </FlatButton>

                <div style={{display:  this.state.show ? 'block' : 'none'}}>
                    {this.props.stacks.slice(1, this.props.stacks.length)}
                </div>

            </div>
        );
    }
}