import React from 'react';
import ReactDOM from 'react-dom';

import KanbanBoard from './KanbanBoard';

// /*The Component Hierarch:
// 	-App
// 		-KanbanBoard Component
// 			-List Component
// 				-Card Component
// 					-CheckList Component
// */

//data

let cardsList = [
	{
		id: 1,
		title: "Read the Book",
		description: "I should read the whole book",
		status: "in-progress",
		tasks: [ ]
	},
	{
		id: 2,
		title: "Write some code",
		description: "Write the fuck code",
		status: "todo",
		tasks: [
			{
				id: 1,
				name: "ContactList Example",
				done: true
			},
			{
				id: 2,
				name: "KanbanBoard Example",
				done: false
			},
			{
				id: 3,
				name: "My own experiments",
				done: false
			}
		]
	}
];

//render method

ReactDOM.render(<KanbanBoard cards={cardsList} />, document.getElementById('root'));