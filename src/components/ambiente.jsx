import React from 'react'
import ThankYouImage from '../assets/thankYou.svg'

class Ambiente extends React.Component {
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
