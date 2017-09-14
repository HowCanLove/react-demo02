import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import KanbanBoard from './KanbanBoard';
import './App.css';
import 'whatwg-fetch';
import update from 'react-addons-update';
import 'babel-polyfill';

// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// class GroceryList extends Component{
// 	render(){
// 		return (
// 				<ul>
// 					<ListItem  quantity="1">Bread</ListItem>
// 					<ListItem  quantity="6">Eggs</ListItem>
// 					<ListItem  quantity="2">Milk</ListItem>
// 				</ul>
// 			)
// 	}
// }
// class ListItem extends Component {
	
// 	render(){
// 		return (
// 				<li>
// 					{this.props.quantity} x {this.props.children}
// 				</li>
// 			)
// 	}
// }
const API_URL = "http://kanbanapi.pro-react.com";
const API_HEADER = {
	'Content-Type':'application/json',
	Authorization:'any-string-you-like'
}


class ShowThing extends Component {
	
	constructor(argument) {
		super();
		this.state = {
			cards: []
		}
	}


	componentDidMount(){
		fetch(API_URL+'/cards', { headers: API_HEADER})
			.then(response => response.json())
			.then(response => {
				this.setState({
					cards: response
				})
			})
	}

	addTask(cardId, taskname){
		console.log("addTask");
		let prevState = this.state;
		let cardIndex = this.state.cards.findIndex(card => card.id === cardId);

		let newTask = {
			id:Date.now(),
			name:taskname,
			done: false
		}

		let nextState = update(this.state.cards,{
			[cardIndex]:{
				tasks:{
					$push: [newTask]
				}
			}
		})

		this.setState({
			cards: nextState
		})

		fetch(`${API_URL}/cards/${cardId}/tasks`, {
			method: 'post',
			headers: API_HEADER,
			body:JSON.stringify(newTask)
		})
		.then(response => response.json())
		.then(responseData => {
			console.log(newTask)
			newTask.id = responseData.id;
			console.log(newTask)
			this.setState({cards: nextState});
		})
		.catch(error => {
			console.log("error: ",error);
			this.setState(prevState);
		})
	}
	deleteTask(cardId, taskId, taskIndex){

		console.log("deleteTask");
		let cardIndex = this.state.cards.findIndex(card => card.id === cardId);

		let nextState = update(this.state.cards, {
			[cardIndex]:{
				tasks: {$splice: [[taskIndex,1]]}
			}
		})
		this.setState({
			cards: nextState
		})
		fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
			method: 'delete',
			headers: API_HEADER
		})

	}
	toggleTask(cardId, taskId, taskIndex){
		console.log("toggleTask");

		let cardIndex = this.state.cards.findIndex(card => card.id === cardId);

		let newDoneValue;

		let nextState = update(this.state.cards,{
			[cardIndex]:{
				tasks:{
					[taskIndex]:{
						done: {
							$apply: (done) => {
								newDoneValue = !done;
								return newDoneValue;
							}
						}
					}
				}
			}
		})
		this.setState({
			cards: nextState
		})

		fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
			method: 'put',
			headers: API_HEADER,
			body:JSON.stringify({done: newDoneValue})
		})
	}
	render(){
		return (
				<KanbanBoard cards={this.state.cards} taskCallbacks={{
					toggle: this.toggleTask.bind(this),
					delete: this.deleteTask.bind(this),
					add: this.addTask.bind(this)
				}}/>
			)
	}
}

let cardsList = [
	{
		id: 1,
		title: "Read the book",
		description: "I should read the whole book",
		status: "in-progress",
		tasks: [
			{
				id:1,
				name:"react 开发实战",
				done: true
			},{
				id:2,
				name:"react Native 用JavaScript开发移动应用",
				done: false
			},
		]
	},{
		id: 2,
		title: "Write some code",
		description: "Code along with the samples in the book. The complete source can be found at [github] (https://github.com/pro-react)",
		status: "todo",
		color: "#ff00ff",
		tasks: [
			{
				id: 1,
				name: "ContactList Example",
				done: true
			},{
				id: 2,
				name: "Kanban Example",
				done: false
			},{
				id: 3,
				name: "My own experiments",
				done: false
			},
		]
	},{
		id: 3,
		title: "Know someone",
		description: "Know somebody",
		status: "done",
		tasks: [
			{
				id: 1,
				name: "Know a girl",
				done: true
			},{
				id: 2,
				name: "Know a boy",
				done: true
			},
		]
	},
];

// ReactDOM.render(<GroceryList />, document.getElementById('root'));
ReactDOM.render(<ShowThing />, document.getElementById('root'));
// ReactDOM.render((<h1>123</h1>), document.getElementById('root'))
// registerServiceWorker();
