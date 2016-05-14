import React, {PropTypes} from "react";

class CheckList extends React.Component {
	render () {
		let tasks = this.props.tasks.map((task) => {
			return (
				<li className="checklist_task" key={task.id}>
					<input type="checkbox" defaultChecked={task.done} />
					{task.name}
					<a href="#" className="checklist_task--remove" />
				</li>
			);
		});

		return (
			<div className="checklist">
				<ul>{tasks}</ul>
				<input type="text"
						className="checklist-add-task"
						placeholder="Type then hit Enter to add a task" />
			</div>
		);
	}
}

CheckList.propTypes = {
	cardId: PropTypes.number,
	tasks: PropTypes.arrayOf(PropTypes.object)
};

export default CheckList;