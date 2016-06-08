import React, {PropTypes} from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';
import { Link } from 'react-router';

class KanbanBoard extends React.Component {
	pickCards (type) {
		return this.props.cards.filter((card) => card.status === type);
	}

	render () {
		let cardModal = this.props.children && React.cloneElement(this.props.children, {
			cards: this.props.cards,
			cardCallbacks: this.props.cardCallbacks
		});

		return (
			<div className="app">
				<Link to="/new" className="float-button">+</Link>

				<List id="todo"
					title="To Do"
					taskCallbacks={this.props.taskCallbacks} 
					cards={this.pickCards("todo")}
					cardCallbacks={this.props.cardCallbacks} 
				/>

				<List id="in-progress"
					title="In Progress"
					taskCallbacks={this.props.taskCallbacks}
					cards={this.pickCards("in-progress")}
					cardCallbacks={this.props.cardCallbacks} 
				/>

				<List id="done" title="Done"
					taskCallbacks={this.props.taskCallbacks} 
					cards={this.pickCards("done")}
					cardCallbacks={this.props.cardCallbacks} 
				/>

				{cardModal}
			
			</div>
		);
	}
}

KanbanBoard.propTypes = {
	cards: PropTypes.arrayOf(PropTypes.object),
	taskCallbacks: PropTypes.object,
	cardCallbacks: PropTypes.object
};

export default DragDropContext(HTML5Backend)(KanbanBoard);