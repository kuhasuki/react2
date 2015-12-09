var React = require('react');
var TodoStore = require('../stores/todo_store.js');
var DoneButton = require('./done_button.jsx');
var TodoDetailView = require('./todo_detail_view.jsx');

var TodoListItem = React.createClass({
  getInitialState: function(){
    return {title: this.props.todoItem.title, body: this.props.todoItem.body};
  },
  render: function(){
    return(
      <div>
        <div>{this.state.title}</div>
        <TodoDetailView todoItem={this.props.todoItem} />
        <DoneButton todoItem={this.props.todoItem} />
      </div>
    );
  }
});

module.exports = TodoListItem;
