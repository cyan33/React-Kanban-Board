import React, {PropTypes} from "react";

class CheckList extends React.Component {
	checkInputKeyPress (event) {
		if(event.key === "Enter") {
			//add the task and clear the current input
			this.props.taskCallbacks.add(this.props.cardId, event.target.value);
			event.target.value = "";	
		}
	}

	render () {
		let tasks = this.props.tasks.map((task) => {
			return (
				<li className="checklist_task" key={task.id}>
					<input type="checkbox" 
						defaultChecked={task.done}
						onChange={this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, task.index)} />
					
					{task.name}

					<a href="#" 
						className="checklist_task--remove"
						onClick={this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, task.index)} />
				</li>
			);
		});

		return (
			<div className="checklist">
				<ul>{tasks}</ul>
				<input type="text"
						className="checklist-add-task"
						placeholder="Type then hit Enter to add a task" 
						onKeyPress={this.checkInputKeyPress.bind(this)} />
			</div>
		);
	}
}

CheckList.propTypes = {
	cardId: PropTypes.number,
	tasks: PropTypes.arrayOf(PropTypes.object),
	taskCallbacks: PropTypes.object
};

export default CheckList;