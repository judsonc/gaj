import React, {Component} from 'react'
import YouTube from 'react-youtube'
import {browserHistory, Link} from 'react-router'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/forward' //send

var links;

export default class Video extends Component {

	constructor(props) {
		super(props)
		this.fullScreen()

		links = {
			videoId: this.props.route.videoId,
			proximo: this.props.route.linkDoProximo,
		}
	}

	fullScreen() {
		document.getElementsByTagName("html")[0].className = "telaCheia"
		document.getElementsByTagName("body")[0].className = "telaCheia"
		document.getElementById("root").className = "telaCheia"
	}

	render() {
		const styleBotaoFlutuante = {
			bottom: 40,
			right: 20,
			zIndex: 2,
			position: 'fixed',
		}

		const opts = {
			width: '100%',
			height: '100%',
			// allowfullscreen: 0,
			playerVars: {
				autoplay: 1,
				controls: 0, // remove controles
				showinfo: 0, // remove titulo
				rel: 0, // remove videos relacionados no fim do video
				iv_load_policy: 3, // remove anotações
				fs: 0, // remove fullscren
			}
		}

		return (
			<div className="telaCheia" style={{position: 'fixed'}}>
				<YouTube videoId={links.videoId}
					opts={opts}
					onReady={this.onReady}
					onEnd={this.onEnd}
				/>
				<Link to={links.proximo}>
					<FloatingActionButton style={styleBotaoFlutuante}>
						<ContentAdd />
					</FloatingActionButton>
				</Link>
			</div>
		)
	}

	onReady(event) {
		event.target.playVideo()
		// event.target.setVolume(50)
	}

	onEnd(event) {
		browserHistory.push(links.proximo)
	}
}
