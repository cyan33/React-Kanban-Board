import React, {PropTypes} from 'react';

import List from './List';

class KanbanBoard extends React.Component {
	pickCards (type) {
		return this.props.cards.filter((card) => card.status === type);
	}

	render () {
		return (
			<div className="app">
				<List id="todo" title="To Do" cards={
					this.pickCards("todo")
				} />
				<List id="in-progress" title="In Progress" cards={
					this.pickCards("in-progress")
				} />
				<List id="done" title="Done" cards={
					this.pickCards("done")
				} />
			</div>
		);
	}
}

KanbanBoard.propTypes = {
	cards: PropTypes.arrayOf(PropTypes.object)	
};

export default KanbanBoard;