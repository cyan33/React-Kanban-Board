import React from 'react';
import ReactDOM from 'react-dom';

import KanbanBoardContainer from './KanbanBoardContainer';

//The Component Hierarch:
// -App
// 		-KanbanBoardContainer
// 			-KanbanBoard
// 				-List Component*3
// 					-Card Component
// 						-CheckList Component
//


ReactDOM.render(<KanbanBoardContainer />, document.getElementById('root'));