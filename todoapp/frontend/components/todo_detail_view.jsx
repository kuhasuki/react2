var React = require('react');
var TodoStore = require('../stores/todo_store.js');
var Steps = require('./steps.jsx');

var TodoDetailView = React.createClass({
  getInitialState: function(){
    return {showing: false};
  },
  handleDestroy: function(e){
    TodoStore.destroy(this.props.todoItem.id);
  },
  handleClick: function(e){
    this.setState({showing: !this.state.showing})
  },
  render: function(){
    if (this.state.showing){
      return(
        <div>
          <div>{this.props.todoItem.body}</div>
          <Steps todoItem={this.props.todoItem} />
          <button onClick={this.handleDestroy}>Annihilate</button>
          <button onClick={this.handleClick}>Close Details</button>
        </div>
      );
    } else {
      return (<button onClick={this.handleClick}>Details</button>);
    }
  }
});

module.exports = TodoDetailView;
