import React, {PropTypes} from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';

class KanbanBoard extends React.Component {
	pickCards (type) {
		return this.props.cards.filter((card) => card.status === type);
	}

	render () {
		return (
			<div className="app">
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
			</div>
		);
	}
}

KanbanBoard.propTypes = {
	cards: PropTypes.arrayOf(PropTypes.object)	,
	taskCallbacks: PropTypes.object,
	cardCallbacks: PropTypes.object
};

export default DragDropContext(HTML5Backend)(KanbanBoard);