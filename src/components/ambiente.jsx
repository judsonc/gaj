import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import $ from 'jquery';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import SocialShare from 'material-ui/svg-icons/social/share';
import NotificationConfirmationNumber from 'material-ui/svg-icons/notification/confirmation-number';
var Ambiente = React.createClass({
  loadCardsfromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      beforeSend:function(){
	  },
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCardsfromServer();
    this.intervalo = setInterval(this.loadCardsfromServer, this.props.pollInterval);
  },
  componentWillUnmount: function() {
    clearInterval(this.intervalo)
  },
  render: function() {
    return (
    	<div className="container">
	    	<div className="row">
        		<CardList data={this.state.data} />
			</div>
		</div>
    );
  }
});
export default Ambiente;

class CardList extends Component {
	constructor(props) {
	  super(props);
	  this.state = {cards: []};
	}
  	render() {
	  var listCards = this.props.data.map(function(card) {
	   return (
	   	<div key={card.id} className="col-xs-12 col-sm-6 col-md-4 singlecard">
	      <Card className="">
					<Link to={'/user/'+card.perfil}>
						<CardHeader
							title={'@'+card.perfil}
							subtitle={card.subperfil}
							avatar={card.avatar}
						/>
					</Link>

					<CardMedia
						overlay={<CardTitle title={card.overlaytitle} subtitle={card.overlaysubtitle} />}
					>
						<img src={card.imagem} alt={card.imgalt} />
					</CardMedia>
					<CardTitle title={card.cardtitle} subtitle={card.subtitle} />
					<CardText>
						{card.cardtext}
					</CardText>
					<CardActions>
						<FlatButton primary={true} icon={<NotificationConfirmationNumber />} />
						<FlatButton label={card.likes} primary={true} icon={<ActionThumbUp />} />
						<FlatButton label={card.shares} secondary={true} icon={<SocialShare />} />
					</CardActions>
				</Card>
			</div>
	   );
	  });
    return <div>{listCards}</div> ;
  }
}
