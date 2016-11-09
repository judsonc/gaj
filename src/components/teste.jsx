import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
export default class Teste extends Component{
	constructor(props) {
		super(props);
	  	this.state = {frase: "alo2"};
	}
	alerta(){
		console.log(this.state.frase)
	}
	render() {
		return(
				<RaisedButton
			      label="login com Google"
			      backgroundColor="#eb4c3f"
			      className="buttonlogin"
			      fullWidth={true}
			      onTouchTap={this.alerta}
			    />
			)
	}
}