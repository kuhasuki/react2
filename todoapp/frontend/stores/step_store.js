var _steps = [];
var _callbacks = [];

var StepStore = {
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
  all: function(todoId){
    mySteps = [];
    _steps.forEach(function(step){
      if(step.todo_id === todoId){
        mySteps.push(step);
      }
    });
    return mySteps;
  },
  fetch: function(todoId){
    var url = '/api/todos/' + todoId + '/steps';
    $.get(url, {}, function(steps){
      for (var i = 0; i < steps.length; i++){
        var alreadyExists = false;
        for (var j = 0; j < _steps.length; j++) {
          if (_steps[j].id === steps[i].id){
            alreadyExists = true;
          }
        }
        if (!alreadyExists){
          _steps.push(steps[i]);
        }
      }
      StepStore.changed();
    });
  },
  create: function(data, todoId){
    var url = '/api/todos/' + todoId + '/steps';
    $.post(url, {step: data}, function(step){
      _steps.push(step);
      StepStore.changed();
    });
  },
  find: function(id){
    var idx = -1;
    _steps.forEach(function(step, i){
      if(step.id == id){
        idx = i;
      }
    });
    return idx;
  },
  destroy: function(id){
    var url = '/api/steps/' + id;
    var position = StepStore.find(id);
    if(position !== -1){
      $.ajax({
        method: "DELETE",
        url: url
      })
        .done(function(step){
        _steps.splice(position,1);
        StepStore.changed();
      });
    }
  },
  toggleDone: function(id){
    var position = StepStore.find(id);
    var target = _steps[position];
    if(position !== -1){
      target.done = !target.done;
      var url = '/api/steps/' + id;
      $.ajax({
        method: "PUT",
        url: url,
        data: {step: target}
      })
        .done(function(step){
        _steps[position] = step;
        StepStore.changed();
      });
    }
  }
};

module.exports = StepStore;
