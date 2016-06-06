import React from 'react';
import KanbanBoard from './KanbanBoard';
import update from 'react-addons-update';
import 'whatwg-fetch';
import 'babel-polyfill';
import { throttle } from './util';

// An example json fetched from the remote API

// "this.state.card" is equivalent to this json
// [{
// 	"id": 1797,
// 	"title": "Read the Book",
// 	"description": "I should read the **whole** book",
// 	"color": "#BD8D31",
// 	"status": "in-progress",
// 	"tasks": []
// }, {
// 	"id": 1798,
// 	"title": "Write some code",
// 	"description": "Code along with the samples in the book at [github](https://github.com/pro-react)",
// 	"color": "#3A7E28",
// 	"status": "todo",
// 	"tasks": [{
// 		"id": 6327,
// 		"name": "Kanban Example",
// 		"done": false
// 	}, {
// 		"id": 6328,
// 		"name": "My own experiments",
// 		"done": false
// 	}, {
// 		"id": 6326,
// 		"name": "ContactList Example",
// 		"done": false
// 	}]
// }]


//This API is provided for educational purposes only.
//As such, stored information will be reset after 24 hours of inactivity.
//Please be careful and do not store sensible information.
const url = 'http://kanbanapi.pro-react.com';
const requestHeader = {
	'Content-Type': 'application/json',
	Authorization: 'thomasyim'	//replace this string for your own identity
};

class KanbanBoardContainer extends React.Component {
	constructor () {
		super();
		this.state = {
			cards: []
		};
		// Only call updateCardStatus when arguments changed
		this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
		this.updateCardPosition = throttle(this.updateCardPosition.bind(this));
	}

	//when the component mounted(before render), trigger this function and fetch the cards from remote server, update the state
	componentDidMount () {
		fetch(url + '/cards', {headers: requestHeader})
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({ cards: responseData });
		})
		.catch((error) => {
			console.log("Error fetching and parsing data", error);
		});
	}

	addCard (card) {
		let prevState = this.state;

		if (!card.id) {
			// Deep copy
			let card = Object.assign({}, card, {id: Date.now()});
		}

		let nextState = update(this.state.cards, { $push: [card] });
		this.setState({cards: nextState});

		fetch(`${url}/cards/`, {
			method: 'post',
			headers: requestHeader,
			body: JSON.stringify(card)
		})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			else {
				throw new Error("Server response was not okay.");
			}
		})
		.then((responseData) => {
			// use the definitive id from the server and use react to update the id
			card.id = responseData.id;
			this.setState({ cards: nextState });
		})
		.catch((error) => {
			this.setState({cards: prevState});
			console.log(error);
		});
	}	

	updateCard (card) {
		let prevState = this.state;
		let cardIndex = this.state.cards.findIndex((c) => c.id == card.id);

		let nextState = update(this.state.cards, {
			[cardIndex]: { $set: card }
		});

		this.setState({cards: nextState });

		fetch(`${url}/cards/${card.id}`, {
			method: 'post',
			headers: requestHeader,
			body: JSON.stringify(card)
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Server response wasn't ok.");
			}
		})
		.catch((error) => {
			this.setState({cards: prevState});
			console.log(error);
		});
	}

	addTask (cardId, taskName) {
		//Store the current state in case you want to revert
		let prevState = this.state;

		//Find the index of the card
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

		//Create a new task(and a temporary id-- millisecond)
		let newTask = {id: Date.now(), name: taskName, done: false};

		//Create a new object with the newTask
		let nextState = update(this.state.cards, {
									[cardIndex]: {
										tasks: {$push: [newTask] }
									}
								});

		this.setState({cards: nextState});

		//call the api to add the task
		fetch(`${url}/cards/${cardId}/tasks`, {
			method: 'post',
			headers: requestHeader,
			body: JSON.stringify(newTask)
		})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			else {
				throw new Error("Cannot access the remote server");
			}
		})
		.then((responseData) => {
			//when the server returns the definitive ID
			//used for the new Task on the server, update it on React
			newTask.id = responseData.id;
			this.setState({cards: nextState});
		})
		.catch((error) => {
			this.setState({cards: prevState});
		});

	}

	deleteTask (cardId, taskId, taskIndex) {
		//Find the index of the card
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

		let prevState = this.state.cards;

		//create the new object without the task
		let nextState = update(this.state.cards, {
									[cardIndex]: {
										tasks: {$splice: [[taskIndex, 1]]}
									}
								});
		//set the component state to the mutated object
		this.setState({cards: nextState});

		//call the api to remove the task from the remote server
		fetch(`${url}/cards/${cardId}/tasks/${taskId}`, {
			method: 'delete',
			headers: requestHeader
		})
		.then((response) => {
			if(!response.ok) {
				throw new Error("Cannot access the remote server");
			}
		})
		.catch((error) => {
			this.setState({cards: prevState});
		});
	}

	toggleTask (cardId, taskId, taskIndex) {
		//Find the id of the card
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

		//save a reference to the task's 'done' value
		let newDoneValue;

		//Using the $apply command, you will change the done value to its opposite
		let nextState = update(
	      this.state.cards, {
	        [cardIndex]: {
	          tasks: {
	            [taskIndex]: {
	              done: { $apply: (done) => {
	                newDoneValue = !done
	                return newDoneValue;
	              }
	            }
	          }
	        }
	      }
	    });

		this.setState({cards: nextState});

		fetch(`${url}/cards/${cardId}/tasks/${taskId}`, {
			method: 'put',
			headers: requestHeader,
			body: JSON.stringify({done: newDoneValue})
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Cannot access the remote server");
			}
		})
		.catch((error) => {
			this.setState({cards: prevState});
		});
	}

	updateCardStatus (cardId, listId) {
		// get the current card through the cardId
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
		let card = this.state.cards[cardIndex];

		// Only proceed if hovering over a different list
		if (card.status !== listId) {
			this.setState(update(this.state, {
				cards: {
					[cardIndex]: {
						//change the state when the card is draged to another list
						status: { $set: listId }
					}
				}
			}));
		}
	}

	// bug?
	updateCardPosition (cardId, afterId) {
		// Only proceed if hovering over a different card
		if (cardId !== afterId) {
			let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
			let card = this.state.cards[cardIndex];

			let afterIndex = this.state.cards.findIndex((card) => card.id = afterId);
			// Use splice to remove the card and reinsert it a new index
			this.setState(update(this.state, {
				cards: {
					$splice: [
						[cardIndex, 1],	  //remove
						[afterIndex, 0, card]	//insert
					]
				}
			}));

		}
	}

	persistCardDrag (cardId, status) {
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
		let card = this.state.cards[cardIndex];

		fetch(`${url}/cards/${cardId}`, {
			method: 'put',
			headers: requestHeader,
			body: JSON.stringify({ status: card.status, row_order_position: cardIndex })
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Server response wasn\'t OK")
			}
		})
		.catch((error) => {
			console.error("fetch error: ", error);
			this.setState(
				update(this.state, {
					cards: {
						[cardIndex]: {
							status: { $set: status }
						}
					}
				})
			);
		})
	}

	render () {
		// ? fix the render method
		let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
			cards: this.state.cards,
			taskCallbacks: {
				toggle: this.toggleTask.bind(this),
				delete: this.deleteTask.bind(this),
				add: this.addTask.bind(this)
			},
			cardCallbacks: {
				updateStatus: this.updateCardStatus.bind(this),
				updatePosition: this.updateCardPosition.bind(this),
				persistCardDrag: this.persistCardDrag.bind(this)			
			}
		});

		return kanbanBoard;
	}
}

export default KanbanBoardContainer;