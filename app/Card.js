import React, {PropTypes} from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import CheckList from "./CheckList";
import marked from "marked";
import { DragSource, DropTarget } from "react-dnd";
import constants from "./constants";

const cardDragSpec = {
	beginDrag(props) {
		return {
			id: props.id
		};
	}
};

const cardDropSpec = {
	hover (props, monitor) {
		const draggedId = monitor.getItem().id;
		props.cardCallbacks.updatePosition(draggedId, props.id);
	}
};

let collectDrag = (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource()
	};
}

let collectDrop = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget()
	};
}

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
		const { connectDragSource, connectDropTarget } = this.props;

		//the detail part of the card
		let cardDetails;

		//toggle the detail
		if (this.state.showDetails) {
			cardDetails = (
				<div className="card_details">
					<span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
					<CheckList cardId={this.props.id} 
								tasks={this.props.tasks}
								taskCallbacks={this.props.taskCallbacks} />
				</div>
			);
		}

		//the style of the side bar
		let sideColor = {
			position: 'absolute',
			zIndex: -1,
			top: 0,
			bottom: 0,
			left: 0,
			width: 9,
			backgroundColor: this.props.color
		};

		return connectDropTarget(connectDragSource(
			<div className="card">

				<div style={sideColor} />
				<div className={
					this.state.showDetails ? "card_title card_title--is-open" : "card_title"
				} onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
				<ReactCSSTransitionGroup 	transitionName="toggle"
											transitionEnterTimeout={250}
											transitionLeaveTimeout={250} >
				{cardDetails}
				</ReactCSSTransitionGroup>
			</div>
		));
	}
}

Card.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	description: PropTypes.string,
	color: PropTypes.string,
	tasks: PropTypes.arrayOf(PropTypes.object),
	taskCallbacks: PropTypes.object,
	cardCallbacks: PropTypes.object,
	connectDragSource: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired
};

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

export default dragDropHighOrderCard;