import React from "react";

import CheckList from "./CheckList";
import marked from 'marked';

class Card extends React.Component {
	constructor () {
		super();
		this.state = {
			showDetails: false
		};
	}

	toggleDetails () {
		this.setState({showDetails: !this.state.showDetails});
	}

	render () {
		//the detail part of the card
		let cardDetails;

		//toggle the detail
		if (this.state.showDetails) {
			cardDetails = (
				<div className="card_details">
					<span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
					<CheckList cardId={this.props.id} tasks={this.props.tasks} />
				</div>
			);
		}

		let sideColor = {
			position: 'absolute',
			zIndex: -1,
			top: 0,
			bottom: 0,
			left: 0,
			width: 7,
			backgroundColor: this.props.color
		};

		return (
			<div className="card">
				<div style={sideColor} />
				<div className={
					this.state.showDetails ? "card_title card_title--is-open" : "card_title"
				} onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
				{cardDetails}		
			</div>
		);
	}
}

export default Card;