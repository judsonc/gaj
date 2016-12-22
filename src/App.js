import React, {Component} from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Router, Route, hashHistory, Redirect} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {refAcesso, fb} from './components/firebase'
import Login from './components/login'
import Ambiente from './components/ambiente'
import Menu from './components/menu'
import Video from './components/video'
import Quiz from './components/quiz'
import {Acesso, atualizarAcesso} from './components/acesso'
import './assets/bootstrapGridResponsive.css'
import './assets/index.css'
import {
  red500, red600,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack, redA700
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
    shadowColor: fullBlack
  }
})

injectTapEventPlugin()

class Viewambiente extends Component {
  render () {
    return (
      <Ambiente url='http://daniel.ejectufrn.com.br/getcards.json' pollInterval={10000} />
    )
  }
}

class App extends Component {
  componentWillMount () {
    // Checar a localização que o usuário estava quando saiu por último e voltar para ela
    var proximaVisita = localStorage.getItem('proximaVisita')
    var proximaVisitaHash = '#' + proximaVisita
    if (proximaVisita) {
      console.log('proximaVisita:' + proximaVisita);
      if (proximaVisitaHash !== location.hash) {
        hashHistory.push(proximaVisita)
      }
    }
    function registrarAcesso () {
      // Checar se o usuário já fez algum acesso
      var acessoString = localStorage.getItem('acesso')
      if (acessoString) {
        var acesso = JSON.parse(acessoString)
        var acessoKey = Object.keys(acesso)[0]
        // Se o acesso antigo tiver menos que duas horas, apenas atualizar
        if ((Date.now() - acesso[acessoKey].data.ultimaAlteracao) <= 7200000) {
          console.log('atualizarAcesso')
          atualizarAcesso(acessoKey, acesso)
          refAcesso.update(acesso)
          localStorage.setItem('acesso', JSON.stringify(acesso))
          // Se tiver mais que 2h, criar um novo
        } else {
          var novoAcesso = new Acesso(acesso[acessoKey].passos)
          refAcesso.push(novoAcesso)
          var novoAcessoId = {}
          novoAcessoId[acessoKey] = novoAcesso
          localStorage.setItem('acesso', JSON.stringify(novoAcessoId))
        }
        // Criar o primeiro acesso do usuário
      } else {
        var primeiroAcesso = new Acesso([false, false, false, false])
        var primeiroAcessoIdRef = refAcesso.push(primeiroAcesso)
        var primeiroAcessoId = {}
        primeiroAcessoId[primeiroAcessoIdRef.key] = primeiroAcesso
        localStorage.setItem('acesso', JSON.stringify(primeiroAcessoId))
      }
    }
    fb.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('Logado')
        if (user.isAnonymous) console.log('como anonimo.')
        localStorage.setItem('providerId', user.providerId)
        localStorage.setItem('uid', user.uid)
        localStorage.setItem('displayName', user.displayName)
        localStorage.setItem('email', user.email)
        localStorage.setItem('photoURL', user.photoURL)
        registrarAcesso()
      } else {
        console.log('Não Logado')
        var logarComoAnonimo = fb.auth().signInAnonymously()
        logarComoAnonimo.catch(function (error) {
          console.log(error)
        })
        logarComoAnonimo.then(function () {
          console.log('Logou como anonimo')
        })
      }
      var currentUser = fb.auth().currentUser
      console.log('currentUser.uid:' + currentUser.uid)
    })
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={hashHistory}>
          <Route path='/' component={Video} videoId='Xj4_Mjx_9-A' linkDoProximo='/quiz' />
          <Route path='/quiz' component={Quiz} linkDoProximo='/video2' />
          <Route path='/video2' component={Video} videoId='OLZJ-E2CWuw' linkDoProximo='/login' />
          <Route path='/login' component={Login} linkDoProximo='/ambiente' />
          <Route path='/' component={Menu}>
            <Route path='ambiente' component={Viewambiente} />
          </Route>
          <Redirect from='*' to='/ambiente' />
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
