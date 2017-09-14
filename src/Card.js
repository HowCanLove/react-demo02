import React, { Component, PropTypes } from "react";
import CheckList from "./Checklist";
import marked from 'marked';

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
		let sideColor = {
			position:"absolute",
			zIndex:1,
			top: 0,
			bottom: 0,
			left: 0,
			width: "auto",
			backgroundColor: this.props.color
		}
		let cardDetails;
		if(this.state.showDetails){
			cardDetails = (
					<div className="card__details">
						<span dangerouslySetInnerHTML={{__html:marked(this.props.description)}}></span>
						
						<CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks} />
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
let titlePropType = (props, propName, componentName) => {
	if(props[propName]){
		let value = props[propName];
		if(typeof value !== "string" || value.length > 80){
			return new Error(
				`${propName} in ${componentName} is longer than 80 characters`
			)
		}
	}
}
Card.propTypes = {
	id: PropTypes.number.isRequired,
	title: titlePropType,
	description: PropTypes.string,
	tasks: PropTypes.arrayOf(PropTypes.object)
}
						// <span style={sideColor}>123</span>

export default Card;