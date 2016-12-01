import React from 'react'
import {hashHistory} from 'react-router'
import ThankYouImage from '../assets/thankYou.svg'

class Ambiente extends React.Component {
	componentDidMount() {
		if(!localStorage.getItem('email')){
			hashHistory.push("/login")
		}
		localStorage.setItem('proximaVisita','/ambiente')
		// for (var id in acesso) {
			// console.log("id:"+id)
			// var updates = {}
			// updates[ id + '/passos/3'] = true
			// refAcesso.(updates)
			// refAcesso.update(updates)
		// }
		// acesso.passos[3]=true;
	}
    render() {
        return (
        	<div className="container">
            	<div className="row">
        	   		<div className="col-xs-12 smallImage" style={{backgroundImage: "url(." + ThankYouImage + ")"}}/>
        		</div>
        	</div>
        );
    }
}

export default Ambiente;
