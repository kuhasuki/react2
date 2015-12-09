var React = require('react');
var StepStore = require('../stores/step_store.js');

var StepForm = React.createClass({
  getInitialState: function(){
    return {body: ""};
  },
  updateBody: function(e){
    this.setState({body: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();
    StepStore.create({"body": this.state.body, "todo_id": this.props.todoId, "done": false});
    this.setState({body: ""});
  },
  render: function(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.updateBody} type="text" value={this.state.body}></input>
          <input type="submit" value="CLICK"></input>
        </form>
      </div>
    );
  }
});

module.exports = StepForm;
