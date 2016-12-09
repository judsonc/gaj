import {Component} from 'react';
import {hashHistory} from 'react-router'

export default class Login extends Component {
    render() {
        let login = window.open('https://garcomajato-d9f5d.firebaseapp.com')
        hashHistory.push('ambiente')
        return null
    }
}
