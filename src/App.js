import React, {Component} from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Router, Route, hashHistory, IndexRoute, Redirect} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Login from './components/login'
import Ambiente from './components/ambiente'
import Teste from './components/teste'
import Menu from './components/menu'
import Video from './components/video'
import Quiz from './components/quiz'

import './assets/bootstrap-grid-responsive.css'
import './assets/index.css'
import {
    red500, red600,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack, redA700,
} from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: redA700,
        primary2Color: red600,
        primary3Color: grey400,
        accent1Color: grey500,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        pickerHeaderColor: red500,
        shadowColor: fullBlack,
    },
})

injectTapEventPlugin()

class Viewambiente extends Component {
    render() {
        return (
            <Ambiente url="http://daniel.ejectufrn.com.br/getcards.json" pollInterval={10000} />
        )
    }
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={hashHistory}>
                    <Route path="/" component={Menu}>
                        <IndexRoute component={Login} />
                        <Route path="ambiente" component={Viewambiente} />
                        <Route path="teste" component={Teste} />
                        <Route path="quiz" component={Quiz}
                            pergunta1="Primeiro Pergunta"
                            pergunta2="Segunda Pergunta"
                            pergunta3="Terceira Pergunta"
                            r1p1="1º opcao de Resposta pergunta1"
                            r2p1="2º opcao de Resposta pergunta1"
                            r3p1="3º opcao de Resposta pergunta1"
                            r4p1="4º opcao de Resposta pergunta1"
                            r1p2="1º opcao de Resposta pergunta2"
                            r2p2="2º opcao de Resposta pergunta2"
                            r1p3="1º opcao de Resposta pergunta3"
                            r2p3="2º opcao de Resposta pergunta3"
                            r3p3="3º opcao de Resposta pergunta3"
                            r4p3="4º opcao de Resposta pergunta3"
                        />
                    </Route>
                    <Route path="/video1" component={Video} videoId="v-E7yCfVlBo" linkDoProximo="/" />
                    <Route path="/video2" component={Video} videoId="OLZJ-E2CWuw" linkDoProximo="/ambiente" />
                    <Redirect from='*' to='/' />
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App
