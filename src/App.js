import React, {Component} from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Router, Route, hashHistory, Redirect} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {refAcesso} from './components/firebase.js'
import Login from './components/login'
import Ambiente from './components/ambiente'
import Menu from './components/menu'
import Video from './components/video'
import Quiz from './components/quiz'
import {Acesso} from './components/acesso.js'
import './assets/bootstrapGridResponsive.css'
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
if(!localStorage.getItem('acesso')){
    var acesso = new Acesso([false,false,false,false])
    var acessoIdRef = refAcesso.push(acesso)
    var acessoId = {}
    acessoId[acessoIdRef.key] = acesso
    localStorage.setItem('acesso',JSON.stringify(acessoId))
}else{
    var velhoAcesso=JSON.parse(localStorage.getItem('acesso'))
    if(Date.now()-velhoAcesso.ultimaAlteracao>=7200000){
        var acesso = new Acesso([false,false,false,false])
        var acessoIdRef = refAcesso.push(acesso)
        var acessoId = {}
        acessoId[acessoIdRef.key] = acesso
        localStorage.setItem('acesso',JSON.stringify(acessoId))
    }
}
injectTapEventPlugin()
// alert(location.pathname)

class Viewambiente extends Component {
    render() {
        return (
            <Ambiente url="http://daniel.ejectufrn.com.br/getcards.json" pollInterval={10000} />
        )
    }
}

class App extends Component {
    componentWillMount() {
        if(localStorage.getItem('email')){
            hashHistory.push("ambiente")
        }
    }
    componentDidMount() {
        if(localStorage.getItem('proximaVisita')){
            console.log(localStorage.getItem('proximaVisita'));
            hashHistory.push(localStorage.getItem('proximaVisita'))
        }

    }
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={hashHistory}>
                    <Route path="/" component={Video} videoId="Xj4_Mjx_9-A" linkDoProximo="/quiz" />
                    <Route path="/video2" component={Video} videoId="OLZJ-E2CWuw" linkDoProximo="/login" />
                    <Route path="/quiz" component={Quiz} />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Menu}>
                        <Route path="ambiente" component={Viewambiente} />
                    </Route>
                    <Redirect from='*' to='/ambiente' />
                </Router>
            </MuiThemeProvider>
        )
    }
}

export default App
