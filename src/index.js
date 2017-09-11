import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import KanbanBoard from './KanbanBoard';
import './App.css';

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


let cardsList = [
	{
		id: 1,
		title: "Read the book",
		description: "I should read the whole book",
		status: "in-progress",
		tasks: []
	},{
		id: 2,
		title: "Write some code",
		description: "Code along with the samples in the book",
		status: "todo",
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
		title: "Know a gril",
		description: "she name is ***",
		status: "done",
		tasks: []
	},
];

// ReactDOM.render(<GroceryList />, document.getElementById('root'));
ReactDOM.render(<KanbanBoard cards={cardsList} name="xin"/>, document.getElementById('root'));
// registerServiceWorker();
