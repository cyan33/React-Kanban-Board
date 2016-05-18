import React from 'react';
import KanbanBoard from './KanbanBoard';
import update from 'react-addons-update';
import 'whatwg-fetch';
import 'babel-polyfill';

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
			cards: [ ]
		};
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

	render () {
		return <KanbanBoard cards={this.state.cards} 
							taskCallbacks={{
								toggle: this.toggleTask.bind(this),
								delete: this.deleteTask.bind(this),
								add: this.addTask.bind(this)
							}} />
	}
}

export default KanbanBoardContainer;