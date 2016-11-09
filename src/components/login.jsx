import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
var TiSocialFacebook = require('react-icons/lib/ti/social-facebook');
var TiSocialGooglePlus = require('react-icons/lib/ti/social-google-plus');
import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyC581GYCJNbtFvRu0kRAPCNGKRL3gF7VAc",
    authDomain: "projetoallan-b74d8.firebaseapp.com",
    databaseURL: "https://projetoallan-b74d8.firebaseio.com",
    storageBucket: "projetoallan-b74d8.appspot.com",
    messagingSenderId: "119257082817"
}
const fb = firebase.initializeApp(config).database().ref()
import {browserHistory} from 'react-router'
var providerfacebook = new firebase.auth.FacebookAuthProvider();
var providergoogle = new firebase.auth.GoogleAuthProvider();
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("Logado");
        console.log("  Sign-in provider: " + user.providerId);
        console.log("  Provider-specific UID: " + user.uid);
        console.log("  Name: " + user.displayName);
        console.log("  Email: " + user.email);
        console.log("  Photo URL: " + user.photoURL);
        browserHistory.push("ambiente")
        localStorage.setItem('user', user)
    } else {
        console.log("Não Logado");
    }
});
export default class Login extends Component {
	constructor(props) {
	  super(props);
	  this.state = {email:'',error: false,erroemail:'',user: localStorage.getItem('user')};
	}
	handleSubmitEmail = () =>{
		if(this.state.erroemail){
		    firebase.auth().createUserWithEmailAndPassword(this.state.email, "8b3defbdab5c56a4").catch(function (error) {
		        var errorCode = error.code;
		        var errorMessage = error.message;
		        console.log(errorMessage);
		    });
		}
    }
	handleChange = (event) => {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	    this.setState({
	      email: event.target.value,
	    });
	    this.setState({
	      email: event.target.value,
	      erroemail:re.test(this.state.email)
	    });
	  };
  render() {
  	var textoerro
  	if(!this.state.erroemail){
  		textoerro="Coloque um email válido"
  	}
  	else{
  		textoerro=""
  	}
    return (
    <div className="container">
    	<div className="row">
			<div className="col-xs-12">
			<Paper className="formlogin">
		      <TextField
		     	 floatingLabelText="Email"
			     fullWidth={true}
			     value={this.state.email}
			     onChange={this.handleChange}
			     errorText={textoerro}
			    />
			   <RaisedButton
			      label="Concluir"
			      primary={true}
			      onTouchTap={this.handleSubmitEmail}
			      className="buttonlogin"
			      fullWidth={true}
			    />
			</Paper>
			</div>
    		<div className="col-xs-12">
		      <RaisedButton
			      label="login com Facebook"
			      backgroundColor="#3b5998"
			      className="buttonlogin"
			      onTouchTap={()=>{firebase.auth().signInWithRedirect(providerfacebook)}}
			      icon={<TiSocialFacebook />}
			      fullWidth={true}
			    />
			   <RaisedButton
			      label="login com Google"
			      backgroundColor="#eb4c3f"
			      className="buttonlogin"
			      onTouchTap={()=>{firebase.auth().signInWithRedirect(providergoogle)}}
			      icon={<TiSocialGooglePlus />}
			      fullWidth={true}
			    />
			</div>
	    </div>
	 </div>
    );
  }
}