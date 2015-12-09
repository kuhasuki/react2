var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var DoneButton = React.createClass({
  getInitialState: function(){
    return {done: this.props.todoItem.done};
  },
  handleDone: function(e){
    TodoStore.toggleDone(this.props.todoItem.id);
    this.setState({done: !this.state.done})
  },
  render: function(){
    return(
      <button onClick={this.handleDone}>{(this.state.done === false) ? "Done" : "Undo"}</button>
    );
  }
});

module.exports = DoneButton;
