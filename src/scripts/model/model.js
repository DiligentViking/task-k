export function createModel() {
  const lists = {};

  localStorage.clear();  // Dev

  const save = () => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }

  const updateTodo = (listName, todoID, prop, val) => {
    const todo = lists[listName].todos[todoID];
    todo[prop] = val;
    if (todo['link']) {
      if (listName === 'Today') {
        const sourceTodo = lists[todo['link']].todos[todoID];
        sourceTodo[prop] = val;
      } else {
        if (prop === 'link') return;
        const todayTodo = lists['Today'].todos[todoID];
        todayTodo[prop] = val;
      }
    }
  }

  return {
    // List Funcs //
    
    getCustomLists() {
      return Object.keys(lists).slice(1);
    },


    addList(listName) {
      if (lists[listName]) {
        console.error('List already exists');
        return;
      }

      lists[listName] = {todos: {}};
      save();
    },


    deleteList(listName) {
      if (lists[listName].todos.length) {
        console.error('List must be empty before deletion');
        return;
      }

      delete lists[listName];
      save();
    },


    // Todo Funcs //

    getTodos(listName) {
      return lists[listName].todos;
    },


    addTodo(listName, title, notes, priority, datetimedue, isDone=null) {
      const todoID = crypto.randomUUID().toString().slice(0, 8);

      lists[listName].todos[todoID] = {title, notes, priority, datetimedue, isDone};
      save();

      return todoID;
    },


    deleteTodo(listName, todoID) {
      if ('link' in lists[listName].todos[todoID] && listName !== 'Today') {
        delete lists['Today'].todos[todoID];
      }
      delete lists[listName].todos[todoID];
      save();
    },


    linkTodoToToday(listName, todoID) {
      updateTodo(listName, todoID, 'link', listName);
      lists['Today'].todos[todoID] = lists[listName].todos[todoID];
      save();
    },
    
    unlinkTodoFromToday(listName, todoID) {
      delete lists['Today'].todos[todoID];
      updateTodo(listName, todoID, 'link', null);
      save();
    },


    markTodoAsDone(listName, todoID) {
      updateTodo(listName, todoID, 'isDone', 1);
      save();
    },

    markTodoAsNotDone(listName, todoID) {
      updateTodo(listName, todoID, 'isDone', null);
      save();
    },
  };
}
