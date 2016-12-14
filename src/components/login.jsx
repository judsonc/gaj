import {Component} from 'react';
import {hashHistory} from 'react-router'

export default class Login extends Component {
  componentDidMount() {
    localStorage.setItem('proximaVisita','/login')
  }

  render() {
    const url = 'https://garcomajato-d9f5d.firebaseapp.com/'
    if (navigator.onLine && window.cordova) {
      let ref = window.open(url, '_blank', 'location=no,zoom=no');
      ref.addEventListener('loadstart', function(event) {
        if (event.url !== url && event.url.indexOf('gaj_user_token=') > 0) {
          let id = event.url.split('gaj_user_token=')
          localStorage.setItem('gaj_user_token',id[1])
          ref.close()
          hashHistory.push('ambiente')
        }
      });
      ref.addEventListener('exit', function(event) {
        if (event.type === "exit" && !localStorage.getItem('gaj_user_token')) {
          window.reload()
        }
      });
    } else {
      alert("Você está desconectado!")
    }
    return null
  }
}
