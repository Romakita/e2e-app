///<reference path="App.d.ts"/>

import injectTapEventPlugin from 'react-tap-event-plugin';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import View from './../View/View';

injectTapEventPlugin();

class App extends React.Component<any, {}> {

    public state : IAppState;

    /**
     *
     * @returns {any}
     */
    public render(){

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <View />
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);