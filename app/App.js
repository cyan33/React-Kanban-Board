import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import KanbanBoardContainer from './KanbanBoardContainer';
import KanbanBoard from './KanbanBoard';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import EditCard from './EditCard';
import NewCard from './NewCard';

//The Component Hierarch:
// -App
// 		-KanbanBoardContainer
// 			-KanbanBoard
// 				-List Component*3
// 					-Card Component
// 						-CheckList Component
//


// ReactDOM.render(<KanbanBoardContainer />, document.getElementById('root'));

ReactDOM.render((
	<Router history={createBrowserHistory()}>
		<Route component={KanbanBoardContainer}>
			<Route path="/" component={KanbanBoard}>
				<Route path="new" component={NewCard} />
				<Route path="edit/:card_id" component={EditCard} />
			</Route>
		</Route>
	</Router>
), document.getElementById('root'));