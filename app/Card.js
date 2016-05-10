import React from "react";

import CheckList from "./CheckList";

class Card extends React.Component {
	render () {
		return (
			<div className="card">
				<div className="card_title">{this.props.title}</div>
				<div className="card_details">
					{this.props.description}
					<CheckList cardId={this.props.id} tasks={this.props.tasks} />
				</div>
			</div>
		);
	}
}

export default Card;