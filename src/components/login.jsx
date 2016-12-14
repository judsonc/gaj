import {Component} from 'react';
import {hashHistory} from 'react-router'

export default class Login extends Component {
  render() {
    const url = "https://garcomajato-d9f5d.firebaseapp.com/"
    if (navigator.onLine && window.cordova) {
      var ref = window.open(url, '_blank', 'location=no,zoom=no,clearcache=yes');
      ref.addEventListener('loadstart', function(event) {
        if (event.url !== url && event.url.indexOf("gaj_user_token=") > 0) {
          let id = event.url.split("gaj_user_token=")
          alert("id " + id[1])
          ref.close()
          alert("deu certo")
          hashHistory.push("ambiente")
        }
      });
      // ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
      ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
      // ref.addEventListener('exit', function(event) {
      //   if (event.type == "exit"){
      //
      //   }
      // });
    } else {
      alert("Voce está sem net")
    }
    return null
  }
}
