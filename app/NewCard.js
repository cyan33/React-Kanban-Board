import CardForm from "./CardForm";
import React, { PropTypes } from "react";

class NewCard extends React.Component {
	componentWillMount () {
		this.setState({
			id: Date.now(),
			title: '',
			description: '',
			status: 'todo',
			color: '#c9c9c9',
			tasks: []
		});
	}

	handleSubmit (e) {
		e.preventDefault();
		this.props.cardCallbacks.addCard(this.state);
		this.props.history.pushState(null, '/');
	}

	handleChange (field, value) {
		this.setState({
			[field]: value
		});
	}

	handleClose (e) {
		this.props.history.pushState(null, '/');
	}

	render () {
		return (
			<CardForm 
				draftCard={this.state}
				buttonLabel="Create Card"
				handleClose={this.handleClose.bind(this)}
				handleChange={this.handleChange.bind(this)}
				handleSubmit={this.handlesubmit.bind(this)}
			/>
		);
	}
}

NewCard.propTypes = {
	cardCallbacks: PropTypes.object
};

export default NewCard;