import {Component} from 'react';
import {hashHistory} from 'react-router'

export default class Login extends Component {
    render() {
        if (navigator.onLine) {
            let login = window.open('https://garcomajato-d9f5d.firebaseapp.com', '_blank', 'location=no,zoom=no')
            hashHistory.push('ambiente')
        } else {
            alert("Voce está sem net")
        }
        return null
    }
}
