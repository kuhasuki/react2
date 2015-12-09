var _todos = [];
var _callbacks = [];

var TodoStore = {
  changed: function(){
    _callbacks.forEach(function(callback){
      callback();
    })
  },
  addChangedHandler: function(callback){
    _callbacks.push(callback);
  },
  removeChangedHandler: function(callback){
    var idx = _callbacks.indexOf(callback);
    if (idx !== -1){
      _callbacks.splice(idx, 1);
    }
  },
  all: function(){
    return _todos;
  },
  fetch: function(){
    $.get('/api/todos', {}, function(todos){
      _todos = todos;
      TodoStore.changed();
    });

  },
  create: function(data){
    console.log(data);
    $.post('/api/todos', {todo: data}, function(todo){
      _todos.push(todo);
      TodoStore.changed();
    });
  },
  find: function(id){
    var idx = -1;
    _todos.forEach(function(todo, i){
      if(todo.id === id){
        idx = i;
      }
    });
    return idx;
  },
  destroy: function(id){
    var url = '/api/todos/' + id;
    var position = TodoStore.find(id);
    if(position !== -1){
      $.ajax({
        method: "DELETE",
        url: url
      })
        .done(function(todo){
        _todos.splice(position,1);
        TodoStore.changed();
      });
    }
  },
  toggleDone: function(id){
    var position = TodoStore.find(id);
    var target = _todos[position];
    target["done"] = !target["done"];
    if(position !== -1){
      var url = '/api/todos/' + id;
      $.ajax({
        method: "PUT",
        url: url,
        data: {todo: target}
      })
        .done(function(todo){
        _todos[position] = todo;
        TodoStore.changed();
      });
    }
  }
};

module.exports = TodoStore;
