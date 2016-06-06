import CardForm from "./CardForm";
import React, {PropTypes} from "react";

class EditCard extends React.Component {
	componentWillMount () {
		let card = this.props.cards.find((card) => card.id == this.props.params.card_id);
		this.setState({ card: card });
	}

	handleChange (field, value) {
		this.setState({
			[field]: value
		});
	}

	handleClose (e) {
		this.props.history.pushState(null, '/');
	}

	handleSubmit (e) {
		e.preventDefault();
		this.props.cardCallbacks.updateCard(this.state);
		this.props.history.pushState(null, '/');
	}

	render () {
		return (
			<CardForm 
				draftCard={this.state}
				buttonLabel="Edit Card"
				handleChange={this.handleChange.bind(this)}
				handleSubmit={this.handleSubmit.bind(this)}
				handleClose={this.handleClose.bind(this)}
			/>
		);
	}
}

EditCard.propTypes = {
	cardCallbacks: PropTypes.object
};

export default EditCard;