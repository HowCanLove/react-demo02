import React, { Component } from "react";
import CheckList from "./Checklist";

class Card extends Component {
	constructor(){
		super(...arguments);
		this.state = {
			showDetails: false
		}
	}
	toggleDetail(){
		this.setState({
			showDetails: !this.state.showDetails
		})
	}
	render(){
		let cardDetails;
		if(this.state.showDetails){
			cardDetails = (
					<div className="card__details">
						{this.props.description}
						<CheckList cardId={this.props.id} tasks={this.props.tasks} />
					</div>
				)
		}
		// onClick 写法一
		// onClick={
		// 	()=>this.setState({
		// 		showDetails: !this.state.showDetails
		// 	})
		// }
		return(
				<div className="card">
					<div className="card__title"
						onClick={
							// () => this.toggleDetail()
							this.toggleDetail.bind(this)
						}
					>
						{this.props.title}
					</div>
					{cardDetails}
				</div>
			)
	}
}

export default Card;