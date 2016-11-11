import React, {Component} from 'react'
import YouTube from 'react-youtube'
import {Link} from 'react-router'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/forward' //send

export default class Video extends Component {
	constructor(props) {
		super(props)
		this.fullScreen()

		this.state = {
			videoId: props.route.videoId,
			proximo: props.route.linkDoProximo,
		}
	}

	fullScreen() {
		document.getElementsByTagName("html")[0].className = "telaCheia"
		document.getElementsByTagName("body")[0].className = "telaCheia"
		document.getElementById("root").className = "telaCheia"
	}

	onReady(event) {
		event.target.playVideo()
		// event.target.setVolume(50)
	}

	onEnd() {
		this.context.router.push(this.state.proximo)
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
				<YouTube videoId={this.state.videoId}
					opts={opts}
					onReady={this.onReady}
					onEnd={this.onEnd.bind(this)}
				/>
				<Link to={this.state.proximo}>
					<FloatingActionButton style={styleBotaoFlutuante}>
						<ContentAdd />
					</FloatingActionButton>
				</Link>
			</div>
		)
	}
}

Video.contextTypes = {
	router: React.PropTypes.object.isRequired
}
