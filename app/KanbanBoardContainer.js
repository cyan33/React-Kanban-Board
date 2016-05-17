import React from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';


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

	//when the component mounted, trigger this function 
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

	render () {
		return <KanbanBoard cards={this.state.cards} />
	}
}

export default KanbanBoardContainer;