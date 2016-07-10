import React, {PropTypes} from "react";
import ReactDOM from "react-dom";

class CardForm extends React.Component {
	handleChange (field, e) {
		this.props.handleChange(field, e.target.value.toString());
	}

	handleClose (e) {
		e.preventDefault();
		this.props.handleClose();
	}

	render () {
		return (
			<div>
				<div className="card big">
					<form onSubmit={this.props.handleSubmit.bind(this)}>
						<input
							type="text"
							value={this.props.draftCard.title}
							onChange={this.handleChange.bind(this, 'title')}
							placeholder="Title"
							required={true}
							autoFocus={true}
						/>
						<textarea
							value={this.props.draftCard.description}
							onChange={this.handleChange.bind(this, 'description')}
							placeholder="Description"
							required={true}
						/>
						<div className="selectstatus">
							<label htmlFor="status">Status</label>
							<select id="status"
									onChange={this.handleChange.bind(this, 'status')}
							>
								<option value="todo">To Do</option>
								<option value="in-progress">In Progress</option>
								<option value="done">Done</option>
							</select>
						</div>
						<label htmlFor="color">Color</label>
						<input 
							id="color"
							value={this.props.draftCard.color}
							onChange={this.handleChange.bind(this, 'color')} 
							type="color"
						/>
						<div className="actions">
							<button type="submit">{this.props.buttonLabel}</button>
						</div>
					</form>
				</div>
				<div className="overlay" onClick={this.handleClose.bind(this)}></div>
			</div>
		);
	}
}

CardForm.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
	draftCard: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		status: PropTypes.string,
		color: PropTypes.string
	}).isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired
}

export default CardForm;