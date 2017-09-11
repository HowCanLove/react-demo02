import React, { Component } from "react";
import Card from "./Card";

class List extends Component {
	
	render(){
		let cards = this.props.cards.map(card => <Card id={card.id}
									 title={card.title}
									 description={card.description}
									 tasks={card.tasks} 
									 key={card.id}
									/>
		)
		return (
				<div className="list">
					<h1>{this.props.title}</h1>
					{cards}
				</div>
			)
	}
}
export default List;