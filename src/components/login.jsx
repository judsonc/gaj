import React, {Component} from 'react';
import {hashHistory} from 'react-router'
import RefreshIndicator from 'material-ui/RefreshIndicator'

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      showLogin: false,
    }
  }

  popupLogin() {
    let self = this
    const url = 'https://garcomajato-d9f5d.firebaseapp.com/'
    if (window.cordova) {
      let ref = window.open(url, '_blank', 'location=no,zoom=no,toolbar=no,hidden=yes');
      ref.addEventListener('loadstart', function(event) {
        if (event.url !== url && event.url.indexOf('gaj_user_token=') > 0) {
          let id = event.url.split('gaj_user_token=')
          localStorage.setItem('gaj_user_token',id[1])
          ref.close()
          hashHistory.push('ambiente')
        }
      })
      ref.addEventListener('loadstop', function(event) {
        self.setState({ showLogin: true })
        ref.show()
      })
      ref.addEventListener('exit', function(event) {
        if (!localStorage.getItem('gaj_user_token')) {
          self.setState({ showLogin: false })
          self.popupLogin()
        }
      })
    } else {
      alert("Você não está usando um celular")
    }
  }

  componentDidMount() {
    localStorage.setItem('proximaVisita','/login')
    this.popupLogin()
  }

  render() {
    const style = {
      container: {
        position: 'relative',
      },
      refresh: {
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    }

    return (this.state.showLogin) ? null : (
      <div style={style.container}>
        <RefreshIndicator
          size={100}
          left={0}
          top={130}
          status='loading'
          style={style.refresh}
        />
      </div>
    )
  }
}
