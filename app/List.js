import React from 'react';

import Card from './Card';

class List extends React.Component {
	render () {
		var cards = this.props.cards.map((card, i) => {
			return <Card key={i}
						 id={card.id}
						 title={card.title}
						 description={card.description}
						 tasks={card.tasks} status={card.status} color={card.color} />;
		});

		return (
			<div className="list">
				<h1>{this.props.title}</h1>
				{cards}
			</div>
		);
	}
}

export default List;