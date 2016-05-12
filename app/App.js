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
		title: "Commit to Github",
		description: "*My* [github](https://github.com/thomasyimgit)",
		color: "#bd8d31",
		status: "in-progress",
		tasks: [ ]
	},
	{
		id: 2,
		title: "Write some code",
		description: "Change the *world*",
		color: "#3a7e28",
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
	},
	{
		id: 3,
		title: "Support Markdown in description",
		description: "markdown is currently supported in the description of the tasks",
		color: "#bd8d31",
		status: "done",
		tasks: [ ]
	},
];

//render method

ReactDOM.render(<KanbanBoard cards={cardsList} />, document.getElementById('root'));