import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import logo from './logo.svg'
import Video from './components/video'

import './assets/index.css'
import {
    cyan500, cyan700,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,blueGrey500,
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: blueGrey500,
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: grey500,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        pickerHeaderColor: cyan500,
        shadowColor: fullBlack,
    },
})

injectTapEventPlugin()

class App extends Component {
  render() {
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <div className="telaCheia">
                <Video videoId="v-E7yCfVlBo" linkDoProximo="/" />
            </div>
        </MuiThemeProvider>
    );
  }
}

export default App
